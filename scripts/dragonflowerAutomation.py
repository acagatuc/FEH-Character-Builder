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

# importing datetime module
import datetime

#initializes python array for skills 
heroArray = []
tempArray = []

#dragonflower count
d1 = datetime.datetime(2019, 8, 18)
d2 = datetime.datetime(2020, 8, 18)
d3 = datetime.datetime(2021, 8, 18)
d4 = datetime.datetime(2022, 8, 18)

#initializes index counter
index = 0

def addToArray(index, maxIndex):
    heroesDf = pd.read_csv('s.csv', encoding="latin1")
    # get url for stats page for easier skill recording
    url = "https://feheroes.fandom.com/wiki/List_of_Heroes"

    try:
        driver.get(url)
        driver.implicitly_wait(1)
        while index < maxIndex:
            try:
                dragonflowers = 0

                line = heroesDf.iloc[index].to_string().split('name')
                name = line[1].splitlines()
                name = name[0].strip()

                string = heroesDf.iloc[index].to_string().split('title')
                title = string[1].splitlines()
                title = title[0].splitlines()
                title = title[0].strip()

                string = heroesDf.iloc[index].to_string().split('move type')
                move = string[1].splitlines()
                move = move[0].splitlines()
                move = move[0].strip()
                
                webElement = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/table/tbody/tr/td[2]/a[@title=contains(text(), "' + title + '")]')
                
                releaseDate = webElement.find_element(By.XPATH, "./../../td[8]")
                print(title + ": " + releaseDate.text)
                datetime_object = datetime.datetime.strptime(releaseDate.text, '%Y-%m-%d')

                if (move == 'infantry'):
                    if(datetime_object > d4):
                        dragonflowers = 5
                    elif(datetime_object > d3):
                        dragonflowers = 10
                    elif(datetime_object > d2):
                        dragonflowers = 15
                    elif(datetime_object > d1):
                        dragonflowers = 20
                    else: 
                        dragonflowers = 25
                else: 
                    if(datetime_object > d4):
                        dragonflowers = 5
                    elif(datetime_object > d3):
                        dragonflowers = 10
                    elif(datetime_object > d2):
                        dragonflowers = 15
                    else: 
                        dragonflowers = 20

            except NoSuchElementException:
                try:
                    print("unable to record " + title + " dragonflowers")
                except UnicodeEncodeError:
                    print("unicode error")

            tempArray = [name, title, dragonflowers]
            heroArray.append(tempArray)
                    
            index += 1
    except NoSuchElementException:
        print("url failed")

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

# max index currently 763
try:
    addToArray(index, 13)
except TimeoutException:
    print("timed out on index " + str(index))

# saves the a skill csv file
df = pd.DataFrame(heroArray, columns=['name', 'title', 'dragonflowers'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\dragonflowers.csv", encoding='latin1')

driver.close()