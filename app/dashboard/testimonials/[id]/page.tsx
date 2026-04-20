import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminTestimonial } from "@/actions/testimonial.actions";
import { notFound } from "next/navigation";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getAdminTestimonial(id);
  if (!testimonial) notFound();

  const formValues = {
    id: testimonial.id,
    authorName: testimonial.authorName,
    authorRole: testimonial.authorRole,
    location: testimonial.location ?? "",
    quote: testimonial.quote,
    metric: testimonial.metric ?? "",
    metricLabel: testimonial.metricLabel ?? "",
    photoUrl: testimonial.photoUrl,
    googleReviewUrl: testimonial.googleReviewUrl ?? "",
    displayOrder: testimonial.displayOrder,
    published: testimonial.published,
  };

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/testimonials"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#ffa800] mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux témoignages
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Modifier le témoignage
        </h1>
      </div>

      <TestimonialForm testimonial={formValues} />
    </div>
  );
}
