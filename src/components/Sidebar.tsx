"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  Users,
  FileText,
  Settings,
  Heart,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Início", icon: LayoutDashboard },
  { href: "/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#00A859" }}>
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight" style={{ color: "#007A3D" }}>
              UNIMED
            </div>
            <div className="text-xs text-gray-500 leading-tight">Rio Preto · Eventos</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
          Navegação
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              style={active ? { background: "#00A859" } : {}}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="text-xs text-gray-400">
          <div className="font-medium text-gray-500">Marketing & Intel. de Mercado</div>
          <div>Unimed Rio Preto © 2025</div>
        </div>
      </div>
    </aside>
  );
}
