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

    deleteSession: async ({ request, cookies }) => {
        let data = await request.formData();
        let sessionId = parseInt(data.get("id")!.toString(), 10);
        const user = cookies.get("username"); // Get the username from cookies
        console.log("Hello", sessionId)
        // Check if the user is authenticated
        if (!user) {
            console.log("Unauthorized")
            return fail(401, { message: "Unauthorized" });
        }

        // Check if the user is the creator of the session
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            console.log("Session not found")
            return fail(404, { message: "Session not found" });
        }

        if (session.createdBy !== user) {
            console.log("Forbidden: You are not the creator of this session")
            return fail(403, { message: "Forbidden: You are not the creator of this session" });
        }

        // If the user is authorized, delete the session
        try {
            await prisma.session.delete({
                where: { id: sessionId },
            });

            return {
                status: 200,
                body: { message: "Session deleted successfully" },
            };
        } catch (error) {
            console.log("Error deleting session")
            console.log(error)
            return fail(500, { message: "Error deleting session" });
        }
    },
};