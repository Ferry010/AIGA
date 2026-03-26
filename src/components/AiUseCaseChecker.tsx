import { useState, useMemo, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, RotateCcw, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { AnimatedSection } from "@/components/AnimatedSection";
import { aiTools, AI_CATEGORIES } from "@/data/aiTools";
import {
  useCases,
  toolUseCaseMap,
  highRiskUseCases,
  annexCategory,
  outOfScopeTools,
  alwaysHighRiskTools,
} from "@/data/useCaseData";

type Outcome = "high" | "limited" | "out-of-scope" | null;

const AiUseCaseChecker = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const outcomeRef = useRef<HTMLDivElement>(null);

  const toolsByCategory = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const cat of AI_CATEGORIES) {
      map[cat] = aiTools.filter((t) => t.category === cat).map((t) => t.name);
    }
    return map;
  }, []);

  const availableUseCases = useMemo(() => {
    if (!selectedTool) return [];
    const ids = toolUseCaseMap[selectedTool] ?? [];
    return useCases.filter((uc) => ids.includes(uc.id));
  }, [selectedTool]);

  const outcome: Outcome = useMemo(() => {
    if (!selectedTool || !selectedUseCase) return null;
    if (outOfScopeTools.includes(selectedTool)) return "out-of-scope";
    if (highRiskUseCases.has(selectedUseCase)) return "high";
    if (alwaysHighRiskTools.includes(selectedTool) && highRiskUseCases.has(selectedUseCase)) return "high";
    return "limited";
  }, [selectedTool, selectedUseCase]);

  const reset = () => {
    setSelectedTool(null);
    setSelectedUseCase(null);
  };

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
    setSelectedUseCase(null);
    setOpen(false);
  };

  const isOutOfScope = selectedTool && outOfScopeTools.includes(selectedTool);

  return (
    <AnimatedSection>
      <Card className="border-border mb-8">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            AI Use Case Checker
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            De EU AI Act categoriseert geen tools, maar toepassingen. Gebruik deze checker om te bepalen of jouw specifieke gebruik van een AI-tool onder hoog risico valt.
          </p>

          {/* Step 1 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
              <span className="text-sm font-semibold text-foreground">Kies je tool</span>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full sm:w-96 justify-between font-normal"
                >
                  {selectedTool ?? "Zoek of selecteer een AI-tool..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Zoek een tool..." />
                  <CommandList>
                    <CommandEmpty>Geen tool gevonden.</CommandEmpty>
                    {AI_CATEGORIES.map((cat) => {
                      const tools = toolsByCategory[cat];
                      if (!tools?.length) return null;
                      return (
                        <CommandGroup key={cat} heading={cat}>
                          {tools.map((tool) => (
                            <CommandItem
                              key={tool}
                              value={tool}
                              onSelect={() => handleToolSelect(tool)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedTool === tool ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {tool}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      );
                    })}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Out of scope — immediate result for Spotify/Netflix */}
          {isOutOfScope && (
            <div className="rounded-lg border border-green-500/40 bg-green-500/10 p-6">
              <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30 mb-3">
                Buiten scope voor werkgevers
              </Badge>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Consumentenapps in privécontext vallen buiten de scope van Artikel 4 voor werkgevers. Geen verplichtingen van toepassing.
              </p>
              <Button variant="ghost" size="sm" onClick={reset} className="mt-4 gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" /> Opnieuw beginnen
              </Button>
            </div>
          )}

          {/* Step 2 */}
          {selectedTool && !isOutOfScope && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                <span className="text-sm font-semibold text-foreground">Kies je toepassing</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableUseCases.map((uc) => {
                  const Icon = uc.icon;
                  const isSelected = selectedUseCase === uc.id;
                  return (
                    <button
                      key={uc.id}
                      onClick={() => {
                        setSelectedUseCase(uc.id);
                        setTimeout(() => {
                          outcomeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }, 100);
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 text-left transition-all duration-200 hover:border-primary/40 active:scale-[0.97]",
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-border bg-card"
                      )}
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent shrink-0">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground leading-tight">{uc.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{uc.sector}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3 — Outcome */}
          <div ref={outcomeRef} />
          {outcome === "high" && selectedUseCase && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-6">
              <Badge className="bg-destructive/20 text-destructive border-destructive/30 mb-3">
                Hoog risico — Bijlage III van toepassing
              </Badge>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                Dit gebruik valt onder hoog risico (Bijlage III EU AI Act)
              </h3>
              <p className="text-sm font-medium text-foreground/80 mb-4">
                {annexCategory[selectedUseCase]}
              </p>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-destructive font-bold">•</span>
                  <span><strong>Menselijk toezicht verplicht</strong> — beslissingen mogen niet volledig aan AI worden overgelaten</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive font-bold">•</span>
                  <span><strong>Documentatieplicht</strong> — je moet kunnen aantonen hoe het systeem werkt en welke data gebruikt is</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive font-bold">•</span>
                  <span><strong>Transparantie</strong> — betrokkenen (kandidaten, klanten, patiënten) moeten geïnformeerd worden over AI-gebruik</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <Link to="/training" className="gap-1.5">
                    Bekijk de AIGA-certificering <ArrowRight size={14} />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" /> Opnieuw beginnen
                </Button>
              </div>
            </div>
          )}

          {outcome === "limited" && (
            <div className="rounded-lg border border-green-500/40 bg-green-500/10 p-6">
              <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30 mb-3">
                Goed nieuws — beperkt risico
              </Badge>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                Goed bezig! Dit gebruik valt onder beperkt risico.
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Jouw toepassing is geen hoog-risico AI. Let wel op de transparantieverplichtingen:
              </p>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Transparantieverplichting</strong> — gebruikers en klanten moeten weten dat ze met AI interageren</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>AI-geletterdheid verplicht</strong> — Artikel 4 geldt voor alle medewerkers die AI gebruiken</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" /> Opnieuw beginnen
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default AiUseCaseChecker;
