import openai, os

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
client = openai.OpenAI(api_key = OPENAI_API_KEY)

def get_json(text, job, new_capabilities, new_skills, language):
    # CV parsing request
    prompt = '''Analyze the resume in the text and create a JSON with this structure:
{personal: {full_name, occupation, profile_or_career_objective, address, phone, email, GitHub, LinkedIn, personal_website_or_portfolio},
employment_history: [{position, company, location, start_date, end_date, responsibilities: []}],
projects: [{title, description, features: []}],
education: [{degree, institution, location, graduation_date}],
certifications: [],
skills: [],
spoken_languages: []}
If the text is unreadable or is not a resume, return an appropriate error message.'''

    # CV updating request
    prompt2 = f'''If the resume parsing is successful, consider that the owner of the resume has completed a {job} course and gained new capabilities and skills.
New capabilities: {new_capabilities}.\nNew skills: {new_skills}.
Add to JSON a "new_profile" section from the resume owner's perspective for a {job} position in plain text creatively combining the old profile and some new capabilities.
Add to JSON a "new_skills" section by uniting old and new skills.
Translate all content, including sublevels in employment history, projects and education except proper names, into {language} if it is originally in another language.
Ensure all JSON fields are properly formatted and return JSON.'''
    
    response = client.chat.completions.create(
        model = "gpt-4o", #"gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "You are an expert at analyzing text and extracting specific information in JSON format."},
            {"role": "user", "content": f"{prompt}\n{text}"},
            {"role": "assistant", "content": f"{prompt2}"}
        ],
        max_tokens = 2000
    )
    return response.choices[0].message.content

