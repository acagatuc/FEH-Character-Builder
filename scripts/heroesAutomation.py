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

#initializes python array for skills 
heroArray = []

def addToArray(xpath1, index, maxIndex):
    while index < maxIndex:
        #arrays for super boons and super banes (reset for each character)
        superboons = []
        superbanes = []
        skills = []

        s = driver.find_element(By.XPATH, xpath1)

        #name
        name = s.get_attribute("data-name")

        #stats
        hp = s.get_attribute("data-hp")
        atk = s.get_attribute("data-atk")
        spd = s.get_attribute("data-spd")
        deff = s.get_attribute("data-def")
        res = s.get_attribute("data-res")

        #weapon type
        move = ""

        # move type
        if s.get_attribute("data-cat-1") == "331":
            move = "infantry"
        if s.get_attribute("data-cat-1") == "326":
            move = "armored"
        if s.get_attribute("data-cat-1") == "306":
            move = "cavalry"
        if s.get_attribute("data-cat-1") == "316":
            move = "flying"
        
        weaponType = s.get_attribute("data-element")

        # get title, superboons, and skills
        url = driver.find_element(By.XPATH, '//*[@id="heroes-new-list"]/tbody/tr[' + str(index-1) + ']/td[1]/a').get_attribute("href")
        driver.get(url)
        driver.implicitly_wait(1)

        #title
        title = driver.find_element(By.XPATH, '//*[@id="hero-details-table"]/tbody/tr[1]/th/span[2]').get_attribute("innerHTML")

        try:
            #hp boon/bane check
            if driver.find_element(By.XPATH, '//*[@id="iv-set-table"]/tbody/tr[2]/td[1]/div/div').get_attribute("id") == "taxonomy-term-871":
                superbanes.append("hp")
            if driver.find_element(By.XPATH, '//*[@id="iv-set-table"]/tbody/tr[2]/td[1]/div/div').get_attribute("id") == "taxonomy-term-861":
                superboons.append("hp")

            #atk boon/bane check
            if driver.find_element(By.XPATH, '//*[@id="iv-set-table"]/tbody/tr[2]/td[2]/div/div').get_attribute("id") == "taxonomy-term-871":
                superbanes.append("atk")
            if driver.find_element(By.XPATH, '//*[@id="iv-set-table"]/tbody/tr[2]/td[2]/div/div').get_attribute("id") == "taxonomy-term-861":
                superboons.append("atk")
            
            #spd boon/bane check
            if driver.find_element(By.XPATH, '//*[@id="iv-set-table"]/tbody/tr[2]/td[3]/div/div').get_attribute("id") == "taxonomy-term-871":
                superbanes.append("spd")
            if driver.find_element(By.XPATH, '//*[@id="iv-set-table"]/tbody/tr[2]/td[3]/div/div').get_attribute("id") == "taxonomy-term-861":
                superboons.append("spd")

            #def boon/bane check
            if driver.find_element(By.XPATH, '//*[@id="iv-set-table"]/tbody/tr[2]/td[4]/div/div').get_attribute("id") == "taxonomy-term-871":
                superbanes.append("def")
            if driver.find_element(By.XPATH, '//*[@id="iv-set-table"]/tbody/tr[2]/td[4]/div/div').get_attribute("id") == "taxonomy-term-861":
                superboons.append("def")

            #res boon/bane check
            if driver.find_element(By.XPATH, '//*[@id="iv-set-table"]/tbody/tr[2]/td[5]/div/div').get_attribute("id") == "taxonomy-term-871":
                superbanes.append("res")
            if driver.find_element(By.XPATH, '//*[@id="iv-set-table"]/tbody/tr[2]/td[5]/div/div').get_attribute("id") == "taxonomy-term-861":
                superboons.append("res")
        except NoSuchElementException:
            print(name + " does not have an iv set on file")

        # get game8 page for easier skill recording
        driver.get('http://www.google.com')
        driver.implicitly_wait(2)
        search = driver.find_element(By.NAME, 'q')
        driver.implicitly_wait(2)
        search.send_keys("game8 " + name)
        search.send_keys(Keys.RETURN) # hit return after you enter search text
        try:
            WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[7]/div/div[10]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div[1]/div/div/div/div[1]"))).click()
            driver.implicitly_wait(2)

            #record weapon and skills
            skillTable = driver.find_elements(By.XPATH, '//table[@class="a-table a-table "]/tbody')
            if len(skillTable) == 0:
                print(name + " unable to locate skills table")
            else:
                skillString = skillTable[0].text.split("\n")
                if "FEH" in skillString[0]:
                    skillString = skillTable[1].text.split("\n")
                if "New Heroes" in skillString[0]:
                    skillString = skillTable[1].text.split("\n")
                if "Mythic" in skillString[0]:
                    skillString = skillTable[1].text.split("\n")
                if "Legendary" in skillString[0]:
                    skillString = skillTable[1].text.split("\n")
                if "Debut" in skillString[0]:
                    skillString = skillTable[1].text.split("\n")
            
            length = len(skillString)
            try:
                if length == 8:
                    skills.append(skillString[0])
                    skills.append(skillString[3])
                    skills.append(skillString[6])
                if length == 14:
                    skills.append(skillString[0])
                    skills.append(skillString[4])
                    skills.append(skillString[7])
                    skills.append(skillString[9])
                    skills.append(skillString[11])
                if length == 10:
                    skills.append(skillString[0])
                    skills.append(skillString[3])
                    skills.append(skillString[6])
                    skills.append(skillString[8])
            except IndexError as error:
                print(name + " produced skill index error")
        except ElementNotInteractableException:
            print(name + " not able to find game8 skills")

        driver.get("https://gamepress.gg/feheroes/heroes")
        driver.implicitly_wait(3)

        tempArray = [name, title, move, weaponType, hp, atk, spd, deff, res, superboons, superbanes, skills, ""]
        heroArray.append(tempArray)

        split_1 = xpath1.split("tr", 1)[0]
        xpath1 = split_1 + "tr[" + str(index) + "]"
        index += 1

    tempArray = ["","",""]
    heroArray.append(tempArray)


#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

#open and navigate to the a skills page 
driver.get("https://gamepress.gg/feheroes/heroes")
driver.implicitly_wait(1)

#initializes index counter
index = 2

# max index currently 765
try:
    addToArray("//*[@id='heroes-new-list']/tbody/tr[1]", index, 765)
except TimeoutException:
    print("timed out on index " + index)

# saves the a skill csv file
df = pd.DataFrame(heroArray, columns=['name', 'title', 'move type', 'weapon type', 'hp', 'atk', 'spd', 'def', 'res', 'superboon', 'superbane', 'skills', 'recommended build'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\heroes.csv")

driver.close()