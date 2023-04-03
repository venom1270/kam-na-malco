import { error, json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { User, toUserType } from './model';
import type { RequestEvent } from '../$types';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request } : RequestEvent) {
  /*const username = String(url.searchParams.get('username') ?? 'admin');
  const password = String(url.searchParams.get('password') ?? 'admin');*/

  console.log(request);

  const { username, password } = await request.json();
 
  console.log("Got username: " + username);
  console.log("Got password: " + password);
  
  let data;
  //await login(username, password).then(d => data = d);

  data = {id: 1, user: "admin", password: "neki"};
  console.log(data);

  if (data === undefined) {
    data = {
      id: -1,
      username: "",
      password: "",
      created_at: ""
    }
  } else {

  }

  return json(data);
}



async function login(username: string, password: string) {
  console.log(username);
    const data: User[] = toUserType(
        await (await supabase.from("User").select("*").eq("username", username)).data
    );

    /*console.log("LOGIN METHOD: " + data[0]);
    console.log(data[0])*/

    /*return {
      data: data
    };*/

    return data[0];
}