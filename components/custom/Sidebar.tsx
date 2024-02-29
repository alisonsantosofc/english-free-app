"use client";

import { Nunito } from "next/font/google";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PlaySquare, School, CalendarCheck, Settings, GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";

const nunito = Nunito({ 
  weight: '900', 
  subsets: ["latin"], 
});

const routes = [
  {
    label: 'Área Principal',
    icon: School,
    href: '/dashboard',
  },
  {
    label: 'Aulas de inglês grátis',
    icon: PlaySquare,
    href: '/lessons',
  },
  {
    label: 'Cronogramas de estudo',
    icon: CalendarCheck,
    href: '/schedules',
  },
  {
    label: 'Certificado de inglês',
    icon: GraduationCap,
    href: '/certified',
  },
  {
    label: 'Configurações',
    icon: Settings,
    href: '/settings',
  }
]

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-950 text-white">
      <div className="px-3 py-2 flex-1">
        <Link 
          href="/dashboard" 
          className="flex items-center pl-3 mb-14"
        >
          <div className="relative w-10 h-10 mr-4">
            <Image
              fill
              alt="logo"
              src="/images/icon.svg"
            />
          </div>
          <h1 className={cn("text-3xl font-bold", nunito.className)}>
            English Free
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href} 
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition hover:text-white hover:bg-white/10",
                pathname === route.href ? "text-white bg-blue-800 hover:bg-blue-800" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 md:h-6 md:w-6 mr-3", "text-white")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}