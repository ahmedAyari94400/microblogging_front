export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#FFFFFF", // blanc
        borderTop: "1px solid #C2DFED", // bleu gris
        marginTop: "3rem",
        padding: "1.5rem 1rem",
        textAlign: "center",
        fontSize: "0.875rem",
        color: "#000000", // noir
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "0.5rem",
            color: "#70C29D", // vert
            fontWeight: "600",
          }}
        >
          <span>À propos</span>
          <span>Contact</span>
          <span>Conditions</span>
          <span>Confidentialité</span>
        </div>
        <p style={{ color: "#C2DFED", fontSize: "0.75rem" }}>
          © {new Date().getFullYear()} Travelers — Partagez vos aventures ✈️
        </p>
      </div>
    </footer>
  );
}
