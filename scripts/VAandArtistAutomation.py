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

#initializes index counter
index = 0

def addToArray(index):
    heroesDf = pd.read_csv('s.csv', encoding="latin1")
    maxIndex = len(heroesDf)
    while index < maxIndex:
        try:
            VAE = ""
            VAJ = ""
            art = []

            line = heroesDf.iloc[index].to_string().split('name')
            name = line[1].splitlines()
            name = name[0].strip()
            nameString = name.replace('_', ' ')

            string = heroesDf.iloc[index].to_string().split('title')
            title = string[1].splitlines()
            title = title[0].splitlines()
            title = title[0].strip()
            title = title.replace("_", " ")

            hero = heroesDf.iloc[index].to_string().split('hero type')
            hero_type = hero[1].splitlines()
            hero_type = hero_type[0].strip()

            # get url for stats page for easier skill recording
            url = 'https://feheroes.fandom.com/wiki/' + nameString + ':_' + title
            print(url)

            try:
                driver.get(url)
                driver.implicitly_wait(1)

                # if the character is legendary or mythic, they will have a different row for VA's
                if hero_type == "legendary" or hero_type == "mythic":
                    VAE = driver.find_element(By.XPATH,'//*[@id="mw-content-text"]/div/table[2]/tbody/tr[9]/td/a').text
                    VAJ= driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/table[2]/tbody/tr[10]/td/a').text

                # these have two va's so they need to be listed together
                elif hero_type == "duo" or hero_type == "harmonic":
                    VAE = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/table[2]/tbody/tr[9]/td/a[1]').text + " + " + driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/table[2]/tbody/tr[9]/td/a[2]').text
                    VAJ = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/table[2]/tbody/tr[10]/td/a[1]').text + " with " + driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/table[2]/tbody/tr[10]/td/a[2]').text
                    
                else:
                    #ENGLISH VA
                    VAE = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/table[2]/tbody/tr[7]/td/a').text
                    #JAPANESE VA
                    VAJ = driver.find_element(By.XPATH, '//*[@id="mw-content-text"]/div/table[2]/tbody/tr[8]/td/a').text

                #ARTIST
                regularArtist = driver.find_element(By.XPATH, '/html/body/div[4]/div[3]/div[3]/main/div[3]/div/div/table[2]/tbody/tr[2]/td/span/i/a')
                art.append(regularArtist.text)
                try:
                    resplendentArtist = driver.find_element(By.XPATH, '/html/body/div[4]/div[3]/div[3]/main/div[3]/div/div/table[2]/tbody/tr[2]/td/div/div/div[2]/div/div[2]/span/i/a')
                    art.append(resplendentArtist.text)
                except NoSuchElementException:
                    pass
                
            except NoSuchElementException:
                try: 
                    regularArtist = driver.find_element(By.XPATH, "/html/body/div[4]/div[3]/div[3]/main/div[3]/div/div/table[2]/tbody/tr[2]/td/div/div/div[2]/div/div[1]/span/i/a")
                    art.append(regularArtist.text)
                    # get button
                    button = driver.find_element(By.XPATH, '/html/body/div[4]/div[3]/div[3]/main/div[3]/div/div/table[2]/tbody/tr[2]/td/div/div/div[1]/div/div/div[2]')
                    button.click()
                    driver.implicitly_wait(1)

                    resplendentArtist = driver.find_element(By.XPATH, "/html/body/div[4]/div[3]/div[3]/main/div[3]/div/div/table[2]/tbody/tr[2]/td/div/div/div[2]/div/div[2]/span/i/a")
                    art.append(resplendentArtist.text)
                except NoSuchElementException:
                    pass

        except NoSuchElementException:
            try:
                print("unable to record " + title + " skills")
            except UnicodeEncodeError:
                print("unicode error")

        tempArray = [name, title, VAE, VAJ, art]
        heroArray.append(tempArray)
                
        index += 1

#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

# max index currently 763
try:
    addToArray(index)
except TimeoutException:
    print("timed out on index " + str(index))

# saves the a skill csv file
df = pd.DataFrame(heroArray, columns=['name', 'title', 'VAE', 'VAJ', 'Artist'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\VAandArtists.csv", encoding='utf-8')

driver.close()