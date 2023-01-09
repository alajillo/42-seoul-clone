import Map from "./components/Map"
import createMap from "./createMap"
import Controller from "./components/Controller";
import {createCards} from './game'
import { useState } from "react";
function App() {
  const [map] = useState(createMap());
  const [cards,setCards] = useState(createCards(6));
  const [currentPosition,setCurrentPosition] = useState({x : 1, y : 1});
  const [currentDirection,setCurrentDirection] = useState({x : 0, y : 1});
  return (
    <div className="container">
      <Map 
        mapInfo={map} 
        currentPosition={currentPosition} 
        currentDirection={currentDirection}
      />
      <Controller 
        map={map}
        cards={cards} 
        setCards={setCards} 
        currentPosition={currentPosition} 
        setCurrentPosition={setCurrentPosition} 
        currentDirection={currentDirection}
        setCurrentDirection={setCurrentDirection}
      />
    </div>
  )
}

export default App
