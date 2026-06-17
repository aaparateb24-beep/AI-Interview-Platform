from groq import Groq
import os
import re
import tempfile

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader

from database import engine, SessionLocal
from models import Base, Interview

Base.metadata.create_all(bind=engine)

app = FastAPI()
from dotenv import load_dotenv

load_dotenv()
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Backend Connected Successfully"
    }


@app.post("/submit")
def submit_answers(data: dict):

    questions = data.get("questions", [])
    answers = data.get("answers", [])

    evaluation_text = ""

    for i in range(len(questions)):
        evaluation_text += f"""
Question {i+1}:
{questions[i]}

Answer:
{answers[i]}
"""

    prompt = f"""
You are an expert interviewer.

Evaluate each answer.

For EVERY question provide:

Score: X/10
Comment: ...

After evaluating all questions provide:

Strengths:
- ...

Weaknesses:
- ...

Areas for Improvement:
- ...

IMPORTANT:

At the very end write exactly:

FINAL_SCORE: <number>

Example:
FINAL_SCORE: 78

Interview Data:

{evaluation_text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    feedback = response.choices[0].message.content

    score = None

    for line in feedback.split("\n"):
        if "FINAL_SCORE:" in line:
            try:
                score = int(
                    line.replace(
                        "FINAL_SCORE:",
                        ""
                    ).strip()
                )
            except:
                pass

    if score is None:

        matches = re.findall(
            r"Score:\s*(\d+)/10",
            feedback
        )

        if matches:
            total = sum(int(x) for x in matches)

            score = int(
                (total / (len(matches) * 10))
                * 100
            )
        else:
            score = 50

    db = SessionLocal()

    new_interview = Interview(
        interview_type=data.get(
            "interviewType",
            "Unknown"
        ),
        score=score,
        feedback=feedback
    )

    db.add(new_interview)
    db.commit()
    db.close()

    return {
        "answered": len(
            [a for a in answers if a.strip()]
        ),
        "total": len(answers),
        "score": score,
        "feedback": feedback
    }


@app.post("/generate-questions")
def generate_questions(data: dict):

    interview_type = data.get(
        "interviewType",
        "Technical"
    )

    question_count = int(
        data.get(
            "questionCount",
            3
        )
    )

    prompt = f"""
You are a senior interviewer.

Generate exactly {question_count}
unique and realistic
{interview_type} interview questions.

Requirements:

- Avoid very common repeated questions
- Mix beginner and intermediate difficulty
- Questions should test understanding
- Questions should be different from each other
- Return only questions
- One question per line
- No numbering
- No headings
- No explanations
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content

    questions = []

    for line in content.split("\n"):

        line = line.strip()

        if not line:
            continue

        lower = line.lower()

        if (
            "here are" in lower
            or "interview questions" in lower
            or "questions:" in lower
        ):
            continue

        line = (
            line.replace("1.", "")
            .replace("2.", "")
            .replace("3.", "")
            .replace("4.", "")
            .replace("5.", "")
            .replace("6.", "")
            .replace("7.", "")
            .replace("8.", "")
            .replace("-", "")
            .strip()
        )

        if len(line) > 10:
            questions.append(line)

    if len(questions) < question_count:

        fallback_questions = [
            "Explain React reconciliation?",
            "What problem does useMemo solve?",
            "What is the difference between state and props?",
            "What is a REST API?",
            "Explain event delegation in JavaScript?",
            "What is memoization?",
            "What is database indexing?",
            "Explain async and await?"
        ]

        questions = fallback_questions[
            :question_count
        ]

    return {
        "questions": questions[:question_count]
    }


@app.post("/analyze-resume")
async def analyze_resume(
    resume: UploadFile = File(...)
):

    try:

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp_file:

            temp_file.write(
                await resume.read()
            )

            pdf_path = temp_file.name

        reader = PdfReader(pdf_path)

        resume_text = ""

        for page in reader.pages:
            text = page.extract_text()

            if text:
                resume_text += text + "\n"

        prompt = f"""
You are an expert technical recruiter.

Analyze this resume and provide:

1. Resume Summary

2. Strengths

3. Weaknesses

4. Missing Skills

5. Interview Preparation Tips

Resume:

{resume_text}
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        analysis = response.choices[0].message.content

        return {
            "analysis": analysis
        }

    except Exception as e:

        return {
            "analysis": f"Error: {str(e)}"
        }


@app.get("/history")
def get_history():

    db = SessionLocal()

    interviews = db.query(
        Interview
    ).all()

    result = []

    for interview in interviews:
        result.append({
            "id": interview.id,
            "interview_type": interview.interview_type,
            "score": interview.score,
            "feedback": interview.feedback
        })

    db.close()

    return result