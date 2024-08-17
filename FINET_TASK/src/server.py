from flask import (
                   make_response,
                   render_template,
                   jsonify,
                   Blueprint,
                   Flask,
                   redirect,
                   url_for
                   )
import requests
from requests.exceptions import ConnectionError
from uuid import uuid4
from util import population_rounder, get_countries_data


app_views = Blueprint('app', __name__, url_prefix="/discover-ze-world")
app = Flask(__name__)

third_url = 'https://restcountries.com/v3.1/'


@app_views.route("/name/<name>", methods=['GET'], strict_slashes=False)
def get_by_name(name):
    """
    This function makes a GET request to a specified URL endpoint
    with the provided `name`. It then processes the response data
    and extracts relevant information about countries with the given name
    """
    return get_countries_data(name, "home.html")


@app_views.route("/", methods=['GET'], strict_slashes=False)
def get_home():
    """
    returns the rendered template "home.html".
    """
    return render_template("home.html")


@app_views.route("/home", methods=['GET'], strict_slashes=False)
def redirect_home():
    """
    `redirect_home` redirects to the home page of the app.
    """
    return redirect(url_for('app.get_home'))


@app_views.route("/results/<name>", methods=['GET'], strict_slashes=False)
def render_result(name):
    return get_countries_data(name, "results.html")


app.register_blueprint(app_views)


if __name__ == '__main__':
    app.run('0.0.0.0',
            port=5000,)
