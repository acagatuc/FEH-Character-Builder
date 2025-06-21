from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import pandas as pd
from pymongo import MongoClient
import requests # request img from web
import shutil # save img locally

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills

a = db['A_Slot']
b = db['B_Slot']
c = db['C_Slot']
seals=[]
unvisited = []

driver.get("https://feheroes.fandom.com/wiki/Sacred_Seals")
driver.implicitly_wait(1)

seal_list = driver.find_elements(By.XPATH, "//td[@class='field_Name']")

for element in seal_list:
    print(element.text)
    tempArray = [element.text]
    if "Squad Ace" in element.text:
        pass
    elif "Initiate Seal" in element.text: 
        pass
    elif a.find_one({"name": element.text}):
        tempSkill = a.find_one({"name": element.text})
        tempArray.append(tempSkill['visibleStats'])
        tempArray.append(tempSkill['maxSkill'])
        tempArray.append(tempSkill['movementRestrictions'])
        tempArray.append(tempSkill['weaponRestrictions'])
        seals.append(tempArray)
    elif b.find_one({"name": element.text}):
        tempSkill = b.find_one({"name": element.text})
        tempArray.append(0)
        tempArray.append(tempSkill['maxSkill'])
        tempArray.append(tempSkill['movementRestrictions'])
        tempArray.append(tempSkill['weaponRestrictions'])
        seals.append(tempArray)
    elif c.find_one({"name": element.text}):
        tempSkill = c.find_one({"name": element.text})
        tempArray.append(0)
        tempArray.append(tempSkill['maxSkill'])
        tempArray.append(tempSkill['movementRestrictions'])
        tempArray.append(tempSkill['weaponRestrictions'])
        seals.append(tempArray)
    else: 
        unvisited.append(element.text)

for element in unvisited: 
        print(element)
        driver.get("https://feheroes.fandom.com/wiki/Sacred_Seals")
        driver.implicitly_wait(1)
        link = driver.find_element(By.LINK_TEXT, element)
        link.click()
        driver.implicitly_wait(1)

        tempArray = [element]
        tempArray.append("fill in")
        try: 
            restrictions = driver.find_element(By.XPATH, "//tbody/tr/td[contains(text(), 'This skill can only be equipped by its original unit.')]")
            unique = "Yes"
            move_restrictions = ""
            weapon_restrictions = ""
        except: 
            unique = "No"
            move_restrictions = "armor infantry cavalry flying"	
            weapon_restrictions = "red sword blue lance green axe red tome blue tome green tome gray staff gray tome red dragon blue dragon green dragon gray dragon red beast blue beast green beast gray beast red dagger blue dagger green dagger gray dagger red bow blue bow green bow gray bow"
            try: 
                restrictions = driver.find_element(By.XPATH, "//tbody/tr/td/b[contains(text(), 'No restrictions.')]")
            except:
                restrictions = driver.find_elements(By.XPATH, "//tbody/tr/td[contains(text(), 'Cannot use:')]/a")
                for i in restrictions:
                    res = i.get_attribute("title").lower()
                    
                    # check for dragon weapons
                    if "breath" in res: 
                        res = res.replace("breath", "dragon")

                    #weapon restrictions
                    if res == "sword":
                        weapon_restrictions = weapon_restrictions.replace("red sword", "")
                    elif res == "lance":
                        weapon_restrictions = weapon_restrictions.replace("blue lance", "")
                    elif res == "axe":
                        weapon_restrictions = weapon_restrictions.replace("green axe", "")
                    elif "colorless" in res: 
                        res = res.replace("colorless", "gray")
                        weapon_restrictions = weapon_restrictions.replace(res, "")
                    elif res == "staff":
                        weapon_restrictions = weapon_restrictions.replace("gray staff", "")
                    else:
                        weapon_restrictions = weapon_restrictions.replace(res,"")
                    
                    # movement restrictions
                    if res == "armored":
                        move_restrictions = move_restrictions.replace("armor", "")
                    elif res == "infantry" or res == "cavalry" or res == "flying":
                        move_restrictions = move_restrictions.replace(res, "")
                    
                move_restrictions = " ".join(move_restrictions.split())
                weapon_restrictions = " ".join(weapon_restrictions.split())


        skillRarity = "FALSE"
        try: 
            try: 
                maxSkill = table.find_element(By.XPATH, '//table[@class="wikitable default skills-table"]/tbody/tr/td[4]/strong[contains(text(), "' + element + '")]')
            except:
                maxSkill = table.find_element(By.XPATH, '//table[@class="wikitable skills-table"]/tbody/tr/td[4]/strong[contains(text(), "' + element + '")]')

        except: 
            skillRarity = "TRUE"

        tempArray.append(skillRarity)
        tempArray.append(move_restrictions)
        tempArray.append(weapon_restrictions)
        try: 
            img = table.find_element(By.XPATH, '//tbody/tr/td[contains(text(),"' + element + '")]/../td[1]/a').get_attribute("href")
        except: 
            img = ""
        
        if img != "":
            url = img #prompt user for img url
            file_name = "C:/Users/hiwhy/Documents/Personal Projects/scripts/images/" + element.replace("/", "") + ".png" #prompt user for file_name

            res = requests.get(url, stream = True)

            if res.status_code == 200:
                with open(file_name,'wb') as f:
                    shutil.copyfileobj(res.raw, f)
            else:
                print('Image Couldn\'t be retrieved')
        
        seals.append(tempArray)

tempSeals = pd.DataFrame(seals, columns=['name','visible stats','maxSkill', 'move','weapon'])
tempSeals.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\scripts\\seals.csv")

driver.close()