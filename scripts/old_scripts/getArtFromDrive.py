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
import requests # request img from web
import shutil # save img locally
import pandas as pd

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

index = 0
next = True

driver.get("https://feheroes.fandom.com/wiki/Category:Mini_unit_no_weapon_sprites")
driver.implicitly_wait(1)

# get array of gallerybox items from selenium
# imgs = driver.find_elements(By.CLASS_NAME, 'gallerybox')

while next == True: 
    try:
        img = driver.find_element(By.XPATH, '//*[@id="mw-category-media"]/ul/li[' + str(index + 1) + ']/div/div[1]/div/a').get_attribute("href")
        name = driver.find_element(By.XPATH, '//*[@id="mw-category-media"]/ul/li[' + str(index + 1) + ']/div/div[2]/a').text
        name = name.split("Mini")[0].strip()

        # save to computer drive
        file_name = "C:/Users/hiwhy/Documents/Personal Projects/chibis/" + name + ".png" #prompt user for file_name

        res = requests.get(img, stream = True)

        if res.status_code == 200:
            with open(file_name,'wb') as f:
                shutil.copyfileobj(res.raw, f)
        else:
            print(name + ' Couldn\'t be retrieved')

        print(name)
        index += 1
    except: 
        try: 
            next_page = driver.find_element(By.XPATH,"//*[contains(text(), 'next page')]").get_attribute("href")
            driver.get(next_page)
            driver.implicitly_wait(1)
            index = 0
        except: 
            next = False
            print("end at " + str(index) + " and " + name)        
