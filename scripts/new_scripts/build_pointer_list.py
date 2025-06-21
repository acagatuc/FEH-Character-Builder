from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
import json
import os
from dotenv import load_dotenv

# load in subcategory info to categorize heroes
with open("subcategory_list_of_heroes.json", "r") as f:
    category_list = json.load(f)

def generate_common_name(name):
    retval = ""
    for category, character_names in category_list.items():
        if any(name in characters for characters in character_names):
            retval += category + " "
    return retval.rstrip()
    
# initialize webdriver
options = Options()
options.add_argument('--headless=new')
cService = webdriver.ChromeService(executable_path='/usr/bin/chromedriver')
driver = webdriver.Chrome(service = cService, options=options)

#constants
filename = "character_pointers.json"
entry_list = [
    "Heroes",
    "Shadow Dragon/(New) Mystery",
    "Echoes",
    "Genealogy of the Holy War",
    "Thracia 776",
    "Binding Blade",
    "Blazing Blade",
    "Sacred Stones",
    "Path of Radiance",
    "Radiant Dawn",
    "Awakening",
    "Fates",
    "Three Houses",
    "Tokyo Mirage Sessions",
    "Engage"
]

heroes_pointers = []

# navigate to the page to get character info
driver.get("https://feheroes.fandom.com/wiki/List_of_Heroes")
wait = WebDriverWait(driver, 20)

# get the table info and rows of the playable characters table
character_table = driver.find_elements(By.TAG_NAME, "tbody")
rows = character_table[0].find_elements(By.TAG_NAME, "tr")

for i, row in enumerate(rows):
    new_character = {}
    try: 
        #get table details per character
        details = row.find_elements(By.TAG_NAME, "td")

        # will have to add db pointers later. rn this is just for names
        new_character["full_name"] = details[1].text
        category = generate_common_name(details[1].text)
        new_character["category"] = category 

        # put a lil stop for gender (male or female or empty)
        gender = ""
        if "Alear" in details[1].text:
            gender = "fillin "
        elif "Robin" in details[1].text:
            gender = "fillin "
        elif "Morgan" in details[1].text:
            gender = "fillin "
        elif "Corrin" in details[1].text:
            gender = "fillin "
        elif "Kana" in details[1].text:
            gender = "fillin "
        elif "Byleth" in details[1].text:
            gender = "fillin "
        elif "Shez" in details[1].text:
            gender = "fillin "
        elif "Grima" in details[1].text:
            gender = "fillin "
        new_character["common_name"] = (category + " " + gender + details[1].text.split(":")[0]).lstrip()
        # new_character["abbrev_name"] = details[1].text.split(":")[0]
        new_character["game"] = entry_list[int(details[2].get_attribute("data-sort-value"))]


        heroes_pointers.append(new_character)
    except Exception as e:
        print(e)
        print("skipped row " + str(i))


with open(filename, 'w') as file:
    json.dump(heroes_pointers, file, indent=4) # indent for pretty formatting

driver.quit()