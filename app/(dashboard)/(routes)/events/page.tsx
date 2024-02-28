"use client";

import { useState } from "react";
import { PartyPopper } from "lucide-react";

import { Heading } from "@/components/custom/Heading";

const EventsPage = () => {
  const [parties, setParties] = useState([1,2,3,4,5,6,7,8,9,10]);

  return (
    <section>
      <Heading 
        title="Eventos"
        description="Organize seus eventos e convide seus amigos."
        icon={PartyPopper}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            {parties.map((party, i) => (
              <div key={i}>
                {`Evento ${i}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventsPage;