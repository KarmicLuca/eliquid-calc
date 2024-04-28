import NicBaseCalculator from './NicBase'
import MixCalculator from './Mix'
import './App.css'


// Eliquid calculator tables where you input initial data and compute quantities of ingredients
// eg you have a certain amount of vg+pg and you want to add nic base to reach a concentration
// or you have a certain flavor and want to make 60/40 at 5% fla 1.2 nic


function App() {

  return (
    <>
      <div>
        <h1>E-liquid Calculators</h1>
      </div>
      <NicBaseCalculator />
      <MixCalculator />
    </>
  )
}

export default App
