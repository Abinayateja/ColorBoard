import { useState } from "react";

function AddCardForm({ onAdd }) {
  const [type, setType] = useState("text");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAdd(type, content.trim());
    setContent("");
  };

  return (
    <form className="add-card-form" onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="image">Image URL</option>
        <option value="color">Color</option>
      </select>

      {type === "color" ? (
        <input
          type="color"
          value={content || "#4f46e5"}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <input
          type="text"
          placeholder={
            type === "text" ? "Write a note..." : "https://example.com/image.jpg"
          }
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}

      <button type="submit">Add Card</button>
    </form>
  );
}

export default AddCardForm;
