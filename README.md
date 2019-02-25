# quiz-app (Django Backend)
Repository for quiz-app. 
![alt text](https://raw.githubusercontent.com/huse007/quiz-app/master/qdb.png)

The app is made using Python/Django backend with SQLite3 database.

Admin users are allowed to:
 - Add/remove/edit questions, answers and categories.
 - Add/remove user accounts

Users are allowed:
 - Play quiz
 - Create new password
 - Delete account

## Installing (using pip)
Installing virtual env:
```
python3 -m pip install virtualenv
```

Creating a virtual environment:
```
virtualenv ENV
```

Activate the virtual environment:
```
source ENV/bin/activate
```

Install django (version 1.11) using pip:

``` 
python3 -m pip install django==1.11
```

Start server:
```
python3 manage.py runserver
```

Open a browser and go to localhost:8000

## Usage

```
$ django-admin <command> [options] (help --commands)
$ manage.py <command> [options]
$ python -m django <command> [options]
```

More details will come...

## Comments
The backend works well, but the frontend lacks design. 
Will be replaced by a new React frontend soon... 

## Author
**Anders Huse Pedersen** - *initial work*
