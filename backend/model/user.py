from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class UserRequestModel(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str


class UserDatabaseModel(BaseModel):
    id: Optional[int] = Field(None)
    first_name: Optional[str] = Field(None, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    email: EmailStr = Field(..., max_length=255)
    password: str = Field(..., max_length=100)
    is_active: bool = Field(False)
    is_verified: bool = Field(False)
    verified_at: Optional[datetime] = None
    registered_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    created_at: datetime
