import { pgTable, text, serial, integer, timestamp, boolean, decimal, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  squareFootage: integer("square_footage").notNull(),
  frequency: text("frequency").notNull(),
  serviceType: text("service_type").notNull(),
  additionalServices: text("additional_services").array(),
  estimatedPrice: decimal("estimated_price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  contactName: text("contact_name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  preferredDate: timestamp("preferred_date"),
  frequency: text("frequency").notNull(),
  serviceType: text("service_type").notNull(),
  specialRequirements: text("special_requirements"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  messages: text("messages").array(),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const apiLimits = pgTable("api_limits", {
  id: serial("id").primaryKey(),
  endpoint: text("endpoint").notNull(),
  requestCount: integer("request_count").default(0),
  lastReset: timestamp("last_reset").defaultNow(),
  maxRequests: integer("max_requests").default(100),
  windowMs: integer("window_ms").default(3600000), // 1 hour
});

// Insert schemas
export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;

export type ApiLimit = typeof apiLimits.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// AI Orchestration Tables
export const aiCommands = pgTable("ai_commands", {
  id: serial("id").primaryKey(),
  adminId: text("admin_id").notNull(),
  command: text("command").notNull(),
  target: text("target").notNull(),
  action: text("action").notNull(),
  parameters: json("parameters"),
  status: text("status").notNull().default("pending"),
  result: text("result"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  executedAt: timestamp("executed_at"),
});

export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  sectionId: text("section_id").notNull().unique(),
  content: json("content").notNull(),
  metadata: json("metadata"),
  version: text("version").notNull().default("1.0"),
  isActive: boolean("is_active").default(true).notNull(),
  updatedBy: text("updated_by"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAiCommandSchema = createInsertSchema(aiCommands).omit({
  id: true,
  createdAt: true,
  executedAt: true,
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({
  id: true,
  updatedAt: true,
});

export type AiCommand = typeof aiCommands.$inferSelect;
export type InsertAiCommand = z.infer<typeof insertAiCommandSchema>;
export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;

// AI Constants
export const AI_ACTIONS = {
  UPDATE_TEXT: 'update_text',
  UPDATE_COLORS: 'update_colors',
  UPDATE_CONTACT: 'update_contact',
  UPDATE_SERVICES: 'update_services',
  UPDATE_PRICING: 'update_pricing',
  ADD_SECTION: 'add_section',
  REMOVE_SECTION: 'remove_section',
} as const;

export const AI_TARGETS = {
  HERO: 'hero',
  SERVICES: 'services',
  BUSINESS_ZONES: 'business_zones',
  SERVICE_GUARANTEE: 'service_guarantee',
  QUOTE_CALCULATOR: 'quote_calculator',
  CUSTOMERS: 'customers',
  TESTIMONIALS: 'testimonials',
  ABOUT: 'about',
  CONTACT: 'contact',
  FOOTER: 'footer',
  HEADER: 'header',
  GLOBAL: 'global',
} as const;

// Relations
import { relations } from "drizzle-orm";

export const usersRelations = relations(users, ({ many }) => ({
  quotes: many(quotes),
  contacts: many(contacts),
  bookings: many(bookings),
  chatSessions: many(chatSessions),
}));

export const quotesRelations = relations(quotes, ({ one }) => ({
  user: one(users, {
    fields: [quotes.email],
    references: [users.username],
  }),
}));

export const contactsRelations = relations(contacts, ({ one }) => ({
  user: one(users, {
    fields: [contacts.email],
    references: [users.username],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.email],
    references: [users.username],
  }),
}));

export const chatSessionsRelations = relations(chatSessions, ({ one }) => ({
  user: one(users, {
    fields: [chatSessions.sessionId],
    references: [users.username],
  }),
}));
