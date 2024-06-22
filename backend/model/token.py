from pydantic import BaseModel
from datetime import datetime


class TokenResponse(BaseModel):
    access_token: str
    # refresh_token: str
    token_type: str = 'Bearer'
    expires_in: int
