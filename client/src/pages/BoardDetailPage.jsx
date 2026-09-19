import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCardsByBoard,
  addCard,
  removeCard,
  clearCards,
  selectAllCards,
  selectCardsLoading,
  selectCardsError,
} from "../redux/slices/cardsSlice.js";
import { selectAllBoards, clearSelectedBoard } from "../redux/slices/boardsSlice.js";
import CardItem from "../components/CardItem.jsx";
import AddCardForm from "../components/AddCardForm.jsx";

// Shows one board's cards, and lets the user add or delete cards.
function BoardDetailPage({ boardId, onBack }) {
  const dispatch = useDispatch();

  const cards = useSelector(selectAllCards);
  const loading = useSelector(selectCardsLoading);
  const error = useSelector(selectCardsError);
  const boards = useSelector(selectAllBoards);
  const board = boards.find((b) => b._id === boardId);

  useEffect(() => {
    if (boardId) {
      dispatch(getCardsByBoard(boardId));
    }
    return () => {
      dispatch(clearCards());
    };
  }, [dispatch, boardId]);

  const handleAddCard = (type, content) => {
    dispatch(addCard({ boardId, type, content }));
  };

  const handleDeleteCard = (id) => {
    dispatch(removeCard(id));
  };

  const handleBack = () => {
    dispatch(clearSelectedBoard());
    onBack();
  };

  return (
    <div className="board-detail-page">
      <button className="back-btn" onClick={handleBack}>
        &larr; Back to boards
      </button>

      <h1>{board ? board.title : "Board"}</h1>
      {board?.description && <p className="subtitle">{board.description}</p>}

      <AddCardForm onAdd={handleAddCard} />

      {loading && <p className="status-text">Loading cards...</p>}
      {error && <p className="status-text error">{error}</p>}

      <div className="cards-grid">
        {cards.map((card) => (
          <CardItem key={card._id} card={card} onDelete={handleDeleteCard} />
        ))}
        {!loading && cards.length === 0 && (
          <p className="status-text">No cards yet. Add your first one above!</p>
        )}
      </div>
    </div>
  );
}

export default BoardDetailPage;
