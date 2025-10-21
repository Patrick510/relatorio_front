"use client";

import {
  Home,
  Settings,
  Users,
  FileText,
  LogOut,
  Briefcase,
  ClipboardList,
  Puzzle,
  ChevronDown,
  X,
  TextAlignJustify,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { icon: Home, label: "Início", href: "/dashboard" },
  { icon: Users, label: "Usuários", href: "/dashboard/users" },
  {
    icon: Puzzle,
    label: "Pacientes",
    href: "/dashboard/pacientes",
    subItems: [
      { label: "Adicionar", href: "/dashboard/pacientes/adicionar" },
      { label: "Editar", href: "/dashboard/pacientes/editar" },
      { label: "Excluir", href: "/dashboard/pacientes/excluir" },
    ],
  },
  { icon: Briefcase, label: "Cargos", href: "/dashboard/cargos" },
  {
    icon: ClipboardList,
    label: "Relatório",
    href: "/dashboard/relatorio",
    subItems: [
      { label: "Formulario Unimed", href: "/dashboard/relatorio/unimed" },
      {
        label: "Formulario Prefeitura",
        href: "/dashboard/relatorio/prefeitura",
      },
      { label: "Relatórios", href: "/dashboard/relatorio/relatorios" },
    ],
  },
  { icon: FileText, label: "Documentos", href: "/dashboard/documents" },
  { icon: Settings, label: "Configurações", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleExpanded = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-card p-2 shadow-lg md:hidden"
      >
        {isMobileOpen ? <X></X> : <TextAlignJustify></TextAlignJustify>}
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-card transition-transform duration-300 md:relative md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="border-b border-border p-4 md:p-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 md:h-12 md:w-12">
              <AvatarImage src="/user-profile-illustration.png" alt="Usuário" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                João Silva
              </span>
              <span className="text-xs text-muted-foreground">
                joao@exemplo.com
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3 md:p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isExpanded = expandedItem === item.label;
            const hasSubItems = "subItems" in item && item.subItems;

            return (
              <div key={item.label}>
                {hasSubItems ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                    {isExpanded && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isSubActive
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              )}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => {
                      setExpandedItem(null);
                      setIsMobileOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-border p-3 md:p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            onClick={() => {
              console.log("Logout");
            }}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Sair
          </Button>
        </div>
      </aside>
    </>
  );
}
