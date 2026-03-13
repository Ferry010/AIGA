interface DefinitionBlockProps {
  term: string;
  definition: string;
}

const DefinitionBlock = ({ term, definition }: DefinitionBlockProps) => (
  <div className="bg-accent border border-primary/20 rounded-2xl p-6 sm:p-8 my-8">
    <h3 className="text-lg font-display font-semibold text-foreground mb-3">{term}</h3>
    <p className="text-muted-foreground leading-relaxed text-sm">{definition}</p>
  </div>
);

export default DefinitionBlock;
