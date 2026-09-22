from urllib.parse import urlparse

def parse_links(links):
    linkedin_link = None
    github_link = None

    # Selects the shortest //linkedin.com/in/... link as LinkedIn personal link
    temp_list = [x for x in links if ('linkedin.com' in urlparse(x)[1].lower()) and urlparse(x)[2].lower().strip('/').startswith('in/')]
    if len(temp_list) > 0:
        temp_list.sort(key = lambda x: len(urlparse(x)[2]))
        linkedin_link = temp_list[0]

    # Selects the shortest //github.com/... link as GitHub personal link
    temp_list = [x for x in links if 'github.com' in urlparse(x)[1].lower()]
    if len(temp_list) > 0:
        temp_list.sort(key = lambda x: len(urlparse(x)[2]))
        github_link = temp_list[0]

    return linkedin_link, github_link