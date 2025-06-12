from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import ElementNotInteractableException
import pandas as pd
from pymongo import MongoClient
from bson.objectid import ObjectId

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills

collection = db['Heroes']
heroList = db['Hero List']

driver.get("https://guide.fire-emblem-heroes.com/en-US/category/character/")
driver.implicitly_wait(2)

# hides the fake loader so I can interact with the page
element = driver.find_element(By.XPATH, "//div[@class='fakeloader']")
driver.execute_script("arguments[0].style.visibility='hidden'", element)
driver.implicitly_wait(2)

select = Select(driver.find_element(By.XPATH, "//div[@class='select_characterarea']/select"))
for option in select.options:
    print(option.get_attribute("value"))
select.select_by_value("all_character")
driver.implicitly_wait(4)

all_characters = driver.find_elements(By.XPATH, "//ul[@class='character_ul flex bet']/li/a")

for hero in all_characters: 
    url = hero.get_attribute("href")
    name_title = driver.find_elements(By.XPATH, "//a[@href='"+url+"']/div[2]/span")
    name_title = name_title[1].text + ": " + name_title[0].text
    print(name_title + " - " + url)
    if "’" in name_title: 
        name_title = name_title.replace("’", "'")
    try:
        temp = heroList.find_one({"name_title" : name_title})
        h = collection.find_one({"_id": ObjectId(temp['character_id'])})
        print(h['name'])
        collection.update_one(h, {"$set":{"MeetTheHeroUrl" : url}})
    except Exception as e: 
        print("failed on " + name_title)
        print(e)