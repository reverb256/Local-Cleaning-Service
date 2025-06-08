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
      ...insertQuote,
      id,
      status: "pending",
      createdAt: new Date(),
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
      ...insertContact,
      id,
      status: "new",
      createdAt: new Date(),
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
      ...insertBooking,
      id,
      status: "pending",
      createdAt: new Date(),
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
      ...insertSession,
      id,
      status: "active",
      createdAt: new Date(),
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

export const storage = new MemStorage();
