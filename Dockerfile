FROM ubuntu:16.04
RUN mkdir -p /app
WORKDIR /app
COPY . /app

# Install any needed packages
RUN apt-get update && apt-get install -y \
    software-properties-common\
    wget \
    build-essential \
    gcc\
    make \
    curl \
    git \
    python3-pip python3-dev \
    && cd /usr/local/bin \
    && ln -s /usr/bin/python3 python \
    && pip3 install --upgrade pip


RUN pip3 install -r requirements.txt
RUN python3 -c "import nltk; nltk.data.path.append('/app/nltk_data/')"
RUN python3 -c "import nltk;nltk.download('stopwords', download_dir='/app/nltk_data/')"
RUN python3 -c "import nltk;nltk.download('punkt', download_dir='/app/nltk_data/')"
RUN python3 -c "import nltk;nltk.download('stopwords', download_dir='/root/nltk_data/')"
RUN python3 -c "import nltk;nltk.download('punkt', download_dir='/root/nltk_data/')"

ENTRYPOINT ["python"]
# Run app when the container launches
CMD ["main.py"]

