import shutil
import os 
import pandas as pd

heroes = pd.read_csv('scripts/heroes.csv', encoding = "utf_8_sig")

dir_name = 'C:/Users/hiwhy/Documents/Personal Projects/chibis/'

my_list = os.listdir(dir_name)
index = 0
length = len(heroes)

while index < length:
    if 'Dragon' in heroes['weapon_type'][index] or 'Beast' in heroes['hero_type'][index]:
        name = heroes['name'][index]
        exists = os.path.isfile(dir_name + name + " Transform.png")
        if not exists: 
            print(name + " Transform")
    index += 1