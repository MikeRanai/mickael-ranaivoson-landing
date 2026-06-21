import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminProject } from "@/actions/project.actions";
import { notFound } from "next/navigation";
import ProjectForm, { type ExistingProject } from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getAdminProject(id);
  if (!project) notFound();

  const formValues: ExistingProject = {
    id: project.id,
    title: project.title,
    tag: project.tag,
    description: project.description,
    imageUrl: project.imageUrl,
    url: project.url,
    ctaLabel: project.ctaLabel,
    accentColor: project.accentColor,
    featured: project.featured,
    bullets: project.bullets ?? [],
    kpis: (project.kpis as ExistingProject["kpis"]) ?? null,
    displayOrder: project.displayOrder,
    published: project.published,
    slug: project.slug,
    content: project.content,
    role: project.role,
    year: project.year,
    sector: project.sector,
    techStack: project.techStack ?? [],
  };

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#ffa800] mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux projets
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Modifier le projet</h1>
      </div>

      <ProjectForm project={formValues} />
    </div>
  );
}
