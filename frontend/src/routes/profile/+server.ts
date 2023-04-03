import { json, type RequestEvent } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies } : RequestEvent) { 
    cookies.delete("session");
    cookies.delete("ai_tokens");

    const data = {
        success: true
    }
  
    return json(data);
  }