"use client";

import { useState } from "react";
import { PlaySquare } from "lucide-react";

import { Heading } from "@/components/custom/Heading";

const PartiesPage = () => {
  const [parties, setParties] = useState([1,2,3,4,5,6,7,8,9,10]);

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
          <div className="flex flex-col-reverse gap-y-4">
            {parties.map((party, i) => (
              <div key={i}>
                {`Aula ${i}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartiesPage;