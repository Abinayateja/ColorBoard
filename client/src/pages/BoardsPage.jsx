import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoards,
  addBoard,
  removeBoard,
  selectBoard,
  setSearchTerm,
  selectFilteredBoards,
  selectBoardsLoading,
  selectBoardsError,
  selectSearchTerm,
} from "../redux/slices/boardsSlice.js";
import BoardCard from "../components/BoardCard.jsx";

function BoardsPage({ onOpenBoard }) {
  const dispatch = useDispatch();

  const boards = useSelector(selectFilteredBoards);
  const loading = useSelector(selectBoardsLoading);
  const error = useSelector(selectBoardsError);
  const searchTerm = useSelector(selectSearchTerm);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addBoard({ title: title.trim(), description: description.trim() }));
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    dispatch(removeBoard(id));
  };

  const handleOpen = (id) => {
    dispatch(selectBoard(id));
    onOpenBoard(id);
  };

  return (
    <div className="boards-page">
      <div className="page-header">
        <h1>ColorBoard</h1>
        <p className="subtitle">Your visual inspiration boards</p>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search boards..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />

      <form className="create-board-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="New board title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create Board</button>
      </form>

      {loading && <p className="status-text">Loading boards...</p>}
      {error && <p className="status-text error">{error}</p>}

      <div className="boards-grid">
        {boards.map((board) => (
          <BoardCard
            key={board._id}
            board={board}
            onOpen={handleOpen}
            onDelete={handleDelete}
          />
        ))}
        {!loading && boards.length === 0 && (
          <p className="status-text">No boards yet. Create your first one above!</p>
        )}
      </div>
    </div>
  );
}

export default BoardsPage;
