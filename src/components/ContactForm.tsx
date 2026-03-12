import { useState } from "react";

interface ContactFormProps {
  product?: "training" | "masterclass" | "";
}

const ContactForm = ({ product = "" }: ContactFormProps) => {
  const [form, setForm] = useState({
    naam: "",
    organisatie: "",
    functie: "",
    email: "",
    telefoon: "",
    hulp: product || "",
    aantal: "",
    opmerkingen: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { name: "naam", label: "Naam", required: true },
        { name: "organisatie", label: "Organisatie", required: true },
        { name: "functie", label: "Functie", required: false },
        { name: "email", label: "E-mailadres", required: true, type: "email" },
        { name: "telefoon", label: "Telefoonnummer", required: false, type: "tel" },
      ].map((f) => (
        <div key={f.name}>
          <label className="text-sm text-muted-foreground mb-1 block">
            {f.label} {f.required && <span className="text-neon-purple">*</span>}
          </label>
          <input
            type={f.type || "text"}
            required={f.required}
            value={form[f.name as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
          />
        </div>
      ))}
      <div>
        <label className="text-sm text-muted-foreground mb-1 block">
          Waarmee kan ik je helpen? <span className="text-neon-purple">*</span>
        </label>
        <select
          required
          value={form.hulp}
          onChange={(e) => setForm({ ...form, hulp: e.target.value })}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
        >
          <option value="">Selecteer...</option>
          <option value="training">Online Training</option>
          <option value="masterclass">Masterclass</option>
          <option value="beide">Beide</option>
          <option value="anders">Anders</option>
        </select>
      </div>
      <div>
        <label className="text-sm text-muted-foreground mb-1 block">Aantal deelnemers</label>
        <input
          type="number"
          min="1"
          value={form.aantal}
          onChange={(e) => setForm({ ...form, aantal: e.target.value })}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
        />
      </div>
      <div>
        <label className="text-sm text-muted-foreground mb-1 block">Vragen of opmerkingen</label>
        <textarea
          value={form.opmerkingen}
          onChange={(e) => setForm({ ...form, opmerkingen: e.target.value })}
          rows={4}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300 resize-none"
        />
      </div>
      <button type="submit" className="btn-neon w-full py-3 rounded-lg">
        Verstuur bericht
      </button>
    </form>
  );
};

export default ContactForm;
