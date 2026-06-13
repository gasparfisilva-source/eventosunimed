import { notFound } from "next/navigation";
import { getEventById } from "@/lib/data";
import EventDetail from "./EventDetail";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();
  return <EventDetail event={event} />;
}
