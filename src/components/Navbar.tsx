import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/training", label: "Voor teams" },
  { to: "/masterclass", label: "Voor leidinggevenden" },
  { to: "/kenniscentrum", label: "Kenniscentrum" },
  { to: "/tools", label: "Tools" },
  { to: "/over-aiga", label: "Over AIGA" },
  { to: "/speakers-academy", label: "Speakers Academy" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="text-2xl font-display font-bold neon-text">AIGA</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-body transition-colors duration-300 hover:text-primary ${
                  location.pathname === l.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/gereedheidscan"
              className="btn-neon-outline text-sm font-semibold px-4 py-2"
            >
              Doe de scan
            </Link>
            {/* Fix 3: Persistent CTA after scroll */}
            <Link
              to="/contact"
              className={`btn-neon text-sm px-5 py-2 rounded-lg transition-all duration-300 ${
                showCta ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              Offerte aanvragen
            </Link>
          </div>

          <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40 flex flex-col p-8 gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-lg font-body text-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <hr className="border-border" />
          <Link to="/gereedheidscan" onClick={() => setOpen(false)} className="text-lg font-body neon-text font-semibold">
            Doe de scan
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="btn-neon text-center px-5 py-3 rounded-lg"
          >
            Offerte aanvragen
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
