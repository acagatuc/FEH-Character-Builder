from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import ElementNotInteractableException
import pandas as pd
import requests # request img from web
import shutil # save img locally

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

#initializes python array for skills 
heroArray = []
tempArray = []

#initializes index counter
index = 0

#loads csv containing hero names and titles
df = pd.read_csv('tempHeroes.csv', encoding='latin1')

while index < len(df):
    fullname = df['full name'][index]
    name = df['name'][index]
    title = df['title'][index]
    hero_type = df['hero type'][index]

    # hero stats
    try:
        hp = ""
        atk = ""
        spd = ""
        deff = ""
        res = ""

        url = 'https://feheroes.fandom.com/wiki/' + name + ':_' + title

        try:
            driver.get(url)
            driver.implicitly_wait(2)
            
            hpRow = driver.find_elements(By.XPATH, '//tbody/tr[6]/td[2]')
            atkRow = driver.find_elements(By.XPATH, '//tbody/tr[6]/td[3]')
            spdRow = driver.find_elements(By.XPATH, '//tbody/tr[6]/td[4]')
            defRow = driver.find_elements(By.XPATH, '//tbody/tr[6]/td[5]')
            resRow = driver.find_elements(By.XPATH, '//tbody/tr[6]/td[6]')

            hp = hpRow[0].text.replace("/",",") + "," + hpRow[1].text.replace("/",",")
            atk = atkRow[0].text.replace("/",",") + "," + atkRow[1].text.replace("/",",")
            spd = spdRow[0].text.replace("/",",") + "," + spdRow[1].text.replace("/",",")
            deff = defRow[0].text.replace("/",",") + "," + defRow[1].text.replace("/",",")
            res = resRow[0].text.replace("/",",") + "," + resRow[1].text.replace("/",",")

        except NoSuchElementException as e:
            print("unable to get " + name + ": " + title + " 1 40 stats")
        except IndexError:
            print("index error on " + name)

    except NoSuchElementException:
        try:
            print("unable to record " + title + " stats")
        except UnicodeEncodeError:
            print("unicode error")
    except IndexError:
            print("index error on " + name)

    # super boons and banes
    try:
        superboons = []
        superbanes = []

        tempHP = [int(numeric_string) for numeric_string in hp.split(",")]
        tempATK = [int(numeric_string) for numeric_string in atk.split(",")]
        tempSPD = [int(numeric_string) for numeric_string in spd.split(",")]
        tempDEF = [int(numeric_string) for numeric_string in deff.split(",")]
        tempRES = [int(numeric_string) for numeric_string in res.split(",")]

        if tempHP[4] - tempHP[3] == 4:
            superbanes.append("hp")
        if tempHP[5] - tempHP[4] == 4:
            superboons.append("hp")

        if tempATK[4] - tempATK[3] == 4:
            superbanes.append("atk")
        if tempATK[5] - tempATK[4] == 4:
            superboons.append("atk")

        if tempSPD[4] - tempSPD[3] == 4:
            superbanes.append("spd")
        if tempSPD[5] - tempHP[4] == 4:
            superboons.append("spd")

        if tempDEF[4] - tempDEF[3] == 4:
            superbanes.append("def")
        if tempDEF[5] - tempDEF[4] == 4:
            superboons.append("def")

        if tempRES[4] - tempRES[3] == 4:
            superbanes.append("res")
        if tempRES[5] - tempRES[4] == 4:
            superboons.append("res")

        if len(superboons) > 0:
            superboons = ",".join(superboons)
        else:
            superboons = ""

        if len(superbanes) > 0:
            superbanes = ",".join(superbanes)
        else: 
            superbanes = ""

    except NoSuchElementException:
        try:
            print("unable to record " + title + " boons and banes")
        except UnicodeEncodeError:
            print("unicode error")

    # hero move and weapon
    move_type = driver.find_element(By.XPATH, ("//*[contains(text(), 'Move Type')]/../td/span/a[2]/span")).text.lower()
    if move_type == "armored":
        move_type = "armor"

    weapon_type = driver.find_element(By.XPATH, ("//*[contains(text(), 'Weapon Type')]/../td/span/a/span")).text

    if weapon_type == "Sword":
        weapon_type = "Red Sword"
    elif weapon_type == "Lance":
        weapon_type = "Blue Lance"
    elif weapon_type == "Axe":
        weapon_type = "Green Axe"
    elif "Colorless" in weapon_type: 
        weapon_type = weapon_type.replace("Colorless", "Gray")

    # hero skills 
    weapons = []
    assists = []
    specials = []
    a=[]
    b=[]
    c=[]
    try:
        # WEAPONS LIST
        tables = driver.find_elements(By.XPATH, "//table[@class='wikitable default unsortable skills-table']")
        driver.implicitly_wait(2)
        try:
            weaponTable = tables[0].find_elements(By.XPATH, "./tbody/tr")
            i = 2
            while i <= len(weaponTable):
                weapons.append(tables[0].find_element(By.XPATH, "./tbody/tr["+str(i)+"]/td[1]").text)
                i += 1

            # ASSIST 
            if tables[1].find_element(By.XPATH, "./tbody/tr[1]/th[2]").text == "Range":
                assistTable = tables[1].find_elements(By.XPATH, "./tbody/tr")
                i = 2
                while i <= len(assistTable):
                    assists.append(tables[1].find_element(By.XPATH, "./tbody/tr["+str(i)+"]/td[1]").text.encode("utf-8"))
                    i += 1
            else:
                specialsTable = tables[1].find_elements(By.XPATH, "./tbody/tr")
                i = 2
                while i <= len(specialsTable):
                    specials.append(tables[1].find_element(By.XPATH, "./tbody/tr["+str(i)+"]/td[1]").text.encode("utf-8"))
                    i += 1

            # SPECIAL
            if len(tables) == 3:
                if tables[2].find_element(By.XPATH, "./tbody/tr[1]/th[2]").text == "Cooldown":
                    specialsTable = tables[2].find_elements(By.XPATH, "./tbody/tr")
                    i = 2
                    while i <= len(specialsTable):
                        specials.append(tables[2].find_element(By.XPATH, "./tbody/tr["+str(i)+"]/td[1]").text.encode("utf-8"))
                        i += 1


            # SKILLS
            skillsTable = driver.find_element(By.XPATH, "//table[@class='wikitable default skills-table']")
            driver.implicitly_wait(1)
            s = skillsTable.find_elements(By.XPATH, "./tbody/tr")
            skillType = skillsTable.find_element(By.XPATH, "./tbody/tr[2]/th").text
            i = 2
            while i <= len(s):
                try:
                    skillType = skillsTable.find_element(By.XPATH, "./tbody/tr["+str(i)+"]/th").text
                except:
                    skillType = skillType
                if skillType == "A":
                    a.append(skillsTable.find_element(By.XPATH, "./tbody/tr["+str(i)+"]/td[2]").text.encode("utf-8"))
                if skillType == "B":
                    b.append(skillsTable.find_element(By.XPATH, "./tbody/tr["+str(i)+"]/td[2]").text.encode("utf-8"))
                if skillType == "C":
                    c.append(skillsTable.find_element(By.XPATH, "./tbody/tr["+str(i)+"]/td[2]").text.encode("utf-8"))
                i += 1
            
            try:
                weapons = b",".join(weapons).decode("utf-8")
            except: 
                weapons = ",".join(weapons)
            
            try:
                assists = b",".join(assists).decode("utf-8")
            except: 
                assists = ",".join(assists)
            try:
                specials = b",".join(specials).decode("utf-8")
            except: 
                specials = ",".join(specials)
            try:
                a = b",".join(a).decode("utf-8")
            except: 
                a = ",".join(a)
            try:
                b = b",".join(b).decode("utf-8")
            except: 
                b = ",".join(b)
            try:
                c = b",".join(c).decode("utf-8")
            except: 
                c = ",".join(c)
        except IndexError:
            print("could not get skills for " + name)
        except Exception as e:
            print("hit exception for weapons/skills")
            print(e)
                
    except NoSuchElementException:
                print("unable to get " + name + ": " + title + " skills")
    except UnicodeEncodeError:
                print("unicode error")

    # va and artist 
    try:
        VAE = driver.find_element(By.XPATH, "//sup[contains(text(), 'EN')]/../../td").text
    except: 
        VAE = ""
    
    try: 
        VAJ = driver.find_element(By.XPATH, "//sup[contains(text(), 'JP')]/../../td").text
    except:
        VAJ = ""

    try: 
        art = []
        artList = driver.find_elements(By.XPATH, "//*[contains(text(), 'Art by: ')]/a")
        for artist in artList: 
            art.append(artist.text)

        art = ",".join(art)
    except:
        art = ""

    # get description
    try: 
        description = driver.find_element(By.XPATH, ("//*[contains(text(), 'Description')]/../td")).text
    except Exception as e: 
        print(e)
    # get origin
    try: 
        original_game = driver.find_element(By.XPATH, ("//span[contains(text(), 'Entry')]/../../td/i/a")).text
    except Exception as e: 
        original_game = []
        print(e)
    print(original_game)
    
    # save the image locally
    try:
        face_img = driver.find_element(By.XPATH, "//img[@alt='" + name + " " + title.replace("'", "") + " Face.webp']/..")

        url = face_img.get_attribute("href") #prompt user for img url
        print(url)
        file_name = "C:/Users/hiwhy/Documents/Personal Projects/scripts/images/" + fullname + ".png" #prompt user for file_name

        response = requests.get(url, stream = True)

        if response.status_code == 200:
            with open(file_name,'wb') as f:
                shutil.copyfileobj(response.raw, f)
        else:
            print('Image Couldn\'t be retrieved')
    except: 
        print("no image available")


    # get meet the heroes url if possible
    try: 
        driver.get("https://guide.fire-emblem-heroes.com/en-US/category/character/")
        driver.implicitly_wait(2)

        # hides the fake loader so I can interact with the page
        element = driver.find_element(By.XPATH, "//div[@class='fakeloader']")
        driver.execute_script("arguments[0].style.visibility='hidden'", element)
        driver.implicitly_wait(2)

        mth = driver.find_element(By.XPATH, "//div[@class='heroes_ttl']/span[contains(text(), '"+title.replace("'", "’") +"')]/../..").get_attribute("href")

    except Exception as e: 
        mth = ""
        print("no meet the hero")

    print(mth)
    tempArray = [fullname, title, move_type,weapon_type,hp, atk, spd, deff, res, superboons, superbanes, weapons, assists, specials, a,b,c,"", hero_type, name, VAE, VAJ, art, 5, original_game, mth, description]
    heroArray.append(tempArray)

    index += 1

# saves the a skill csv file
csv = pd.DataFrame(heroArray, columns=['name', 'title', 'move type', 'weapon type', 'hp', 'atk', 'spd', 'def', 'res', 'superboon', 'superbane', 'weapons', 'assists', 'specials', 'a','b','c', 'recommended', 'hero type', 'single name', 'VAE', 'VAJ', 'Artist', 'Dragonflowers', 'origin','MeetTheHeroUrl', 'description'])
csv.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\scripts\\newHeroes.csv")

driver.close()