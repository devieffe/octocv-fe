import openai
import os
import sqlite3
import pandas as pd

# Define file names and paths
job_files = {
    "Junior Data Analyst": r"D:\...\Junior Data Analyst Requirements.txt",
    "Middle Data Analyst": r"D:\...\Middle Data Analyst Requirements.txt",
    "Senior Data Analyst": r"D:\...\Senior Data Analyst Requirements.txt",
    "Junior Full Stack Developer": r"D:\...\Junior Full Stack Developer.txt",
    "Middle Full Stack Developer": r"D:\...\Middle Full Stack Developer.txt",
    "Senior Full Stack Developer": r"D:\..\Senior Full Stack Developer.txt",
}


# Function to read file content
def read_txt_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: File {file_path} not found.")
        return None

# Function to get a response from openai
def get_openai_response(prompt, api_key):
    openai.api_key = api_key

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    return response["choices"][0]["message"]["content"]


if __name__ == "__main__":
    api_key = "MY-API-KEY"  # Replace with your OpenAI API key

    # Create SQLite database
    conn = sqlite3.connect("job_keywords.db")
    cursor = conn.cursor()

    # Create table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS job_keywords (
            path TEXT PRIMARY KEY,
            job_keywords TEXT
        )
    """)

    # Process each file
    job_data = []
    for job_title, file_path in job_files.items():
        content = read_txt_file(file_path)
        if content:
            prompt = f"Extract 10 key words from the following job description:\n{content}"
            keywords = get_openai_response(prompt, api_key)
            if keywords:
                job_data.append((job_title, keywords))
                cursor.execute("INSERT OR REPLACE INTO job_keywords VALUES (?, ?)", (job_title, keywords))
                print(f"Processed: {job_title}")

    # Commit and close database
    conn.commit()
    conn.close()

    # Save to CSV
    df = pd.DataFrame(job_data, columns=["path", "job key words"])
    df.to_csv("job_keywords.csv", index=False, encoding="utf-8")

    print("Data successfully saved to database and CSV file!")