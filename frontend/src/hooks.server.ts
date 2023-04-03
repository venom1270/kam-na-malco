import '$lib/supabaseClient'
import type { Handle } from '@sveltejs/kit';

function redirect(location: string, body?: string) {
    console.log("Redirection to " + location);
    return new Response(body, {
        status: 303,
        headers: { location }
    });
}

const unProtectedRoutes: string[] = [
    '/',
    '/login',
    '/malca'
];

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');
    const ai_tokens = event.cookies.get('ai_tokens');
    console.log("Session: " + session);
    if (!session && !unProtectedRoutes.includes(event.url.pathname))
        return redirect('/login', 'No authenticated user.');
    //const currentUser = await userRepository.fetch(session as string);
    let currentUser = null;
    if (session) {
        currentUser = {
            name: session,
            ai_tokens: ai_tokens
        }
    }

    if (currentUser) {
        event.locals.user = {
            isAuthenticated: true,
            name: currentUser.name,
            ai_tokens: ai_tokens
        };
    } else {
        if (!unProtectedRoutes.includes(event.url.pathname)) return redirect('/', 'Not a valid user');
    }

    return resolve(event);
};