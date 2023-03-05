/*

NOT WORKING - 'data' is not populated on frontend???
*/
import { supabase } from "$lib/supabaseClient";
import { toRestaurantType, type Menu, type MenuItem, type Restaurant } from './model';

export async function load() {

    let currentDate = new Date();

    // For testing different dates
    // currentDate.setDate(currentDate.getDate() - 3);

    let currentDateString = currentDate.toJSON().slice(0, 10);   

    const data_today: Restaurant[] = toRestaurantType(
        await (await supabase.from("Restaurant").select("id, name, Menu(*, MenuItem(*))").eq("Menu.date", currentDateString)).data
    );

    // Sort by MenuItem id
    // Supabasepy does not seem to support order by joined table columns
    data_today.forEach(r => {
        r.menus.forEach(m => {
            m.items = m.items.sort((a,b) => a.id - b.id);
        })
    })

    return {
        today_data: data_today ?? [],
    };
}