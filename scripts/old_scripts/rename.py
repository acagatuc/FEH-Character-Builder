import shutil
import os

my_list = os.listdir('C:/Users/hiwhy/Documents/Personal Projects/portraits/')

for item in my_list:
    if "- Spring" in item:
        name = item.split(" - ")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Spring ' + name[0] + ".png")
    if "- New Years" in item:
        name = item.split(" - ")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/New Years ' + name[0] + ".png")
    if "- Summer" in item:
        name = item.split(" - ")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Summer ' + name[0] + ".png")
    if "- Spa" in item:
        name = item.split(" - ")  
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Hostile Springs ' + name[0] + ".png")
    if "- Dancer" in item:
        name = item.split(" - ")
        if name[0]=="Ryoma" or name[0]=="Xander" or name[0]=="Micaiah" or name[0]=="Elincia":
            shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Hoshidan Summer ' + name[0] + ".png")
        if name[0]=="Azura" or name[0]=="Olivia" or name[0]=="Inigo" or name[0]=="Shigure":
            shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Performing Arts' + name[0] + ".png")
    if "- Legendary" in item:
        name = item.split(" - ")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Legendary ' + name[0] + ".png")
    if "- CYL" in item:
        name = item.split(" - ")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Brave ' + name[0] + ".png")
    if "- Valentines" in item:
        name = item.split(" - ")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Valentines ' + name[0] + ".png")
    if "- Christmas" in item:
        name = item.split(" - ")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Winter ' + name[0] + ".png")
    if "- Fallen" in item:
        name = item.split(" - ")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Fallen ' + name[0] + ".png")
    if "- Halloween" in item:
        name = item.split(" - ")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Halloween ' + name[0] + ".png")
    if "- Bride" in item:
        name = item.split(" - ")
        if name[0]=="Hinata" or name[0]=="Marth" or name[0]=="Pent" or name[0]=="Rafiel" or name[0]=="Saul" or name[0]=="Zelot":
            shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Groom ' + name[0] + ".png")
        else: 
            shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Bridal ' + name[0] + ".png")
    if "- Dreaming" in item:
        name = item.split(" - ")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/Adrift ' + name[0] + ".png")
    if " M.png" in item: 
        name = item.split(" M.png")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/' + name[0] + " (M).png")
    if " F.png" in item: 
        name = item.split(" F.png")
        shutil.move('C:/Users/hiwhy/Documents/Personal Projects/portraits/' + item, 'C:/Users/hiwhy/Documents/Personal Projects/portraits/' + name[0] + " (F).png")