import Slider from "./components/Slider/Slider";

import "./App.css";

// Тут может быть массив полученный из запроса.
const IMAGES_PATH = ["1", "2", "3", "4"];

function App() {
  return (
    <div className="wrapper">
      <Slider imageArrayPath={IMAGES_PATH} autoPlayTime={1000} />
    </div>
  );
}

export default App;
