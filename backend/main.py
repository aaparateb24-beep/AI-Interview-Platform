import ollama

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, SessionLocal
from models import Base, Interview

Base.metadata.create_all(bind=engine)

app = FastAPI()

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

Evaluate each question separately.

For every question provide:

Question Score: X/10
Comment: ...

After all questions provide:

Strengths
Weaknesses
Areas for Improvement

Finally write:

FINAL_SCORE: <number>

Interview Data:

{evaluation_text}
"""

    response = ollama.chat(
        model="llama3",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    feedback = response["message"]["content"]

    score = 50

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

    prompt = f"""
You are a senior interviewer.

Generate exactly 3 unique and realistic
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

Example style:

Explain React reconciliation?
What problem does useMemo solve?
What is the difference between state and props?
"""

    response = ollama.chat(
        model="llama3",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response["message"]["content"]

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
            .replace("-", "")
            .strip()
        )

        if len(line) > 10:
            questions.append(line)

    if len(questions) < 3:
        questions = [
            "Explain React reconciliation?",
            "What problem does useMemo solve?",
            "What is the difference between state and props?"
        ]

    return {
        "questions": questions[:3]
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
            "interview_type":
                interview.interview_type,
            "score":
                interview.score,
            "feedback":
                interview.feedback
        })

    db.close()

    return result

