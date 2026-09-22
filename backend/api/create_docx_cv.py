from docxtpl import DocxTemplate, RichText

def create_new_cv_docx(json_cv, cv_template, new_cv_docx):

    new_cv = DocxTemplate(cv_template)

    # create hyperlinks
    rt_email = RichText()
    rt_github = RichText()
    rt_linkedin = RichText()
    rt_site = RichText()
    if json_cv['personal']['email']:
        rt_email.add(json_cv['personal']['email'], url_id=new_cv.build_url_id('mailto:'+json_cv['personal']['email']))
        json_cv['rt_email'] = rt_email
    if json_cv['personal']['GitHub']:
        rt_github.add('GitHub', url_id=new_cv.build_url_id(json_cv['personal']['GitHub']))
        json_cv['rt_github'] = rt_github
    if json_cv['personal']['LinkedIn']:
        rt_linkedin.add('LinkedIn', url_id=new_cv.build_url_id(json_cv['personal']['LinkedIn']))
        json_cv['rt_linkedin'] = rt_linkedin
    if json_cv['personal']['personal_website_or_portfolio']:
        rt_site.add(json_cv['personal']['personal_website_or_portfolio'], url_id=new_cv.build_url_id(json_cv['personal']['personal_website_or_portfolio']))
        json_cv['rt_site'] = rt_site
    
    # render and save new CV
    new_cv.render(json_cv)
    new_cv.save(new_cv_docx)

    return