# Codeblock Car

## About
Insert description here

------------
# Installation Guide

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
codeblock-car\Scripts\activate.bat

# Install the requirements
python -m pip install -r requirements.txt
```

> Linux/Mac OS
```sh
# Activate the virtual environment
source codeblock-car/bin/activate

# Install the requirements
python -m pip install -r requirements.txt
```
> [Reconfiguring requirements.txt](https://code.visualstudio.com/docs/python/environments)

## 4. Start the server
```sh
# Start the server
cd codeblockCar
python manage.py runserver
```

# Development Workflow

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

# Testing

## User acceptance Test (UAT)
TODO

## Whitebox Testing
TODO

------------

# Changelog

## v0.1
- Updated README
  - Changed virtualenv naming to avoid conflicts with django project folder
- Added requirements.txt
- Added codeblockCar (django project)
  - Configured central folder for maintaining all templates
  - Added student app (comprises of student features)
  - Added connections app (comprises of car connection features)

## v0.0.3
- Updated README
  - Added install guide (Not configured yet)
- Added config_guide
  - Gives an overview of working with Django
- Removed WORKFLOW.md (Already included in README)

## v0.0.2
- Added license
- Updated README
	- Added workflow information
	- Added headers to be filled in
- Added .gitignore for vscode IDE

## v0.0.1
- Initial creation of master branch
- Added readme
