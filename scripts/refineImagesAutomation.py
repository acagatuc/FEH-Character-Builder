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
driver.get("https://feheroes.fandom.com/wiki/Weapon_Refinery") #<-- use fandom instead
driver.implicitly_wait(1)

tempDF = pd.read_csv('refineImages.csv', encoding="latin1")

index = 0
maxIndex = len(tempDF)

while index < maxIndex:
    tempURL = []

    line = tempDF.iloc[index].to_string().split('name')
    name = line[1].splitlines()
    name = name[0].strip()
    nameString = name.replace('_', ' ')
    print(nameString)

    tempURL.append(nameString)

    try:
        a = driver.find_element(By.XPATH, '//a[contains(@title, "'+ nameString +'")]')
        url = a.find_element(By.XPATH, "./img").get_attribute("data-src")
        tempURL.append(url.split("revision")[0])
    except NoSuchElementException:
        tempURL.append("")
    except IndexError:
        tempURL.append("")

    refines.append(tempURL)
    index += 1

df = pd.DataFrame(refines, columns=['name', 'url'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\refineImagesFinished.csv")

driver.close()