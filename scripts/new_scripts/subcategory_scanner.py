from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
import json
import os
from dotenv import load_dotenv

# initialize webdriver
cService = webdriver.ChromeService(executable_path='/usr/bin/chromedriver')
driver = webdriver.Chrome(service = cService)

#constants
filename = "subcategory_list_of_heroes.json"
with open("banners.json", "r") as f:
    banners_list = json.load(f)

sub_list_url = []
category_list = []
hero_list = {}
special_heroes = []

driver.get("https://feheroes.fandom.com/wiki/Category:Heroes")
wait = WebDriverWait(driver, 20)
groups = driver.find_elements(By.CLASS_NAME, "mw-category-group")

for group in groups:
    urls = group.find_elements(By.XPATH, "ul/li/div/div[1]/bdi/a")
    for url in urls:
        if "Story" in url.text or "Units with" in url.text or "Dance" in url.text or "Tempest" in url.text or "Grand" in url.text:
            continue
        sub_list_url.append(url.get_attribute('href'))
        category_list.append(url.text.split(" ")[0])
        hero_list[url.text.split(" ")[0]] = []

for i, url in enumerate(sub_list_url):
    print(url)
    driver.get(url)
    wait = WebDriverWait(driver, 20)
    
    category = category_list[i]
    groups = driver.find_elements(By.CLASS_NAME, "mw-category-group")

    if category == "Special":
        more = True
        while more:
            for group in groups:
                heroes = group.find_elements(By.XPATH, "ul/li/a")
                for hero in heroes:
                    if "Units with" in hero.text:
                        continue
                    hero_page = hero.get_attribute('href') + "/Misc"
                    special_heroes.append(hero_page)
            try:
                next_page = driver.find_elements(By.XPATH, '//*[@id="mw-pages"]/a[text()="next page"]')[0]
                driver.get(next_page.get_attribute('href'))
                wait = WebDriverWait(driver, 20)
                groups = driver.find_elements(By.CLASS_NAME, "mw-category-group")
            except Exception as e:
                print(e)
                more = False
                
        for hero in special_heroes:
            subcategory = "Uncategorized"
            print(hero)
            driver.get(hero)
            wait = WebDriverWait(driver, 20)
            
            summoning_event = driver.find_element(By.XPATH, '//span[@id="Summoning_event"]/../following-sibling::*[1]/li[1]').text
            if "This Hero has not" in summoning_event:
                try:
                    hero_list[subcategory].append(hero.split("wiki/")[1].split("/")[0].replace("_", " "))
                except Exception as e:
                    hero_list[subcategory] = [hero.split("wiki/")[1].split("/")[0].replace("_", " ")]
            else:
                summoning_event = summoning_event.split("] ")[1].lower()
                for banner_type, banner_names in banners_list.items():
                    if any(summoning_event in banner for banner in banner_names):
                        subcategory = banner_type
                        break
                try:
                    hero_list[subcategory].append(hero.split("wiki/")[1].split("/")[0].replace("_", " "))
                except Exception as e:
                    hero_list[subcategory] = [hero.split("wiki/")[1].split("/")[0].replace("_", " ")]

    else:
        for group in groups:
            heroes = group.find_elements(By.XPATH, "ul/li")
            for hero in heroes:
                if "Units with" in hero.text:
                    continue
                hero_name = hero.text
                hero_list[category].append(hero_name)



with open(filename, 'w') as file:
    json.dump(hero_list, file, indent=4) # indent for pretty formatting

driver.quit()