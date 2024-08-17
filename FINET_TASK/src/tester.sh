#!/usr/bin/env bash


handle_interrupt() {
    echo "deactivating Virtual Enviroment..."
    deactivate
    echo "Exiting..."
    exit 1
}

trap handle_interrupt SIGINT

venv="finet"

# change this with your absolute path
activate_path="/root/projects/FINET_TASK/src/$venv/bin/activate"
if [ -d "$venv" ]; then
    echo "Activating virtual environment..."
    source "$activate_path"
    echo "Starting test..."
    echo "do you want the test to be light/verbose(0/1)?"
    read v
    if [ "$v" == "1" ]; then
        python3 -m unittest discover tests -v
    else
        python3 -m unittest discover tests
    fi
    echo "deactivating Virtual Enviroment..."
    deactivate
else
    echo "Installing Virtual Enviroment..."
    python3 -m venv $venv
    echo "Activating Virtual Enviroment..."
    source "$activate_path"
    echo "Installing requirments..."
    pip install -r requirements.txt
    echo "do you want the test to be light/verbose(0/1)?"
    read v
    if [ "$v" == "1" ]; then
        python3 -m unittest discover tests -v
    else
        python3 -m unittest discover tests
    fi
    echo "deactivating Virtual Enviroment..."
    deactivate
fi
