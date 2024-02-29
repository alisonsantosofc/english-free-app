"use client";

import axios from "axios";
import { PlaySquare } from "lucide-react";

import { Heading } from "@/components/custom/Heading";
import { useEffect, useState } from "react";
import { ILesson } from "@/features/lessons/@types/ILesson";
import { EnglishLevelCard } from "@/features/lessons/EnglishLevelCard";

interface ILevel {
  level: string;
  description: string;
  lessons: ILesson[];
}

const LessonsPage = () => {
  const [levels, setLevels] = useState<ILevel[]>([]);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const response = await axios.get("/api/lessons");

        const lessons = response.data as ILesson[];

        const a1 = {
          level: "a1",
          description: "Iniciante",
          lessons: lessons.filter((lesson) => lesson.level === "a1"),
        }

        const a2 = {
          level: "a2",
          description: "Básico",
          lessons: lessons.filter((lesson) => lesson.level === "a2"),
        }

        setLevels([a1, a2]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLessons();
  }, []);

  return (
    <section>
      <Heading 
        title="Aulas de inglês grátis"
        description="Assista as melhores aulas gravadas no YouTube, selecionadas por níveis de inglês."
        icon={PlaySquare}
        bgColor="bg-red-500"
      />
      <div className="px-4 lg:px-8">
        <div className="space-y-4 mt-4">
          {!levels.length ? 'Carregando...' : (
            levels.map((level, i) => (
              <EnglishLevelCard 
                key={i}
                level={level.level} 
                description={level.description} 
                lessons={level.lessons}
              />
            ))
          )} 
        </div>
      </div>
    </section>
  );
}

export default LessonsPage;