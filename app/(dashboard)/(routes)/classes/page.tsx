"use client";

import { PlaySquare } from "lucide-react";

import { Heading } from "@/components/custom/Heading";

const ClassesPage = () => {
  return (
    <section>
      <Heading 
        title="Aulas de inglês grátis no YouTube"
        description="Assista as melhores aulas gravadas no YouTube, selecionadas por níveis de inglês."
        icon={PlaySquare}
        bgColor="bg-red-500"
      />
      <div className="px-4 lg:px-8">
        <div className="space-y-4 mt-4">
        </div>
      </div>
    </section>
  );
}

export default ClassesPage;