import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
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
          Nouveau témoignage
        </h1>
      </div>

      <TestimonialForm />
    </div>
  );
}
