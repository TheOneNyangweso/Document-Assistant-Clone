import os
import uvicorn
from fastapi import FastAPI, HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from web import doc, user

UPLOAD_DIRECTORY = '/home/nyangweso/Desktop/Projects/Document-Assistant/backend/uploads'
IMPROVED_DIRECTORY = '/home/nyangweso/Desktop/Projects/Document-Assistant/backend/improved'

app = FastAPI(title="Document Assistant", version="0.1")

app.mount('/uploads', StaticFiles(directory='uploads'), 'uploads')
app.mount('/improved', StaticFiles(directory='improved'), 'improved')

app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
                   allow_methods=['*'],
                   allow_headers=['*'])

app.include_router(doc.router)
app.include_router(user.router)


@app.get("/root")
async def success():
    try:
        return {"message": "Your Personal Document Assistant"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

if __name__ == "__main__":
    # Setting PYTHONPATH to include the current directory
    os.environ['PYTHONPATH'] = os.getcwd()
    uvicorn.run("main:app", host="0.0.0.0", port=8003, reload=True)
