from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from pymongo import MongoClient
import pandas as pd

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills

collection = db['Heroes']

data = collection.find()

driver.get("https://feheroes.fandom.com/wiki/List_of_Heroes")
driver.implicitly_wait(1)

for hero in data: 
    try:
        name = hero['single_name'] + ": " + hero['title']
        original_game = []
        print(name)
        table_entry = driver.find_elements(By.XPATH, '//*[contains(text(), "' + name + '")]/../../td[4]/img')
        for entry in table_entry: 
            original_game.append(entry.get_attribute("alt"))
    except Exception as e: 
        print(hero['single_name'])
        print(e)
        
    collection.update_one(hero, {"$set": {"origin": original_game}})