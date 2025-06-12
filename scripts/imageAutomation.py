import requests # request img from web
import shutil # save img locally
import pandas as pd


skills = pd.read_csv('img.csv', encoding = "latin1")

index = 0
maxIndex = len(skills)
while index < maxIndex:
    # get skill name
    name = skills.iat[index,0]
    img = skills.iat[index,1]

    if "Icon" in img:
        print("skipped " + name)

    else:
        url = img #prompt user for img url
        print(url)
        file_name = "C:/Users/hiwhy/Documents/Personal Projects/skill_image/" + name + ".png" #prompt user for file_name

        res = requests.get(url, stream = True)

        if res.status_code == 200:
            with open(file_name,'wb') as f:
                shutil.copyfileobj(res.raw, f)
        else:
            print('Image Couldn\'t be retrieved')

    index += 1