from pymongo import MongoClient
import pandas as pd

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills

collection = db['Heroes']

data = pd.DataFrame(list(collection.find()))
data.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\scripts\\heroes.csv")

# heroList = collection.find({})

# heroes = []
# index = 0

# for hero in heroList:
#     # name, title, move_type, weapon_type, hp, atk, spd, def, res, superboon, superbane, weapons, assists, specials, passives, recommended
#     # hero_type, single_name, EVA, JVA, Artist, dragonflowers
#     name = hero['name']
#     title = hero['title']
#     move_type = hero['move']

#     tempArray = [name, title, move_type, weapon_type, hp, atk, spd, deff, res, superboon, superbane, weapons, assists, specials, passives, recommended, 
#     hero_type, single_name, EVA, JVA, Artist, dragonflowers]
#     heroes.append(tempArray)
#     index += 1

#     if index == 10:
#         break

# heroes = pd.DataFrame(skills, columns=['name', 'title', "move_type", "weapon_type", "hp", "atk", "spd", "def", "res", "superboon", "superbane", "weapons", 
#     "assists", "specials", "passives", "recommended", "hero_type", "single_name", "EVA", "JVA", "Artist", "dragonflowers"])
# ski.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\scripts\\heroes.csv")