# Discover Ze World (Finet Assessment Task) [Live](https://projects-vm2m.onrender.com/discover-ze-world/)

[![Coverage Status](https://coveralls.io/repos/github/Bese3/projects/badge.svg?branch=main)](https://coveralls.io/github/Bese3/projects?branch=main)

A simple Web application that displays information of countries based on the API ```https://restcountries.com/``` built with Python Flask.

## Requirements
+ Python
+ Virtual Enviroment
+ [Requirment](https://github.com/Bese3/projects/blob/main/FINET_TASK/src/requirements.txt)

### Applications

+ Flask

### APIs

+ ```/discover-ze-world/home```, ```/discover-ze-world/home``` - renders the home page for searching countries
+ ```/discover-ze-world/name/<name>``` -  searches a country by the given variable name.
+ ```/disvoer-ze-world/results/<name>``` - renderes detailed result about particular name.

### Installation

After cloning this repository navigate into the root of the project repository and install virtual enviroment:

```
$ python3 -m venv finet
```

In my case finet is the name am using.

### Usage
In order to use the API we have to run the server using below command after navigating to [src](https://github.com/Bese3/projects/tree/main/FINET_TASK/src) directory.

```
python3 -m server
```
now navigate to 

```
http://localhost:5000/discover-ze-world 
```

or use this [link](https://projects-vm2m.onrender.com/discover-ze-world/) to see live demo 