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
import requests # request img from web
import shutil # save img locally

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

#loads csv containing hero names and titles
df = pd.read_csv('tempHeroes.csv', encoding='latin1')
index = 0

while index < len(df):
    name = df['name'][index]
    title = df['title'][index]
    url = 'https://feheroes.fandom.com/wiki/' + name + ':_' + title

    try:
        driver.get(url)
        driver.implicitly_wait(2)

        face_img = driver.find_element(By.XPATH, "//img[@alt='" + name + " " + title + " Face.webp']/..")

        url = face_img.get_attribute("href") #prompt user for img url
        print(url)
        file_name = "C:/Users/hiwhy/Documents/Personal Projects/scripts/images/" + name + ".png" #prompt user for file_name

        res = requests.get(url, stream = True)

        if res.status_code == 200:
            with open(file_name,'wb') as f:
                shutil.copyfileobj(res.raw, f)
        else:
            print('Image Couldn\'t be retrieved')
        
        driver.get(url + "/Misc")
        driver.implicitly_wait(2)

        face_img = driver.find_element(By.XPATH, "//img[@alt='" + name + " " + title + " Face.webp']/..")

        url = face_img.get_attribute("href") #prompt user for img url
        print(url)
        file_name = "C:/Users/hiwhy/Documents/Personal Projects/scripts/images/" + name + ".png" #prompt user for file_name

        res = requests.get(url, stream = True)

        if res.status_code == 200:
            with open(file_name,'wb') as f:
                shutil.copyfileobj(res.raw, f)
        else:
            print('Image Couldn\'t be retrieved')

    except: 
        print("failed on " + name)
    index+=1
