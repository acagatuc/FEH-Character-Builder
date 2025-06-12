from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import pandas as pd

#initializes python array for refines 
skills = []

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

#open and navigate to the refines page /html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[6]
driver.get("https://feheroes.fandom.com/wiki/Passives") #<-- use fandom instead
driver.implicitly_wait(1)

index = 1
names = driver.find_elements(By.CLASS_NAME, "field_Name")
icon = driver.find_elements(By.CLASS_NAME, "field_Icon")
des = driver.find_elements(By.CLASS_NAME, "field_Description")
sp = driver.find_elements(By.CLASS_NAME, "field_SP")
unique = driver.find_elements(By.CLASS_NAME, "field_Is_exclusive")

while index < len(names):
    try:
        tempArray=[]
        tempArray.append(names[index].text)
        tempArray.append(des[index].text)
        tempArray.append(sp[index].text)
        tempArray.append(unique[index].text)
        img = icon[index].find_element(By.XPATH,"./a").get_attribute("href")
        tempArray.append(img)
        skills.append(tempArray)
    except NoSuchElementException:
        print("hit no element on " + names[index].text)

    index += 1

df = pd.DataFrame(skills, columns=['name', 'description', 'sp', 'unique', 'img'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\skills.csv")

driver.close()