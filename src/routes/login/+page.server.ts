import { fail, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

const prisma = new PrismaClient();

// körs varje gång sidan hämtas
export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

// motsvarar de forms som finns på sidan
export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();

    if (username && password) {
      const existingUser = await prisma.user.findUnique({
        where: { name: username },
      });

      if (existingUser) {
        if (password === existingUser.password) {
          // Set a cookie and redirect after successful login
          cookies.set('username', username);
          throw redirect(307, '/');
        } else {
          return fail(400, { password: 'Incorrect password.' });
        }
      } else {
        await prisma.user.create({
          data: {
            name: username,
            password: password, // Store the plain text password
          },
        });

        cookies.set('username', username);
        throw redirect(307, '/');
      }
    }

    console.log(username);
  },

  logout: async ({ request, cookies }) => {
    const username = cookies.get('username');
    if (!username) {
      return fail(400, { username: 'No username detected' });
    }

    cookies.delete('username');
  },
};
