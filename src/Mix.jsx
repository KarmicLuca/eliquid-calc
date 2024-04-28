import { useState } from 'react'

const defaultMixGoals = {
  totalVolume: 60.0,
  goalVG: 60.0,
  goalNic: 1.2,
  goalFlavorPc: 5.0
}
const defaultMixIngredients = {
  needVG: {
    volume: 34.20,
    grams: 43.13
  },
  needPG: {
    volume: 19.20,
    grams: 19.90
  },
  needNic: {
    volume: 3.60,
    grams: 4.13
  },
  needFlavor: {
    volume: 3.0,
    grams: 3.0
  },
  total: {
    volume: 60,
    grams: 70.16
  }
}

export default function MixCalculator() {

  const [goalMixData, setGoalMixData] = useState(defaultMixGoals)
  const [result, setResult] = useState(defaultMixIngredients)

  function calculateMix(event) {

    const emptyField = Object.values(goalMixData).some(input => input === null || input === undefined)

    if (emptyField) {
      setResult('n/d')
      console.log('Empty field')
      return false
    }

    setGoalMixData((prevBaseData) => 
      {
        const newMixData = {
          ...prevBaseData,
          [event.target.id]: parseFloat(event.target.value)
        }

        const { totalVolume, goalVG, goalNic, goalFlavorPc } = newMixData;

        // console.log({ totalVolume, goalVG, goalNic, goalFlavorPc })

        const neededFlavorMl = totalVolume * goalFlavorPc / 100;
        const neededNicMl = totalVolume * goalNic / 20.0;

        let neededVGMl = (totalVolume * goalVG / 100.0) - (neededNicMl * 0.5) + (neededFlavorMl * goalVG / 100);
        let neededPGMl = (totalVolume - neededVGMl) - (neededNicMl * 0.5) - (neededFlavorMl * goalVG / 100);

        let resultVolumeMl = neededVGMl + neededPGMl;
        const resultRatio = (totalVolume - neededFlavorMl - neededNicMl) / resultVolumeMl;

        neededVGMl = neededVGMl * resultRatio;
        neededPGMl = neededPGMl * resultRatio;

        resultVolumeMl = parseFloat(neededVGMl + neededPGMl + neededNicMl + neededFlavorMl);

        const neededVGGrams = neededVGMl * 1.26;
        const neededPGGrams = neededPGMl * 1.038;
        const neededNicGrams = neededNicMl * 1.15;
        const neededFlavorGrams = neededFlavorMl;

        const resultGrams = neededVGGrams + neededPGGrams + neededNicGrams + neededFlavorGrams;

        const resultMix = {
          needVG: {
            volume: neededVGMl,
            grams: neededVGGrams
          },
          needPG: {
            volume: neededPGMl,
            grams: neededPGGrams
          },
          needNic: {
            volume: neededNicMl,
            grams: neededNicGrams
          },
          needFlavor: {
            volume: neededFlavorMl,
            grams: neededFlavorGrams
          },
          total: {
            volume: resultVolumeMl,
            grams: resultGrams
          }
        };

        setResult(resultMix)
        return newMixData
      }
    )
  }

  const needVG = result.needVG;
  const needPG = result.needPG;
  const needNic = result.needNic;
  const needFlavor = result.needFlavor;

  return (
    <>
      <h2>Ingredients Calculator</h2>
      <div className="base-nic">
        <table>
          <thead>
            <tr>
              <th>Goal ml</th>
              <th>Goal VG</th>
              <th>Goal Nic mg/ml</th>
              <th>Goal Flavor %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input id="totalVolume" type="number" step="1" onChange={(evt) => calculateMix(evt)} value={goalMixData.totalVolume}/></td>
              <td><input id="goalVG" type="number" step="1" onChange={(evt) => calculateMix(evt)} value={goalMixData.goalVG}/></td>
              <td><input id="goalNic" type="number" step="0.1" onChange={(evt) => calculateMix(evt)} value={goalMixData.goalNic}/></td>
              <td><input id="goalFlavorPc" type="number" step="1" onChange={(evt) => calculateMix(evt)} value={goalMixData.goalFlavorPc}/></td>
            </tr>
            <tr>
              <td colSpan={3}><strong>Result:</strong></td>
            </tr>
          </tbody>
        </table>

        <table id="results">
          <thead>
            <tr>
              <th>Total VG</th>
              <th>Total PG</th>
              <th>Total Nic Base</th>
              <th>Total Flavor</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{needVG.volume.toFixed(2)} ml</td>
              <td>{needPG.volume.toFixed(2)} ml</td>
              <td>{needNic.volume.toFixed(2)} ml</td>
              <td>{needFlavor.volume.toFixed(2)} ml</td>
            </tr>
            <tr>
              <td>{needVG.grams.toFixed(2)} g</td>
              <td>{needPG.grams.toFixed(2)} g</td>
              <td>{needNic.grams.toFixed(2)} g</td>
              <td>{needFlavor.grams.toFixed(2)} g</td>
            </tr>
          </tbody>
          
        </table>
      </div>
    </>
  )
}
