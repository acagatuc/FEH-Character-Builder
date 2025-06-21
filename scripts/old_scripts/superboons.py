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

def addToArray(index):
    heroesDf = pd.read_csv('s.csv', encoding="latin1")
    maxIndex = len(heroesDf)
    while index < maxIndex:
        try:
            superboons = []
            superbanes = []

            string = heroesDf.iloc[index].to_string().split('title')
            title = string[1].strip()
            webElement = driver.find_element(By.XPATH, '//*[@id="max-stats-table"]/tbody/tr/td[2]/a[@title=contains(text(), "' + title + '")]')

            hpCell = webElement.find_element(By.XPATH, "./../../td[6]")
            atkCell = webElement.find_element(By.XPATH, "./../../td[7]")
            spdCell = webElement.find_element(By.XPATH, "./../../td[8]")
            defCell = webElement.find_element(By.XPATH, "./../../td[9]")
            resCell = webElement.find_element(By.XPATH, "./../../td[10]")

            if hpCell.get_attribute("style") == "color: rgb(153, 0, 0);":
                # add to super banes
                superbanes.append('hp')
            
            if hpCell.get_attribute("style") == "color: rgb(0, 153, 0);":
                # add to super boons
                superboons.append('hp')

            if atkCell.get_attribute("style") == "color: rgb(153, 0, 0);":
                # add to super banes
                superbanes.append('atk')
            
            if atkCell.get_attribute("style") == "color: rgb(0, 153, 0);":
                # add to super boons
                superboons.append('atk')

            if spdCell.get_attribute("style") == "color: rgb(153, 0, 0);":
                # add to super banes
                superbanes.append('spd')
            
            if spdCell.get_attribute("style") == "color: rgb(0, 153, 0);":
                # add to super boons
                superboons.append('spd')

            if defCell.get_attribute("style") == "color: rgb(153, 0, 0);":
                # add to super banes
                superbanes.append('def')
            
            if defCell.get_attribute("style") == "color: rgb(0, 153, 0);":
                # add to super boons
                superboons.append('def')

            if resCell.get_attribute("style") == "color: rgb(153, 0, 0);":
                # add to super banes
                superbanes.append('res')
            
            if resCell.get_attribute("style") == "color: rgb(0, 153, 0);":
                # add to super boons
                superboons.append('res')

        except NoSuchElementException:
            try:
                print("unable to record " + title + " boons and banes")
            except UnicodeEncodeError:
                print("unicode error")
        
        tempArray = [title, superboons, superbanes]
        heroArray.append(tempArray)

        index += 1

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

#open and navigate to the a skills page 
driver.get("https://feheroes.fandom.com/wiki/Superassets_and_Superflaws")
driver.implicitly_wait(1)

#initializes index counter
index = 0

# max index currently 765
try:
    addToArray(index)
except TimeoutException:
    print("timed out on index " + index)

# saves the a skill csv file
df = pd.DataFrame(heroArray, columns=['title', 'superboon', 'superbane'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\superboons.csv")

driver.close()