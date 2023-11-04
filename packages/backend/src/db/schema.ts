import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const accounts = sqliteTable("accounts", {
	id: integer("id").primaryKey(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	username: text("username").notNull(),
	emailVerified: int("emailVerified", { mode: "boolean" }).notNull(),
});

export const songs = sqliteTable("songs", {
	id: integer("id").primaryKey(),
	title: text("title").notNull(),
	youtubeId: text("youtubeId").notNull(),
	artist: text("artist").notNull(),
	album: text("album").notNull(),
	albumCoverUrl: text("albumCoverUrl").notNull(),
	lyrics: text("lyrics", { mode: "json" }).$type<Lyric[]>(),
});
