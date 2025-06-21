import shutil
import os
import pandas as pd

heroes = pd.read_csv('scripts/heroes.csv', encoding = "utf_8_sig")

dir_name = 'C:/Users/hiwhy/Documents/Personal Projects/chibis/'

my_list = os.listdir(dir_name)

# print("".join(heroes[heroes['single_name'].str.contains('Zihark')]['name'].tolist()))
# print("".join(yune['name'].tolist()))
for item in my_list:
    name = item.split(".")[0].split(" ")
    index = 1
    title = ""
    if name[0] == "Brigand":
        title = "Known Criminal"
    elif name[0] == "Black":
        title = "Sinister General"
    elif name[0] == "Death":
        title = "The Reaper"
    else:
        while index < len(name):
            if name[index] != "Transform" and name[index] != "Main" and name[index] != "Sub" and name[index] != "Resplendent":
                title += name[index] + " "
            index += 1
    title = title.strip()    
    herolist = heroes[heroes['title'].str.contains(title)]['name'].tolist()
    if len(herolist) > 1:
        for i in herolist:
            if name[0] in i:
                heroName = i
                break
    else:
        heroName = "".join(herolist)

    if heroName == "":
        title = title.replace("s ","'s ")
        heroName = "".join(heroes[heroes['title'].str.contains(title)]['name'].tolist())

    maxIndex = len(name) - 1
    if name[maxIndex] == "Transform" or name[maxIndex] == "Main" or name[maxIndex] == "Sub":
        heroName += " " + name[maxIndex]
    if name[maxIndex] == "Resplendent":
        heroName = name[maxIndex] + " " + heroName
    
    if name[0] == "Rennac" or name[0] == "Priam":
        heroName = name[0]
    if name[0] == "Flame" and name[1] == "Emperor":
        heroName = "Flame Emperor"
    if name[0] == "Saul":
        heroName = "Groom Saul"

    print(heroName)
    shutil.move(dir_name + item, dir_name + heroName + ".png")


    # try:
    #     # get the hero slot from the csv
    #     if name === "Brigand" or name === "Black" or name === "Death":
    #         name = name[0] + name[1]
    #         heroName = "".join(heroes[heroes['single_name'].str.contains(name)]['name'].tolist())
    #     else:
    #         heroName = "".join(heroes[heroes['single_name'].str.contains(name)]['name'].tolist())


    

    



    # if "Winter " in item: 
    #     name = item.split(".")
    #     shutil.move('C:/Users/hiwhy/Downloads/FEH Assets/portraits 5/' + item, 'C:/Users/hiwhy/Downloads/FEH Assets/portraits 5/' + name[0] + ".png")