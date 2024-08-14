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
from util import population_rounder


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
    if not name:
        return make_response(jsonify({'message': "empty name"}), 400)
    res_list = []
    try:
        with requests.get(f'{third_url}name/{name}') as res:
            if not res.ok:
                return render_template("home.html", result=False,
                                    message=res.json().get('message',
                                                            'Not Found'),
                                    status=res.json().get('status', 404))
            res = res.json()
            # print(res)
            for country in res:
                temp_obj = {}
                try:
                    temp_obj.update({'name': country['name']['common']})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'official': country['name']['official']})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'capital': country['capital'][0]})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'continent': country['region']})
                except KeyError:
                    pass
                try:
                    temp_obj.update(
                        {
                            'population': population_rounder(country['population'])
                        }
                        )
                except (KeyError, ValueError, TypeError):
                    pass
                try:
                    temp_obj.update({'subregion': country['subregion']})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'location': country['maps']['googleMaps']})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'timezone': country['timezones'][0]})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'flag': country['flags']['png']})
                except KeyError:
                    pass
                try:
                    for i in country['name']['nativeName'].keys():
                        temp_obj.update(
                        {
                        'native': country['name']['nativeName'][i]['official']
                        }
                        )
                        break
                except KeyError:
                    pass
                try:
                    for i in country['currencies'].keys():
                        temp_obj.update(
                        {
                        'currency': country['currencies'][i]['name']
                        }
                        )
                        break
                except KeyError:
                    pass
                try:
                    for i in country['languages'].keys():
                        temp_obj.update({'language': country['languages'][i]})
                        break
                except KeyError:
                    pass
                temp_obj.update({'id': uuid4()})
                res_list.append(temp_obj)
    except ConnectionError:
        return render_template("home.html", message="Connection Error")
    return render_template("home.html", res_list=res_list, result=True)


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
    if not name:
        return make_response(jsonify({'message': "empty name"}), 400)
    res_list = []
    try:
        with requests.get(f'{third_url}name/{name}') as res:
            if not res.ok:
                return render_template("home.html", result=False,
                                    message=res.json().get('message',
                                                            'Not Found'),
                                    status=res.json().get('status', 404))
            res = res.json()
            # print(res)
            for country in res:
                temp_obj = {}
                try:
                    temp_obj.update({'name': country['name']['common']})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'official': country['name']['official']})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'capital': country['capital'][0]})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'continent': country['region']})
                except KeyError:
                    pass
                try:
                    temp_obj.update(
                        {
                            'population': population_rounder(country['population'])
                        }
                        )
                except (KeyError, ValueError, TypeError):
                    pass
                try:
                    temp_obj.update({'subregion': country['subregion']})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'location': country['maps']['googleMaps']})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'timezone': country['timezones'][0]})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'flag': country['flags']['png']})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'land': "Yes" if country['landlocked'] else "No"})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'latitude': country['latlng'][0]})
                    temp_obj.update({'longitude': country['latlng'][1]})
                except KeyError:
                    pass
                try:
                    temp_obj.update({'area': f"{country['area']}sqr.KM"})
                except KeyError:
                    pass
                try:
                    for i in country['name']['nativeName'].keys():
                        temp_obj.update(
                        {
                        'native': country['name']['nativeName'][i]['official']
                        }
                        )
                        temp_obj.update(
                        {
                        'common': country['name']['nativeName'][i]['common']
                        }
                        )
                        break
                except KeyError:
                    pass
                try:
                    for i in country['currencies'].keys():
                        temp_obj.update(
                        {
                        'currency': country['currencies'][i]['name']
                        }
                        )
                        break
                except KeyError:
                    pass
                try:
                    for i in country['languages'].keys():
                        temp_obj.update({'language': country['languages'][i]})
                        break
                except KeyError:
                    pass
                temp_obj.update({'id': uuid4()})
                res_list.append(temp_obj)
    except ConnectionError:
        return render_template("home.html", message="Connection Error")
    return render_template('results.html', res_list=res_list)


app.register_blueprint(app_views)


if __name__ == '__main__':
    app.run('0.0.0.0',
            port=5000,
            debug=True)
