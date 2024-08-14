

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
            if population > value and population < key_list[index + 1]:
                pop_str = f"{round(population / value)}{num_mark.get(value)}"
                break
            continue
        except IndexError:
            pop_str = f"{round(population / 1000000000)}B"
            break
    else:
        pop_str = str(population)

    return pop_str


# def get_countries_data(name):
