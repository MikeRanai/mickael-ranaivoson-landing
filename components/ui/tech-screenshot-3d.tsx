import { SafariWindow } from "./safari-window";
import { PhoneMockup } from "./phone-mockup";
import { cn } from "@/lib/utils";

interface TechScreenshot3DProps {
  src: string;
  alt: string;
  type: "desktop" | "mobile";
  className?: string;
}

export function TechScreenshot3D({ src, alt, type, className }: TechScreenshot3DProps) {
  if (type === "desktop") {
    return <SafariWindow src={src} alt={alt} className={className} />;
  } else if (type === "mobile") {
    return <PhoneMockup src={src} alt={alt} className={className} />;
  }
  return null;
}
