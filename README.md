# ColorBoard 🎨

*A visual inspiration board app*

ColorBoard is a full-stack app where you can create boards and fill them
with text notes, image links, and color swatches — think of it like a
mini Pinterest for quick creative ideas. It's built to show a clean,
production-style **Redux Toolkit** implementation on top of a small
Express + MongoDB REST API.

---

## 📸 Screenshots


**Boards page**
![Boards Page](/assets/dashboard.png)

**Board detail page — cards**
![Board Detail](/assets/Detailed-Dashboard.png)

---

## ✨ Features

- Create, view, and delete boards
- Add text, image-link, and color cards to any board
- Delete individual cards
- Search boards by title
- All data persists in MongoDB — refresh the page, nothing is lost

---

## 🧰 Tech Stack

**Frontend:** React, Vite, Redux Toolkit, React-Redux, Axios, custom CSS
**Backend:** Node.js, Express, MongoDB Atlas, Mongoose, dotenv, cors

---

## 🚀 How to Use ColorBoard (for anyone trying it out)

1. Open the app — you'll land on the **Boards** page
2. Type a name for your board in **"New board title"** (description is optional)
3. Click **Create Board** — it appears as a card below
4. Click on any board card to open it
5. Pick a card type from the dropdown — **Text**, **Image URL**, or **Color**
6. Fill in the content and click **Add Card**
   - **Text** → just type a note
   - **Image URL** → paste a direct link to an image (e.g. ending in `.jpg` or `.png`)
   - **Color** → click the color box and pick any color
7. Your card appears instantly on the board
8. To remove something, click the **×** on a card, or **Delete** on a board
9. Use the search bar on the home page to quickly find a board by name

That's it — no login, no setup on your end. Just create, add, and organize.

---

## 🛠️ Setup (for developers)

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and set `MONGODB_URI` to your MongoDB Atlas connection string.

```bash
npm run dev
```

Runs on `http://localhost:5000`. Check `http://localhost:5000/api/health` to confirm.

### 2. Frontend

In a new terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint                  | Description                      |
|--------|-------------------------- |----------------------------------|
| GET    | `/api/boards`             | Get all boards                   |
| GET    | `/api/boards/:id`         | Get one board                    |
| POST   | `/api/boards`             | Create a board                   |
| DELETE | `/api/boards/:id`         | Delete a board (and its cards)   |
| GET    | `/api/cards?boardId=xxx`  | Get all cards for a board        |
| POST   | `/api/cards`              | Create a card                    |
| DELETE | `/api/cards/:id`          | Delete a card                    |

---

## 🧠 Redux Data Flow

**1. `configureStore` (`redux/store.js`)**
Combines the `boards` and `cards` slice reducers into one store. The
`<Provider store={store}>` in `main.jsx` makes it available to every
component in the app.

**2. `createSlice` (`boardsSlice.js`, `cardsSlice.js`)**
Each slice bundles initial state, synchronous reducers (like
`selectBoard`, `setSearchTerm`), and `extraReducers` that respond to
async thunk results. `createSlice` auto-generates action creators and
the reducer function — no hand-written action type strings.

**3. `createAsyncThunk` (`getBoards`, `addBoard`, `removeBoard`, etc.)**
Wraps an API call and dispatches three actions automatically:
`pending` (start loading), `fulfilled` (success, with data), `rejected`
(failure, with the error). The slice's `extraReducers` handle all three.

**4. Actions and reducers**
An action is a plain object describing "what happened"
(e.g. `{ type: 'boards/selectBoard', payload: id }`). A reducer is a
pure function that takes state + action and returns new state.
`createSlice` uses Immer internally, so reducers can be written as if
they mutate state directly, while staying immutable under the hood.

**5. `useDispatch`**
Used inside components to send an action or thunk to the store —
e.g. `dispatch(addBoard({ title }))`.

**6. `useSelector`**
Used inside components to read state from the store — e.g.
`useSelector(selectAllBoards)`. The component re-renders automatically
whenever that piece of state changes.

**7. Full request flow (Frontend → Backend → MongoDB)**
1. User clicks "Create Board" → `dispatch(addBoard({...}))`
2. Thunk calls `boardService.createBoard()` → `axios.post('/boards', ...)`
3. Express receives it → `board.controller.js` validates input
4. Controller calls `board.service.js` → `Board.create(...)` (Mongoose)
5. Mongoose saves the document in MongoDB Atlas and returns it
6. Response flows back: service → controller → JSON → axios
7. Thunk's `fulfilled` case adds the new board to Redux state
8. `useSelector` in `BoardsPage` picks up the change → UI updates instantly

---

## 🎤 Explaining This Project in an Interview

- **What it is:** A visual board app — create boards, fill them with
  text, image, or color cards, like a lightweight Pinterest.
- **Why Redux Toolkit:** Board and card data is needed across multiple
  components (grid, detail view, forms), so Redux gives a single source
  of truth instead of prop-drilling. `createAsyncThunk` centralizes API
  calls, loading, and error handling per operation, keeping components
  focused purely on rendering.
- **Backend architecture:** A layered pattern — routes define URLs,
  controllers handle HTTP concerns (validation, status codes), services
  hold the database logic. Keeps each file small and focused.
- **Scope decisions:** No authentication and no image uploads (image
  cards just store a URL) — deliberately cut to keep Redux Toolkit the
  centerpiece of the project rather than spreading effort across
  features unrelated to the learning goal.