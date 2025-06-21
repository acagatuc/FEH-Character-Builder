from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import pandas as pd

#initializes python array for refines 
seals = []

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

#open and navigate to the refines page
driver.get("https://feheroes.fandom.com/wiki/Sacred_Seals") #<-- use fandom instead
driver.implicitly_wait(1)

index = 1
names = driver.find_elements(By.CLASS_NAME, "field_Name")
icon = driver.find_elements(By.CLASS_NAME, "field_Icon")
des = driver.find_elements(By.CLASS_NAME, "field_Description")
sp = driver.find_elements(By.CLASS_NAME, "field_SP")

while index < len(names):
    try:
        tempArray=[]
        tempArray.append(names[index].text)
        tempArray.append(des[index].text)
        tempArray.append(sp[index].text)
        img = icon[index].find_element(By.XPATH,"./a").get_attribute("href")
        tempArray.append(img)
        seals.append(tempArray)
    except NoSuchElementException:
        print("hit no element on " + names[index].text)

    index += 1

df = pd.DataFrame(seals, columns=['name', 'description', 'sp', 'img'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\seals.csv")

driver.close()