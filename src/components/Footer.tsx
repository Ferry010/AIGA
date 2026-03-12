import { Link } from "react-router-dom";
import brandLogo from "@/assets/brand-humanizing-logo.png";
import speakersLogo from "@/assets/speakers-academy-logo.png";
const footerLinks = [
  { to: "/training", label: "Voor teams" },
  { to: "/masterclass", label: "Voor leidinggevenden" },
  { to: "/kenniscentrum", label: "Kenniscentrum" },
  { to: "/over-aiga", label: "Over AIGA" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
  { to: "/risicoscan", label: "AI Risico-scan" },
];

const Footer = () => (
  <footer className="bg-card border-t border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <span className="text-xl font-display font-bold text-primary">AIGA</span>
          <p className="text-sm text-muted-foreground mt-1">AI Geletterdheid Academy</p>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            AI-geletterdheid die blijft hangen. Online, schaalbaar en compliant.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Navigatie</h4>
          <div className="flex flex-col gap-2">
            {footerLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="mailto:robbert@speakersacademy.nl" className="hover:text-primary transition-colors">
              robbert@speakersacademy.nl
            </a>
            <a href="mailto:tom@speakersacademy.nl" className="hover:text-primary transition-colors">
              tom@speakersacademy.nl
            </a>
            <a href="tel:+31103167827" className="hover:text-primary transition-colors">
              +31 (0)10 316 7827
            </a>
            <p className="mt-4 text-xs">Een samenwerking tussen</p>
            <div className="flex items-center gap-4 mt-2">
              <img src={brandLogo} alt="Brand Humanizing Institute" className="h-10 rounded" />
              <img src={speakersLogo} alt="Speakers Academy" className="h-10 rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
        <p>&copy; 2026 AI Geletterdheid Academy</p>
        <p>Een initiatief van Brand Humanizing Institute en Speakers Academy</p>
        <div className="flex gap-4">
          <span className="hover:text-primary cursor-pointer">Privacyverklaring</span>
          <span className="hover:text-primary cursor-pointer">Licentie &amp; Gebruik</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
