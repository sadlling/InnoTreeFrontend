import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ChristmasTree } from "./pages/ChristmasTree.jsx";
import Snowfall from "react-snowfall";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/tree" replace />} />
          <Route
            path="/tree"
            element={
              <div>
                <Snowfall
                  snowflakeCount={300}
                  wind={[0.5, 0.7]}
                  radius={[0.5, 5]}
                />
                <ChristmasTree></ChristmasTree>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
