import fitz

def convert(filePath):
    """

    :param filePath:
    :return parsed text:
    """
    doc = fitz.open(filePath)
    text = ""
    print("number of pages: %i" % doc.pageCount)
    for index in range(doc.pageCount):
        page1 = doc.loadPage(index)
        text += page1.getText()
        text += "\n"
    return text
