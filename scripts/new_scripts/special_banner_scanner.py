from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
import json
import os
from dotenv import load_dotenv

# initialize webdriver
cService = webdriver.ChromeService(executable_path='/usr/bin/chromedriver')
driver = webdriver.Chrome(service = cService)

#constants
filename = "banners.json"

banners_list = {
    "Halloween": [], "Spring/Easter": [], "Picnic": [], "Summer": [], "Valentines": [], "Flame Tribe": [], 
    "Soiree": [], "Bride/Groom": [], "Young": [], "Plegian": [], "Jehanna": [], "Ninja": [], "Winter": [], 
    "New Years": [], "Hot Springs": [], "Tea Party": [], "Ice Tribe": [], "Nabata": [], "Pirate": [], "Hatari": [], "Performing Arts": [], 
    "Khadein": [], "Scion": [], "Thief": [], "Hoshidan Festival": [], "Dancer/Ballroom": [], "Wind Tribe": [], "Uncategorized": []
}

driver.get("https://feheroes.fandom.com/wiki/Category:Special_Heroes_summoning_events")
wait = WebDriverWait(driver, 20)
groups = driver.find_elements(By.CLASS_NAME, "mw-category-group")

name_list = []

for group in groups:
    banners = group.find_elements(By.XPATH, "ul/li")
    for banner in banners:
        banner_name = banner.text.lower()
        if "(focus)" in banner_name:
            name_list.append(banner_name)

for banner in name_list:
    #one off banners first
    if "picnic" in banner:
        banners_list["Picnic"].append(banner)
    elif "pirate" in banner or "perilous" in banner:
        banners_list["Pirate"].append(banner)
    elif "soiree" in banner:
        banners_list["Soiree"].append(banner)
    elif "risk" in banner:
        banners_list["Thief"].append(banner)
    elif "winds" in banner:
        banners_list["Wind Tribe"].append(banner)
    elif "icy" in banner:
        banners_list["Ice Tribe"].append(banner)
    elif "flame" in banner:
        banners_list["Flame Tribe"].append(banner)
    elif "nabata" in banner:
        banners_list["Nabata"].append(banner)
    elif "hoshido" in banner or "timid" in banner:
        banners_list["Hoshidan Festival"].append(banner)
    elif "khadein" in banner:
        banners_list["Khadein"].append(banner)
    elif "lost kingdoms" in banner:
        banners_list["Hatari"].append(banner)
    elif "dust storm" in banner:
        banners_list["Jehanna"].append(banner)
    elif "performing arts" in banner:
        banners_list["Performing Arts"].append(banner)
    elif "hostile springs" in banner:
        banners_list["Hot Springs"].append(banner)
    elif "dark desert" in banner:
        banners_list["Plegian"].append(banner)
    elif "scion" in banner:
        banners_list["Scion"].append(banner)
    elif "stay dreaming" in banner:
        banners_list["Dancer/Ballroom"].append(banner)
    elif "tea" in banner:
        banners_list["Tea Party"].append(banner)
    # then the main ones
    elif "brid" in banner or "joy" in banner:
        banners_list["Bride/Groom"].append(banner)
    elif "summer" in banner or "tide" in banner or "sea" in banner:
        banners_list["Summer"].append(banner)
    elif "ninja" in banner or "path" in banner or "moment" in banner:
        banners_list["Ninja"].append(banner)
    elif "love" in banner or "devoted" in banner or "last" in banner or "a special gift" in banner or "find" in banner or "here with" in banner:
        banners_list["Valentines"].append(banner)
    elif "winter" in banner or "gift" in banner or "yearning" in banner or "holiday" in banner or "miracle" in banner:
        banners_list["Winter"].append(banner)
    elif "year" in banner or "clockwork" in banner or "greetings" in banner or "spirit" in banner or "renewed" in banner:
        banners_list["New Years"].append(banner)
    elif "harvest" in banner or "trick" in banner or "bounty" in banner or "festival guide" in banner:
        banners_list["Halloween"].append(banner)
    elif "spring" in banner or "rabbits" in banner or "familial" in banner or "hares" in banner or "hop" in banner or "preconceptions" in banner or "rest" in banner:
        banners_list["Spring/Easter"].append(banner)
    else:
        banners_list["Young"].append(banner)

with open(filename, 'w') as file:
    json.dump(banners_list, file, indent=4) # indent for pretty formatting

driver.quit()