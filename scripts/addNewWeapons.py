from pymongo import MongoClient
import pandas as pd

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills

prefs = db['PrefWeapons']
generic = db['GenericWeapons']
refines = db['Refines']

try:
    df = pd.read_csv('newPrefWeapons.csv', encoding="latin-1")
    index = 0
    length = len(df)
    print("Pref Weapons")

    # read pref weapon list first
    while index < length:
        name = df['name'][index]
        des = df['description'][index]
        weapon_type = df['type'][index]
        might = int(df['might'][index])
        visibleStats = list(map(int, df['visibleStats'][index].split(",")))
        sp = str(df['sp cost'][index])
        refine = str(df['refine'][index]).upper()
        units = df['unique'][index]

        weapon_id = prefs.insert_one({"name": name, "description": des, "type": weapon_type, "might": might, "visibleStats": visibleStats, "sp cost": sp, 
            "refine": refine, "heroesList": units})
        print(name + " with " + str(weapon_id.inserted_id))
        index += 1
except Exception as e:
    print(e)

try:
    df = pd.read_csv('newGenericWeapons.csv', encoding="utf_8_sig")
    index = 0
    length = len(df)
    print("Generic Weapons")

    while index < length:
        name = df['name'][index]
        des = df['description'][index]
        weapon_type = df['type'][index]
        might = int(df['might'][index])
        visibleStats = list(map(int, df['visibleStats'][index].split(",")))
        sp = str(df['sp cost'][index])
        refine = str(df['refine'][index]).upper()
        maxSkill = str(df['maxskill'][index]).upper()
        rearmed = str(df['rearmed'][index]).upper()

        generic.insert_one({"name": name, "description": des, "type": weapon_type, "might": might, "visibleStats": visibleStats, "sp cost": sp, 
            "refine": refine, "maxSkill": maxSkill, "rearmed": rearmed})

        if (refine == "TRUE"):
            uniqueRefine = [df['unique'][index]]
            genericRefine = list(map(int, df['generic'][index].split(",")))
            generic.update_one({"name": name}, {"$set": {"uniqueRefine": uniqueRefine, "genericRefine": genericRefine }})
        print(name)

        index += 1
except Exception as e:
    print(e)

try:
    df = pd.read_csv('newRefines.csv', encoding="latin-1")
    index = 0
    length = len(df)
    print("Refines")

    # read pref weapon list first
    while index < length:
        name = df['name'][index]
        des = df['description'][index]
        weapon_type = df['type'][index]
        try:
            unique = list(map(int, df['unique'][index].split(",")))
            prefs.update_one({"name": name}, {"$set": {"refine": "TRUE"}})
        except: 
            unique = 0
        generic = list(map(int, df['generic'][index].split(",")))

        refines.insert_one({"name": name, "description": des, "type": weapon_type, "uniqueRefine": unique, "genericRefine": generic})
        print(name)

        index += 1
except Exception as e:
    print(e)