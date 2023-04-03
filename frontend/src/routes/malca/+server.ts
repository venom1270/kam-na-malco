import { json } from "@sveltejs/kit";
import { Configuration, OpenAIApi, CreateChatCompletionRequest, ChatCompletionRequestMessageRoleEnum } from "openai";
import { OPENAI_API_KEY } from '$env/static/private'
import { toRestaurantType, type Restaurant } from "./model";
import { supabase } from "$lib/supabaseClient";
import { toUserType, type User } from "../login/model";

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let restaurantData: Restaurant[] = [];

function getRestaurantData(): Restaurant[] {
    if (restaurantData == null || restaurantData.length == 0) {
        loadRestaurantData();
    }

    //console.log("RES DATA: " + restaurantData);

    return restaurantData;
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
    let d = getRestaurantData();
    //console.log(d);
    return json(d);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    /*const username = String(url.searchParams.get('username') ?? 'admin');
    const password = String(url.searchParams.get('password') ?? 'admin');*/
  
    const { prompt, username } = await request.json();
   
    console.log("Got prompt: " + prompt);
    console.log("Got username: " + username);

    if (! await use_ai_token(username)) {
        return json("Napaka: ni dovolj žetonov");
    }

    let data;

    let systemPrompt: string = "Si prijazen pomočnik, ki pomagaš ljudem pri izbiri jedi s spodnjega menija restavracij. Drugih restavracij ne predlagaj.\n" + promptifyRestaurantData();

    console.log("System prompt: " + systemPrompt);

    const chatGptMessages = [
        {
                role: ChatCompletionRequestMessageRoleEnum.System,
                content: systemPrompt,
        },
         {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: prompt,
        }
      ]
    let openAiRequest: CreateChatCompletionRequest = {
        messages: chatGptMessages,
        model: 'gpt-3.5-turbo',
        max_tokens: 250,
        temperature: 0.5
    }
    //data = await openai.createChatCompletion(openAiRequest)
  
    
    //console.log(data);
  
    if (data === undefined) {
      data = null;
    }

    return json(data);

    /*let completion_data = data?.data.choices;
    console.log(completion_data);
  
    let aiResponse = completion_data[0].message?.content;
    console.log(aiResponse);

    return json(aiResponse);*/

}

function promptifyRestaurantData() {
    let prompt: string = "";
    //return prompt;
    restaurantData.forEach(r => {
        if (r.menus.length > 0) {
            prompt += "Restavracija: " + r.name + "\n";
            r.menus[0].items.forEach(i => {
                prompt += i.name + ": " + i.food + " " + i.price + "\n";
            });
            prompt += "\n";
        }
    });

    return prompt;
}

async function loadRestaurantData() {
    let currentDate = new Date();
    let currentDateString = currentDate.toJSON().slice(0, 10);   

    const data_today: Restaurant[] = toRestaurantType(
        await (await supabase.from("Restaurant").select("id, name, Menu(*, MenuItem(*))").eq("Menu.date", currentDateString)).data
    );

    const data_constant_menus: Restaurant[] = toRestaurantType(
        await (await supabase.from("Restaurant").select("id, name, Menu(*, MenuItem(*))").is("Menu.date", null)).data
    );

    console.log(data_constant_menus);
    console.log(data_today);

    // Join data
    data_today.forEach(r => {
        data_constant_menus.forEach(cm => {
            if (r.id == cm.id) {
                r.menus.push(...cm.menus);
            }
        })
    })

    console.log("Joined data:")
    console.log(data_today)

    // Sort by MenuItem id
    // Supabasepy does not seem to support order by joined table columns
    data_today.forEach(r => {
        r.menus.forEach(m => {
            m.items = m.items.sort((a,b) => a.id - b.id);
        })
    })

    restaurantData = data_today;
}

async function use_ai_token(username): boolean {

    console.log(await (await supabase.from("User").select("*").eq("username", username)).data)

    const users: User[] = toUserType(
        await (await supabase.from("User").select("*").eq("username", username)).data
    );

    console.log(users);

    if (users[0].ai_tokens > 0) {

        const new_tokens = users[0].ai_tokens - 1;
        console.log("New tokens: " + new_tokens);
        console.log(await supabase.from("User").update({"ai_tokens": new_tokens}).eq("username", username).select())
        return true;
    }

    return false;
}