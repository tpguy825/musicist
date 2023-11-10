import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import * as openpgp from "openpgp";
import { z } from "zod";
import { db } from "./db";
import { accounts } from "./db/schema";
import { env } from "./env";
import { spotify } from "./spotify";

async function encrypt(data: string) {
	return openpgp.encrypt({
		message: await openpgp.createMessage({ text: new Bun.SHA512_256().update(data).digest("hex") }),
		format: "armored",
		passwords: [env.PGP_KEY],
	});
}

const app = new Elysia()
	.use(jwt({ secret: env.JWT_SECRET }))
	.use(
		cors({
			origin: [/\*.musicist.uk$/, /\*.musicist.uk:\d+$/, /localhost:\d+$/],
		}),
	)
	.get("/", () => "Hello World!")
	.post(
		"/login",
		async ({ body, set }) => {
			const matchingemail = await db.select().from(accounts).where(eq(accounts.email, body.email)).all();
			if (matchingemail.length > 0) {
				const encrypted = await encrypt(body.password);
				if (matchingemail.filter((a) => a.password === encrypted).length > 0) {
					set.status = 200;
					return { success: true };
				} else {
					set.status = 400;
					return { success: false, error: "Invalid Password" };
				}
			} else {
				set.status = 400;
				return { success: false, error: "Invalid Email" };
			}
		},
		{
			body: t.Object({
				email: t.String(),
				password: t.String(),
			}),
		},
	)
	.post(
		"/register",
		async ({
			body,
			set,
			jwt,
		}): Promise<{ success: true; token: string } | { success: false; error: string }> => {
			set.headers = { "Content-Type": "application/json" };
			const matchingemail = await db.select().from(accounts).where(eq(accounts.email, body.email)).all();
			if (matchingemail.length > 0) {
				set.status = 400;
				return { success: false, error: "Email already in use" };
			} else {
				const zodemail = z.string().email().safeParse(body.email);
				const zodpassword = z.string().min(8).safeParse(body.password);
				const zodusername = z
					.string()
					.min(3)
					.max(25)
					.regex(/^[a-zA-Z0-9-_]+$/)
					.safeParse(body.username.trim());

				if (!zodemail.success) {
					set.status = 400;
					return { success: false, error: "Invalid Email" };
				}
				if (!zodpassword.success) {
					set.status = 400;
					return { success: false, error: "Invalid Password" };
				}
				if (!zodusername.success) {
					set.status = 400;
					return { success: false, error: "Invalid Username" };
				}

				const encrypted = await encrypt(zodpassword.data);
				await db
					.insert(accounts)
					.values({
						email: zodemail.data,
						password: encrypted,
						username: zodusername.data,
						emailVerified: false,
					})
					.run();
				const newtoken = await jwt.sign({ email: body.email, username: body.username });
				set.status = 200;
				return { success: true, token: newtoken };
			}
		},
		{
			body: t.Object({
				email: t.String(),
				password: t.String(),
				username: t.String(),
			}),
		},
	)
	.post(
		"/search",
		async ({ query }) => {
			const results = spotify.search(query.q);
			return results;
		},
		{
			query: t.Object({
				q: t.String(),
			}),
		},
	)

	.listen(3000, ({ port }) => {
		console.log("Listening on http://localhost:" + port);
	});

export type App = typeof app;
