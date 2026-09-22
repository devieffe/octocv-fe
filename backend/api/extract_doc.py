from spire.doc import *
from spire.doc.common import *

def extract_text_doc(file_doc):

    # Create a doc file object
    doc = Document()
    # Load docx file
    doc.LoadFromFile(file_doc)
    # Get text
    text = doc.GetText()
    # Remove the first string (Evaluation Warning from Spire.Doc)
    text = text.split('\n', 1)[1]

    links = []
    # Get URLs from doc file
    for i in range(doc.Sections.Count):
        section = doc.Sections.get_Item(i)
        for j in range(section.Body.ChildObjects.Count):
            sec = section.Body.ChildObjects.get_Item(j)
            if sec.DocumentObjectType == DocumentObjectType.Paragraph:
                for k in range((sec if isinstance(sec, Paragraph) else None).ChildObjects.Count):
                    para = (sec if isinstance(sec, Paragraph) else None).ChildObjects.get_Item(k)
                    if para.DocumentObjectType == DocumentObjectType.Field:
                        field = para if isinstance(para, Field) else None
                        if field.Type == FieldType.FieldHyperlink:
                            link = field.Code.split('HYPERLINK ')[1].strip().strip('"')
                            links.append(link)

    doc.Close()
    return text, links