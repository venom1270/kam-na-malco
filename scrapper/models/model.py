class MenuItem:
    def __init__(self, title, food, price: float, image_url: str):
        self.title = title
        self.food = food
        self.price = price
        self.image_url = image_url

class Restaurant:
    def __init__(self, name, menuItems: list[MenuItem]):
        self.name = name
        self.menuItems = menuItems

    def print(self):
        print("*** %s ***" % self.name)
        for i in self.menuItems:
            print("%s: %s (%s)" % (i.title, i.food, i.price))
        print()
