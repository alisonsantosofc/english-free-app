"use client";

import { useState } from "react";
import { Cake } from "lucide-react";

import { Heading } from "@/components/custom/Heading";

const PartiesPage = () => {
  const [parties, setParties] = useState([1,2,3,4,5,6,7,8,9,10]);

  return (
    <section>
      <Heading 
        title="Festas"
        description="Organize uma festa e convide sua galera."
        icon={Cake}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />
      <div className="px-4 lg:px-8">
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            {parties.map((party, i) => (
              <div key={i}>
                {`Festa ${i}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartiesPage;