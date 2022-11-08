import React from "react";
import './App.module.scss';

import CountdownTimer from "./components/CountdownTimer";
import Intro from "./components/Intro";

const App = () => {
  return (
    <div>
      < CountdownTimer />
      < Intro />
    </div>

  );
}

export default App;
