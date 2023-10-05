import { fail, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';
import * as crypto from "crypto";// Function to generate a new salt and hash a password
function hashPassword(password : crypto.BinaryLike) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

// Function to validate a password against a stored salt and hash
function validatePassword(inputPassword : crypto.BinaryLike, storedSalt : crypto.BinaryLike, storedHash : string) {
  const hash = crypto.pbkdf2Sync(inputPassword, storedSalt, 1000, 64, 'sha512').toString('hex');
  return storedHash === hash;
}

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
