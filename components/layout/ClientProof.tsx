import { getPublishedProjects } from "@/actions/project.actions";

// Bande de preuve sociale orientée client (≠ TechStack qui est orienté dev).
// Alimentée par les projets publiés : ajouter un projet l'enrichit automatiquement.
export async function ClientProof() {
  const projects = await getPublishedProjects();

  // En dessous de 2 clients, une bande "ils m'ont fait confiance" fait plus faible que fort.
  if (projects.length < 2) return null;

  return (
    <section
      aria-label="Ils m'ont fait confiance"
      className="bg-slate-950 border-b border-white/5 py-10"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">
          Ils m&apos;ont fait confiance
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          {projects.map((p, i) => (
            <li key={p.id} className="inline-flex items-center gap-x-5">
              {i > 0 && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#ffa800]/60 shrink-0"
                  aria-hidden
                />
              )}
              <span className="text-slate-300 font-semibold text-base md:text-lg">
                {p.title}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-slate-600 text-sm mt-5">
          Associations, clubs et TPE de La Réunion accompagnés.
        </p>
      </div>
    </section>
  );
}

export default ClientProof;
