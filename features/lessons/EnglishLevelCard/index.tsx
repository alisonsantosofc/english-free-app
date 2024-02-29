import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { ILesson } from "@/features/lessons/@types/ILesson";
import { useEffect, useState } from "react";
import { BookOpenCheck, GraduationCap, Languages, Lightbulb, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnglishLevelCardProps {
  level: string;
  description: string;
  lessons: ILesson[];
}

interface LevelCategory {
  title: string;
  lessons: ILesson[];
  icon: LucideIcon;
}

export function EnglishLevelCard({ level, description, lessons }: EnglishLevelCardProps) {
  const [categories, setCategories] = useState<LevelCategory[]>([]);

  useEffect(() => {
    const grammarLessons = {
      title: "Gramática",
      icon: Languages,
      lessons: lessons.filter((lesson) => lesson.category === "grammar"),
    }; 
    const vocabularyLessons = {
      title: "Vocabulário",
      icon: BookOpenCheck,
      lessons: lessons.filter((lesson) => lesson.category === "vocabulary"),
    }; 
    const topicsLesssons = {
      title: "Tópicos",
      icon: Lightbulb,
      lessons: lessons.filter((lesson) => lesson.category === "topics"),
    }; 

    setCategories([grammarLessons, vocabularyLessons, topicsLesssons]);
  }, []);
  
  return (
    <Card
      className="p-6 border-var(--border)/5 flex flex-col justify-between transition"
    >
      <h4 className="text-xl font-medium mb-4">{`${level.toUpperCase()} - ${description.toUpperCase()}`}</h4>

      <Accordion className="flex flex-col justify-center" type="single" collapsible>
        {categories.map((category, i) => (
          <AccordionItem key={i} value={`item-${i + 1}`} className="px-4">
            <AccordionTrigger>
              <div className="flex gap-1">
                <category.icon className={cn("h-5 w-5 md:h-6 md:w-6 mr-3")} />
                {category.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="grid xl:grid-cols-2 gap-2">
              {category.lessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="flex items-center px-4 py-2 border-var(--border)/5 transition hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  <div className="flex gap-3 items-center">
                    <div className="min-w-6 min-h-6 bg-blue-800 rounded-md flex justify-center items-center text-white">{lesson.priority}</div>
                    <span>{lesson.name}</span>
                  </div>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}