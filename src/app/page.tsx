import { Calendar, Users, TrendingUp, DollarSign, ArrowRight, Award, Target } from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import EventCard from "@/components/EventCard";
import { eventos, dashboardStats, formatCurrency } from "@/lib/data";

export default function Home() {
  const recentEvents = eventos.slice(0, 4);
  const upcomingEvents = eventos.filter((e) => e.status === "Planejado" || e.status === "Em andamento");

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 rounded-full" style={{ background: "#00A859" }} />
          <span className="text-sm font-medium text-gray-500">Marketing & Inteligência de Mercado</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Central de Eventos</h1>
        <p className="text-gray-500 mt-1">Gestão estratégica dos eventos da Unimed Rio Preto</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total de Eventos"
          value={String(dashboardStats.totalEventos)}
          sub={`${dashboardStats.eventosRealizados} realizados em 2024`}
          icon={<Calendar className="w-5 h-5" />}
          color="#00A859"
        />
        <StatCard
          label="Participantes"
          value={dashboardStats.totalParticipantes.toLocaleString("pt-BR")}
          sub="Impacto direto gerado"
          icon={<Users className="w-5 h-5" />}
          color="#6366F1"
        />
        <StatCard
          label="NPS Médio"
          value={String(dashboardStats.npsMedia)}
          sub="Satisfação dos participantes"
          icon={<TrendingUp className="w-5 h-5" />}
          color="#F59E0B"
        />
        <StatCard
          label="Investimento 2024"
          value={formatCurrency(dashboardStats.orcamentoTotal)}
          sub="Orçamento consolidado"
          icon={<DollarSign className="w-5 h-5" />}
          color="#EF4444"
        />
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Projetos", desc: "Briefings e objetivos", href: "/eventos", color: "#00A859", icon: Target },
          { label: "Orçamentos", desc: "Planejado vs realizado", href: "/eventos", color: "#6366F1", icon: DollarSign },
          { label: "Pesquisas NPS", desc: "Satisfação e feedback", href: "/eventos", color: "#F59E0B", icon: Award },
          { label: "Dashboard", desc: "KPIs e resultados", href: "/dashboard", color: "#EF4444", icon: TrendingUp },
        ].map(({ label, desc, href, color, icon: Icon }) => (
          <Link key={label} href={href}>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${color}18` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <p className="font-semibold text-gray-900 text-sm">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Próximos Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Eventos Recentes</h2>
          <Link href="/eventos" className="flex items-center gap-1 text-sm font-medium" style={{ color: "#00A859" }}>
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
