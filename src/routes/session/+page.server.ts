import { PrismaClient } from '@prisma/client';
import { fail, type Actions } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const load = async () => {
    try {
        const sessions = await prisma.session.findMany({
            include: {
                messages: true,
            },
        });

        return {
            sessions,
        };
    } catch (error) {
        // Handle errors appropriately, e.g., log the error or return an error object
        throw error;
    }
};

export const actions: Actions = {
    create: async ({ request, cookies }) => {
        let data = await request.formData();
        let sessionName = data.get("sessionName")?.toString();
        let user = cookies.get("username"); // Get the username from cookies

        if (!sessionName) {
            return fail(400, { sessionName: "no name?" });
        }

        // Create a session in the database
        try {
            await prisma.session.create({
                data: {
                    name: sessionName,
                    createdBy: user || "unknown",
                },
            });
        } catch (error) {
            return fail(500, { sessionName: "Error creating session" });
        }
    },
};
