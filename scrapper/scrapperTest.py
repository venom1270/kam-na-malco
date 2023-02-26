import requests
import json
from datetime import datetime
from bs4 import BeautifulSoup
from supabase import create_client, Client
from supabase.lib.client_options import ClientOptions


class MenuItem:
    def __init__(self, title, food, price: float):
        self.title = title
        self.food = food
        self.price = price

class Restaurant:
    def __init__(self, name, menuItems: list[MenuItem]):
        self.name = name
        self.menuItems = menuItems

    def print(self):
        print("*** %s ***" % self.name)
        for i in self.menuItems:
            print("%s: %s (%s)" % (i.title, i.food, i.price))
        print()



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
        menuList.append(MenuItem(s, items[i].text, 6.5))



    return Restaurant('Orient', menuList)

url: str = 'https://vatjtbqrtapdltmsodjv.supabase.co'
key: str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdGp0YnFydGFwZGx0bXNvZGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5MDA1MjksImV4cCI6MTk5MjQ3NjUyOX0.QMmwy24FvfpEQJCp42iD7a1pffNbGLPBCEB2awOiXJk'


c = ClientOptions()
c.headers['prefer'] = 'ewq'
print(c.headers)

supabase: Client = create_client(url, key, c)

r = supabase.from_('Restaurant').select("*").execute()
#ret = supabase.from_('Restaurant').insert({'name': 'Testna restavracija'}).execute()


for row in r:
    print(row)


def fresco() -> Restaurant:
    r = requests.get('https://jedilnik.fresco.si/vnos_jedilnika/json?datum=2023-02-16', 
                    headers={'Accept': 'application/json'}, verify=False)
    json = r.json()
    menu = json['jedilnik'][0]
    menuList = []
    for i in range(1, 14):
        s1 = 'meni' + str(i)
        s2 = 'cena' + str(i)
        price = menu[s2]
        price = price.split("/")[0].replace(",", ".")
        menuList.append(MenuItem('Meni ' + str(i), menu[s1], float(price)))
    return Restaurant('Fresco', menuList)


restaurants = [("Fresco", fresco()), ("Orient Express", orient())]
for (name, r) in restaurants:
    r.print()

    res = supabase.table("Restaurant").select("*").eq("name", name).execute()
    restaurant_id = res.data[0]["id"]
    print(restaurant_id)

    add_to_db = False
    today = datetime.now().strftime("%Y-%m-%d")
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
        res = supabase.table("MenuItem").insert({"id_menu": menu_id, "name": item.title, "food": item.food, "price": item.price}).execute()


    ret = supabase.from_('Restaurant').insert({'name': 'Testna restavracija'}).execute()