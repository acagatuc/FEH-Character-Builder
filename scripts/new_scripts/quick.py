import json
import os
from dotenv import load_dotenv

# load in pointers to each character
with open("character_pointers.json", "r") as f:
    pointers_list = json.load(f)

for hero in pointers_list:
    if "Female" in hero['common_name']:
        name = "".join([hero['common_name'].split("Female ")[0], hero['common_name'].split("Female ")[1], " (F)"])
        hero['common_name'] = name
    elif "Male" in hero['common_name']:
        name = "".join([hero['common_name'].split("Male ")[0], hero['common_name'].split("Male ")[1], " (M)"])
        hero['common_name'] = name

with open('character_pointers_2.json', 'w') as file:
    json.dump(pointers_list, file, indent=4) # indent for pretty formatting