import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function Column({ title, color, tasks }) {
  const [cards, setCards] = useState(
    tasks.map((task, index) => ({ id: `${title}-${index}`, ...task }))
  );

  // Drag & drop logic
  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData("text/plain", cardId);
  };

  const handleDragOver = (e) => e.preventDefault(); // allow drop

  const handleDrop = (e, dropCardId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    if (!draggedId) return;

    const newCards = [...cards];
    const draggedIndex = newCards.findIndex(c => c.id === draggedId);
    const dropIndex = newCards.findIndex(c => c.id === dropCardId);

    if (draggedIndex === -1 || dropIndex === -1) return;

    const [draggedCard] = newCards.splice(draggedIndex, 1);
    newCards.splice(dropIndex, 0, draggedCard);

    setCards(newCards);
  };

  const updateCard = (id, newTitle, newDescription) => {
    setCards(cards.map(c => c.id === id ? { ...c, title: newTitle, description: newDescription } : c));
  };

  const deleteCard = (id) => setCards(cards.filter(c => c.id !== id));

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "18px",
        padding: "18px",
        width: "340px",
        minHeight: "75vh",
        boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        fontFamily: "'Playfair Display', serif",
      }}
      className="column"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
      }}
    >
      <div
        style={{
          borderLeft: `6px solid ${color}`,
          paddingLeft: "10px",
          marginBottom: "16px",
          fontWeight: "700",
          color: "#222",
          fontSize: "1.4rem",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Icon icon="mdi:clipboard-text-outline" width="22" color={color} />
        {title}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {cards.map((card) => {
          const [isEditing, setIsEditing] = useState(false);
          const [editTitle, setEditTitle] = useState(card.title);
          const [editDesc, setEditDesc] = useState(card.description);
          const [showMenu, setShowMenu] = useState(false);

          const handleUpdate = () => {
            updateCard(card.id, editTitle, editDesc);
            setIsEditing(false);
            setShowMenu(false);
          };

          return (
            <div
              key={card.id}
              draggable
              onDragStart={(e) => handleDragStart(e, card.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, card.id)}
              style={{
                backgroundColor: "#fff0f6",
                borderLeft: `4px solid ${color}`,
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
                  <h4
                    style={{
                      margin: "0 0 6px 0",
                      color: color,
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    {card.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "20px",
                      color: "#555",
                      lineHeight: "1.4",
                    }}
                  >
                    {card.description}
                  </p>
                </>
              )}

              {/* Three-dot menu */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                }}
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
                    <button onClick={() => deleteCard(card.id)}>Delete</button>
                    <button onClick={handleUpdate}>Update</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
