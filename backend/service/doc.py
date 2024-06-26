import os
import shutil

from regex import R
from model.docllm import Prompt, UserFeedback, FileUploadResponse
from service import llm

# Directory where files will be stored
# Directory paths
UPLOAD_DIR = "uploads"
IMPROVED_DIR = "improved"

# Ensure directories exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(IMPROVED_DIR, exist_ok=True)


def current_chat():
    # Read the content of the improved file
    with open(im_file_path, 'r') as file:
        document = file.read()

    _initial_prompt = f'{
        document}\n\nThe document above may or may not come with some erors. Give me the document above with spelling, style and grammar corrected where possible.'

    return llm.current_chat(_initial_prompt)


def doc_suggestions():
    # Read the content of the improved file
    with open(im_file_path, 'r') as file:
        document = file.read()

    _initial_prompt = f'{document}\n\nFrom the document above, are there suggestions you can make to improve the document further, if they are, ONLY List them in bullets and in SUMMARY FORMAT ONLY, ELSE ONLY write "No more suggestions, the document looks okay".'

    return llm.current_chat(_initial_prompt)


def save_and_copy_file(file, file_name: str):
    # Save the uploaded file
    saved_file_path = os.path.join(UPLOAD_DIR, file_name)
    with open(saved_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Copy the saved file to the "Improved" directory
    global im_file_path
    im_file_path = os.path.join(IMPROVED_DIR, file_name)
    shutil.copy(saved_file_path, im_file_path)

    # Call current_chat to get the improved document text
    improved_text = current_chat()
    # Overwrite the file at improved_file_path with the improved text
    with open(im_file_path, 'w') as file:
        file.write(improved_text)

    # Get recommended suggestions
    suggestion = doc_suggestions()

    # TODO: add some more logic here...
    # if "document looks okay" in suggestion:
    #     return {
    #         "saved_file_path": saved_file_path,
    #         "improved_file_path": improved_file_path,
    #         "suggestion": suggestion
    #     }
    # # else if suggestions are presented...
    # else:
    #     new_improved_text = handle_feedback()
    # # Old way -- No pydantic validation
    return {
        "saved_file_path": saved_file_path,
        "improved_file_path": im_file_path,
        "suggestion": suggestion
    }
    # New way
    # return FileUploadResponse(
    #     saved_file_path=saved_file_path,
    #     improved_file_path=improved_file_path,
    #     suggestion=suggestion
    # )


def improve_file(payload: str, path: str):
    improved_file_path = f"/home/nyangweso/Desktop/Projects/Document-Assistant/backend/{
        path}"
    print('sada')
    with open(improved_file_path, 'r') as file:
        a = file.read()
        _initial_prompt = f'{
            a}\n\nAdditionaly, I want the following suggestions implemented on the document above\n\n{payload}'
    print('sada2')
    new_improved_text = llm.current_chat(prompt=_initial_prompt)

    with open(improved_file_path, 'w') as file:
        file.write(new_improved_text)

    # TODO: Add sort of a recursion, user can request until a certain count. need to also fix frontend for this to happen
    return {"improved_file_path": path}

# TODO: handle custom suggestions from user...
# def handle_feedback(feedback: UserFeedback):
#     if feedback.accepted:
#         # If user is satisfied...you also get satisfied
#         return {"status": "accepted"}
#     else:
#         # Generate new improved document based on user's feedback or generated suggestions
#         new_improved_text = current_chat(feedback.feedback)
#         return new_improved_text


# def get_document(id: str):
#     get_document()

    # def improve_document(id: str):
    #     improve_document()
