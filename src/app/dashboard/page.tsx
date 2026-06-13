"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Calendar, Users, TrendingUp, DollarSign, Award } from "lucide-react";
import Link from "next/link";
import { eventos, dashboardStats, formatCurrency, getTotalBudget } from "@/lib/data";

const monthlyData = [
  { mes: "Jan", eventos: 0, participantes: 0 },
  { mes: "Fev", eventos: 0, participantes: 0 },
  { mes: "Mar", eventos: 0, participantes: 0 },
  { mes: "Abr", eventos: 1, participantes: 3842 },
  { mes: "Mai", eventos: 0, participantes: 0 },
  { mes: "Jun", eventos: 0, participantes: 0 },
  { mes: "Jul", eventos: 0, participantes: 0 },
  { mes: "Ago", eventos: 1, participantes: 389 },
  { mes: "Set", eventos: 1, participantes: 1847 },
  { mes: "Out", eventos: 1, participantes: 492 },
  { mes: "Nov", eventos: 0, participantes: 0 },
  { mes: "Dez", eventos: 1, participantes: 620 },
];

const categoryData = [
  { name: "Saúde e Bem-estar", value: 1, color: "#10B981" },
  { name: "Científico", value: 2, color: "#6366F1" },
  { name: "Cooperativismo", value: 1, color: "#00A859" },
  { name: "Esportivo", value: 1, color: "#F59E0B" },
  { name: "Institucional", value: 1, color: "#8B5CF6" },
  { name: "Capacitação", value: 1, color: "#0EA5E9" },
];

const npsEvolution = [
  { evento: "Semana Saúde", nps: 64 },
  { evento: "Congresso", nps: 76 },
  { evento: "Dia Coop.", nps: 86 },
  { evento: "Corrida", nps: 73 },
  { evento: "Confrat.", nps: 82 },
];

export default function DashboardPage() {
  const completedEvents = eventos.filter((e) => e.status === "Concluído");
  const totalBudget = completedEvents.reduce((acc, e) => {
    const b = getTotalBudget(e);
    return { planejado: acc.planejado + b.planejado, realizado: acc.realizado + b.realizado };
  }, { planejado: 0, realizado: 0 });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 rounded-full" style={{ background: "#00A859" }} />
          <span className="text-sm font-medium text-gray-500">Visão analítica</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Indicadores e resultados consolidados de eventos</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Eventos Realizados", value: "5", sub: "em 2024", icon: Calendar, color: "#00A859" },
          { label: "Total Participantes", value: "7.090", sub: "impacto direto", icon: Users, color: "#6366F1" },
          { label: "NPS Médio", value: "74,2", sub: "excelente desempenho", icon: TrendingUp, color: "#F59E0B" },
          {
            label: "Orçamento Executado",
            value: formatCurrency(totalBudget.realizado),
            sub: `de ${formatCurrency(totalBudget.planejado)} planejado`,
            icon: DollarSign,
            color: "#EF4444",
          },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
                <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
                <p className="text-xs text-gray-400 mt-1">{sub}</p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Participants */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Participantes por Mês (2024)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [Number(v).toLocaleString("pt-BR"), "Participantes"]} />
              <Bar dataKey="participantes" fill="#00A859" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* NPS Evolution */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Evolução do NPS</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={npsEvolution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="evento" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="nps"
                stroke="#00A859"
                strokeWidth={3}
                dot={{ fill: "#00A859", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Eventos por Categoria</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name }) => (name ?? "").split(" ")[0]}>
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                <span className="text-gray-600">{c.name}</span>
                <span className="ml-auto font-semibold">{c.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Comparison */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Orçamento: Planejado vs Realizado</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={completedEvents.map((e) => {
                const b = getTotalBudget(e);
                return {
                  name: e.titulo.length > 18 ? e.titulo.substring(0, 18) + "…" : e.titulo,
                  Planejado: b.planejado,
                  Realizado: b.realizado,
                };
              })}
              margin={{ bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
              <YAxis tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="Planejado" fill="#6366F1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Realizado" fill="#00A859" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Events Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Award className="w-5 h-5" style={{ color: "#00A859" }} />
          <h3 className="font-bold text-gray-900">Ranking de Eventos por NPS</h3>
        </div>
        <table className="w-full text-sm">
          <thead style={{ background: "#F9FAFB" }}>
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-gray-500">#</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-500">Evento</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-500">Categoria</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-500">Participantes</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-500">NPS</th>
            </tr>
          </thead>
          <tbody>
            {[...completedEvents]
              .filter((e) => e.pesquisa.nps.score > 0)
              .sort((a, b) => b.pesquisa.nps.score - a.pesquisa.nps.score)
              .map((e, i) => (
                <tr key={e.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <span className="w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold text-white" style={{ background: i === 0 ? "#F59E0B" : i === 1 ? "#9CA3AF" : "#CD7C32" }}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/eventos/${e.id}`} className="font-medium text-gray-900 hover:underline" style={{ color: "#007A3D" }}>
                      {e.titulo}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{e.categoria}</td>
                  <td className="px-6 py-4 text-right text-gray-700">{e.participantes.toLocaleString("pt-BR")}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-lg" style={{ color: "#00A859" }}>
                      {e.pesquisa.nps.score}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
