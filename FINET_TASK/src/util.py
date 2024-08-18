import requests
from flask import render_template, make_response, jsonify
from uuid import uuid4


def population_rounder(population):
    """
    population_rounder takes a population number, rounds it to the
    nearest hundred, thousand, million, or billion, and appends
    the corresponding suffix (H, K, M, B) based on the magnitude
    of the number.
    """
    if not population:
        raise ValueError("Population must not be empty")
    if not isinstance(population, int):
        raise TypeError("Population must be int type")

    num_mark = {
        100: 'H',
        1000: 'K',
        1000000: 'M',
        1000000000: 'B'
    }
    pop_str = ""
    key_list = list(num_mark.keys())
    for index, value in enumerate(key_list):
        try:
            if population >= value and population < key_list[index + 1]:
                pop_str = f"{round(population / value)}{num_mark.get(value)}"
                break
            continue
        except IndexError:
            pop_str = f"{round(population / 1000000000)}B"
            break
    else:
        pop_str = str(population)

    return pop_str


third_url = 'https://restcountries.com/v3.1/'


def get_countries_data(name, template):
    if not name:
        return make_response(jsonify({'message': "empty name"}), 400)
    if not template:
        return make_response(jsonify(
            {'message': "something got wrong when rendering result"}), 400)
    res_list = []
    try:
        req_url = f'{third_url}name/{name}' 
        req_url += '?fullText=true' if template == 'results.html' else ""
        with requests.get(req_url) as res:
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
                    temp_obj.update(
                       {'location': country['maps']['googleMaps']})
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
                    temp_obj.update(
                        {'land': "Yes" if country['landlocked'] else "No"})
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
                        native = country['name']['nativeName'][i]
                        temp_obj.update(
                         {
                          'native': native['official']
                         }
                        )
                        temp_obj.update(
                         {
                            'common': native['common']
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
    return render_template(template, res_list=res_list, result=True)
