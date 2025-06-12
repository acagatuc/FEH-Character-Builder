from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import pandas as pd

#initializes python array for refines 
refines = []

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

#open and navigate to the refines page /html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[6]
driver.get("https://game8.co/games/fire-emblem-heroes/archives/261196") #<-- use fandom instead
driver.implicitly_wait(1)

tempDF = pd.read_csv('temp.csv', encoding="latin1")

index = 0
maxIndex = len(tempDF)

while index < maxIndex:
    name = tempDF['name'][index]
    nameString = name.replace('_', ' ')
    try:
        a = driver.find_elements(By.XPATH, '//*[contains(text(), "'+ nameString +'")]')
        length = len(a)
        b = a[length-1].find_element(By.XPATH, "./../../td[2]")
        tempObj = [a[length-1].text.encode("utf-8"), b.text.encode("utf-8")]
    except NoSuchElementException:
        tempObj = [nameString, ""]
        print("Error on " + nameString)
    except IndexError:
        tempObj = [nameString, ""]
        print("Error on " + nameString)

    refines.append(tempObj)
    index += 1

df = pd.DataFrame(refines, columns=['name', 'description'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\tempRefines.csv")

driver.close()