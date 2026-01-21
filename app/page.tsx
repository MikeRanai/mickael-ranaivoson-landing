import * as React from "react";
import { Hero } from "@/components/Hero";
import {
  ArrowRight,
  Code,
  Component,
  Rocket,
  Server,
  Smartphone,
  Tablet,
} from "lucide-react";

const services = [
  {
    icon: <Rocket className="w-8 h-8 text-[#ffa800]" />,
    title: "Développement Next.js 15",
    description: "Applications ultra-rapides et optimisées pour le SEO.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Component className="w-8 h-8 text-[#ffa800]" />,
    title: "Composants Réutilisables",
    description: "Avec Tailwind CSS et Framer Motion pour un design system cohérent.",
    colSpan: "md:col-span-2",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-[#ffa800]" />,
    title: "Responsive Design",
    description: "Une expérience parfaite sur mobile, tablette et desktop.",
    colSpan: "md:col-span-2",
  },
  {
    icon: <Server className="w-8 h-8 text-[#ffa800]" />,
    title: "Intégration API & Backend",
    description: "Connexion à vos sources de données et services externes.",
    colSpan: "md:col-span-1",
  },
];

const ServiceCard = ({
  icon,
  title,
  description,
  colSpan,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  colSpan: string;
}) => (
  <div
    className={`bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-white/10 flex flex-col space-y-4 ${colSpan}`}
  >
    <div className="flex items-center space-x-4">
      {icon}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
    <a
      href="#"
      className="text-[#ffa800] hover:underline flex items-center pt-2"
    >
      En savoir plus <ArrowRight className="w-4 h-4 ml-2" />
    </a>
  </div>
);


export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-black">
      <Hero />
      <section id="services" className="w-full px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
            Mes Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}