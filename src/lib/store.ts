/**
 * Lightweight in-memory store for form submissions.
 *
 * This replaces the previous Prisma/SQLite persistence layer so the app runs
 * with zero database dependencies. All website content is served from JSON
 * (see `src/lib/data.ts`) and form submissions are kept here in memory for the
 * lifetime of the server process.
 *
 * Note: data is reset whenever the dev server restarts.
 */

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  createdAt: string;
};

type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string | null;
  skills: string | null;
  availability: string | null;
  motivation: string | null;
  createdAt: string;
};

type EventRegistration = {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string | null;
  role: string | null;
  createdAt: string;
};

type NewsletterSubscriber = {
  id: string;
  email: string;
  createdAt: string;
};

// Module-level in-memory arrays (per server process).
const contactMessages: ContactMessage[] = [];
const volunteers: Volunteer[] = [];
const eventRegistrations: EventRegistration[] = [];
const newsletterEmails = new Map<string, NewsletterSubscriber>();

let counter = 0;
const newId = () => `sub_${Date.now()}_${counter++}`;

export const store = {
  addContactMessage(input: Omit<ContactMessage, "id" | "createdAt">): ContactMessage {
    const entry: ContactMessage = { ...input, id: newId(), createdAt: new Date().toISOString() };
    contactMessages.push(entry);
    return entry;
  },
  addVolunteer(input: Omit<Volunteer, "id" | "createdAt">): Volunteer {
    const entry: Volunteer = { ...input, id: newId(), createdAt: new Date().toISOString() };
    volunteers.push(entry);
    return entry;
  },
  addEventRegistration(input: Omit<EventRegistration, "id" | "createdAt">): EventRegistration {
    const entry: EventRegistration = { ...input, id: newId(), createdAt: new Date().toISOString() };
    eventRegistrations.push(entry);
    return entry;
  },
  addNewsletterSubscriber(email: string): NewsletterSubscriber {
    const existing = newsletterEmails.get(email);
    if (existing) return existing;
    const entry: NewsletterSubscriber = { id: newId(), email, createdAt: new Date().toISOString() };
    newsletterEmails.set(email, entry);
    return entry;
  },
  // Introspection helpers (useful for debugging / future admin views).
  listContactMessages: () => [...contactMessages],
  listVolunteers: () => [...volunteers],
  listEventRegistrations: () => [...eventRegistrations],
  listNewsletterSubscribers: () => [...newsletterEmails.values()],
};
