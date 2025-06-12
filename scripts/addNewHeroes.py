from pymongo import MongoClient
import pandas as pd

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills

collection = db['Heroes']
prefcollection = db['PrefWeapons']
genericcollection = db['GenericWeapons']
assistcollection = db['Assist']
specialcollection = db['Specials']
acollection = db['A_Slot']
bcollection = db['B_Slot']
ccollection = db['C_Slot']
tempHeroList = []
newSkills = []

df = pd.read_csv('newHeroes.csv', encoding="utf_8_sig")
index = 0
length = len(df)

df['assists'] = df['assists'].fillna("")
df['specials'] = df['specials'].fillna("")
df['a'] = df['a'].fillna("")
df['b'] = df['b'].fillna("")
df['c'] = df['c'].fillna("")
df['superboon'] = df['superboon'].fillna("")
df['superbane'] = df['superbane'].fillna("")

while index < length:
    name = df['name'][index]
    title = df['title'][index]
    move_type = df['move type'][index]
    weapon_type = df['weapon type'][index]
    hp = list(map(int, df['hp'][index].split(",")))
    atk = list(map(int, df['atk'][index].split(",")))
    spd = list(map(int, df['spd'][index].split(",")))
    deff = list(map(int, df['def'][index].split(",")))
    res = list(map(int, df['res'][index].split(",")))
    superboon = list(df['superboon'][index].split(","))
    superbane = list(df['superbane'][index].split(","))
    weapons = list(df['weapons'][index].split(","))
    assists = list(df['assists'][index].split(","))
    specials = list(df['specials'][index].split(","))
    a = list(df['a'][index].split(","))
    b = list(df['b'][index].split(","))
    c = list(df['c'][index].split(","))
    recommended = []
    hero_type = df['hero type'][index]
    single_name = df['single name'][index]
    eva = df['VAE'][index]
    jva = df['VAJ'][index]
    art = list(df['Artist'][index].split(","))
    dragonflowers = int(df['Dragonflowers'][index])

    j = 0
    for i in weapons:
        weapons[j] = i.strip()
        if not prefcollection.find_one({"name": weapons[j]}) and not genericcollection.find_one({"name":weapons[j]}) and weapons[j] != "":
            print(weapons[j])
            newSkills.append([weapons[j], "Weapon"])
        j += 1
    j = 0
    for i in assists:
        assists[j] = i.strip()
        if not assistcollection.find_one({"name": assists[j]}) and assists[j] != "":
            newSkills.append([assists[j], "Assist"])
        j += 1
    j = 0
    for i in specials:
        specials[j] = i.strip()
        if not specialcollection.find_one({"name": specials[j]}) and specials[j] != "":
            newSkills.append([specials[j], "Special"])
        j += 1
    j = 0
    for i in a:
        a[j] = i.strip()
        if not acollection.find_one({"name": a[j]}) and a[j] != "":
            newSkills.append([a[j], "A"])
        j += 1
    j = 0
    for i in b:
        b[j] = i.strip()
        if not bcollection.find_one({"name": b[j]}) and b[j] != "":
            newSkills.append([b[j], "B"])
        j += 1
    j = 0
    for i in c:
        c[j] = i.strip()
        if not ccollection.find_one({"name": c[j]}) and c[j] != "":
            newSkills.append([c[j], "C"])
        j += 1

    origin = list(df['origin'][index].split(","))
    MeetTheHeroUrl = df['MeetTheHeroUrl'][index]
    description = df['description'][index]

    hero_id = collection.insert_one({"name": name, "title": title, "move_type": move_type, "weapon_type": weapon_type,
        "hp": hp, "atk": atk, "spd": spd, "def": deff, "res": res, "superboon": superboon, "superbane": superbane, "weapons": weapons, 
        "assists": assists, "specials": specials, "a": a,"b": b, "c": c, "recommended": recommended, "hero_type": hero_type, "single_name": single_name,
        "EVA": eva, "JVA": jva, "artist":art, "dragonflowers": dragonflowers, "origin":origin, "MeetTheHeroUrl": MeetTheHeroUrl, "description": description })

    tempArray = [hero_id.inserted_id, name, single_name + ": " + title, "", ""]
    tempHeroList.append(tempArray)
    print(newSkills)
    print(name)

    index += 1

# saves the a skill csv file
csv = pd.DataFrame(tempHeroList, columns=['character id', 'full name', 'name and title', 'abbreviated', 'backpack'])
csv.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\scripts\\hero list.csv")

csv = pd.DataFrame(newSkills, columns=['name', 'type'])
csv.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\scripts\\tempSkills.csv")