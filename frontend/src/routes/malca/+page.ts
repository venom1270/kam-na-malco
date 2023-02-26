import { dev } from '$app/environment';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/*import { supabase } from "$lib/supabaseClient";
import { toRestaurantType, type Menu, type MenuItem, type Restaurant } from './model';

export async function load() {
    const data: Restaurant[] = toRestaurantType(
        await (await supabase.from("Restaurant").select("*").eq("Menu.date", "2023-02-26")).data
    );

    console.log(data);

    const data_today: Restaurant[] = toRestaurantType(
        await (await supabase.from("Restaurant").select("id, name, Menu(*, MenuItem(*))").eq("Menu.date", "2023-02-26")).data
    );

    console.log(data_today);

    return {
        all_data: data ?? [],
        today_data: data_today ?? [],
    };
}*/
