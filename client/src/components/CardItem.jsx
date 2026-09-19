function CardItem({ card, onDelete }) {
  return (
    <div className={`card-item card-${card.type}`}>
      <button className="card-delete-btn" onClick={() => onDelete(card._id)}>
        ×
      </button>

      {card.type === "text" && <p className="card-text">{card.content}</p>}

      {card.type === "image" && (
        <img className="card-image" src={card.content} alt="card visual" />
      )}

      {card.type === "color" && (
        <div
          className="card-color-swatch"
          style={{ backgroundColor: card.content }}
        >
          <span>{card.content}</span>
        </div>
      )}
    </div>
  );
}

export default CardItem;
