// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production

import type { PageLoad } from "./$types";

// LOGIN has dynamic data now -> false
export const prerender = false;

export const load: PageLoad = async ({ parent }) => {
    const { user } = await parent();
    if (user) {
        user: user
    }
    console.log("PAGELOAD: " + user);
};
