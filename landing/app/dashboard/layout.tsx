"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  Zap,
  TrendingUp,
  ShoppingCart,
  Key,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: CreditCard, label: "Cards", href: "/dashboard/cards" },
  { icon: ArrowLeftRight, label: "Transactions", href: "/dashboard/transactions" },
  { icon: Zap, label: "Payments", href: "/dashboard/payments" },
  { icon: TrendingUp, label: "Lending", href: "/dashboard/lending" },
  { icon: ShoppingCart, label: "BNPL", href: "/dashboard/bnpl" },
  { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
  { icon: Key, label: "API Keys", href: "/dashboard/api-keys" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("baas_auth");
    if (!auth) {
      router.replace("/login");
      return;
    }
    setUser(localStorage.getItem("baas_user") || "Partner");
  }, [router]);

  const logout = () => {
    localStorage.removeItem("baas_auth");
    localStorage.removeItem("baas_user");
    router.push("/");
  };

  const initials = user.slice(0, 2).toUpperCase() || "PA";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-[#0a0f1e] transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-white/5 px-5">
            <Image src="/upi-logo.png" alt="UPI" width={56} height={26} className="brightness-0 invert" />
            <span className="text-[11px] font-medium text-white/30 border-l border-white/10 pl-2.5">BaaS</span>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
              Platform
            </p>
            <ul className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                        active
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={16} />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User + logout */}
          <div className="border-t border-white/5 p-3">
            <div className="flex items-center gap-3 rounded-lg px-2 py-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {initials}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">{user}</p>
                <p className="text-[10px] text-gray-600">Partner account</p>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="text-gray-600 hover:text-red-400 transition-colors"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </aside>
      </>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">Partner Dashboard</h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
            </button>

            {/* User dropdown */}
            <button className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-1.5 hover:bg-gray-50 transition-colors">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {initials}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{user}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
