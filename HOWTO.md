### Steps to run the backend server:

1. Clone the repository: `$ git clone <repo-url> <repo-name(optional)>`
2. Install pipenv using the command `$ pip3 install pipenv`
3. Install all the dependencies required for this project using the command `$ pipenv install`
4. Activate the virtual environment with all the dependencies installed using the command `$ pipenv shell`
5. To run the server: `$ python3 manage.py runserver`
6. Server: http://127.0.0.1:8000/

### Steps to run the frontend server:

1. Navigate to the 'react-fe' directory from the root directory using the command `$ cd react-fe`
2. Run the command `$ npm install` which will install all the required dependencies and modules that are named in package.json file
3. Run the React project using the command `$ npm start`
4. Server:  http://127.0.0.1:3000/
5. Spreadsheet to be imported is "transfer_by_comm.arts_history.xlsx" which is present in the root directory of the project.

      If you do not quit the server with Ctrl+c then, the next time you run the server, port will be different. This port should be included in CORS_ORIGIN_WHITELIST of settings.py file of the config

___________

### Note: Both backend and frontend servers should be active. For the React app to fetch the data from backend, please make sure that the django server is active.
