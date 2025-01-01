import { ChristmasTree } from "./pages/ChristmasTree.jsx";
import Snowfall from "react-snowfall";
function App() {
  return (
    <div>
      <Snowfall snowflakeCount={300} wind={[0.5, 0.7]} radius={[0.5, 5]} />
      <ChristmasTree></ChristmasTree>
    </div>
  );
}

export default App;
