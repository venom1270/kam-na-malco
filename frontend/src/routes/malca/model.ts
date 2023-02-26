export type Restaurant = {
    id: number,
    name: string,
    menus: Menu[]
};

export type Menu = {
    id: number,
    data: Date,
    items: MenuItem[]
}

export type MenuItem = {
    id: number,
    name: string,
    price: number,
    id_menu: number,
    food: string
}

export function toRestaurantType(data: any) : Restaurant[] {
    return data?.map((res: any) : Restaurant[] => {
        return {
            id: res.id,
            name: res.name,
            menus: res.Menu?.map((menu: any) : Menu[] => {
                return {
                    id: menu.id,
                    date: menu.date,
                    id_restaurant: menu.id_restaurant,
                    items: menu.MenuItem as MenuItem[]
                }
            })
        }
    });
}