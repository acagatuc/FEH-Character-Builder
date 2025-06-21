from pymongo import MongoClient
import pandas as pd

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills

aSkills = db['A_Slot']
bSkills = db['B_Slot']
cSkills = db['C_Slot']
special = db['Specials']

df = pd.read_csv('newSkills.csv', encoding="latin1")
index = 0
length = len(df)

df['visible stats'] = df['visible stats'].fillna("")

while index < length:
    name = df['name'][index]
    description = df['description'][index]
    sp = str(df['sp'][index])   
    vStats = list(map(int, df['visible stats'][index].split(",")))
    unique = df['unique'][index]
    img = df['img'][index]
    maxSkill = str(df['max skill'][index]).upper()
    heroesList = str(df['hero'][index])
    move = df['move'][index]
    weapon = df['weapon'][index]
    slot = df['slot'][index]

    if heroesList == "nan":
        heroesList = ""

    if slot == "A":
        aSkills.insert_one({"name": name, "description": description, "sp": sp, "visibleStats":vStats, "unique":unique,"img":img,"maxSkill":maxSkill, "heroesList":heroesList,
        "movementRestrictions":move, "weaponRestrictions":weapon})
    elif slot == "B":
        bSkills.insert_one({"name": name, "description": description, "sp": sp, "visibleStats":vStats, "unique":unique,"img":img,"maxSkill":maxSkill, "heroesList":heroesList,
        "movementRestrictions":move, "weaponRestrictions":weapon})
    elif slot == "C":
        cSkills.insert_one({"name": name, "description": description, "sp": sp, "visibleStats":vStats, "unique":unique,"img":img,"maxSkill":maxSkill, "heroesList":heroesList,
        "movementRestrictions":move, "weaponRestrictions":weapon})
    elif slot == "Special":
        special.insert_one({"name": name, "description": description, "sp": sp, "visibleStats":vStats, "unique":unique,"img":img,"maxSkill":maxSkill, "heroesList":heroesList,
        "movementRestrictions":move, "weaponRestrictions":weapon})
    else: 
        print("invalid slot?")
    print(name)

    index += 1