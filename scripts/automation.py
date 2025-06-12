from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
import pandas as pd

#initializes python array for skills 
skillArray = []

def addToArray(xpath1, xpath2, index, maxIndex):
    while index < maxIndex:

        s = driver.find_element(By.XPATH, xpath1)

        name = s.get_attribute("alt")
        img = s.get_attribute("data-src")
        des = driver.find_element(By.XPATH, xpath2).get_attribute("textContent").encode("utf-8")

        #these do not work yet 
        #des.replace("\xe2\x89\xa5", "≥")
        #des.replace("\xe2\x89\xa4", "≤")

        tempArray = [name, img, des]
        skillArray.append(tempArray)

        split_1 = xpath1.split("tr", 1)[0]
        xpath1 = split_1 + "tr[" + str(index) + "]/td[1]/div/a/img"
        xpath2 = split_1 + "tr[" + str(index) + "]/td[2]"
        index += 1
    
    tempArray = ["","",""]
    skillArray.append(tempArray)


#initialize headless webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

#open and navigate to the a skills page 
driver.get("https://game8.co/games/fire-emblem-heroes/archives/265416")
driver.implicitly_wait(1)

#initializes index counter
index = 2

addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[3]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[3]/tbody/tr[1]/td[2]", index, 110)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[5]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[5]/tbody/tr[1]/td[2]", index, 66)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[7]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[7]/tbody/tr[1]/td[2]", index, 38)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[9]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[9]/tbody/tr[1]/td[2]", index, 47)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[11]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[11]/tbody/tr[1]/td[2]", index, 14)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[15]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[15]/tbody/tr[1]/td[2]", index, 33)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[17]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[17]/tbody/tr[1]/td[2]", index, 9)

# saves the a skill csv file
df = pd.DataFrame(skillArray, columns=['name', 'img', 'description'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\askills.csv")

#empty skill array after writing
skillArray= []

# b skill csv file
#open and navigate to the b skills page 
driver.get("https://game8.co/games/fire-emblem-heroes/archives/265417")
driver.implicitly_wait(1)

addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[3]/tbody/tr[1]/td[1]/div/a/img","/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[3]/tbody/tr[1]/td[2]", index, 98)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[5]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[5]/tbody/tr[1]/td[2]", index, 87)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[7]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[7]/tbody/tr[1]/td[2]", index, 26)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[9]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[9]/tbody/tr[1]/td[2]", index, 45)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[11]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[11]/tbody/tr[1]/td[2]", index, 69)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[13]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[13]/tbody/tr[1]/td[2]", index, 26)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[15]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[15]/tbody/tr[1]/td[2]", index, 11)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[17]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[17]/tbody/tr[1]/td[2]", index, 40)

# saves the b skill csv file
df = pd.DataFrame(skillArray, columns=['name', 'img', 'description'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\bskills.csv")


#empty skill array after writing
skillArray= []

# c skill csv file
#open and navigate to the c skills page 
driver.get("https://game8.co/games/fire-emblem-heroes/archives/265418")
driver.implicitly_wait(1)

addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[3]/tbody/tr[1]/td[1]/div/a/img","/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[3]/tbody/tr[1]/td[2]", index, 134)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[5]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[5]/tbody/tr[1]/td[2]", index, 68)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[7]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[7]/tbody/tr[1]/td[2]", index, 61)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[11]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[11]/tbody/tr[1]/td[2]", index, 20)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[13]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[13]/tbody/tr[1]/td[2]", index, 71)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[15]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[15]/tbody/tr[1]/td[2]", index, 68)
addToArray("/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[17]/tbody/tr[1]/td[1]/div/a/img", "/html/body/div[5]/div[2]/div[1]/div[1]/div[4]/table[17]/tbody/tr[1]/td[2]", index, 26)

# saves the c skill csv file
df = pd.DataFrame(skillArray, columns=['name', 'img', 'description'])
df.to_csv("C:\\Users\\hiwhy\\Documents\\Personal Projects\\cskills.csv")

#index of skill list
#i = 0
#size = len(skillArray)

# log in to mongodb
#driver.get("https://cloud.mongodb.com/v2/61e889df712a62086796447a#metrics/replicaSet/61e88b2d001de119fd1d8087/explorer/FEH_Skills/A_Slot/find")
#driver.implicitly_wait(3)
#driver.find_element_by_xpath('//*[@id="mms-body-application"]/div/div[1]/form/button').click()
#driver.implicitly_wait(3)
#driver.find_element_by_xpath('//*[@id="identifierId"]').send_keys("addison.agatucci@gmail.com")
#driver.find_element_by_xpath('//*[@id="identifierNext"]/div/button').click()
#driver.find_element_by_xpath('//*[@id="password"]/div[1]/div/div[1]/input').send_keys("fuckyoumom")
#driver.find_element_by_xpath('//*[@id="passwordNext"]/div/button').click()
#driver.implicitly_wait(3)

#while i < size:
    #driver.find_element_by_name("insertDocument").click()
    #driver.find_element_by_xpath('/html/body/div[5]/div[2]/div/div/div[2]/div[1]/div/div/button[1]').click()
    #driver.find_element_by_xpath('//*[@id="brace-editor"]/textarea').send_keys(',')

    #driver.find_elements_by_class_name("editable-element-field").send_keys("name")
    #driver.find_elements_by_class_name("editable-element-value editable-element-value-is-string").send_keys(skillArray[i].name)
    #driver

    #print(i)
    #i += 1


driver.close()