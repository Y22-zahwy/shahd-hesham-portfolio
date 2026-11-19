import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ViewProjectLink({
  project,
  variant = "solid",
  className = "",
}: {
  project: Project;
  variant?: "solid" | "ghost" | "light";
  className?: string;
}) {
  const styles = {
    solid: "bg-cocoa text-ivory hover:bg-rose-deep",
    ghost: "border border-cocoa/25 text-cocoa hover:border-cocoa hover:bg-cocoa hover:text-ivory",
    light: "bg-ivory text-cocoa hover:bg-peach",
  }[variant];

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Open ↗"
      aria-label={`View ${project.brand} project on ${project.linkLabel} (opens in a new tab)`}
      className={`group/link inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-colors duration-300 ${styles} ${className}`}
    >
      View Project
      <span className="relative size-4 overflow-hidden">
        <ArrowUpRight className="absolute inset-0 size-4 transition-transform duration-500 ease-out-expo group-hover/link:-translate-y-full group-hover/link:translate-x-full" />
        <ArrowUpRight className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-out-expo group-hover/link:translate-x-0 group-hover/link:translate-y-0" />
      </span>
    </a>
  );
}
