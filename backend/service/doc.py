import os
import shutil
from model.docllm import Prompt
from service import llm

# Directory where files will be stored
# Directory paths
UPLOAD_DIR = "uploads"
IMPROVED_DIR = "improved"

# Ensure directories exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(IMPROVED_DIR, exist_ok=True)


def current_chat(prompt=None):
    # Read the content of the improved file
    with open(improved_file_path, 'r') as file:
        document = file.read()

    _initial_prompt = f"{
        document}\nThe document above may or may not come with some erors. Give me the document above with spelling, style and grammar corrected where possible."
    if prompt is not None:
        _initial_prompt = _initial_prompt.join(prompt)
    return llm.current_chat(_initial_prompt)


def save_and_copy_file(file, file_name: str) -> dict:
    # Save the uploaded file
    saved_file_path = os.path.join(UPLOAD_DIR, file_name)
    with open(saved_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Copy the saved file to the "Improved" directory
    global improved_file_path
    improved_file_path = os.path.join(IMPROVED_DIR, file_name)
    shutil.copy(saved_file_path, improved_file_path)

    # Call current_chat to get the improved document text
    improved_text = current_chat()

    # Overwrite the file at improved_file_path with the improved text
    with open(improved_file_path, 'w') as file:
        file.write(improved_text)

    return {
        "saved_file_path": saved_file_path,
        "improved_file_path": improved_file_path
    }


# def get_document(id: str):
#     get_document()


# def improve_document(id: str):
#     improve_document()
