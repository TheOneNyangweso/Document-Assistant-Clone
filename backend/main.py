import os
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from web import doc, user


app = FastAPI(title="CSV_Chatbot_API", version="0.1")

app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
                   allow_methods=['*'],
                   allow_headers=['*'])

app.include_router(doc.router)
app.include_router(user.router)


@app.get("/")
@app.get("")
async def success():
    return {"message": "Successfully connected to server"}


if __name__ == "__main__":
    # Setting PYTHONPATH to include the current directory
    os.environ['PYTHONPATH'] = os.getcwd()
    uvicorn.run("main:app", host="0.0.0.0", port=8003, reload=True)
