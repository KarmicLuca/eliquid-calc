import { useState } from "react";

export default function NicBaseCalculator() {
  const [nicBaseData, setNicBaseData] = useState({
    totalVolume: 50.0,
    nicBaseConcentration: 20.0,
    concentrationGoal: 1.2,
  });

  const [result, setResult] = useState(3.19);

  function calculateNicBase(event) {
    const emptyField = Object.values(nicBaseData).some(
      (input) => input === null || input === undefined
    );

    if (emptyField) {
      setResult("n/d");
      return false;
    }

    setNicBaseData((prevBaseData) => {
      const newBaseData = {
        ...prevBaseData,
        [event.target.id]: event.target.value,
      };

      const { totalVolume, nicBaseConcentration, concentrationGoal } =
        newBaseData;
      const resultMl = (
        (totalVolume * concentrationGoal) /
        (nicBaseConcentration - concentrationGoal)
      ).toFixed(2);
      setResult(resultMl);

      return newBaseData;
    });
  }

  const { totalVolume, nicBaseConcentration, concentrationGoal } = nicBaseData;
  const totalMl = (parseFloat(totalVolume) + parseFloat(result)).toFixed(1);
  const resultGrams = (result * 1.15).toFixed(2);

  return (
    <>
      <section className="base-nic p-6 pt-4 my-2 bg-stone-900 rounded-lg">
        <h2 className="text-xl font-semibold mb-6">Base + Nic</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex flex-row content-center justify-center gap-8 mb-6 px-12">
              <div className="flex flex-col w-1/3">
                <label htmlFor="totalVolume">
                  <h3 className='p-2 mb-3 text-sm font-semibold bg-stone-700 rounded-md'>Base ml</h3>
                </label>
                <input
                  className="p-2 text-center rounded-md"
                  id="totalVolume"
                  type="number"
                  step="1"
                  onChange={(evt) => calculateNicBase(evt)}
                  value={nicBaseData.totalVolume}
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label htmlFor="totalVolume">
                  <h3 className='p-2 mb-3 text-sm font-semibold bg-stone-700 rounded-md'>Nic mg/ml</h3>
                </label>
                <input
                  className="p-2 text-center rounded-md"
                  id="nicBaseConcentration"
                  type="number"
                  step="1"
                  onChange={(evt) => calculateNicBase(evt)}
                  value={nicBaseData.nicBaseConcentration}
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label htmlFor="totalVolume">
                  <h3 className='p-2 mb-3 text-sm font-semibold bg-stone-700 rounded-md'>Goal mg/ml</h3>
                </label>
                <input
                  className="p-2 text-center rounded-md"
                  id="concentrationGoal"
                  type="number"
                  step="0.1"
                  onChange={(evt) => calculateNicBase(evt)}
                  value={nicBaseData.concentrationGoal}
                />
              </div>
            </div>
            <div>
              <div className="mt-4 p-2 bg-stone-800 rounded-md">
                Result: you need <strong>{result}ml</strong> ({resultGrams}g) of{" "}
                {nicBaseConcentration}mg/ml nic base to reach{" "}
                <strong>{totalMl}ml</strong> of{" "}
                <strong>{concentrationGoal}mg/ml</strong> liquid.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
