"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, CalendarCheck, GraduationCap, PlaySquare } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: 'Aulas de inglês grátis',
    icon: PlaySquare,
    href: '/lessons',
    bgColor: 'bg-red-500',
  },
  {
    label: 'Cronogramas de estudo',
    icon: CalendarCheck,
    href: '/schedules',
    bgColor: 'bg-blue-800',
  },
  {
    label: 'Certificado de inglês',
    icon: GraduationCap,
    href: '/certified',
    bgColor: 'bg-gray-600',
  },
]

const DashboardPage = () => {
  const router = useRouter();

  return (
    <section>
      <header className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Aprenda inglês rápido seguindo um cronograma
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Você pode estudar as aulas por níveis de inglês no seu próprio tempo ou seguir um cronograma definido.
        </p>
      </header>
      <nav className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card 
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-var(--border)/5 flex items-center justify-between hover:shadow-custom transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-6 h-6 md:w-8 md:h-8 text-white")} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-zinc-500" />
          </Card>
        ))}
      </nav>
    </section>
  );
}

export default DashboardPage;