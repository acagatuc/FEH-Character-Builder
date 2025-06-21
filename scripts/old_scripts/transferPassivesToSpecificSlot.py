# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.firefox.options import Options
# from selenium.webdriver import Firefox
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.common.exceptions import NoSuchElementException
# from selenium.common.exceptions import TimeoutException
# from selenium.common.exceptions import ElementNotInteractableException
from pymongo import MongoClient
import pandas as pd

#initialize headless webdriver
# options = Options()
# options.add_argument("--headless")
# driver = webdriver.Firefox(options=options)

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills
collection = db['Heroes']
heroList = db['Hero List']

data = heroList.find()

for h in data:
    print(h['full_name'])
    origin = collection.find_one({"name": h['full_name']})['origin']
    heroList.update_one(h, {"$set": {"origin": origin}})

    # print(hero['name'])
    # collection.update_one((hero), {"$set": {"story_relations" : []}})
    # collection.update_one((hero), {"$set": {"archetype_relations" : []}})
    # collection.update_one((hero), {"$set": {"meme_relations" : []}})
    
    # a = []
    # b = []
    # c = []
    # try:
    #     for passive in hero['passives']:
    #         if aSkills.find_one({"name": passive}):
    #             a.append(passive)
    #         elif bSkills.find_one({"name": passive}): 
    #             b.append(passive)
    #         elif cSkills.find_one({"name": passive}): 
    #             c.append(passive)
    #         else:
    #             print("failed on  " + hero['name'] + " with " + passive)
    # except: 
    #     print("skipped " + hero['name'])
    
    # collection.update_one(hero, {"$set": {"a": a, "b": b,"c":c,}})
    # collection.update_one(hero, {"$unset": {"passives": ""}})
    # tempHero = [hero["name"], a, b, c]
    # tempHeroes.append(tempHero)

# heroes = pd.DataFrame(skills, columns=['name', 'title', "move_type", "weapon_type", "hp", "atk", "spd", "def", "res", "superboon", "superbane", "weapons", 
#     "assists", "specials", "passives", "recommended", "hero_type", "single_name", "EVA", "JVA", "Artist", "dragonflowers"])
# heroes = pd.DataFrame(tempHeroes, columns=['name','a','b','c'])

# heroes.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\scripts\\tempHeroes.csv")