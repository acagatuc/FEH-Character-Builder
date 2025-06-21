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

def addToArray(index, maxIndex):
    heroesDf = pd.read_csv('s.csv', encoding='latin1')
    while index < maxIndex:
        try:
            hp = []
            atk = []
            spd = []
            deff = []
            res = []
            mergeOrder = []

            line = heroesDf.iloc[index].to_string().split('name')
            name = line[1].splitlines()
            name = name[0].strip()
            nameString = name.replace('_', ' ')

            string = heroesDf.iloc[index].to_string().split('title')
            title = string[1].splitlines()
            title = title[0].splitlines()
            title = title[0].strip()
            title = title.replace("_", " ")

            #hero = heroesDf.iloc[index].to_string().split('hero type')
            #hero_type = hero[1].splitlines()
            #hero_type = hero_type[0].strip()
            
            # get url for stats page for easier skill recording
            url = 'https://feheroes.fandom.com/wiki/' + nameString + ':_' + title + '/Level_1-40_stats'
            print(url)

            try:
                driver.get(url)
                driver.implicitly_wait(2)
                
                # level 1 stats
                colNo = 1
                while colNo < 4:
                    hpRow = driver.find_element(By.XPATH, "//*[@id='mw-content-text']/div/table/tbody/tr[3]/td[" + str(colNo) + "]")
                    hp.append(int(hpRow.text))
                    atkRow = driver.find_element(By.XPATH, "//*[@id='mw-content-text']/div/table/tbody/tr[3]/td[" + str(colNo + 3) + "]")
                    atk.append(int(atkRow.text))
                    spdRow = driver.find_element(By.XPATH, "//*[@id='mw-content-text']/div/table/tbody/tr[3]/td[" + str(colNo + 6) + "]")
                    spd.append(int(spdRow.text))
                    defRow = driver.find_element(By.XPATH, "//*[@id='mw-content-text']/div/table/tbody/tr[3]/td[" + str(colNo + 9) + "]")
                    deff.append(int(defRow.text))
                    resRow = driver.find_element(By.XPATH, "//*[@id='mw-content-text']/div/table/tbody/tr[3]/td[" + str(colNo + 12) + "]")
                    res.append(int(resRow.text))
                    colNo += 1
                
                # level 40 stats
                colNo = 1
                while colNo < 4:
                    hpRow = driver.find_element(By.XPATH, "//*[@id='mw-content-text']/div/table/tbody/tr[42]/td[" + str(colNo) + "]")
                    hp.append(int(hpRow.text))
                    atkRow = driver.find_element(By.XPATH, "//*[@id='mw-content-text']/div/table/tbody/tr[42]/td[" + str(colNo + 3) + "]")
                    atk.append(int(atkRow.text))
                    spdRow = driver.find_element(By.XPATH, "//*[@id='mw-content-text']/div/table/tbody/tr[42]/td[" + str(colNo + 6) + "]")
                    spd.append(int(spdRow.text))
                    defRow = driver.find_element(By.XPATH, "//*[@id='mw-content-text']/div/table/tbody/tr[42]/td[" + str(colNo + 9) + "]")
                    deff.append(int(defRow.text))
                    resRow = driver.find_element(By.XPATH, "//*[@id='mw-content-text']/div/table/tbody/tr[42]/td[" + str(colNo + 12) + "]")
                    res.append(int(resRow.text))
                    colNo += 1

            except NoSuchElementException:
                print("unable to get " + nameString + ": " + title + " 1 40 stats")
            except IndexError:
                print("index error on " + nameString)


        
            # determining merge order
            mergeTempArray = []
            mergeTempArray.append(0)
            mergeTempArray.append(atk[1])
            mergeTempArray.append(spd[1])
            mergeTempArray.append(deff[1])
            mergeTempArray.append(res[1])

            mergeOrder.append(0) #hp will always be the highest stat level 1
            i = 0
            while i < 4:
                mergeIndex = mergeTempArray.index(max(mergeTempArray))
                mergeOrder.append(mergeIndex)
                mergeTempArray[mergeIndex] = 0
                i += 1

        except NoSuchElementException:
            try:
                print("unable to record " + title + " stats")
            except UnicodeEncodeError:
                print("unicode error")
        except IndexError:
                print("index error on " + nameString)

        tempArray = [name, title, hp, atk, spd, deff, res, mergeOrder]
        heroArray.append(tempArray)
                
        index += 1

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
df = pd.DataFrame(heroArray, columns=['name', 'title', 'hp', 'atk', 'spd', 'def', 'res', 'mergeOrder'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\statsautomation.csv")

driver.close()