interface SectionLabelProps {
  text: string;
}

const SectionLabel = ({ text }: SectionLabelProps) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-2 h-2 bg-primary rounded-sm" />
    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary font-body">
      {text}
    </span>
  </div>
);

export default SectionLabel;
