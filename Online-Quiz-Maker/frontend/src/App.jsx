import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import QuizList from "./pages/QuizList";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/quiz/:id" element={<TakeQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;