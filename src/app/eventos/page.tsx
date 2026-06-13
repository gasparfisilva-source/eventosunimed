"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import EventCard from "@/components/EventCard";
import { eventos, EventCategory, EventStatus } from "@/lib/data";

const categories: (EventCategory | "Todas")[] = [
  "Todas",
  "Saúde e Bem-estar",
  "Científico",
  "Cooperativismo",
  "Esportivo",
  "Institucional",
  "Capacitação",
];

const statuses: (EventStatus | "Todos")[] = ["Todos", "Planejado", "Em andamento", "Concluído", "Cancelado"];

export default function EventosPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<EventCategory | "Todas">("Todas");
  const [status, setStatus] = useState<EventStatus | "Todos">("Todos");

  const filtered = eventos.filter((e) => {
    const matchSearch =
      search === "" ||
      e.titulo.toLowerCase().includes(search.toLowerCase()) ||
      e.descricao.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Todas" || e.categoria === category;
    const matchStatus = status === "Todos" || e.status === status;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 rounded-full" style={{ background: "#00A859" }} />
          <span className="text-sm font-medium text-gray-500">Catálogo completo</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
        <p className="text-gray-500 mt-1">
          {eventos.length} eventos cadastrados · {filtered.length} exibidos
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar eventos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ "--tw-ring-color": "#00A859" } as React.CSSProperties}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                category === cat
                  ? { background: "#00A859", color: "white" }
                  : { background: "#F3F4F6", color: "#6B7280" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                status === s
                  ? { background: "#1A1A1A", color: "white" }
                  : { background: "#F3F4F6", color: "#6B7280" }
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Nenhum evento encontrado</p>
          <p className="text-sm mt-1">Tente ajustar os filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
