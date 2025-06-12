from pymongo import MongoClient
import pandas as pd

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills
collection = db['Heroes']
prefWeapons = db['PrefWeapons']
genericWeapons = db['GenericWeapons']
assists = db['Assist']
specials = db['Specials']
a = db["A_Slot"]
b = db["B_Slot"]
c = db["C_Slot"]

data = collection.find()

for hero in data:
    try: 
        for weapon in hero['weapons']:
            if not prefWeapons.find_one({"name": weapon}) and not genericWeapons.find_one({"name": weapon}):
                print(weapon + " weapon " + hero['name'])
        for assist in hero['assists']:
            if not assists.find_one({"name": assist}) and assist != "":
                print(assist + " assist " + hero['name'])
        for special in hero['specials']:
            if not specials.find_one({"name": special}) and special != "":
                print(special + " special " + hero['name'])
        for aSkill in hero['a']: 
            if not a.find_one({"name": aSkill}) and aSkill != "":
                print(aSkill + " a " + hero['name'])
        for bSkill in hero['b']: 
            if not b.find_one({"name": bSkill}) and bSkill != "":
                print(bSkill + " b " + hero['name'])
        for cSkill in hero['c']: 
            if not c.find_one({"name": cSkill}) and cSkill != "":
                print(cSkill + " c " + hero['name'])

    except Exception as e: 
        print (e)
        print (hero['name'])