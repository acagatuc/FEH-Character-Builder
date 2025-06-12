from pymongo import MongoClient
import pandas as pd

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills

collection = db['Heroes']

data = collection.find()

for hero in data: 
    if hero['EVA'] == "":
        print(hero['name'])W