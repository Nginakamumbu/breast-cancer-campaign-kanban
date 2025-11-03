import React from "react";
import { Icon } from "@iconify/react";

import Header from "./components/Header";
import Column from "./components/Column";

export default function App() {
  const columns = [
    {
      title: "Planning",
      color: "#ff66a3",
      tasks: [
        { title: "Brainstorm ideas", description: "Outline awareness strategies" },
        { title: "Design posters", description: "Create impactful visuals" },
        { title: "Community Outreach", description: "Visit chief posts and village awareness" },
        { title: "Research", description: "Research breast cancer statistics in the target community." },
        { title: "Design posters", description: "Create impactful visuals" },
      ],
    },
    {
      title: "In Progress",
      color: "#ff66a3",
      tasks: [
        { title: "Social media posts", description: "Schedule campaign posts" },
        { title: "Community outreach", description: "Partner with hospitals" },
        { title: "Design posters", description: "Create impactful visuals" },
        { title: "Design posters", description: "Create impactful visuals" },
        { title: "Design posters", description: "Create impactful visuals" },
      ],
    },
    {
      title: "Completed",
      color: "#ff66a3",
      tasks: [
        { title: "Volunteer training", description: "Completed successfully" },
        { title: "Fundraiser setup", description: "Event ready for launch" },
        { title: "Design posters", description: "Create impactful visuals" }
      ],
    },
  ];

  return (
    <div>
      <Header />
      <main style={styles.main}>
        {columns.map((col, i) => (
          <Column key={i} title={col.title} color={col.color} tasks={col.tasks} />
        ))}
      </main>
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    justifyContent: "center", // Centers the columns together
    gap: "24px", // less spacing between columns
    padding: "20px 40px",
    backgroundImage: "url('/background.jpg')",
    backgroundColor: "#ffe6f0",
    minHeight: "100vh",
    flexWrap: "wrap", // responsive wrapping for smaller screens
  },
};
