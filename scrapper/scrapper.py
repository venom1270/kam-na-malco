import requests
import json
from datetime import datetime
from bs4 import BeautifulSoup
from supabase import create_client, Client
from supabase.lib.client_options import ClientOptions
from models.model import Restaurant, MenuItem
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import urllib.parse
import random
import time


options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)

def find_image(food: str) -> str:
    url = 'https://www.google.si/search?q={}&tbm=isch'.format(urllib.parse.quote(food))
    driver.get(url)
    try:
        cookies_element = driver.find_element(By.XPATH, "//button[@aria-label='Sprejmi vse']")
        if cookies_element is not None:
            print("Clicking cookies element...")
            cookies_element.click()
            time.sleep(3)
    except:
        # No cookies to accept :)
        pass
          
    try:
        random_time = random.randrange(1000, 10000) / 1000.0
        print("Sleeping for random time ({})... Searching for [{}]".format(random_time, food))
        time.sleep(random_time)

        soup = BeautifulSoup(driver.page_source, 'html.parser')
        first_image_div = soup.find('div', {"data-ri": "0"})
        first_image = first_image_div.find('img')
        image_url = first_image.get('src')
        # print(image_url)
        print("Got image url")

        return image_url
    except Exception as e:
        print("Execption")
        print(e)
        return None


def find_image_duckduck(food: str) -> str:
    url = 'https://duckduckgo.com/?ia=images&iax=images&q=' + urllib.parse.quote(food)
    driver.get(url)

    try:
        random_time = random.randrange(1000, 10000) / 1000.0
        print("Sleeping for random time ({})... Searching for [{}]".format(random_time, food))
        time.sleep(random_time)

        soup = BeautifulSoup(driver.page_source, 'html.parser')
        #print(soup.contents)
        
        images_div = soup.find('div', class_='tile-wrap')
        first_image = images_div.find('img')
        image_url = 'https:' + first_image.get('src')
        #print(first_image)
        print("image_url")

        return image_url
    except:
        return None



def fresco() -> Restaurant:
    today = datetime.now().strftime("%Y-%m-%d")
    r = requests.get('https://jedilnik.fresco.si/vnos_jedilnika/json?datum=' + today, 
                    headers={'Accept': 'application/json'}, verify=False)
    json = r.json()
    menuList = []
    if json is not None and 'jedilnik' in json:
        menu = json['jedilnik'][0]
        for i in range(1, int(len(menu)/2)):
            s1 = 'meni' + str(i)
            s2 = 'cena' + str(i)
            price = menu[s2]
            price = price.split("/")[0].replace(",", ".")
            image_url = find_image(menu[s1])
            menuList.append(MenuItem('Meni ' + str(i), menu[s1], float(price), image_url))

    return Restaurant('Fresco', menuList)

def orient() -> Restaurant:

    menuList = []

    # Make a GET request to the URL
    url = 'http://restavracija-oe.si/'
    response = requests.get(url, verify=False)

    # Parse the HTML content of the response using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find an element using its tag name and print its text content
    elements = soup.find('div', class_='malice')
    
    days = elements.find_all('div', class_='day')

    dayNum = datetime.now().weekday()
    if dayNum > 4:
        return Restaurant('Orient', [])
    menu = days[dayNum]
    items = menu.find_all('li')

    for i in range(1, len(items)):
        s = "Meni " + str(i)
        image_url = find_image(items[i].text)
        menuList.append(MenuItem(s, items[i].text, 6.5, image_url))



    return Restaurant('Orient', menuList)


#find_image_google("Golaž")



url: str = 'https://vatjtbqrtapdltmsodjv.supabase.co'
key: str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdGp0YnFydGFwZGx0bXNvZGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5MDA1MjksImV4cCI6MTk5MjQ3NjUyOX0.QMmwy24FvfpEQJCp42iD7a1pffNbGLPBCEB2awOiXJk'

c = ClientOptions()
c.headers['prefer'] = 'ewq'
print(c.headers)

supabase: Client = create_client(url, key, c)

today = datetime.now().strftime("%Y-%m-%d")

restaurants = [("Fresco", fresco()), ("Orient Express", orient())]


for (name, r) in restaurants:
    r.print()

    res = supabase.table("Restaurant").select("*").eq("name", name).execute()
    restaurant_id = res.data[0]["id"]
    print(restaurant_id)

    add_to_db = False
    today_menu = supabase.table("Menu").select("*").eq("date", today).eq("id_restaurant", restaurant_id).execute()
    if len(today_menu.data) == 0:
        add_to_db = True

    if not add_to_db:
        print("Already in db!")
        continue
    
    print("Adding to db...")
    
    res = supabase.table("Menu").insert({"id_restaurant": restaurant_id, "date": today}).execute()
    menu_id = res.data[0]["id"]
    print(menu_id)

    item: MenuItem
    for item in r.menuItems:
        res = supabase.table("MenuItem").insert({"id_menu": menu_id, "name": item.title, "food": item.food, "price": item.price, "image_url": item.image_url}).execute()
        
