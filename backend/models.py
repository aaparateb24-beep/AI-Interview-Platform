from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()

class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True)
    interview_type = Column(String)
    score = Column(Integer)
    feedback = Column(String)