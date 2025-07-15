from pymongo import MongoClient
import json
import os
from dotenv import load_dotenv

# load in pointers to each character
with open("character_pointers.json", "r") as f:
    pointers_list = json.load(f)

# Connect to both MongoDB databases (can be the same or different servers)
client = MongoClient("mongodb://localhost:27017/")

# Access collections
db = client["Heroes"]
heros = db['heros']

for pointer in pointers_list:
    query = { "name": pointer["full_name"]}
    newvalue = { "$set": {"game": [pointer['game']]}}
    heros.update_one(query, newvalue)
    # try: 
    #     result = collection.find_one({"name": pointer['full_name']})
    #     pointer['hero_id'] = str(result['_id'])
    # except Exception as e:
    #     print(e)
    #     print("occured on " + pointer['full_name'])


# with open(filename, 'w') as file:
#     json.dump(pointers_list, file, indent=4) # indent for pretty formatting