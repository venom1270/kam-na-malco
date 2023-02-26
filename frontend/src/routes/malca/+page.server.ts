/*

NOT WORKING - 'data' is not populated on frontend???
*/
import { supabase } from "$lib/supabaseClient";
import { toRestaurantType, type Menu, type MenuItem, type Restaurant } from './model';

export async function load() {

    let currentDate = new Date().toJSON().slice(0, 10);   

    const data_today: Restaurant[] = toRestaurantType(
        await (await supabase.from("Restaurant").select("id, name, Menu(*, MenuItem(*))").eq("Menu.date", currentDate)).data
    );

    console.log(data_today);

    return {
        today_data: data_today ?? [],
    };
}