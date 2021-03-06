# Codeblock Car

## About
Codeblock Car is a new and interactive way for young students to learn basic logical thinking outside of the classroom. By providing the young students with a robotic car, a set of challenges, and block-based programming solutions to resolve the problems, these students are expected to learn basic logical thinking.

------------
# Installation Guide

You can either find the full list of commands in the `quick-install.txt` file or follow the commands below.

## 1. Install Python
Ensure that [python](https://www.python.org/downloads/) is installed.

## 2. Setup virtual environment
> Windows
```ps1
# Test if python PATH configured correctly
python --verison

# Install virtualenv
pip install virtualenv

# Change directory to the project folder
cd "PROJECT_ROOT_DIRECTORY"

# Configure virtualenv
python -m venv cb-car
```

> Linux/Mac OS
```sh
# Test if python PATH configured correctly
python3 --verison

# Install virtualenv
pip install virtualenv

# Change directory to the project folder
cd "PROJECT_ROOT_DIRECTORY"

# Configure virtualenv
python3 -m venv cb-car
```

## 3. Configure Virtual Environment
> Windows
```ps1
# Activate the virtual environment
cb-car\Scripts\activate.bat

# Install the requirements
python -m pip install -r requirements.txt
```

> Linux/Mac OS
```sh
# Activate the virtual environment
source cb-car/bin/activate

# Install the requirements
python -m pip install -r requirements.txt
```
> [Reconfiguring requirements.txt](https://code.visualstudio.com/docs/python/environments)

## 4. Configure the secrets file
The `.env` file with the secret key configured will be given in the zip file uploaded to xSite. 
Please download the zip file and look for the `.env` file and place it in the `codeblockCar` folder.

## 5. Migrate the Database
```sh
# Ensure that you cd to the django project folder
cd codeblockCar

# Update the models
python manage.py makemigrations

# Apply changes to db
python manage.py migrate
```

## 6. Load the databases
```sh
python manage.py loaddata commands.json
python manage.py loaddata challenges.json
python manage.py loaddata feedback.json
```

## 7. Start the server
```sh
# Start the web server
python manage.py runserver
```


# Development Workflow

## Updating Dependency Requirements
Run the following code if you installed any additional dependencies
```sh
pip freeze > requirements.txt
```

## Rules
1. Always commit to `dev` before commit to `master`
2. Do feature work only in `feature` branch
3. Commit regularly
4. When unit testing is done, commit changes and initiate pull request to `dev`
5. After reviewer approve, merge `feature` branch into `dev`
6. **DO NOT** delete feature branches after finished
7. Only bugfixes & documentation in `release` branches
8. Releases should be tagged in `master` branch 

## Naming conventions
- Features should be named `feature-<my_feature>`

## Version Control Semantics
- Version Control numbering should be `vX.Y.Z` where:
	- `X` = Major version
	- `Y` = Minor version
	- `Z` = Patch
- Release Control numbering is same as the version that it is based on `rX.Y`

## Configuration item tracking
- .gitignore should be updated
- Check files that are tracked by git and ensure files that should not be tracked are added to gitignore

## Change tracking
- Mention the file that was `Added`/`Removed`/`Updated`
- Mention the changes

## Before Commits
- Test all cases that are relevant to new feature
- Ensure all test cases passed before commit to `dev`

## Templating
Refer to [templating guide](https://docs.djangoproject.com/en/3.2/ref/templates/language/) for more information on how to properly create the templates. General design principles and OOP inheritance should apply.

- Parent is always `base.html`
  - Changes that affects all children should be made to parent
- Child views
  - Inherit from base view if same elements are used
- Pass dynamic values as reference variable in templates
- Javascript code should be created as a js file and put in the `templates` folder
  - Best practice is to not expose js code in pure html

## Database

### Updating the database
After there are changes made to the models file, you have to run the following code to update the existing database with the data.

```sh
# Update the models
python manage.py makemigrations

# Apply changes to db
python manage.py migrate
```

### Reverting the database
```sh
# Revert to the change to previous change
# Number located in <app_name>/migrations
python manage.py migrate challenge 0002
```

### Deleting a table
Sometimes when some configurations go wrong and you want to delete the data stored in the table. You can do so by running the following command
```py
python manage.py shell

from challenge.models import Challenge
from codingPage.models import Command, Log
Challenge.objects.all().delete()
Command.objects.all().delete()
Log.objects.all().delete()
```

Remember to reset the sequencing for the app so that the `id` starts from 1
> Must install sqlite3 first before running this command
```sql
python manage.py dbshell

UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='challenge_challenge';
UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='codingPage_command';
UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='codingPage_log';
.exit
```

### Fixtures
Fixtures are useful for loading data into the database before running the server.

Create a fixture by specifying the database to dump

```ps1
python manage.py dumpdata > fixtures\databasedump.json                # full database
python manage.py dumpdata myapp > fixtures\databasedump.json          # only 1 app
python manage.py dumpdata myapp.mymodel > fixtures\databasedump.json  # only 1 model (table)
```

Load data by reloading the fixtures

```ps1
python manage.py loaddata databasedump.json
```

# Testing

## User acceptance Test (UAT)
[![Watch the video](https://www.youtube.com/watch?v=rdrFcNsbZDU)](https://www.youtube.com/embed/rdrFcNsbZDU)

## Whitebox Testing
The testing suite is run using the Django Unit Testing framework where tests are written inside the app itself.
To run the tests, we have to `cd` to the folder where `manage.py` is located and run the following code:
```sh
python manage.py test
```

This will test for the test cases included in the `challenge` app and the `codingPage` app.

For the `connections` app, manually entering the app name is required since something in the configuration went wrong somewhere and Django doesn't register the app configuration.
```sh
python manage.py test connections
```

### Code coverage statistics
Coverage statistics were generated by using the `coverage.py` package. The commands to get the coverage statistics are:
```sh
coverage run --source='.' manage.py test
coverage report

Name                                     Stmts   Miss  Cover
------------------------------------------------------------
challenge\__init__.py                        0      0   100%
challenge\apps.py                            4      0   100%
challenge\migrations\0001_initial.py         5      0   100%
challenge\migrations\__init__.py             0      0   100%
challenge\models.py                         10      1    90%
challenge\tests.py                          19      0   100%
challenge\urls.py                            3      0   100%
challenge\views.py                          33     23    30%
codeblockCar\__init__.py                     0      0   100%
codeblockCar\asgi.py                         4      4     0%
codeblockCar\settings.py                    22      0   100%
codeblockCar\urls.py                         4      0   100%
codeblockCar\wsgi.py                         4      4     0%
codingPage\__init__.py                       0      0   100%
codingPage\apps.py                           4      0   100%
codingPage\migrations\0001_initial.py        7      0   100%
codingPage\migrations\__init__.py            0      0   100%
codingPage\models.py                        21      5    76%
codingPage\tests.py                         19      1    95%
codingPage\urls.py                           3      0   100%
codingPage\validators.py                     5      2    60%
codingPage\views.py                         35     20    43%
connections\apps.py                          4      0   100%
connections\migrations\0001_initial.py       5      0   100%
connections\migrations\__init__.py           0      0   100%
connections\models.py                        7      1    86%
connections\urls.py                          3      0   100%
connections\views.py                        21     14    33%
dashboard\__init__.py                        0      0   100%
dashboard\apps.py                            4      0   100%
dashboard\migrations\__init__.py             0      0   100%
dashboard\tests.py                           1      0   100%
dashboard\urls.py                            3      0   100%
dashboard\views.py                          20     12    40%
manage.py                                   12      2    83%
student\__init__.py                          0      0   100%
student\apps.py                              4      0   100%
student\migrations\__init__.py               0      0   100%
student\tests.py                             1      0   100%
student\urls.py                              3      0   100%
student\views.py                             3      1    67%
------------------------------------------------------------
TOTAL                                      293     90    69%
```

The code coverage statistics for the `connections` app tests are also shown below:
```sh
coverage run --source='connections' manage.py test connections
coverage report

Name                                     Stmts   Miss  Cover
------------------------------------------------------------
connections\apps.py                          4      0   100%
connections\migrations\0001_initial.py       5      0   100%
connections\migrations\__init__.py           0      0   100%
connections\models.py                        7      1    86%
connections\tests.py                        29      3    90%
connections\urls.py                          3      0   100%
connections\views.py                        21      6    71%
------------------------------------------------------------
TOTAL                                       69     10    86%
```

------------

# Changelog

## v0.8
- `dashboard` is stable
  - Implemented templating for all data to be displayed

## v0.7
- `dashboard` implemented
  - Added map to dashboard
  - Updated dashboard links
  - Dashboard template added in
- `codingPage` updated with new model feature
  - Link Logs to challenge_id with foreign key
  - Able to tie logs to a challenge
- Removed `admin` feature built in Django
  - Removed unused app admin

## v0.6
- `codingPage` code check simulator done
  - Added id tags to values to enable tracking grid cells
  - Updated template linker to CDN for Bootstrap images
  - Added js code for simulator to work
  - Added images to indicate actions taken in each cell of grid

## v0.5
- `Tutorial` integrated
  - Refactored to be under codingPage app
  - Pending function for test coding to move the car
- Added `TCPServer` as separate module
  - Works to establish connections
  - Skeleton code in, not completed
- Added `Log` model to store logs
- Completed `codingPage` processing and logging of blockly generated code

## v0.4.1
- Added secret key management
- Updated `requirements.txt`
- Fixed link for `codingPage`

## v0.4
- Refactored Models for challenges
  - Removed MongoDB
  - Updated models
    - Removed _description_ field
    - Added _difficulty_ field
    - Added _size_ field
- Updated `challenge` app
  - CRUD for challenges done
  - Fixed broken update and delete functions
  - Refactored URLs in static template to use dynamic pointers to path names
  - Added fixtures for `challenge` model

## v0.3.1
- Added Fixtures
  - Use `fixtures` directory to dump default database configurations
  - Tested `loaddata dump.json` working successfully
- Updated README
  - Added description for about section
  - Updated install guide with database installation notes
  - Updated Workflow section on working with Databases
  - Updated Workflow section on updating install requirements
- Added `quick-install.txt` guide for windows installation
- Updated `codingPage.html`
  - Added HTML for modals
  - Removed previous run button
- Updated `coding_page.js`
  - Added functions to interact with generated Modals
  - Removed previous run function
- Updated `settings.py` in `codeblockCar`
  - Change route naming to **"coding"** instead of **"codingPage"**

## v0.3
- Updated `models`
  - Moved challenge command table over to codingpage app
  - Moved validator over to codingpage app
- Removed `custom.js` (duplicate code)
- Updated `codingPage.html`
  - Added templating
  - Removed js within HTML and moved code to js file
- Created `coding_page.js`
  - Utilised OOP to reduce the lines of code
- Updated `base.html`
  - Added more templates for header scripts

## v0.2
- Updated `README.md`
  - Added details on starting the project
  - Added workflow for templating
- Removed `WORKFLOW.md` again (not committed previously)
- Updated `templates`
  - Refactored html code by adding inheritance and templating
  - Established base templating structure for future usage

## v0.1
- Updated `README.md`
  - Changed virtualenv naming to avoid conflicts with django project folder
- Added `requirements.txt`
- Added `codeblockCar` (django project)
  - Configured central folder for maintaining all templates
  - Added student app (comprises of student features)
  - Added connections app (comprises of car connection features)

## v0.0.3
- Updated `README.md`
  - Added install guide (Not configured yet)
- Added `config_guide.md`
  - Gives an overview of working with Django
- Removed `WORKFLOW.md` (Already included in README)

## v0.0.2
- Added license
- Updated `README.md`
	- Added workflow information
	- Added headers to be filled in
- Added `.gitignore` for vscode IDE

## v0.0.1
- Initial creation of master branch
- Added `README.md`
