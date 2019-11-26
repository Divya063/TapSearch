import json
import os
from flask import Flask, request, Response, render_template, jsonify
from logic import Index
from werkzeug.utils import secure_filename

invert_index = Index()

app = Flask(__name__)
UPLOAD_FOLDER = 'static/download'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def check_pdf(filename):
    if filename.rsplit('.', 1)[1].lower() == "pdf":
        return True


@app.route("/", methods=['GET', 'POST'])
def create_index():
    if request.method == "POST":
        req_data = request.form.get('text')
        if 'files[]' in request.files:
            files = request.files.getlist('files[]')
            for file in files:
                if check_pdf(file.filename):
                    directory_path = os.path.join(os.getcwd(), app.config['UPLOAD_FOLDER'])
                    path = os.path.join(directory_path, file.filename)
                    file.save(path)
                    req_data = convert(path)
                    print(req_data)
                else:
                    if allowed_file(file.filename):
                        req_data = file.read().decode("utf-8")
                    else:
                        msg = file.filename + " : Upload only pdf and text files, "
                        return jsonify(msg), 400

        result = invert_index.add(req_data)
        print(len(result['item']))
        if result is None:
            response = {"response": "Index not created"}
            return response, 400
        else:
            return jsonify(result), 201

    return render_template("home.html")


@app.route("/result", methods=['GET'])
def get_results():
    word = request.args.get('word')
    result = invert_index.lookup(word)
    if result is None:
        response = Response("{error : Item not found}", status=404, mimetype='application/json')
        return response

    response = jsonify(result)
    response.status_code = 200
    return response


@app.route("/clear", methods=['DELETE'])
def clean_index():
    result = invert_index.clear_index()
    if result:
        return jsonify(result), 201

    else:
        response = Response("{error : Index not deleted}", status=404, mimetype='application/json')

    return response


if __name__ == "__main__":
    app.run(debug=True)
