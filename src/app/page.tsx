import { TicketForm } from "@/components/TicketForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <main className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          🎟 Welcome to the Conference Ticket Generator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mt-4">
          Fill out the form below to generate your conference ticket.
        </p>

        <div className="mt-6">
          <TicketForm />
        </div>
      </main>
    </div>
  );
}
