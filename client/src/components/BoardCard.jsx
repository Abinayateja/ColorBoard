function BoardCard({ board, onOpen, onDelete }) {
  return (
    <div className="board-card" onClick={() => onOpen(board._id)}>
      <h3>{board.title}</h3>
      {board.description && <p>{board.description}</p>}
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(board._id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default BoardCard;
