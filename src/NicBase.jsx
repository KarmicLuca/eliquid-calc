import { useState } from 'react'

export default function NicBaseCalculator() {

  const [nicBaseData, setNicBaseData] = useState({
    totalVolume: 50.0,
    nicBaseConcentration: 20.0,
    concentrationGoal: 1.2
  })

  const [result, setResult] = useState(3.19)

  function calculateNicBase(event) {

    const emptyField = Object.values(nicBaseData).some(input => input === null || input === undefined)

    if (emptyField) {
      setResult('n/d')
      return false
    }

    setNicBaseData((prevBaseData) => 
      {
        const newBaseData = {
          ...prevBaseData,
          [event.target.id]: event.target.value
        }

        const { totalVolume, nicBaseConcentration, concentrationGoal } = newBaseData;
        const resultMl = ((totalVolume * concentrationGoal) / (nicBaseConcentration - concentrationGoal)).toFixed(2);
        setResult(resultMl)

        return newBaseData
      }
    )
  }

  const { totalVolume, nicBaseConcentration, concentrationGoal } = nicBaseData;
  const totalMl = ((parseFloat(totalVolume) + parseFloat(result))).toFixed(1);
  const resultGrams = (result * 1.15).toFixed(2)

  return (
    <>
      <h2>Base + Nic</h2>
      <div className="base-nic">
        <table>
          <thead>
            <tr>
              <th>
                Base + Nic Calculator
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Base ml</td>
              <td>Nic mg/ml</td>
              <td>Goal mg/ml</td>
            </tr>
            <tr>
              <td><input id="totalVolume" type="number" onChange={(evt) => calculateNicBase(evt)} value={nicBaseData.totalVolume}/></td>
              <td><input id="nicBaseConcentration" type="number" onChange={(evt) => calculateNicBase(evt)} value={nicBaseData.nicBaseConcentration}/></td>
              <td><input id="concentrationGoal" type="number" onChange={(evt) => calculateNicBase(evt)} value={nicBaseData.concentrationGoal}/></td>
            </tr>
            <tr>
              <td colSpan={3}>Result: you need <strong>{result}ml</strong> ({resultGrams}g) of {nicBaseConcentration}mg/ml nic base to reach <strong>{totalMl}ml</strong> of <strong>{concentrationGoal}mg/ml</strong> liquid.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
