"""An LLM will be used here instead of a NLP library. Results from trial notebok hows key differences:

Context awareness and understanding
Versatility and Adaptability with minimal cistomization
Better perfomance
Ease of Use

A better approach would be to finetune the model - maybe to check for exoected agenda and not anything beyond scope
"""
import textwrap
import google.generativeai as genai
import json

with open('/home/nyangweso/Desktop/Projects/Document-Assistant/backend/config.json', 'r') as f:
    CONFIG = json.load(f)
    gemini_api = CONFIG['GEMINI_API_KEY']

genai.configure(api_key=gemini_api)

model = genai.GenerativeModel("models/gemini-1.5-flash")
chat = model.start_chat(history=[])


def to_markdown(text):
    text = text.replace('•', '  *')
    a = textwrap.indent(text, '> ', predicate=lambda _: True)
    return a


def LLM_Response(prompt):
    response = chat.send_message(prompt, stream=True)
    for part in response:
        pass
    response_text = str(response.text)
    # Perfom preformatting
    response_text = [line.strip()
                     for line in response_text.split("\n")]
    formatted_text = textwrap.fill(text="\n".join(response_text), width=50)

    return formatted_text


def current_chat(prompt):
    result = LLM_Response(prompt)
    return result
