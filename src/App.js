import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import Quizzes from "./components/Quizzes";
import { QuizContextProvider } from "./context/QuizContext";

function App() {
  return (
    <>
      <Toaster />
      <QuizContextProvider>
        <Header />
        <Quizzes />
      </QuizContextProvider>
    </>
  );
}

export default App;
