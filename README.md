# Document-Assistant-Clone
A clone of the private repo of a document assitant system, Only keys and large file removed

## Installation and Setup Instructions 

  

 ### Prerequisites 

Ensure you have the following installed on your system: 

- Python 3.8 or higher 

- Node.js 14.x or higher 

- npm (Node Package Manager) 6.x or higher 

## Backend Setup 

1. Clone the Repository using terminal 

   git clone https://github.com/TheOneNyangweso/Document-Assistant-clone 

   cd Document-Assistant-clone

2. Create a Virtual Environment 

   python3 -m venv venv (You can use conda as an alternative)

   source venv/bin/activate (conda activate your_conda_env_name)


4. Install Python Dependencies 

   pip install -r requirements.txt

5. Configure the Application 

   Modify config.json located in the backend directory with the appropriate settings. 

6. Initialize the Database 

   If needed, set up your database and apply migrations. 

7. Run the Backend Server 

   Run the script main.py just like a normal python file, no need of cli uvicorn command

 
 ## Frontend Setup 

1. Navigate to the Frontend Directory  

   cd frontend 

2. Install Node.js Dependencies 

   npm install 

3. Run the Frontend Development Server 

   npm start 
