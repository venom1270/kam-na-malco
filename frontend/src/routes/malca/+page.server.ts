/*

NOT WORKING - 'data' is not populated on frontend???

import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("countries").select();
  return {
    restaurants: data ?? [],
    qwe: "qwe"
  };
}*/