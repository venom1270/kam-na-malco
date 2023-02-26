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
