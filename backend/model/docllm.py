from pydantic import BaseModel, Field


class Prompt(BaseModel):
    prompt: str = Field(min_length=0)


class FileUploadResponse(BaseModel):
    saved_file_path: str
    improved_file_path: str
    suggestion: str


class UserFeedback(BaseModel):
    accepted: bool = True
    feedback: str = Field(None)


class ImprovementRequest(BaseModel):
    payload: str
    path: str
