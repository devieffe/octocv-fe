import PyPDF2

def extract_plain_text_pdf(file_pdf):

    # Create a pdf file object
    pdfFileObj = open(file_pdf, 'rb')
    # Create a pdf reader object
    pdfReaded = PyPDF2.PdfReader(pdfFileObj)
    text = '\n'.join([pdfReaded.pages[i].extract_text() for i in range(len(pdfReaded.pages))])

    links = []
    # Get URLs from pdf file
    for page in range(len(pdfReaded.pages)):
        pdfPage = pdfReaded.pages[page]
        pageObject = pdfPage.get_object()
        try: 
            if pageObject['/Annots']:
                for annotation in pageObject['/Annots']:
                    annObject = annotation.get_object()
                    if annObject['/A']['/URI']:
                        links.append(annObject['/A']['/URI'])
        except KeyError:
            pass
    # Close the pdf file object
    pdfFileObj.close()

    return text, links