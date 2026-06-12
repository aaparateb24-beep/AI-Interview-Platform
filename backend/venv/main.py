from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    answers = data.get("answers", [])

    score = 0

    for answer in answers:
        if answer.strip() != "":
            score += 1

    percentage = round(
        (score / len(answers)) * 100
    )

    return {
        "score": percentage,
        "feedback": (
            "Excellent"
            if percentage >= 80
            else "Good"
            if percentage >= 50
            else "Needs Improvement"
        )
    }