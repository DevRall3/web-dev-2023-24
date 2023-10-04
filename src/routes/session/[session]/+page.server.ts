import type { PageServerLoad } from './$types';
import { error, type Actions, HttpError_1, fail } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let currentSession : string
let messages : {text: string, user: string}[]

export const load = async ({ params, cookies }) => {
    currentSession = params.session;
    let user = cookies.get("username");


    try {
        const session = await prisma.session.findUnique({
            where: {
                name: currentSession,
            },
            include: {
                messages: true,
            },
        });

        if (!session) {
            throw error(404, "Session not found");
        }

        messages = session.messages;
    } catch (error : any) {
        throw error(404, "Session not found");
    }

    return { session: currentSession, messages, user };
};


export const actions: Actions = {
    message: async ({ request, cookies }) => {
        let user = "";
        let data = await request.formData();
        let msg = data.get("message")?.toString();
        if (!msg) {
            msg = "I agree.";
        }
        if (cookies.get("username") != undefined) {
            user = cookies.get("username")!;
        } else {
            user = "unknown";
        }

        try {
            // Find the session by name
            const session = await prisma.session.findUnique({
                where: {
                    name: currentSession,
                },
            });

            if (session) {
                // Create a message and associate it with the session
                await prisma.message.create({
                    data: {
                        text: msg,
                        user: user,
                        session: {
                            connect: {
                                id: session.id,
                            },
                        },
                    },
                });
            } else {
                return fail(404, { message: "Session not found" });
            }
        } catch (error) {
            return fail(500, { message: "Error sending message" });
        }
    }
};

