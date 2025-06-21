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
tempArray = []

#initializes index counter
index = 0

def addToArray(index):
    heroesDf = pd.read_csv('s.csv', encoding='latin1')
    maxIndex = len(heroesDf)
    while index < maxIndex:
        try:
            weapons = []
            assists = []
            specials = []
            passives = []

            line = heroesDf.iloc[index].to_string().split('name')
            name = line[1].splitlines()
            name = name[0].strip()
            nameString = name.replace('_', ' ')

            string = heroesDf.iloc[index].to_string().split('title')
            title = string[1].splitlines()
            title = title[0].splitlines()
            title = title[0].strip()
            title = title.replace("_", " ")

            hero = heroesDf.iloc[index].to_string().split('hero type')
            hero_type = hero[1].splitlines()
            hero_type = hero_type[0].strip()

            # get url for stats page for easier skill recording
            url = 'https://feheroes.fandom.com/wiki/' + nameString + ':_' + title
            print(url)

            try:
                driver.get(url)
                driver.implicitly_wait(1)

                # WEAPONS LIST
                tables = driver.find_elements(By.XPATH, "//table[@class='wikitable default unsortable skills-table']")
                driver.implicitly_wait(1)
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
                    i = 2
                    while i <= len(s):
                        passives.append(skillsTable.find_element(By.XPATH, "./tbody/tr["+str(i)+"]/td[2]").text.encode("utf-8"))
                        i += 1
                except IndexError:
                    print("could not get skills for " + name)
                
            except NoSuchElementException:
                print("unable to get " + nameString + ": " + title + " skills")
            except UnicodeEncodeError:
                print("unicode error")


        
        except NoSuchElementException:
            try:
                print("unable to record " + title + " skills")
            except UnicodeEncodeError:
                print("unicode error")

        tempArray = [name, title, weapons, assists, specials, passives]
        heroArray.append(tempArray)
                
        index += 1

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

# max index currently 763
try:
    addToArray(index)
except TimeoutException:
    print("timed out on index " + str(index))

# saves the a skill csv file
df = pd.DataFrame(heroArray, columns=['name', 'title', 'weapons', 'assists', 'specials', 'passives'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\heroSkills.csv")

driver.close()