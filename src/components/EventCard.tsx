import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { Event } from "@/lib/data";

const statusColors: Record<string, { bg: string; text: string }> = {
  Concluído: { bg: "#E8F5EE", text: "#007A3D" },
  "Em andamento": { bg: "#FEF3C7", text: "#D97706" },
  Planejado: { bg: "#EFF6FF", text: "#2563EB" },
  Cancelado: { bg: "#FEE2E2", text: "#DC2626" },
};

const categoryColors: Record<string, string> = {
  "Saúde e Bem-estar": "#10B981",
  Científico: "#6366F1",
  Cooperativismo: "#00A859",
  Esportivo: "#F59E0B",
  Institucional: "#8B5CF6",
  Capacitação: "#0EA5E9",
};

function formatDate(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function EventCard({ event }: { event: Event }) {
  const status = statusColors[event.status] ?? { bg: "#F3F4F6", text: "#6B7280" };
  const catColor = categoryColors[event.categoria] ?? "#6B7280";

  return (
    <Link href={`/eventos/${event.id}`}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer">
        {/* Color bar */}
        <div className="h-2" style={{ background: catColor }} />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${catColor}18`, color: catColor }}
            >
              {event.categoria}
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
              style={{ background: status.bg, color: status.text }}
            >
              {event.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 group-hover:text-green-700 transition-colors">
            {event.titulo}
          </h3>

          {/* Meta */}
          <div className="space-y-1.5 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{formatDate(event.dataInicio)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{event.local}</span>
            </div>
            {event.participantes > 0 && (
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{event.participantes.toLocaleString("pt-BR")} participantes</span>
              </div>
            )}
          </div>

          {/* NPS */}
          {event.pesquisa.nps.score > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">NPS</span>
              <span className="text-sm font-bold" style={{ color: "#00A859" }}>
                {event.pesquisa.nps.score}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
