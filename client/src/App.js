import { Navbar } from "./components/Navbar.js";
import { ListCompanies } from "./components/ListCompanies.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Workers } from "./components/Workers";
import "./style/style.css";
function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="container mt-4">
                  <ListCompanies />
                </div>
              </>
            }
          />

          <Route
            path="/workers/:id"
            element={
              <>
                <div className="container mt-4">
                  <Workers />
                </div>
              </>
            }
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
