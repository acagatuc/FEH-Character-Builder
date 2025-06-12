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

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills

collection = db['Heroes']

#initializes python array for weapons 
prefWeapons = []
genericWeapons = []
skills = []
index = 0

def addToArray(index):
    df = pd.read_csv('tempSkills.csv', encoding="latin1")
    maxIndex = len(df)
    while (index < maxIndex):
        name = df['name'][index]
        skillType = df['type'][index]
        print(name + " " + skillType)

        url = ""
        if skillType == "Weapon":
            url = name
        else: 
            temp = name.split(" ")
            for i in temp:
                if not i.isnumeric():
                    url += i + " "
            url.strip()

        driver.get("https://feheroes.fandom.com/wiki/" + url.replace("/","_").replace(" ", "_").replace("+",""))
        driver.implicitly_wait(1)

        if skillType != "Weapon":
            try:
                try:
                    table = driver.find_element(By.XPATH, "//table[@class='wikitable default skills-table']")
                except: 
                    table = driver.find_element(By.XPATH, "//table[@class='wikitable skills-table']")
                try: 
                    img = table.find_element(By.XPATH, '//tbody/tr/td[contains(text(),"' + name + '")]/../td[1]/a').get_attribute("href")
                except: 
                    img = ""
                sp = table.find_element(By.XPATH, '//tbody/tr/td[contains(text(),"' + name + '")]/../td[3]').text
                des = table.find_element(By.XPATH, '//tbody/tr/td[contains(text(),"' + name + '")]/../td[5]').text

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
                    

                hero = []
                if unique == "Yes":
                    if skillType == "A":
                        data = collection.find({'a': name})
                    if skillType == "B":
                        data = collection.find({'b': name})
                    if skillType == "C":
                        data = collection.find({'c': name})
                    for h in data: 
                        print(h['name'])
                        hero.append(str(h['_id']))
                hero = ",".join(hero)

                skillRarity = "FALSE"
                try: 
                    try: 
                        maxSkill = table.find_element(By.XPATH, '//table[@class="wikitable default skills-table"]/tbody/tr/td[4]/strong[contains(text(), "' + name + '")]')
                    except:
                        maxSkill = table.find_element(By.XPATH, '//table[@class="wikitable skills-table"]/tbody/tr/td[4]/strong[contains(text(), "' + name + '")]')

                except: 
                    skillRarity = "TRUE"

                if img != "":
                    url = img #prompt user for img url
                    file_name = "C:/Users/hiwhy/Documents/Personal Projects/scripts/images/" + name.replace("/", "") + ".png" #prompt user for file_name

                    res = requests.get(url, stream = True)

                    if res.status_code == 200:
                        with open(file_name,'wb') as f:
                            shutil.copyfileobj(res.raw, f)
                    else:
                        print('Image Couldn\'t be retrieved')

                tempArray = [name, des, sp, "", unique, img, skillRarity, hero,move_restrictions, weapon_restrictions, skillType]
                skills.append(tempArray)
            except Exception as e:
                print(e)

        else: 
            # pref weapons: name	description	type	might	visibleStats	sp cost	refine	units that can equip
            # generic weapons: name	description	type	might	visibleStats	sp cost	refine	maxskill	rearmed
            try: 
                try: 
                    prefWeapon = driver.find_element(By.XPATH, "//table[@class='wikitable default ibox']/tbody/tr/th[contains(text(), 'Exclusive?')]/../td[contains(text(), 'Yes')]")
                    des = driver.find_element(By.XPATH, "//table[@class='wikitable default ibox']/tbody/tr/th[contains(text(), 'Description')]/../td").text
                    weapon_type = driver.find_element(By.XPATH, "//table[@class='wikitable default ibox']/tbody/tr/th[contains(text(), 'Weapon type')]/../td/a").get_attribute('title')
                    if "Dagger" in weapon_type: 
                        weapon_type = "Daggers"
                    elif "Bow" in weapon_type:
                        weapon_type = "Bows"
                    elif "Breath" in weapon_type: 
                        weapon_type = "Dragon"
                    elif "Beast"in weapon_type:
                        weapon_type = "Beast"
                    elif "Colorless" in weapon_type: 
                        weapon_type = "Gray " + weapon_type.split(" ")[1]
                        
                    might = driver.find_element(By.XPATH, "//table[@class='wikitable default ibox']/tbody/tr/th[contains(text(), 'Might')]/../td").text
                    sp = driver.find_element(By.XPATH, "//table[@class='wikitable default ibox']/tbody/tr/th[contains(text(), 'SP')]/../td").text

                    data = collection.find({'weapons': name})
                    hero = []
                    for h in data: 
                        hero.append(str(h['_id']))
                    hero = ",".join(hero)

                    # check if it has a refine
                    try: 
                        refine = driver.find_element(By.XPATH, "//*[@id='Upgrades']")
                        refine = "TRUE"
                    except: 
                        refine = "FALSE"

                    # find the visible stats
                    visible = [0,0,0,0,0]
                    # if "Grants" in des:
                    #     print("hello")
                    #     tempDes = des.split("Grants")
                    #     tempDes = tempDes[1].split(".")
                    #     print(tempDes[0])
                    #     if "HP" in tempDes:
                    #         tempNumber = tempDes.split("+")[1]
                    #         visible[0] = int(tempNumber)
                    #     if "Atk" in tempDes:
                    #         tempNumber = tempDes.split("+")[1]
                    #         visible[1] = int(tempNumber)
                    #     if "Spd" in tempDes:
                    #         tempNumber = tempDes.split("+")[1]
                    #         visible[2] = int(tempNumber)
                    #     if "Def" in tempDes:
                    #         tempNumber = tempDes.split("+")[1]
                    #         visible[3] = int(tempNumber)
                    #     if "Res" in tempDes:
                    #         tempNumber = tempDes.split("+")[1]
                    #         visible[4] = int(tempNumber)
                    visible = ",".join(map(str, visible))
                    print(visible)

                    #if the weapon is a pref weapon
                    tempArray = [name, des, weapon_type, might, visible, sp, refine, hero]
                    prefWeapons.append(tempArray)
                except Exception as e: 
                    #if the weapon is a generic weapon
                    des = driver.find_element(By.XPATH, "//table[@class='wikitable default ibox']/tbody/tr/th[contains(text(), 'Description')]/../td").text
                    weapon_type = driver.find_element(By.XPATH, "//table[@class='wikitable default ibox']/tbody/tr/th[contains(text(), 'Weapon type')]/../td/a").get_attribute('title')
                    if "Dagger" in weapon_type: 
                        weapon_type = "Daggers"
                    elif "bow" in weapon_type:
                        weapon_type = "Bows"
                    elif "Breath" in weapon_type: 
                        weapon_type = "Dragon"
                    elif "Beast"in weapon_type:
                        weapon_type = "Beast"
                    elif "Colorless" in weapon_type: 
                        weapon_type = "Gray " + weapon_type.split(" ")[1]
                        
                    might = driver.find_element(By.XPATH, "//table[@class='wikitable default ibox']/tbody/tr/th[contains(text(), 'Might')]/../td").text
                    sp = driver.find_element(By.XPATH, "//table[@class='wikitable default ibox']/tbody/tr/th[contains(text(), 'SP')]/../td").text
                    try: 
                        refine = driver.find_element(By.XPATH, "//*[@id='Upgrades']")
                        refine = "TRUE"
                    except: 
                        refine = "FALSE"

                    try: 
                        rearmed = driver.find_element(By.XPATH, "//table[@class='wikitable default ibox']/tbody/tr/th[contains(text(), 'Arcane?')]")
                        rearmed = "TRUE"
                    except: 
                        rearmed = "FALSE"

                    try: 
                        maxSkill = driver.find_element(By.XPATH, '//table[@class="wikitable striped sortable jquery-tablesorter"]/tbody/tr/td/strong[contains(text(), "' + name + '")]/../img')
                        maxSkill = maxSkill.get_attribute("data-image-name")
                        if "Icon Rarity 5" in maxSkill:
                            maxSkill = "TRUE"
                        else: 
                            maxSkill = "FALSE"
                    except Exception as e:
                        print(e) 
                        maxSkill = "FALSE"

                    visible = [0,0,0,0,0]
                    visible = ",".join(map(str, visible))

                    tempArray = [name, des, weapon_type, might, visible, sp, refine, maxSkill, rearmed]
                    genericWeapons.append(tempArray)
                    
            except Exception as e:
                print(e) 

        index += 1


#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)


try:
    addToArray(index)
except TimeoutException:
    print("timed out on index " + str(index))

# saves the a skill csv file
wep = pd.DataFrame(prefWeapons, columns=['name', 'description', 'type', 'might', 'visibleStats', 'sp cost', 'refine', 'unique'])
wep.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\scripts\\newPrefWeapons.csv")

wep = pd.DataFrame(genericWeapons, columns=['name', 'description', 'type', 'might', 'visibleStats', 'sp cost', 'refine', 'maxskill', 'rearmed'])
wep.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\scripts\\newGenericWeapons.csv")

ski = pd.DataFrame(skills, columns=['name', 'description', 'sp', 'visible stats', 'unique', 'img', 'max skill','hero','move','weapon','slot'])
ski.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\scripts\\newSkills.csv")

driver.close()