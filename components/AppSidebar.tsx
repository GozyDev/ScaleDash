// components/app-sidebar.tsx
"use client";

import {
  ListTodo,
  StickyNote,
  FolderKanban,
  Users,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Tasks", icon: ListTodo, url: "/tasks" },
  { title: "Notes", icon: StickyNote, url: "/notes" },
  { title: "Projects", icon: FolderKanban, url: "/projects" },
  { title: "Clients", icon: Users, url: "/clients" },
];

const toolItems = [
  { title: "Search", icon: Search, url: "/search" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      className={cn(
        "bg-bgPrimary border-border/60",
        "transition-all duration-300 ease-in-out",
        "shadow-sm backdrop-blur-sm",
        "top-[65px] h-[calc(100vh-65px)]"
      )}
      collapsible="icon"
    >
      {/* Header with Logo */}
      {/* <SidebarHeader className="p-4 border-b border-border/40">
        <div className="flex items-center gap-3 group">
          <div
            className={cn(
              "flex items-center justify-center",
              "w-8 h-8 rounded-lg",
              "bg-gradient-to-br from-blue-500 to-purple-600",
              "shadow-sm group-hover:shadow-md transition-shadow"
            )}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span
              className={cn(
                "font-semibold text-sm text-foreground",
                "transition-all duration-300",
                "sidebar:opacity-0 sidebar:w-0 sidebar:min-w-0"
              )}
            >
              Kudos
            </span>
            <span
              className={cn(
                "text-xs text-muted-foreground",
                "transition-all duration-300",
                "sidebar:opacity-0 sidebar:w-0 sidebar:min-w-0"
              )}
            >
              Workspace
            </span>
          </div>
        </div>
      </SidebarHeader> */}

      <SidebarContent className="flex flex-col gap-6">
        {/* Main Navigation Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium px-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <a
                        href={item.url}
                        className={cn(
                          "flex items-center gap-3",
                          "rounded-xl px-3 py-2.5",
                          "text-sm transition-all duration-200",
                          "group relative",
                          "hover:bg-accent/5 hover:text-accent",
                          isActive && [
                            "bg-gradient-to-r from-accent/10 to-accent/5",
                            "text-accent font-medium",
                            "shadow-xs border border-accent/20",
                          ]
                        )}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full" />
                        )}

                        <item.icon
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            "group-hover:scale-110",
                            isActive ? "text-accent" : "text-muted-foreground"
                          )}
                        />

                        <span
                          className={cn(
                            "transition-all duration-300",
                            "sidebar:opacity-0 sidebar:w-0 sidebar:min-w-0"
                          )}
                        >
                          {item.title}
                        </span>

                        {/* Hover gradient effect */}
                        <div
                          className={cn(
                            "absolute inset-0 rounded-xl",
                            "bg-gradient-to-r from-accent/5 to-transparent",
                            "opacity-0 group-hover:opacity-100",
                            "transition-opacity duration-200",
                            "pointer-events-none"
                          )}
                        />
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            <SidebarMenu>
              {toolItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <a
                        href={item.url}
                        className={cn(
                          "flex items-center gap-3",
                          "rounded-xl px-3 py-2.5",
                          "text-sm transition-all duration-200",
                          "group relative",
                          "hover:bg-accent/5 hover:text-accent",
                          isActive && [
                            "bg-gradient-to-r from-accent/10 to-accent/5",
                            "text-accent font-medium",
                            "shadow-xs border border-accent/20",
                          ]
                        )}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full" />
                        )}

                        <item.icon
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            "group-hover:scale-110",
                            isActive ? "text-accent" : "text-muted-foreground"
                          )}
                        />

                        <span
                          className={cn(
                            "transition-all duration-300",
                            "sidebar:opacity-0 sidebar:w-0 sidebar:min-w-0"
                          )}
                        >
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Subtle divider */}
        <div
          className={cn(
            "border-t border-border/30 mx-3",
            "transition-all duration-300",
            "sidebar:opacity-0"
          )}
        />

        <div className="flex-1" />
      </SidebarContent>
    </Sidebar>
  );
}
