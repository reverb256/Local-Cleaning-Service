import { pgTable, text, timestamp, serial, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// AI Control Panel Schema
export const aiCommands = pgTable("ai_commands", {
  id: serial("id").primaryKey(),
  adminId: text("admin_id").notNull(),
  command: text("command").notNull(),
  target: text("target").notNull(), // section, component, or page
  action: text("action").notNull(), // update, add, remove, style
  parameters: json("parameters"), // JSON object with specific changes
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  result: text("result"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  executedAt: timestamp("executed_at"),
});

export const aiSessions = pgTable("ai_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  adminId: text("admin_id").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  context: json("context"), // Current conversation context
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastActivity: timestamp("last_activity").defaultNow().notNull(),
});

export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  sectionId: text("section_id").notNull().unique(),
  content: json("content").notNull(),
  metadata: json("metadata"), // styling, layout options
  version: text("version").notNull().default("1.0"),
  isActive: boolean("is_active").default(true).notNull(),
  updatedBy: text("updated_by"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aiCapabilities = pgTable("ai_capabilities", {
  id: serial("id").primaryKey(),
  capability: text("capability").notNull().unique(),
  description: text("description").notNull(),
  parameters: json("parameters"), // Available parameters for this capability
  isEnabled: boolean("is_enabled").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod schemas for validation
export const insertAiCommandSchema = createInsertSchema(aiCommands).omit({
  id: true,
  createdAt: true,
  executedAt: true,
});

export const insertAiSessionSchema = createInsertSchema(aiSessions).omit({
  id: true,
  createdAt: true,
  lastActivity: true,
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({
  id: true,
  updatedAt: true,
});

export const insertAiCapabilitySchema = createInsertSchema(aiCapabilities).omit({
  id: true,
  createdAt: true,
});

// TypeScript types
export type AiCommand = typeof aiCommands.$inferSelect;
export type InsertAiCommand = z.infer<typeof insertAiCommandSchema>;

export type AiSession = typeof aiSessions.$inferSelect;
export type InsertAiSession = z.infer<typeof insertAiSessionSchema>;

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;

export type AiCapability = typeof aiCapabilities.$inferSelect;
export type InsertAiCapability = z.infer<typeof insertAiCapabilitySchema>;

// AI Command Types
export const AI_ACTIONS = {
  UPDATE_TEXT: 'update_text',
  UPDATE_COLORS: 'update_colors',
  UPDATE_LAYOUT: 'update_layout',
  ADD_SECTION: 'add_section',
  REMOVE_SECTION: 'remove_section',
  UPDATE_IMAGES: 'update_images',
  UPDATE_PRICING: 'update_pricing',
  UPDATE_CONTACT: 'update_contact',
  UPDATE_SERVICES: 'update_services',
  UPDATE_TESTIMONIALS: 'update_testimonials',
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