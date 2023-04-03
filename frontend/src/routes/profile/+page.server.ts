import { redirect, type RequestEvent } from "@sveltejs/kit";

export const actions = {
    default: async ({ cookies } : RequestEvent) => {
        cookies.delete("session");
        throw redirect(307, '/');
    }
}