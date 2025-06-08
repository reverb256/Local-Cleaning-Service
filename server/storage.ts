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

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private quotes: Map<number, Quote> = new Map();
  private contacts: Map<number, Contact> = new Map();
  private bookings: Map<number, Booking> = new Map();
  private chatSessions: Map<string, ChatSession> = new Map();
  private apiLimits: Map<string, ApiLimit> = new Map();
  private currentId: number = 1;

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Quote methods
  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentId++;
    const quote: Quote = {
      id,
      name: insertQuote.name,
      email: insertQuote.email,
      phone: insertQuote.phone ?? null,
      address: insertQuote.address ?? null,
      squareFootage: insertQuote.squareFootage,
      frequency: insertQuote.frequency,
      serviceType: insertQuote.serviceType,
      additionalServices: insertQuote.additionalServices ?? null,
      estimatedPrice: insertQuote.estimatedPrice,
      status: "pending",
      createdAt: new Date()
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getQuoteById(id: number): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async updateQuoteStatus(id: number, status: string): Promise<void> {
    const quote = this.quotes.get(id);
    if (quote) {
      quote.status = status;
      this.quotes.set(id, quote);
    }
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const contact: Contact = {
      id,
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      phone: insertContact.phone ?? null,
      subject: insertContact.subject ?? null,
      message: insertContact.message,
      status: "new",
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async updateContactStatus(id: number, status: string): Promise<void> {
    const contact = this.contacts.get(id);
    if (contact) {
      contact.status = status;
      this.contacts.set(id, contact);
    }
  }

  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentId++;
    const booking: Booking = {
      id,
      contactName: insertBooking.contactName,
      company: insertBooking.company ?? null,
      email: insertBooking.email,
      phone: insertBooking.phone,
      address: insertBooking.address,
      preferredDate: insertBooking.preferredDate ?? null,
      frequency: insertBooking.frequency,
      serviceType: insertBooking.serviceType,
      specialRequirements: insertBooking.specialRequirements ?? null,
      status: "pending",
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async updateBookingStatus(id: number, status: string): Promise<void> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
    }
  }

  // Chat session methods
  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const id = this.currentId++;
    const session: ChatSession = {
      id,
      sessionId: insertSession.sessionId,
      messages: insertSession.messages ?? null,
      status: "active",
      createdAt: new Date()
    };
    this.chatSessions.set(insertSession.sessionId, session);
    return session;
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    return this.chatSessions.get(sessionId);
  }

  async updateChatMessages(sessionId: string, messages: string[]): Promise<void> {
    const session = this.chatSessions.get(sessionId);
    if (session) {
      session.messages = messages;
      this.chatSessions.set(sessionId, session);
    }
  }

  // API rate limiting methods
  async getApiLimit(endpoint: string): Promise<ApiLimit | undefined> {
    return this.apiLimits.get(endpoint);
  }

  async updateApiLimit(endpoint: string, requestCount: number): Promise<void> {
    const limit = this.apiLimits.get(endpoint);
    if (limit) {
      limit.requestCount = requestCount;
      this.apiLimits.set(endpoint, limit);
    } else {
      const id = this.currentId++;
      const newLimit: ApiLimit = {
        id,
        endpoint,
        requestCount,
        lastReset: new Date(),
        maxRequests: 100,
        windowMs: 3600000,
      };
      this.apiLimits.set(endpoint, newLimit);
    }
  }

  async resetApiLimit(endpoint: string): Promise<void> {
    const limit = this.apiLimits.get(endpoint);
    if (limit) {
      limit.requestCount = 0;
      limit.lastReset = new Date();
      this.apiLimits.set(endpoint, limit);
    }
  }
}

import { db } from "./db";
import { eq } from "drizzle-orm";

// DatabaseStorage implementation
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
      .values({
        ...insertQuote,
        status: "pending",
        createdAt: new Date()
      })
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
    await db.update(quotes).set({ status }).where(eq(quotes.id, id));
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values({
        ...insertContact,
        status: "new",
        createdAt: new Date()
      })
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
    await db.update(contacts).set({ status }).where(eq(contacts.id, id));
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values({
        ...insertBooking,
        status: "pending",
        createdAt: new Date()
      })
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
    await db.update(bookings).set({ status }).where(eq(bookings.id, id));
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const [session] = await db
      .insert(chatSessions)
      .values({
        ...insertSession,
        status: "active",
        createdAt: new Date()
      })
      .returning();
    return session;
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.sessionId, sessionId));
    return session || undefined;
  }

  async updateChatMessages(sessionId: string, messages: string[]): Promise<void> {
    await db.update(chatSessions).set({ messages }).where(eq(chatSessions.sessionId, sessionId));
  }

  async getApiLimit(endpoint: string): Promise<ApiLimit | undefined> {
    const [limit] = await db.select().from(apiLimits).where(eq(apiLimits.endpoint, endpoint));
    return limit || undefined;
  }

  async updateApiLimit(endpoint: string, requestCount: number): Promise<void> {
    const existingLimit = await this.getApiLimit(endpoint);
    
    if (existingLimit) {
      await db.update(apiLimits)
        .set({ 
          requestCount,
          lastReset: new Date()
        })
        .where(eq(apiLimits.endpoint, endpoint));
    } else {
      await db.insert(apiLimits)
        .values({
          endpoint,
          requestCount,
          lastReset: new Date()
        });
    }
  }

  async resetApiLimit(endpoint: string): Promise<void> {
    await db.update(apiLimits)
      .set({ 
        requestCount: 0,
        lastReset: new Date()
      })
      .where(eq(apiLimits.endpoint, endpoint));
  }
}

export const storage = new DatabaseStorage();
