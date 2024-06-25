from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from model.user import UserDatabaseModel, UserRequestModel
from model.token import TokenResponse
from datetime import timedelta
from service import user as service
from errors import Missing, Duplicate

ACCESS_TOKEN_EXPIRE_MINUTES = 15

router = APIRouter(prefix="/user", tags=["User"])

# ---new auth stuff

# This dependency makes a post "/user/login"
# (from a form containing a username and password)
# return an access token
oauth2_dep = OAuth2PasswordBearer(tokenUrl="user/login")


def unauthed():
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password",
        headers={"WWW-Authenticate": "Bearer"},)


# This endpoint is directed to by any call that has the oauth2_dep() in its dependencies list
@router.post("/login", status_code=status.HTTP_200_OK)
async def create_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login by getting username(the email) and password from OAuth form, return access token"""
    user = service.auth_user(email=form_data.username,
                             plain=form_data.password)
    if not user:
        unauthed()
    expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    if user:
        access_token = service.create_access_token(
            data={"sub": user.email}, expires=expires)  # subject for the token

    return TokenResponse(access_token=access_token, expires_in=int(expires.total_seconds()))


@router.get("/token", status_code=status.HTTP_200_OK)
def get_current_token(token: str = Depends(oauth2_dep)):
    """Return the current access token"""
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not authorize credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    user = service.get_current_user(token)
    if user is None:
        raise credential_exception
    return {"email": user.email}


# ---previous CRUD stuff
@router.get("")
@router.get("/")
def get_all():
    return service.get_all()


@router.get("/{name}")
def get_one(name: str):
    try:
        return service.get_one(name)
    except Missing as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=exc.msg)


@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user: UserRequestModel):
    try:
        payload = service.create(user)
        return JSONResponse(content=payload)
    except Duplicate as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=exc.msg)


# @router.patch("/")
# def modify(user: UserRequestModel):
#     try:
#         return service.modify(user)
#     except Missing as exc:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail=exc.msg)


# @router.delete("/delete")
# def delete(name: str):
#     try:
#         return service.delete(name)
#     except Missing as exc:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail=exc.msg)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("user:router", host="0.0.0.0", port=8000, reload=True)
