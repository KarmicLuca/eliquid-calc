import { useState, ChangeEvent, FC } from "react";
import { NicBaseData } from "./types";
import { defaultNicBaseData, defaultNicBaseResult } from "./defaults";

const NicBaseCalculator: FC = () => {
  const [nicBaseData, setNicBaseData] = useState(defaultNicBaseData);

  const [result, setResult] = useState(defaultNicBaseResult);

  function calculateNicBase(event: ChangeEvent<HTMLInputElement>) {
    const emptyField = Object.values(nicBaseData).some(
      (input) => input === null || input === undefined
    );

    if (emptyField) {
      setResult(0);
      return false;
    }

    setNicBaseData((prevBaseData): NicBaseData=> {
      const newBaseData = {
        ...prevBaseData,
        [event.target.id]: parseFloat(event.target.value),
      };

      const { totalVolume, nicBaseConcentration, concentrationGoal }: NicBaseData = newBaseData;
      const resultMl : number = (
        (totalVolume * concentrationGoal) /
        (nicBaseConcentration - concentrationGoal)
      );
      setResult(resultMl);

      return newBaseData;
    });
  }

  const { totalVolume, nicBaseConcentration, concentrationGoal }: NicBaseData = nicBaseData;
  const totalMl : number = (totalVolume + result);
  const resultGrams : number = (result * 1.15);

  return (
    <>
      <section className="base-nic w-full p-6 pt-4 my-2 bg-stone-900 rounded-lg">
        <h2 className="text-xl font-semibold mb-6">Base + Nic</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex flex-col lg:flex-row content-center justify-center gap-8 mb-6 px-12 ">
              <div className="flex flex-col w-full lg:w-1/3">
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
              <div className="flex flex-col w-full lg:w-1/3">
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
              <div className="flex flex-col w-full lg:w-1/3">
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
                <p>
                  Result: you need <strong>{result.toFixed(2)}ml</strong> ({resultGrams.toFixed(2)}g) of{" "}
                  {nicBaseConcentration}mg/ml nic base to reach{" "}
                  <strong>{totalMl.toFixed(2)}ml</strong> of{" "}
                  <strong>{concentrationGoal}mg/ml</strong> liquid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NicBaseCalculator;
