export const FORM_STORAGE_KEY = "conference-form-data";
export const TICKETS_STORAGE_KEY = "conference-tickets";

/**
 * Generates a unique ticket ID.
 */
const generateTicketId = (): string => {
  return `TICKET-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

/**
 * Saves form data to localStorage.
 */
export const saveFormData = (formData: { fullName: string; email: string; avatarUrl: string }) => {
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
};

/**
 * Loads form data from localStorage.
 */
export const loadFormData = (): { fullName: string; email: string; avatarUrl: string } => {
  const storedData = localStorage.getItem(FORM_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : { fullName: "", email: "", avatarUrl: "" };
};

/**
 * Clears form data from localStorage.
 */
export const clearFormData = () => {
  localStorage.removeItem(FORM_STORAGE_KEY);
};

/**
 * Saves a new ticket to localStorage with a unique ID.
 */
export const saveTicket = (formData: { fullName: string; email: string; avatarUrl: string }) => {
  const ticketId = generateTicketId();
  const newTicket = {
    ...formData,
    ticketId,
    createdAt: new Date().toISOString(),
  };

  const existingTickets = loadAllTickets();
  existingTickets.push(newTicket);

  localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(existingTickets));
};

/**
 * Loads all stored tickets from localStorage.
 */
export const loadAllTickets = (): { 
  ticketId: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
}[] => {
  const storedTickets = localStorage.getItem(TICKETS_STORAGE_KEY);
  return storedTickets ? JSON.parse(storedTickets) : [];
};

/**
 * Loads the most recently generated ticket.
 */
export const loadLatestTicket = () => {
  const tickets = loadAllTickets();
  return tickets.length > 0 ? tickets[tickets.length - 1] : null;
};

/**
 * Deletes a specific ticket by ticketId.
 */
export const deleteTicket = (ticketId: string) => {
  const updatedTickets = loadAllTickets().filter(ticket => ticket.ticketId !== ticketId);
  localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(updatedTickets));
};

/**
 * Clears all saved tickets from localStorage.
 */
export const clearAllTickets = () => {
  localStorage.removeItem(TICKETS_STORAGE_KEY);
};
