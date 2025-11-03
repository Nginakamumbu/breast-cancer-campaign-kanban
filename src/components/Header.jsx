import React from "react";
import { Icon } from "@iconify/react";

// Optional: add in index.html or your CSS
// <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">

export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>🎀 Breast Cancer Awareness Campaign</h1>
      <div style={styles.icons}>
        <Icon icon="mdi:bell-outline" width="28" />
        <Icon icon="mdi:account-circle-outline" width="28" />
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "center", // centers the title
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "#ffd6e8",
    borderBottom: "2px solid #ff99cc",
    position: "relative", // for icons to be positioned absolutely
  },
  title: {
    fontFamily: "'Great Vibes', cursive", // elegant, feminine, dominant
    fontSize: "2rem", // bigger and more prominent
    color: "#d63384",
    textAlign: "center",
    fontWeight: "600",
  },
  icons: {
    display: "flex",
    gap: "16px",
    position: "absolute", // allows them to stay right while title is centered
    right: "32px",
  },
};
