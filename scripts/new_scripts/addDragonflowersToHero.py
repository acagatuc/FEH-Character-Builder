from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
import json
import os
from dotenv import load_dotenv

# importing datetime module
import datetime

#dragonflower count
d1 = datetime.datetime(2019, 2, 7) # infantry = 35
# prior = 30 (unless 35)
d2 = datetime.datetime(2020, 8, 18) 
#25 
d3 = datetime.datetime(2021, 8, 5) 
#20
d4 = datetime.datetime(2022, 8, 9) 
#15
d5 = datetime.datetime(2023, 8, 8) 
#10
d6 = datetime.datetime(2024, 8, 7) 
# anything after is 5

# initialize webdriver
options = Options()
# options.add_argument('--headless=new')
cService = webdriver.ChromeService(executable_path='/usr/bin/chromedriver')
driver = webdriver.Chrome(service = cService, options=options)

# navigate to the page to get character info
driver.get("https://feheroes.fandom.com/wiki/List_of_Heroes")
wait = WebDriverWait(driver, 20)
characters = []

# get the table info and rows of the playable characters table
character_table = driver.find_elements(By.TAG_NAME, "tbody")
rows = character_table[0].find_elements(By.TAG_NAME, "tr")
for i, row in enumerate(rows):
    new_character = {}
    try: 
        #get table details per character
        details = row.find_elements(By.TAG_NAME, "td")
        new_character["full_name"] = details[1].find_element(By.TAG_NAME, "a").text
        move = details[4].get_attribute("data-sort-value") # 1 is infantry, 2 is armored, 3 is cavalry, and 4 is flying
        date = details[7].text
        datetime_object = datetime.datetime.strptime(date, '%Y-%m-%d')
        dragonflowers = 0

        if(datetime_object >= d6):
            dragonflowers = 5
        elif(datetime_object >= d5):
            dragonflowers = 10
        elif(datetime_object >= d4):
            dragonflowers = 15
        elif(datetime_object >= d3):
            dragonflowers = 20
        elif(datetime_object >= d2):
            dragonflowers = 25
        else:
            if move == 1:
                dragonflowers = 35 
            else:
                dragonflowers = 30
        new_character['dfCount'] = dragonflowers
        characters.append(new_character)
    except Exception as e:
        print(e)
        print("skipped row " + str(i))


with open("dragonflowers.json", 'w') as file:
    json.dump(characters, file, indent=4) # indent for pretty formatting

driver.quit()
    