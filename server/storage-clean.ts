import { 
  quotes, 
  contacts, 
  bookings, 
  chatSessions, 
  apiLimits,
  users,
  type Quote, 
  type Contact, 
  type Booking, 
  type ChatSession, 
  type ApiLimit,
  type User,
  type InsertQuote, 
  type InsertContact, 
  type InsertBooking, 
  type InsertChatSession,
  type InsertUser 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Quote methods
  createQuote(quote: InsertQuote): Promise<Quote>;
  getQuotes(): Promise<Quote[]>;
  getQuoteById(id: number): Promise<Quote | undefined>;
  updateQuoteStatus(id: number, status: string): Promise<void>;

  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContactById(id: number): Promise<Contact | undefined>;
  updateContactStatus(id: number, status: string): Promise<void>;

  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  updateBookingStatus(id: number, status: string): Promise<void>;

  // Chat session methods
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(sessionId: string): Promise<ChatSession | undefined>;
  updateChatMessages(sessionId: string, messages: string[]): Promise<void>;

  // API rate limiting methods
  getApiLimit(endpoint: string): Promise<ApiLimit | undefined>;
  updateApiLimit(endpoint: string, requestCount: number): Promise<void>;
  resetApiLimit(endpoint: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const [quote] = await db
      .insert(quotes)
      .values(insertQuote)
      .returning();
    return quote;
  }

  async getQuotes(): Promise<Quote[]> {
    return await db.select().from(quotes);
  }

  async getQuoteById(id: number): Promise<Quote | undefined> {
    const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));
    return quote || undefined;
  }

  async updateQuoteStatus(id: number, status: string): Promise<void> {
    await db
      .update(quotes)
      .set({ status })
      .where(eq(quotes.id, id));
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact || undefined;
  }

  async updateContactStatus(id: number, status: string): Promise<void> {
    await db
      .update(contacts)
      .set({ status })
      .where(eq(contacts.id, id));
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async updateBookingStatus(id: number, status: string): Promise<void> {
    await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id));
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const [session] = await db
      .insert(chatSessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.sessionId, sessionId));
    return session || undefined;
  }

  async updateChatMessages(sessionId: string, messages: string[]): Promise<void> {
    await db
      .update(chatSessions)
      .set({ messages })
      .where(eq(chatSessions.sessionId, sessionId));
  }

  async getApiLimit(endpoint: string): Promise<ApiLimit | undefined> {
    const [limit] = await db.select().from(apiLimits).where(eq(apiLimits.endpoint, endpoint));
    return limit || undefined;
  }

  async updateApiLimit(endpoint: string, requestCount: number): Promise<void> {
    const existing = await this.getApiLimit(endpoint);
    
    if (existing) {
      await db
        .update(apiLimits)
        .set({ requestCount, lastReset: new Date() })
        .where(eq(apiLimits.endpoint, endpoint));
    } else {
      await db
        .insert(apiLimits)
        .values({ endpoint, requestCount, lastReset: new Date() });
    }
  }

  async resetApiLimit(endpoint: string): Promise<void> {
    await db
      .update(apiLimits)
      .set({ requestCount: 0, lastReset: new Date() })
      .where(eq(apiLimits.endpoint, endpoint));
  }
}

export const storage = new DatabaseStorage();