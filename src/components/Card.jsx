import React, { useState } from "react";

export default function Card({ id, title, description, color, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);
  const [showMenu, setShowMenu] = useState(false);

  const handleUpdate = () => {
    onUpdate(id, editTitle, editDesc);
    setIsEditing(false);
    setShowMenu(false);
  };

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", id)}
      style={{
        backgroundColor: "#fff0f6",
        borderLeft: `4px solid ${color || "#ff66a3"}`,
        borderRadius: "12px",
        padding: "14px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "grab",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "5px" }}
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            style={{ width: "100%" }}
          />
        </>
      ) : (
        <>
          <h4 style={{ margin: "0 0 6px 0", color, fontWeight: "600", fontSize: "20px" }}>
            {title}
          </h4>
          <p style={{ margin: 0, fontSize: "20px", color: "#555", lineHeight: "1.4" }}>
            {description}
          </p>
        </>
      )}

      {/* Three-dot menu */}
      <div
        style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
        onClick={() => setShowMenu(!showMenu)}
      >
        ⋮
        {showMenu && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "0px",
              background: "#eee",
              borderRadius: "4px",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
        )}
      </div>
    </div>
  );
}
