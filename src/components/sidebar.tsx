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
  AlignJustify as TextAlignJustify,
  ShieldAlert as ShieldUser,
  Archive,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Role, MenuItem } from "@/types";

const menuItems: MenuItem[] = [
  { icon: Home, label: "Início", href: "/dashboard" },

  {
    icon: ShieldUser,
    label: "Admin",
    href: "/dashboard/admin",
    subItems: [
      { label: "Listar", href: "/dashboard/admin/listar" },
      { label: "Excluir Usuário", href: "/dashboard/admin/excluir" },
      { label: "Editar", href: "/dashboard/admin/editar" },
      { label: "Roles", href: "/dashboard/admin/roles" },
    ],
    rolesPermitidas: [Role.SUPER_ADMIN],
  },
  {
    icon: Users,
    label: "Usuários",
    href: "/dashboard/users",
    subItems: [
      { label: "Listar", href: "/dashboard/users/listar" },
      { label: "Adicionar", href: "/dashboard/users/adicionar" },
      { label: "Editar", href: "/dashboard/users/editar" },
      { label: "Roles", href: "/dashboard/users/roles" },
    ],
    rolesPermitidas: [Role.ADMIN, Role.SUPER_ADMIN],
  },

  {
    icon: Puzzle,
    label: "Pacientes",
    href: "/dashboard/pacientes",
    subItems: [
      {
        label: "Atendimento",
        href: "/dashboard/pacientes/atendimento",
        disabled: true,
      },
      {
        label: "Adicionar",
        href: "/dashboard/pacientes/adicionar",
        disabled: true,
      },
      { label: "Editar", href: "/dashboard/pacientes/editar", disabled: true },
    ],
    rolesPermitidas: [
      Role.ADMIN,
      Role.ATENDENTE,
      Role.PSICOLOGO,
      Role.SUPER_ADMIN,
    ],
  },

  {
    icon: Briefcase,
    label: "Cargos",
    href: "/dashboard/cargos",
    rolesPermitidas: [Role.ADMIN, Role.SUPER_ADMIN],
  },

  {
    icon: Archive,
    label: "Relatórios",
    href: "/dashboard/relatorio",
    rolesPermitidas: [Role.ADMIN, Role.PSICOLOGO, Role.SUPER_ADMIN],
  },
  {
    icon: ClipboardList,
    label: "Formularios",
    href: "/dashboard/formulario",
    subItems: [
      { label: "Unimed", href: "/dashboard/formulario/unimed" },
      { label: "Prefeitura", href: "/dashboard/formulario/prefeitura" },
    ],
    rolesPermitidas: [Role.ADMIN, Role.PSICOLOGO, Role.SUPER_ADMIN],
  },

  { icon: FileText, label: "Documentos", href: "/dashboard/documents" },

  {
    icon: Settings,
    label: "Configurações",
    href: "/dashboard/settings",
    rolesPermitidas: [Role.SUPER_ADMIN],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout } = useAuth();
  const role = useAuth().getRole();

  const toggleExpanded = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const filteredMenu = menuItems.filter(
    (item) =>
      !item.rolesPermitidas || item.rolesPermitidas.includes(role as Role)
  );

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
          {filteredMenu.map((item) => {
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
                        {item.subItems?.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          const isDisabled = subItem.disabled;

                          return (
                            <Link
                              key={subItem.href}
                              href={isDisabled ? "#" : subItem.href}
                              onClick={(e) => {
                                if (isDisabled) {
                                  e.preventDefault();
                                  return;
                                }
                                setIsMobileOpen(false);
                              }}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isDisabled
                                  ? "cursor-not-allowed opacity-50"
                                  : isSubActive
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              )}
                              aria-disabled={isDisabled}
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
              logout();
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
