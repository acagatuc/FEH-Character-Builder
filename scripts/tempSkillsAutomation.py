from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
import pandas as pd

#initializes python array for weapons 
weapons = []
skills = []
index = 0

def addToArray(index):
    heroesDf = pd.read_csv('temp.csv', encoding="latin1")
    maxIndex = len(heroesDf)
    while (index < maxIndex):
        line = heroesDf.iloc[index].to_string().split('name')
        name = line[1].splitlines()
        name = name[0].strip()

        skillType = heroesDf.iloc[index].to_string().split('type')
        skillType = skillType[1].splitlines()
        skillType = skillType[0].splitlines()
        skillType = skillType[0].strip()

        if(skillType == "Weapon"):
            # check if webpage is correct and add to weapon array
            # ['name', 'description', 'type', 'might', 'visibleStats', 'sp cost', 'refine', 'unique']
            driver.get("https://feheroes.fandom.com/wiki/" + name)
            driver.implicitly_wait(1)

            print(name)

            if (driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[6]/th').text == "Effectiveness"):
                wepDes = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[12]/td').text
                spCost = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[8]/td').text
                wepUnique = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[9]/td').text
            
            else: 
                wepDes = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[11]/td').text
                spCost = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[7]/td').text
                wepUnique = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[8]/td').text
                

            wepName = name.encode("latin1")
            wepMight = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[4]/td').text
            wepVisible = [0,0,0,0,0]
            refine = False
            
            webElement = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[3]/td/a')
            wepType = webElement.get_attribute("title")

            tempArray = [wepName, wepDes, wepType, wepMight, wepVisible, spCost, refine, wepUnique]
            weapons.append(tempArray)

        else : 
            # check if webpage is passives and add to skill array
            # ['name', 'description', 'sp', 'unique', 'img']
            driver.get("https://feheroes.fandom.com/wiki/Passives") #<-- use fandom instead
            driver.implicitly_wait(1)

            if (skillType == "A"):
                webElement = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[3]/table/tbody/tr/td/a[contains(text(),"' + name + '")]')
                skillDes = webElement.find_element(By.XPATH, "./../../td[3]").text
                spCost = webElement.find_element(By.XPATH, "./../../td[4]").text
                unique = webElement.find_element(By.XPATH, "./../../td[5]").text
                img = webElement.find_element(By.XPATH, "./../../td[1]/a").get_attribute("href")
            elif (skillType == "B"):
                webElement = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[5]/table/tbody/tr/td/a[contains(text(),"' + name + '")]')
                skillDes = webElement.find_element(By.XPATH, "./../../td[3]").text
                spCost = webElement.find_element(By.XPATH, "./../../td[4]").text
                unique = webElement.find_element(By.XPATH, "./../../td[5]").text
                img = webElement.find_element(By.XPATH, "./../../td[1]/a").get_attribute("href")
            elif (skillType == "C"):
                webElement = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/div[6]/table/tbody/tr/td/a[contains(text(),"' + name + '")]')
                skillDes = webElement.find_element(By.XPATH, "./../../td[3]").text
                spCost = webElement.find_element(By.XPATH, "./../../td[4]").text
                unique = webElement.find_element(By.XPATH, "./../../td[5]").text
                img = webElement.find_element(By.XPATH, "./../../td[1]/a").get_attribute("href")
            elif (skillType == "Assist"):
                print("assist")
            elif (skillType == "Special"):
                print("special")

            tempArray = [name, skillDes, spCost, unique, img]
            skills.append(tempArray)
            

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
wep = pd.DataFrame(weapons, columns=['name', 'description', 'type', 'might', 'visibleStats', 'sp cost', 'refine', 'unique'])
wep.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\tempWeapons2.csv")

ski = pd.DataFrame(skills, columns=['name', 'description', 'sp', 'unique', 'img'])
ski.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\tempSkills.csv")

driver.close()