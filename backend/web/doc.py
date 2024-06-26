from fastapi import APIRouter, HTTPException, status, File, UploadFile
from service import doc as service
from model.docllm import ImprovementRequest
from errors import FailUpload, Missing

router = APIRouter(prefix="/chat/api/v0", tags=["Assitant"])


# TODO: prompt to be in a pydantic class for validation

# @router.post("/assistant")
# def current_chat(prompt=None):
#     try:
#         response = service.current_chat(prompt)
#         return response
#     except Missing as exc:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail=exc.msg)


@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_file(file: UploadFile = File(...,
                                              description="Upload the file for proofreading.")) -> dict[str, str]:
    file_name: str = f"{file.filename}"
    try:
        return service.save_and_copy_file(file=file, file_name=file_name)
    except FailUpload as exception:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=exception.msg)


@router.post("/improved", status_code=status.HTTP_202_ACCEPTED)
def improve_file(request: ImprovementRequest):
    try:
        return service.improve_file(payload=request.payload, path=request.path)
    except Missing as exception:
        raise HTTPException(


            status_code=status.HTTP_412_PRECONDITION_FAILED, detail=exception.msg)

    # # Endpoint to retrieve original and improved document versions
    # @router.get("/documents/{id}")
    # async def get_document(id: str):
    #     # Fetch the documents based on the provided ID
    #     # Return the original and improved versions
    #     return service.get_document(id)

    # # Endpoint to apply improvements to a document

    # @router.post("/documents/{id}/improve")
    # async def improve_document(id: str):
    #     # Apply improvements to the document with the given ID
    #     # Return the updated content
    #     return service.improve_document(id)
