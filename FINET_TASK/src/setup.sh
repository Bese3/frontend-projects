#!/usr/bin/env bash

# set -e
venv="finet"

# change this with your absolute path
activate_path="/root/projects/FINET_TASK/src/$venv/bin/activate"
if [ -d "$venv" ]; then
    echo "Activating virtual environment..."
    source "$activate_path"
    echo "Starting Server..."
    # on production logging must be in log directory of linux
    echo "Started Server..." && python3 -m "server" > server.log 2>&1
    echo "deactivating Virtual Enviroment..."
    deactivate
else
    echo "Installing Virtual Enviroment..."
    python3 -m venv $venv
    echo "Activating Virtual Enviroment..."
    source "$activate_path"
    echo "Installing requirments..."
    pip install -r requirements.txt
    echo "Starting Server..."
    # on production logging must be in log directory of linux
    echo "Started Server..." && python3 -m "server" > server.log 2>&1    
    echo "deactivating Virtual Enviroment..."
    deactivate
fi
