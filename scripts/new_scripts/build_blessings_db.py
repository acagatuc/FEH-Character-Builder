from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
import json
import os
from dotenv import load_dotenv

# initialize webdriver
options = Options()
options.add_argument('--headless=new')
cService = webdriver.ChromeService(executable_path='/usr/bin/chromedriver')
driver = webdriver.Chrome(service = cService, options=options)

# navigate to the page to get character info
driver.get("https://feheroes.fandom.com/wiki/Confer_Blessing")
wait = WebDriverWait(driver, 20)

blessings = []
filename = 'blessings.json'

# get list of heroes that are pairups vs non pairups (will have to do this with mythic heroes too)
pairup_table = driver.find_elements(By.XPATH, '//*[@id="Bonuses"]/../following-sibling::*[1]/div/table/tbody[1]/tr')
print(pairup_table[0].tag_name)
pairup_heroes = []
try:
    for row in pairup_table:
        heroes = row.find_elements(By.XPATH, './td/span/a')
        for hero in heroes:
            pairup_heroes.append(hero.get_attribute("title"))
except Exception as e: 
    print(e)

legendaryTable = driver.find_elements(By.XPATH, '//*[@id="Ally_Boost_Table"]/../following-sibling::*[1]/div/table/tbody[1]/tr')
print(len(legendaryTable))

for i, row in enumerate(legendaryTable):
    new_blessing = {}
    details = row.find_elements(By.XPATH, './td')
    try:
        new_blessing['hero_name'] = details[1].text
        new_blessing['blessing'] = details[5].text
        new_blessing['boost'] = [int(stat.get_attribute("data-sort-value")) for stat in details[6:11]]
        if new_blessing['hero_name'] in pairup_heroes:
            if new_blessing['boost'] == [3,0,0,0,0]:
                new_blessing['bonus'] = 'pairup'
            else:
                
                new_blessing['bonus'] = 'pairup stats'
        else: 
            new_blessing['bonus'] = ''
        blessings.append(new_blessing)
    except Exception as e:
        print(e)
        print(i)


# mythic heroes 
special_slot_table = driver.find_elements(By.XPATH, '//*[@id="Special_Slot"]/../following-sibling::*[1]/tbody[1]/tr')
print(special_slot_table[0].tag_name)
special_slot_heroes = []
try:
    for row in special_slot_table:
        heroes = row.find_elements(By.XPATH, './td/span/a')
        for hero in heroes:
            special_slot_heroes.append(hero.get_attribute("title"))
except Exception as e: 
    print(e)

mythicTable = driver.find_elements(By.XPATH, '//*[@id="Boost_Table"]/../following-sibling::*[1]/div/table/tbody[1]/tr')
print(len(mythicTable))

for i, row in enumerate(mythicTable):
    new_blessing = {}
    details = row.find_elements(By.XPATH, './td')
    try:
        new_blessing['hero_name'] = details[1].text
        new_blessing['blessing'] = details[5].text
        new_blessing['boost'] = [int(stat.get_attribute("data-sort-value")) for stat in details[6:11]]
        if new_blessing['hero_name'] in special_slot_heroes:
            new_blessing['bonus']= 'special slot'
        else: 
            if "Rune" in new_blessing['hero_name'] or "Elm" in new_blessing['hero_name'] or "Athos" in new_blessing['hero_name']:
                new_blessing['bonus']= 'reinforcement slot'
            new_blessing['bonus'] = ''
        blessings.append(new_blessing)
    except Exception as e:
        print(e)
        print(i)




with open(filename, 'w') as file:
    json.dump(blessings, file, indent=4) # indent for pretty formatting

driver.quit()