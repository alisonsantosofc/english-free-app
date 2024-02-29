"use client";

import { ArrowRight, CalendarCheck, CheckSquare, AlarmClock, FileHeart, FileClock, FileCheck, FileCheck2} from "lucide-react";

import { Heading } from "@/components/custom/Heading";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const studySchedules = [
  {
    id: 1,
    months: 3,
    weeks: 13,
    minimumMinutesPerDay: 60,
    description: "Para quem tem mais urgência e precisa aprender mais rápido para um uso específico.",
    tags: ["Rápido", "Intensivo"],
    icon: FileClock,
  },
  {
    id: 2,
    months: 6,
    weeks: 26,
    minimumMinutesPerDay: 45,
    description: "Para quem tem mais tempo para aprender e precisa colocar em prática.",
    tags: ["Equilibrado", "Perfeito"],
    icon: FileHeart,
  },
  {
    id: 3,
    months: 12,
    weeks: 52,
    minimumMinutesPerDay: 30,
    description: "Para quem tem pouco tempo para aprender e tem a vida corrida, mais precisa aprender e praticar.",
    tags: ["Imersivo", "Completo"],
    icon: FileCheck2,
  }
]

const SchedulesPage = () => {
  return (
    <section className="h-full">
      <Heading 
        title="Cronogramas de estudo"
        description="Organize melhor seus estudos e aprenda inglês em até 12 meses."
        icon={CalendarCheck}
        bgColor="bg-blue-800"
      />
      <div className="px-4 lg:px-8">
        <div className="space-y-4 mt-16">
          <div className="w-full h-[600px] flex gap-8 lg:gap-16">
            {studySchedules.map((schedule) => (
              <div key={schedule.id} className={cn("flex flex-col flex-1 items-center p-6 pt-10 rounded-2xl border-4 border-blue-500 bg-blue-800 text-white")}>
               <schedule.icon className={cn("h-10 w-10 md:h-28 md:w-28", "text-white")} />
                
                <h4 className="font-medium text-2xl mb-2 mt-8">
                  {`Aprender em ${schedule.months} meses`}
                </h4>

                <div className="flex gap-2 items-center mb-8">
                  <span>{schedule.tags[0].toUpperCase()}</span>
                  <span className="inline-block min-h-4 min-w-[1px] bg-white"></span>
                  <span>{schedule.tags[1].toUpperCase()}</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <p>
                    <strong>{'Tempo estimado: '}</strong>{schedule.minimumMinutesPerDay} minutos por dia.
                  </p>

                  <p>
                    <strong>{'Resultado em: '}</strong>{schedule.weeks} semanas.
                  </p>

                  <p>
                    {schedule.description}
                  </p>
                </div>

                <div className="mt-16">
                  <Button 
                    className="flex gap-2 bg-blue-300/80 text-blue-900 hover:bg-blue-300"
                  >
                    <span>{`Usar cronograma de ${schedule.months} meses`}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SchedulesPage;