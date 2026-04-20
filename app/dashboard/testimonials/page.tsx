import Link from "next/link";
import { getAdminTestimonials } from "@/actions/testimonial.actions";
import TestimonialsTable from "@/components/admin/TestimonialsTable";
import { Plus } from "lucide-react";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAdminTestimonials();
  const publishedCount = testimonials.filter((t) => t.published).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Témoignages</h1>
          <p className="text-sm text-slate-400 mt-1">
            {testimonials.length} témoignage{testimonials.length > 1 ? "s" : ""} —{" "}
            {publishedCount} publié{publishedCount > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/dashboard/testimonials/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#ffa800] text-slate-950 font-semibold hover:bg-[#ffb92e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouveau témoignage
        </Link>
      </div>

      <TestimonialsTable testimonials={testimonials} />
    </div>
  );
}
