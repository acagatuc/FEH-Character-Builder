from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
# import pandas as pd
from pymongo import MongoClient
import requests # request img from web
import shutil # save img locally
from unidecode import unidecode

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

client = MongoClient('mongodb+srv://mern:mongodb@cluster0.hbirq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.FEH_Skills

heroes = db['Heroes']

data = heroes.find({})

###### HEY YOU NEED TO SAVVE MAIN AND SUB DUO/HARMONIC UNITS;AKDJSF;ALKSJDF;LAKSJDF;LAKSJDF;LAKSDJF;LAKSDJF;LK##################
for hero in data: 
    if hero['hero_type'] == "duo" or  hero['hero_type'] == "harmonic":
        try:
            # navigate to webpage
            driver.get("https://feheroes.fandom.com/wiki/" + hero['single_name'] + ":_" + hero['title'].replace(" ", "_") + "/Misc")
            driver.implicitly_wait(2)

            # get the url of the no weapon chibi (Abel The Panther Mini Unit Idle No Wep.png)
            try: 
                main = driver.find_element(By.XPATH, "//img[@alt='" + unidecode(hero['single_name'].replace("'", "")) + " " + hero['title'].replace("'", "") + " Main Mini Unit Idle No Wep.png']/..")
            except:
                try: 
                    main = driver.find_element(By.XPATH, "//img[@alt='" + unidecode(hero['single_name'].replace("'", "")) + " " + hero['title'].replace("'", "") + " Main Mini Unit Idle.png']/..")
                except:
                    print("failed on " + hero['name'])
                    continue
            
            try: 
                sub = driver.find_element(By.XPATH, "//img[@alt='" + unidecode(hero['single_name'].replace("'", "")) + " " + hero['title'].replace("'", "") + " Sub Mini Unit Idle No Wep.png']/..")
            except:
                try: 
                    sub = driver.find_element(By.XPATH, "//img[@alt='" + unidecode(hero['single_name'].replace("'", "")) + " " + hero['title'].replace("'", "") + " Sub Mini Unit Idle.png']/..")
                except:
                    print("failed on " + hero['name'])
                    continue

            url = main.get_attribute("href") #prompt user for img url
            file_name = "C:/Users/hiwhy/Documents/Personal Projects/scripts/images2/" + hero['name'] + " Main.png" #prompt user for file_name

            res = requests.get(url, stream = True)

            if res.status_code == 200:
                with open(file_name,'wb') as f:
                    shutil.copyfileobj(res.raw, f)
            else:
                print('Image Couldn\'t be retrieved')

            url = sub.get_attribute("href") #prompt user for img url
            file_name = "C:/Users/hiwhy/Documents/Personal Projects/scripts/images2/" + hero['name'] + " Sub.png" #prompt user for file_name

            res = requests.get(url, stream = True)

            if res.status_code == 200:
                with open(file_name,'wb') as f:
                    shutil.copyfileobj(res.raw, f)
            else:
                print('Image Couldn\'t be retrieved')

        except Exception as e: 
            print("failed on " + hero['name'])
    
    elif len(hero['artist']) != 1:
        # navigate to webpage
        driver.get("https://feheroes.fandom.com/wiki/" + hero['single_name'] + ":_" + hero['title'].replace(" ", "_") + "/Misc")
        driver.implicitly_wait(2)

        # get the url of the no weapon chibi (Abel The Panther Mini Unit Idle No Wep.png)
        try: 
            resplendent = driver.find_element(By.XPATH, "//img[@alt='" + unidecode(hero['single_name'].replace("'", "")) + " " + hero['title'].replace("'", "") + " Resplendent Mini Unit Idle No Wep.png']/..")
        except:
            try: 
                resplendent = driver.find_element(By.XPATH, "//img[@alt='" + unidecode(hero['single_name'].replace("'", "")) + " " + hero['title'].replace("'", "") + " Resplendent Mini Unit Idle.png']/..")
            except:
                print("failed on " + hero['name'])
                continue
        
        url = resplendent.get_attribute("href") #prompt user for img url
        file_name = "C:/Users/hiwhy/Documents/Personal Projects/scripts/images2/Resplendent " + hero['name'] + ".png" #prompt user for file_name

        res = requests.get(url, stream = True)

        if res.status_code == 200:
            with open(file_name,'wb') as f:
                shutil.copyfileobj(res.raw, f)
        else:
            print('Image Couldn\'t be retrieved')

















    # elif isinstance(hero['origin'], list):
    #     print(hero['full_name'])

# while index < length:
#     print(index)
#     name = df['name'][index]
#     visibleStats = list(map(int, df['visible stats'][index].split(",")))
#     maxSkill = str(df['maxSkill'][index]).upper()
#     move = df['move'][index]
#     weapon = df['weapon'][index]

#     collection.insert_one({"name": name, 'visibleStats': visibleStats, 'maxSkill': maxSkill, 'movementRestrictions': move, 'weaponRestrictions': weapon})

    # hero = collection.find_one({"name": df['name'][index]})
    # collection.update_one(hero, {"$unset":  {"Artist": ""}})


    # unique = list(map(int, df['unique'][index].split(",")))
    # generic = list(map(int, df['generic'][index].split(",")))

    # prefs.update_one({"name": df['name'][index]}, {"$set": {"uniqueRefine": unique, "genericRefine": generic}})

#     index += 1

# driver.close()



# data = heroes.find({})
# for hero in data:
#     if len(hero["origin"]) != 1:
#         print(hero['name'])

       
       
       
        # print(weapon['name'])
        # refine = r.find_one({"name": weapon['name']})
        # generic.update_one(weapon, {"$set": {"uniqueRefine": refine['uniqueRefine'], "genericRefine": refine['genericRefine']}})

# data = collection.update_many({}, {"$unset": {"Artist": ""}  })


#initialize headless webdriver
# options = Options()
# options.add_argument("--headless")
# driver = webdriver.Firefox(options=options)

# df = pd.read_csv('newRecommendedBuilds.csv', encoding="utf_8_sig")
# index = 0
# length = len(df)

# while index < length:
#     print(df['name'][index])
#     _id = df['hero'][index]
#     name = df['name'][index]
#     des = df['des'][index]
#     w = df['weapon'][index]
#     r= df['refine'][index]
#     assist = df['assist'][index]
#     special = df['special'][index]
#     a = df['a'][index]
#     b = df['b'][index]
#     c = df['c'][index]
#     s = df['s'][index]
#     asset = df['asset'][index]
#     flaw = df['flaw'][index]
#     ascended = df['ascended'][index]

#     hero = collection.insert_one({"character_id": _id, "name": name, "description": des, "weapon": w, 
#     "refine": r, "assist": assist, "special": special, "a":a,"b":b,"c":c, "s": s, "asset":asset, "flaw": flaw, "ascended":ascended})

#     index +=1

    # original_game = []
    # original_game.append(hero['origin'])
    # collection.update_one({"name": df['name'][index]}, {"$set": {"origin": original_game}})



    # url = 'https://feheroes.fandom.com/wiki/' + df['name'][index] + ':_' + df['title'][index] + "/Misc"
    # driver.get(url)
    # driver.implicitly_wait(4)

    # img_url = df['single name'][index] + " " + df['title'][index] + " Mini Unit Idle No Wep.png"
    # img_url = unidecode(img_url)
    # print(img_url)

    # img = driver.find_element(By.XPATH, "//img[@alt='" + img_url + "']/..").get_attribute("href")

    # url = img #prompt user for img url
    # file_name = "C:/Users/hiwhy/Documents/Personal Projects/skill_image/" + df['name'][index] + ".png" #prompt user for file_name

    # res = requests.get(url, stream = True)

    # if res.status_code == 200:
    #     with open(file_name,'wb') as f:
    #         shutil.copyfileobj(res.raw, f)
    # else:
    #     print('Image Couldn\'t be retrieved')
    # index += 1



# for skill in data: 
#     heroes = []
#     # if len(weapon['heroesList']) == 0: 
#     #     print(weapon['name'])

#     if skill['unique'] == "TRUE":
        
#         # cHeroList = skill['heroesList'][1:-1].split(",")
#         try:
#             tempHeroes = collection.find({'assists': skill['name']})
#             for hero in tempHeroes:
#                 heroes.append(str(hero['_id']))
#         except Exception as e: 
#             print(e)
#             print("failed on " + skill['name'])
    
#     c.update_one(skill, {"$set": {"heroesList": heroes}})