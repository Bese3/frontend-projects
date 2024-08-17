import unittest
from unittest.mock import patch
from parameterized import parameterized_class
from util import population_rounder, get_countries_data
from requests.exceptions import ConnectionError
from server import app


@parameterized_class(("population", "expected_popstr"), [
    (1104300, "1M"),
    (114963583, "115M"),
    (120000, "120K"),
    (2987345234, "3B"),
    (67, "67"),
    (1, "1"),
    (100, "1H"),
    (101, "1H"),
    (1000, "1K"),
    (100000, "100K"),
    (1000000, "1M"),
    (1000000000, "1B")
    ])
class TestUtilPopulation(unittest.TestCase):
    def test_rounder_with_none_popultn(self):
        """
        tests the behavior of the `population_rounder`
        function when it is passed a `None` value.
        """
        with self.assertRaises(ValueError):
            population_rounder(None)

    def test_rounder_with_nonint_popultn(self):
        """
        tests the `population_rounder` function with
        non-integer population inputs.
        """
        with self.assertRaises(TypeError):
            population_rounder("vhbfd")
        with self.assertRaises(TypeError):
            population_rounder("123")

    def test_rounder_with_float_populatn(self):
        """
        tests the population_rounder function with
        float values to ensure it raises a TypeError.
        """
        with self.assertRaises(TypeError):
            population_rounder(1.2)
        with self.assertRaises(TypeError):
            population_rounder(12357854898.54)

    def test_rounder_with_given_values(self):
        """
        The function is used to test the `population_rounder` function
        with given values.
        """
        self.assertEqual(population_rounder(self.population), self.expected_popstr)


class TestUtilCountries(unittest.TestCase):

    def test_countries_API_with_no_name(self):
        """
        This function tests the countries API with no name provided.
        """
        with app.app_context():
            with get_countries_data(None, None) as res:
                self.assertEqual(res.status_code, 400)

    def test_countries_API_with_no_templates(self):
        """
        This function tests the countries API with no templates
        by checking the status code.
        """
        with app.app_context():
            with get_countries_data("Ethiopia", None) as res:
                self.assertEqual(res.status_code, 400)

    @patch("util.render_template")
    def test_counties_API_with_valid_data(self, mock_templates):
        """
        This function tests the API endpoint for retrieving
        country data with valid input.
        """
        mock_templates.return_value = {"status_code": 200, "common": "Ethiopia"}
        with app.app_context():
            res = get_countries_data("Ethiopia", "home.html")
            self.assertEqual(res["status_code"], 200)
            self.assertEqual(res["common"], "Ethiopia")
            self.assertTrue(mock_templates.called_once())
