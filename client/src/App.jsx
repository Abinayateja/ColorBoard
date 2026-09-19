import { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedBoardId } from "./redux/slices/boardsSlice.js";
import BoardsPage from "./pages/BoardsPage.jsx";
import BoardDetailPage from "./pages/BoardDetailPage.jsx";
import "./styles/app.css";

// Very small "router" — no react-router needed for two views.
// We just track which board (if any) is selected in Redux, and
// show either the boards grid or the board detail view.
function App() {
  const selectedBoardId = useSelector(selectSelectedBoardId);
  const [view, setView] = useState("boards"); // "boards" | "detail"

  const openBoard = () => setView("detail");
  const goBack = () => setView("boards");

  return (
    <div className="app-shell">
      {view === "detail" && selectedBoardId ? (
        <BoardDetailPage boardId={selectedBoardId} onBack={goBack} />
      ) : (
        <BoardsPage onOpenBoard={openBoard} />
      )}
    </div>
  );
}

export default App;
