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


app_views = Blueprint('app', __name__, url_prefix="/discover-ze-world")
app = Flask(__name__)

third_url = 'https://restcountries.com/v3.1/'

@app_views.route("name/<name>", methods=['GET'], strict_slashes=False)
def get_by_name(name):
    """
    This Python function retrieves country information by name from a third-party API and formats the
    data into a response.
    
    :param name: The `get_by_name` function takes a `name` parameter as input. This function makes a GET
    request to a specified URL endpoint with the provided `name`. It then processes the response data
    and extracts relevant information about countries with the given name
    :return: The function `get_by_name` is returning a response containing information about countries
    based on the provided name. The information includes the country's common name, official name,
    capital, continent, subregion (if available), location on Google Maps, timezone, flag image, native
    name, currency, and language. The function returns this information in JSON format with a status
    code of 200 if successful. If
    """
    if not name:
        return make_response(jsonify({'message': "empty name"}), 400)
    res_list = []
    with requests.get(f'{third_url}name/{name}') as res:
        if not res.ok:
            return make_response(jsonify({'message': res.json()['message']}), res.json()['status'])
        res = res.json()
        print(res)
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
                temp_obj.update({'population': country['population']})
            except KeyError:
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
                    temp_obj.update({'native': country['name']['nativeName'][i]['official']})
                    break
            except KeyError:
                pass
            try:
                for i in country['currencies'].keys():
                    temp_obj.update({'currency': country['currencies'][i]['name']})
                    break
            except KeyError:
                pass
            try:
                for i in country['languages'].keys():
                    temp_obj.update({'language': country['languages'][i]})
                    break
            except KeyError:
                pass
            res_list.append(temp_obj)
    return render_template("home.html", res_list=res_list, result=True)

@app_views.route("/", methods=['GET'], strict_slashes=False)
def get_home():
    return render_template("home.html")

@app_views.route("/home", methods=['GET'], strict_slashes=False)
def redirect_home():
    return redirect(url_for('app.get_home'))


app.register_blueprint(app_views)




if __name__ == '__main__':
    app.run('0.0.0.0',
            port=5000,
            debug=True)
