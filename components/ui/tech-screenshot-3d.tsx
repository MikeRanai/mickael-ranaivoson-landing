import Image from "next/image";
import { cn } from "@/lib/utils";

interface TechScreenshot3DProps {
  src: string;
  alt: string;
  type: "desktop" | "mobile";
  className?: string;
}

export function TechScreenshot3D({ src, alt, type, className }: TechScreenshot3DProps) {
  return (
    <div
      className={cn(
        "relative w-full",
        {
          "aspect-video": type === "desktop",
          "aspect-[9/19.5]": type === "mobile",
        },
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain rounded-xl shadow-lg"
      />
    </div>
  );
}
