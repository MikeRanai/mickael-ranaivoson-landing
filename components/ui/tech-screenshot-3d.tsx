import Image from "next/image";
import { cn } from "@/lib/utils";

interface TechScreenshot3DProps {
  src: string;
  alt: string;
  className?: string;
}

export function TechScreenshot3D({ src, alt, className }: TechScreenshot3DProps) {
  return (
    <div className={cn("relative aspect-video w-full", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-xl shadow-lg"
      />
    </div>
  );
}
