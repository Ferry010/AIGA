interface SectionLabelProps {
  text: string;
}

const SectionLabel = ({ text }: SectionLabelProps) => (
  <div className="flex items-center gap-2.5 mb-4">
    <div className="w-2 h-2 bg-primary rounded-full" />
    <span className="text-xs font-medium uppercase tracking-[0.08em] text-primary font-body">
      {text}
    </span>
  </div>
);

export default SectionLabel;
