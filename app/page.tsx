import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { TechStack } from "@/components/layout/TechStack";
import { Pricing } from "@/components/layout/Pricing";
import { Realizations } from "@/components/layout/Realizations";
import { Contact } from "@/components/layout/Contact";
import { About } from "@/components/layout/About";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#153d6e]">
      <Hero />
      <TechStack />
      <Solutions />
      <Realizations />
      <About />
      <Pricing />
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </main>
  );
}