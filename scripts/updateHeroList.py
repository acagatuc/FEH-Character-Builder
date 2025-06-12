from pymongo import MongoClient
import pandas as pd

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills

collection = db['Hero List']

df = pd.read_csv('hero list.csv', encoding="utf_8_sig")
index = 0
length = len(df)

while index < length:
    c_id = df['character id'][index]
    full_name = df['full name'][index]
    name_title = df['name and title'][index]
    abbrev = df['abbreviated'][index]
    backpack = df['backpack'][index]

    collection.insert_one({"character_id": c_id, "full_name": full_name, "name_title": name_title, "abbreviated": abbrev, "backpack": backpack})
    print(full_name)
    index += 1