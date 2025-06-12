from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
import pandas as pd

#initializes python array for weapons 
assists = []

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

#open and navigate to the weapons page 
driver.get("https://feheroes.fandom.com/wiki/Assists") #<-- use fandom instead

#initializes index counter
names = driver.find_elements(By.CLASS_NAME, "field_Name")
des = driver.find_elements(By.CLASS_NAME, "field_Description")
sp = driver.find_elements(By.CLASS_NAME, "field_SP")

index = 0

while index < len(names):
    tempArray = []
    tempArray.append(names[index].text.encode("utf-8"))
    tempArray.append(des[index].text)
    tempArray.append(sp[index].text)

    assists.append(tempArray)
        
    index += 1

# saves the weapon csv file
df = pd.DataFrame(assists, columns=['name', 'description', 'sp'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\assists.csv")

driver.close()