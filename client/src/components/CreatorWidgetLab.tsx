import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CreatorSignature from "./CreatorSignature";
import "./creator-widget-lab.css";

const portfolioUrl = "https://anthonydellavecchia.com";

const concepts = [
  {
    id: "signature",
    number: "01",
    name: "The Signature",
    description: "A restrained glass signature that opens with a soft gold reveal.",
  },
  {
    id: "seal",
    number: "02",
    name: "The Alchemist's Seal",
    description: "A mystical monogram medallion with an orbiting detail and hidden plaque.",
  },
  {
    id: "card",
    number: "03",
    name: "The Calling Card",
    description: "A miniature black calling card that deals itself into view.",
  },
  {
    id: "minimal",
    number: "04",
    name: "The Quiet Mark",
    description: "An editorial, minimal credit for the most understated finish.",
  },
] as const;

type ConceptId = (typeof concepts)[number]["id"];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M5 13 13 5M7 5h6v6" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c.4 5.8 3.1 8.8 8 10-4.9 1.2-7.6 4.2-8 10-.4-5.8-3.1-8.8-8-10 4.9-1.2 7.6-4.2 8-10Z" />
    </svg>
  );
}

function CreatorWidget({ concept }: { concept: ConceptId }) {
  if (concept === "signature") {
    return <CreatorSignature />;
  }

  if (concept === "seal") {
    return (
      <a className="creator-widget seal-widget" href={portfolioUrl} target="_blank" rel="noreferrer">
        <span className="seal-plaque">
          <small>Conjured by</small>
          <strong>Anthony Dellavecchia</strong>
          <span>Visit portfolio <ArrowIcon /></span>
        </span>
        <span className="seal-medallion">
          <span className="seal-orbit" />
          <span className="seal-spark"><SparkIcon /></span>
          <strong>AD</strong>
        </span>
      </a>
    );
  }

  if (concept === "card") {
    return (
      <a className="creator-widget card-widget" href={portfolioUrl} target="_blank" rel="noreferrer">
        <span className="card-shadow card-shadow-one" />
        <span className="card-shadow card-shadow-two" />
        <span className="calling-card">
          <span className="calling-card-top"><SparkIcon /> AD</span>
          <span className="calling-card-copy">
            <small>Designed &amp; built by</small>
            <strong>Anthony<br />Dellavecchia</strong>
          </span>
          <span className="calling-card-link">anthonydellavecchia.com <ArrowIcon /></span>
        </span>
      </a>
    );
  }

  return (
    <a className="creator-widget minimal-widget" href={portfolioUrl} target="_blank" rel="noreferrer">
      <span className="minimal-dot" />
      <span className="minimal-copy">
        <small>Created by</small>
        <strong>Anthony Dellavecchia</strong>
      </span>
      <span className="minimal-arrow"><ArrowIcon /></span>
    </a>
  );
}

export default function CreatorWidgetLab() {
  const [selected, setSelected] = useState<ConceptId>("signature");
  const activeConcept = concepts.find((concept) => concept.id === selected)!;

  return (
    <main className="widget-lab">
      <div className="widget-lab-grain" />
      <div className="widget-lab-glow widget-lab-glow-left" />
      <div className="widget-lab-glow widget-lab-glow-right" />

      <header className="widget-lab-header">
        <a href="/" className="widget-lab-back">Twilio Magic <span>/</span> Widget Study</a>
        <span className="widget-lab-status"><i /> Interactive prototypes</span>
      </header>

      <section className="widget-lab-intro">
        <p className="widget-lab-eyebrow">Creator credit exploration</p>
        <h1>Four ways to leave<br /><em>your mark.</em></h1>
        <p className="widget-lab-lede">
          Select a direction, then hover over the live widget in the bottom-left corner.
        </p>
      </section>

      <section className="widget-concept-grid" aria-label="Widget concepts">
        {concepts.map((concept) => (
          <button
            type="button"
            key={concept.id}
            className={`widget-concept ${selected === concept.id ? "is-selected" : ""}`}
            onClick={() => setSelected(concept.id)}
          >
            <span className="concept-number">{concept.number}</span>
            <span className="concept-selector"><i /></span>
            <strong>{concept.name}</strong>
            <span className="concept-description">{concept.description}</span>
            <span className="concept-action">Preview concept <ArrowIcon /></span>
          </button>
        ))}
      </section>

      <div className="widget-lab-instruction">
        <span>Live preview</span>
        <strong>{activeConcept.name}</strong>
        <i />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          className="creator-widget-stage"
          key={selected}
          initial={{ opacity: 0, x: -16, y: 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -12, y: 4 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <CreatorWidget concept={selected} />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
