import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export default function SectionWrapper({ id, children, className = "", dark }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 px-6 overflow-hidden ${
        dark ? "bg-magic-deeper" : ""
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </section>
  );
}
