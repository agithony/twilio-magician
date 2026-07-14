import "./creator-signature.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M5 13 13 5M7 5h6v6" />
    </svg>
  );
}

export default function CreatorSignature() {
  return (
    <a
      className="creator-signature"
      href="https://anthonydellavecchia.com"
      target="_blank"
      rel="noreferrer"
      aria-label="Website by Anthony Dellavecchia, visit portfolio"
    >
      <span className="creator-signature-mark">AD</span>
      <span className="creator-signature-copy">
        <small>Website by</small>
        <strong>Anthony Dellavecchia</strong>
      </span>
      <span className="creator-signature-arrow"><ArrowIcon /></span>
    </a>
  );
}
