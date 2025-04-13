import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages";
import { LOGIN_PAGE } from "./utils";
import './App.css'

function App() {

  return (
    <Routes>
      <Route path={LOGIN_PAGE} element={<LoginPage />} />
    </Routes>
  )
}

export default App


