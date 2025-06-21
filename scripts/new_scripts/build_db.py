from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
import json
import os
from dotenv import load_dotenv

def get_stat_numbers(row):
    stats = {}
    keys = ['hp','atk','spd','def','res']
    for i, col in enumerate(row):
        stats[keys[i]] = [int(x) for x in col.text.split("/")]
    return stats

# initialize webdriver
options = Options()
options.add_argument('--headless=new')
cService = webdriver.ChromeService(executable_path='/usr/bin/chromedriver')
driver = webdriver.Chrome(service = cService, options=options)

filename = 'heroes_2.json'

# load in pointers to each character
with open("character_pointers.json", "r") as f:
    pointers_list = json.load(f)
with open("resplendent_list.json", "r") as f:
    resplendents = json.load(f)

heroes_json = []
pointers_list = [{'full_name': 'Abel: The Panther', 'category': '', 'common_name': 'Abel', 'game': 'Shadow Dragon/(New) Mystery'}, {'full_name': 'Azura: Young Songstress', 'category': 'Adrift', 'common_name': 'Adrift Azura', 'game': 'Fates'}, {'full_name': 'Barst: The Hatchet', 'category': '', 'common_name': 'Barst', 'game': 'Shadow Dragon/(New) Mystery'}, {'full_name': 'Bartre: Earsome Warrior', 'category': 'Spring', 'common_name': 'Spring Bartre', 'game': 'Binding Blade'}, {'full_name': 'Leo: Shrouded Heart', 'category': 'Valentines', 'common_name': 'Valentines Leo', 'game': 'Fates'}, {'full_name': 'Lyon: Esteemed Royals', 'category': 'Duo Valentines', 'common_name': 'Duo Valentines Lyon', 'game': 'Sacred Stones'}]

for i, pointer in enumerate(pointers_list):
    if i%100 == 0:
        print(pointer['full_name'])
    try:
        character_entry = {}

        # navigate to the page to get character info
        driver.get('https://feheroes.fandom.com/wiki/' + pointer['full_name'].replace(" ", "_"))
        wait = WebDriverWait(driver, 20)

        # basic character information
        character_entry["name"] = pointer["full_name"]
        character_entry["category"] = pointer["category"]
        try:
            character_entry["weaponType"] = driver.find_element(By.XPATH, '//span[contains(@title, "Damage reduced by target")]').text
        except:
            character_entry["weaponType"] = ""
            print("no weapon type for " + pointer['full_name'])
        try:
            character_entry["movementType"] = driver.find_element(By.XPATH, '//span[contains(@title, "unit. Can move")]').text
        except:
            character_entry["moveType"] = ""
            print("no move type for " + pointer['full_name'])

        # level 1 stats
        try:
            table = driver.find_elements(By.XPATH, '//span[@id="Level_1_stats"]/../following-sibling::*[1]/tbody/tr')[5:]
            row = table[0].find_elements(By.XPATH, './/td')[1:6]
            character_entry["baseStats1"] = get_stat_numbers(row)
        except:
            character_entry["baseStats1"] = {}
            print("no lvl 1 stats for " + pointer['full_name'])

        # level 40 stats
        try:
            table = driver.find_elements(By.XPATH, '//span[@id="Level_40_stats"]/../following-sibling::*[1]/tbody/tr')[5:]
            row = table[0].find_elements(By.XPATH, './/td')[1:6]
            character_entry["baseStats40"] = get_stat_numbers(row)
        except: 
            character_entry["baseStats40"] = {}
            print("no lvl 40 stats for " + pointer['full_name'])

        # automating skill retrieval
        weapon_details = []
        assist_details = []
        special_details = []
        passive_details = []

        try:
            weapons = driver.find_elements(By.XPATH, '//span[@id="Weapons"]/../following-sibling::*[1]/tbody/tr')[1:]
            if len(weapons) == 0:
                print("No weapons found for "+ pointer['full_name'])
            for weapon in weapons:
                weapon_details.append(weapon.find_element(By.XPATH, './/td[1]/a[1]').text)
        except:
            print("No weapons found for "+ pointer['full_name'])
        character_entry["weapons"] = weapon_details

        try:
            assists = driver.find_elements(By.XPATH, '//span[@id="Assists"]/../following-sibling::*[1]/tbody/tr')[1:]
            for assist in assists:
                assist_details.append(assist.find_element(By.XPATH, './/td[1]/a[1]').text)
        except:
            print("No assists found for "+ pointer['full_name'])
        character_entry["assists"] = assist_details

        try:
            specials = driver.find_elements(By.XPATH, '//span[@id="Specials"]/../following-sibling::*[1]/tbody/tr')[1:]
            for special in specials:
                special_details.append(special.find_element(By.XPATH, './/td[1]/a[1]').text)
        except:
            print("No specials found for "+ pointer['full_name'])
        character_entry["specials"] = special_details

        try:
            passives = driver.find_elements(By.XPATH, '//span[@id="Passives"]/../following-sibling::*[1]/tbody/tr')[1:]
            if len(passives) == 0:
                print("No passives found for "+ pointer['full_name'])
            for passive in passives:
                passive_details.append(passive.find_element(By.XPATH, './/td[2]/a[1]').text)
        except:
            print("No passives found for "+ pointer['full_name'])
        character_entry["passives"] = passive_details

        # checking if a hero has a resplendent variant
        if pointer['full_name'] in resplendents["Resplendent"]:
            character_entry["hasResplendent"] = True
        else:
            character_entry["hasResplendent"] = False

        # navigate to the superboon/superbane page to get character info
        driver.get("https://feheroes.fandom.com/wiki/Superassets_and_Superflaws")
        wait = WebDriverWait(driver, 20)

        superbanes = []
        superboons = []

        try:
            if 'Tharja: \"Normal Girl\"' in pointer['full_name']:
                row = driver.find_elements(By.XPATH, '//a[contains(text(), \'Tharja: \"Normal Girl\"\')]/../following-sibling::*')[3:]
            elif 'Rennac: Rich \"Merchant\"' in pointer['full_name']:
                row = driver.find_elements(By.XPATH, '//a[contains(text(), \'Rennac: Rich \"Merchant\"\')]/../following-sibling::*')[3:]
            else: 
                row = driver.find_elements(By.XPATH, '//a[@title="' + pointer['full_name'] + '"]/../following-sibling::*')[3:]
            stats = ['hp','atk','spd','def','res']
            for i, col in enumerate(row):
                if "Worst" in col.text:
                    superbanes.append(stats[i])
                elif "Best" in col.text:
                    superboons.append(stats[i])
            character_entry['superboons'] = superboons
            character_entry['superbanes'] = superbanes
        except Exception as e:
            print(e)

        heroes_json.append(character_entry)
    except Exception as e:
        print(e)
        print("occured with " + pointer['full_name'])

with open(filename, 'w') as file:
    json.dump(heroes_json, file, indent=4) # indent for pretty formatting

driver.quit()