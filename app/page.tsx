import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { TechStack } from "@/components/layout/TechStack";
import { Pricing } from "@/components/layout/Pricing";
import { Realizations } from "@/components/layout/Realizations";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#153d6e]">
      <Hero />
      <TechStack />
      <Solutions />
      <Realizations />
      <Pricing />
    </main>
  );
}