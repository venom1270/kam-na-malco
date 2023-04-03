import { error, json, redirect } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { User, toUserType } from './model';
import { dev } from '$app/environment';
 
export const actions = {
  default: async ({ request, cookies }) => {
      const form = await request.formData();
      const username = form.get('username');
      const password = form.get('password');
    
      console.log("Got username: " + username);
      console.log("Got password: " + password);
      
      let data;
      await login(username, password).then(d => data = d);

      //data = {id: 1, user: "admin", password: "neki", ai_tokens: 0};

      console.log(data);

      if (data === undefined) {
        data = {
          id: -1,
          username: "",
          password: "",
          created_at: "",
          ai_tokens: 0
        }
      } else {
        cookies.set('session', username, {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          secure: !dev,
          maxAge: 60 * 60 * 24 * 30
        });
        cookies.set('ai_tokens', data.ai_tokens, {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          secure: !dev,
          maxAge: 60 * 60 * 24 * 30
        });
        throw redirect(307, '/');
      }
      console.log("JUHUHU");
      // return customResponse(200, true, 'User loggedIn successfully');
      
    }
}



async function login(username: string, password: string) {
  console.log(username);
    const data: User[] = toUserType(
        await (await supabase.from("User").select("*").eq("username", username).eq("password", password)).data
    );

    /*console.log("LOGIN METHOD: " + data[0]);
    console.log(data[0])*/

    /*return {
      data: data
    };*/

    console.log("LOGIN: " + data);

    return data[0];
}