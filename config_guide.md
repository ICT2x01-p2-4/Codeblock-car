# Django Hierarchy

## Projects
This is the highest level for the project, this holds the server configurations and the path configurations for each app. App here refers to something like a module that can be plugged into any other project and played.

```ps1
# Configure a starting project
django-admin startproject "PROJECT_NAME"

# Start running the server
cd "PROJECT_NAME"
python manage.py "PROJECT_NAME"
```
> Note for production: To allow other users access, run with `python manage.py runserver 0:8000`

## Apps
This creates a module that can be worked on separately. The paths and routing have to be configured in the project `urls.py` for the things to work.

```ps1
# Create the an app
python manage.py startapp "APP_NAME"
```

## Directory structure
```sh
├───Codeblock-car
│   ├───This is the project folder
│   └───All main server configs go here
├───Student
│   ├───This is student app
│   └───Declares the student views and backend processing
├───Admin
│   ├───This is admin app
│   └───Declares the admin views and backend processing
└───CodingPage
    ├───This is Coding Page app
    └───Declares coding page view + backend processing
```

## Database Structure
There is a default database structure provided within the django app. There is a 3 step guide on how this works:
1. Change models in `models.py`
2. Run `python manage.py makemigrations` to create migrations for change
3. Run `python manage.py migrate` to apply changes