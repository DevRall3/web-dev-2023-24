import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export let _sessions: Map<string, { messages: { text: string; user: string }[]; createdBy: string }> = new Map();


export const load = (async ({ request, params }) => {

    return { sessions: _sessions };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request, cookies }) => {
        let data = await request.formData();
        let sessionName = data.get("sessionName")?.toString();
        let user = cookies.get("username"); // Get the username from cookies

        if (!sessionName) {
            return fail(400, { sessionName: "no name?" });
        } else if (_sessions.has(sessionName)) {
            return fail(400, { sessionName: "Session already exists." });
        }

        // Create a session with user information
        _sessions.set(sessionName, {
            messages: [],
            createdBy: user || "unknown", // Default to "unknown" if user is not set
        });
    }
};
