"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Clock,
  Circle,
  TrendingUp,
  Star,
  MessageSquare,
  DollarSign,
  Target,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import { Event, getTotalBudget, formatCurrency } from "@/lib/data";

const tabs = ["Projeto", "Orçamento", "Pesquisa de Satisfação", "Resultados"];

const statusColors: Record<string, { bg: string; text: string }> = {
  Concluído: { bg: "#E8F5EE", text: "#007A3D" },
  "Em andamento": { bg: "#FEF3C7", text: "#D97706" },
  Planejado: { bg: "#EFF6FF", text: "#2563EB" },
  Cancelado: { bg: "#FEE2E2", text: "#DC2626" },
};

function formatDate(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function EventDetail({ event }: { event: Event }) {
  const [activeTab, setActiveTab] = useState(0);
  const status = statusColors[event.status] ?? { bg: "#F3F4F6", text: "#6B7280" };
  const budget = getTotalBudget(event);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <Link
        href="/eventos"
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar para Eventos
      </Link>

      {/* Event Header */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "#E8F5EE", color: "#007A3D" }}
              >
                {event.categoria}
              </span>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: status.bg, color: status.text }}
              >
                {event.status}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{event.titulo}</h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">{event.descricao}</p>
          </div>
          {event.pesquisa.nps.score > 0 && (
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center"
                style={{ background: "#E8F5EE" }}
              >
                <span className="text-2xl font-bold" style={{ color: "#00A859" }}>
                  {event.pesquisa.nps.score}
                </span>
                <span className="text-xs text-gray-500">NPS</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-100 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: "#00A859" }} />
            <span>
              {formatDate(event.dataInicio)}
              {event.dataFim !== event.dataInicio && ` – ${formatDate(event.dataFim)}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: "#00A859" }} />
            <span>{event.local}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: "#00A859" }} />
            <span>{event.publicoAlvo}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm mb-6 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
            style={
              activeTab === i
                ? { background: "#00A859", color: "white" }
                : { color: "#6B7280" }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 0 && <ProjetoTab event={event} />}
      {activeTab === 1 && <OrcamentoTab event={event} budget={budget} />}
      {activeTab === 2 && <PesquisaTab event={event} />}
      {activeTab === 3 && <ResultadosTab event={event} />}
    </div>
  );
}

/* ─── Projeto Tab ─── */
function ProjetoTab({ event }: { event: Event }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Objetivos */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5" style={{ color: "#00A859" }} />
            <h3 className="font-bold text-gray-900">Objetivos Estratégicos</h3>
          </div>
          <ul className="space-y-3">
            {event.objetivos.map((obj, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-white"
                  style={{ background: "#00A859" }}
                >
                  {i + 1}
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" style={{ color: "#00A859" }} />
            <h3 className="font-bold text-gray-900">Cronograma</h3>
          </div>
          <div className="relative">
            <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-4">
              {event.timeline.map((item, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className="flex-shrink-0 relative z-10">
                    {item.status === "done" ? (
                      <CheckCircle className="w-7 h-7" style={{ color: "#00A859" }} />
                    ) : item.status === "current" ? (
                      <Circle className="w-7 h-7" style={{ color: "#F59E0B" }} fill="#FEF3C7" />
                    ) : (
                      <Circle className="w-7 h-7 text-gray-300" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs font-semibold text-gray-400">{item.data}</p>
                    <p className="text-sm text-gray-700 mt-0.5">{item.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Responsável */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Equipe</h3>
          <div className="mb-4">
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Responsável</p>
            <div className="flex items-center gap-3 mt-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: "#00A859" }}
              >
                {event.responsavel.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700">{event.responsavel}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-2">Áreas envolvidas</p>
            <div className="flex flex-wrap gap-2">
              {event.equipe.map((e) => (
                <span key={e} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg font-medium">
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Info card */}
        <div className="rounded-2xl p-6" style={{ background: "#E8F5EE" }}>
          <h3 className="font-bold mb-2" style={{ color: "#007A3D" }}>
            Público-Alvo
          </h3>
          <p className="text-sm" style={{ color: "#007A3D" }}>
            {event.publicoAlvo}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Orçamento Tab ─── */
function OrcamentoTab({
  event,
  budget,
}: {
  event: Event;
  budget: { planejado: number; realizado: number };
}) {
  const chartData = event.orcamento.map((item) => ({
    name: item.categoria.length > 20 ? item.categoria.substring(0, 20) + "…" : item.categoria,
    fullName: item.categoria,
    Planejado: item.planejado,
    Realizado: item.realizado,
  }));

  const diff = budget.realizado - budget.planejado;
  const pct = budget.planejado > 0 ? ((budget.realizado / budget.planejado) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Orçamento Planejado", value: formatCurrency(budget.planejado), color: "#6366F1" },
          {
            label: "Orçamento Realizado",
            value: budget.realizado > 0 ? formatCurrency(budget.realizado) : "—",
            color: "#00A859",
          },
          {
            label: diff >= 0 ? "Acima do orçamento" : "Economia",
            value:
              budget.realizado > 0
                ? `${formatCurrency(Math.abs(diff))} (${pct}%)`
                : "—",
            color: diff > 0 ? "#EF4444" : "#00A859",
          },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className="text-xl font-bold mt-1" style={{ color }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      {budget.realizado > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" style={{ color: "#00A859" }} />
            Planejado vs Realizado por Categoria
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" interval={0} />
              <YAxis tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value, name) => [formatCurrency(Number(value)), String(name)]}
                labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName ?? label}
              />
              <Bar dataKey="Planejado" fill="#6366F1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Realizado" fill="#00A859" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              <th className="text-left px-6 py-3 font-semibold text-gray-500">Categoria</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-500">Planejado</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-500">Realizado</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-500">Variação</th>
            </tr>
          </thead>
          <tbody>
            {event.orcamento.map((item, i) => {
              const v = item.realizado - item.planejado;
              return (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-gray-700">{item.categoria}</td>
                  <td className="px-6 py-4 text-right text-gray-700">{formatCurrency(item.planejado)}</td>
                  <td className="px-6 py-4 text-right text-gray-700">
                    {item.realizado > 0 ? formatCurrency(item.realizado) : "—"}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    {item.realizado > 0 ? (
                      <span style={{ color: v > 0 ? "#EF4444" : "#00A859" }}>
                        {v > 0 ? "+" : ""}
                        {formatCurrency(v)}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-200" style={{ background: "#F9FAFB" }}>
              <td className="px-6 py-3 font-bold text-gray-900">Total</td>
              <td className="px-6 py-3 text-right font-bold text-gray-900">
                {formatCurrency(budget.planejado)}
              </td>
              <td className="px-6 py-3 text-right font-bold text-gray-900">
                {budget.realizado > 0 ? formatCurrency(budget.realizado) : "—"}
              </td>
              <td className="px-6 py-3 text-right font-bold">
                {budget.realizado > 0 && (
                  <span style={{ color: diff > 0 ? "#EF4444" : "#00A859" }}>
                    {diff > 0 ? "+" : ""}
                    {formatCurrency(diff)}
                  </span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

/* ─── Pesquisa Tab ─── */
function PesquisaTab({ event }: { event: Event }) {
  const { pesquisa } = event;

  if (pesquisa.totalRespondentes === 0) {
    return (
      <div className="bg-white rounded-2xl p-16 border border-gray-100 shadow-sm text-center text-gray-400">
        <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="text-lg font-medium">Pesquisa ainda não disponível</p>
        <p className="text-sm mt-1">Os dados serão exibidos após a realização do evento.</p>
      </div>
    );
  }

  const npsData = [
    { name: "Promotores", value: pesquisa.nps.promotores, color: "#00A859" },
    { name: "Neutros", value: pesquisa.nps.neutros, color: "#F59E0B" },
    { name: "Detratores", value: pesquisa.nps.detratores, color: "#EF4444" },
  ];

  const radarData = pesquisa.avaliacoes.map((a) => ({
    subject: a.label.length > 20 ? a.label.substring(0, 20) + "…" : a.label,
    fullLabel: a.label,
    Nota: a.score,
  }));

  return (
    <div className="space-y-6">
      {/* NPS Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NPS Score */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
          <p className="text-sm font-medium text-gray-500 mb-3">Net Promoter Score</p>
          <div
            className="w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto mb-4"
            style={{
              background: `conic-gradient(#00A859 ${pesquisa.nps.promotores}%, #F3F4F6 0)`,
            }}
          >
            <div className="w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: "#00A859" }}>
                {pesquisa.nps.score}
              </span>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-xs">
            {npsData.map((d) => (
              <div key={d.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-gray-500">
                  {d.name}: {d.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-700 mb-3 text-center">Distribuição NPS</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={npsData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                dataKey="value"
                label={({ name, value }) => `${value}%`}
                labelLine={false}
              >
                {npsData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Respondents */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
          <Star className="w-8 h-8 mb-3" style={{ color: "#F59E0B" }} />
          <p className="text-3xl font-bold text-gray-900">{pesquisa.totalRespondentes.toLocaleString("pt-BR")}</p>
          <p className="text-sm text-gray-500 mt-1">participantes responderam</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">Nota média geral</p>
            <p className="text-2xl font-bold" style={{ color: "#00A859" }}>
              {pesquisa.avaliacoes.length > 0
                ? (
                    pesquisa.avaliacoes.reduce((a, b) => a + b.score, 0) / pesquisa.avaliacoes.length
                  ).toFixed(1)
                : "—"}
              <span className="text-sm font-normal text-gray-400">/5</span>
            </p>
          </div>
        </div>
      </div>

      {/* Ratings */}
      {pesquisa.avaliacoes.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Avaliações por Critério</h3>
            <div className="space-y-4">
              {pesquisa.avaliacoes.map((av) => (
                <div key={av.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{av.label}</span>
                    <span className="font-semibold" style={{ color: "#00A859" }}>
                      {av.score.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(av.score / 5) * 100}%`, background: "#00A859" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Radar */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Radar de Satisfação</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                <Radar name="Nota" dataKey="Nota" stroke="#00A859" fill="#00A859" fillOpacity={0.2} />
                <Tooltip formatter={(v) => [`${v}/5`]} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Comments */}
      {pesquisa.comentarios.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5" style={{ color: "#00A859" }} />
            <h3 className="font-bold text-gray-900">Comentários dos Participantes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pesquisa.comentarios.map((c, i) => (
              <div key={i} className="rounded-xl p-4 text-sm text-gray-700 leading-relaxed italic" style={{ background: "#F9FAFB", borderLeft: "3px solid #00A859" }}>
                &ldquo;{c}&rdquo;
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Resultados Tab ─── */
function ResultadosTab({ event }: { event: Event }) {
  if (event.resultados.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-16 border border-gray-100 shadow-sm text-center text-gray-400">
        <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="text-lg font-medium">Resultados ainda não disponíveis</p>
        <p className="text-sm mt-1">Os resultados serão registrados após a conclusão do evento.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {event.resultados.map((r, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 font-medium mb-1">{r.label}</p>
            <p className="text-3xl font-bold" style={{ color: "#00A859" }}>
              {r.value}
            </p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #00A859 0%, #007A3D 100%)" }}>
        <h3 className="font-bold text-white text-lg mb-4">Resumo de Impacto</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Participantes Diretos", value: event.participantes > 0 ? event.participantes.toLocaleString("pt-BR") : "—" },
            { label: "Alcance Estimado", value: event.alcance > 0 ? event.alcance.toLocaleString("pt-BR") : "—" },
            { label: "NPS Final", value: event.pesquisa.nps.score > 0 ? String(event.pesquisa.nps.score) : "—" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-xs text-green-200 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
