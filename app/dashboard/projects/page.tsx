import Link from "next/link";
import { getAdminProjects } from "@/actions/project.actions";
import ProjectsTable from "@/components/admin/ProjectsTable";
import { Plus } from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();
  const publishedCount = projects.filter((p) => p.published).length;
  const rows = projects.map((p) => ({
    id: p.id,
    title: p.title,
    tag: p.tag,
    url: p.url,
    featured: p.featured,
    published: p.published,
    displayOrder: p.displayOrder,
    isCaseStudy: Boolean(p.slug && p.content),
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Projets</h1>
          <p className="text-sm text-slate-400 mt-1">
            {projects.length} projet{projects.length > 1 ? "s" : ""} —{" "}
            {publishedCount} publié{publishedCount > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#ffa800] text-slate-950 font-semibold hover:bg-[#ffb92e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouveau projet
        </Link>
      </div>

      <ProjectsTable projects={rows} />
    </div>
  );
}
