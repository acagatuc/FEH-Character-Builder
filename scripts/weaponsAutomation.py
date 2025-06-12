from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
import pandas as pd

#initializes python array for weapons 
weapons = []

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

#open and navigate to the weapons page 
driver.get("https://feheroes.fandom.com/wiki/Weapons") #<-- use fandom instead

#initializes index counter
names = driver.find_elements(By.CLASS_NAME, "field_Weapon")
might = driver.find_elements(By.CLASS_NAME, "field_Might")
des = driver.find_elements(By.CLASS_NAME, "field_Description")
sp = driver.find_elements(By.CLASS_NAME, "field_SP")
unique = driver.find_elements(By.CLASS_NAME, "field_Exclusive")

weaponArray = ["Red Sword", "Red Tome", "Blue Lance", "Blue Tome", "Green Axe", "Green Tome", "Gray Tome", "Gray Staff", "Beast", "Dragon", "Bows", "Daggers"]

index = 0
waIndex = -1

while index < len(names):
    tempArray = []
    if des[index].text == "Description":
        waIndex += 1
    else:
        tempArray.append(names[index].text.encode("utf-8"))
        tempArray.append(des[index].text)
        tempArray.append(weaponArray[waIndex])
        tempArray.append(might[index].text)
        tempArray.append([0,0,0,0,0])
        tempArray.append(sp[index].text)
        tempArray.append(False)
        tempArray.append(unique[index].text)

        weapons.append(tempArray)
        
    index += 1

# saves the weapon csv file
df = pd.DataFrame(weapons, columns=['name', 'description', 'type', 'might', 'visibleStats', 'sp cost', 'refine', 'unique'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\weapons.csv")

driver.close()