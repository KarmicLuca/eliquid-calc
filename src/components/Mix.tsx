import { useState, FC, ChangeEvent } from "react";
import MixResults from "./MixResults";
import { ingredientsMix } from "../mixFunctions";
import { MixIngredients, MixGoals } from "../types";
import { defaultMixGoals, defaultMixIngredients } from "../defaults";

const MixCalculator: FC = () => {
  const [goalMixData, setGoalMixData] = useState<MixGoals>(defaultMixGoals);
  const [result, setResult] = useState<MixIngredients>(defaultMixIngredients);

  function calculateMix(event: ChangeEvent<HTMLInputElement>) {
    const emptyField = Object.values(goalMixData).some(
      (input) => input === null || input === undefined
    );

    if (emptyField) {
      console.log("Empty field");
      return false;
    }

    setGoalMixData((prevBaseData) => {
      const newMixData = {
        ...prevBaseData,
        [event.target.id]: parseFloat(event.target.value),
      };

      // console.log({ totalVolume, goalVG, goalNic, goalFlavorPc })

      const resultMix = ingredientsMix(newMixData);

      setResult(resultMix);
      return newMixData;
    });
  }

  return (
    <>
      <section className="mix-calc w-full p-6 pt-4 bg-stone-900 rounded-lg">
        <h2 className="mb-4 p-2 text-xl font-semibold">Ingredients Calculator</h2>
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-col lg:flex-row content-center justify-around lg:gap-4 mb-4">
            <div className="flex flex-col gap-1 lg:gap-2 w-full lg:w-1/2 p-3 pb-1 lg:pb-3 lg:mb-2 text-base font-semibold bg-stone-900 rounded-lg">
              <h3 className="p-2 mb-1 lg:mb-3 text-sm font-semibold bg-stone-700 rounded-md">
                Goal ml
              </h3>
              <input
                className="p-2 text-center rounded-md"
                id="totalVolume"
                type="number"
                step="1"
                onChange={(evt) => calculateMix(evt)}
                value={goalMixData.totalVolume}
              />
            </div>
            <div className="flex flex-col gap-1 lg:gap-2 w-full lg:w-1/2 p-3 pb-1 lg:pb-3 lg:mb-2 text-base font-semibold bg-stone-900 rounded-lg">
              <h3 className="p-2 mb-1 lg:mb-3 text-sm font-semibold bg-stone-700 rounded-md">
                Goal VG %
              </h3>
              <input
                className="p-2 text-center rounded-md"
                id="goalVG"
                type="number"
                step="1"
                onChange={(evt) => calculateMix(evt)}
                value={goalMixData.goalVG}
              />
            </div>
            <div className="flex flex-col gap-1 lg:gap-2 w-full lg:w-1/2 p-3 pb-1 lg:pb-3 lg:mb-2 text-base font-semibold bg-stone-900 rounded-lg">
              <h3 className="p-2 mb-1 lg:mb-3 text-sm font-semibold bg-stone-700 rounded-md">
                Goal Nic mg/ml
              </h3>
              <input
                className="p-2 text-center rounded-md"
                id="goalNic"
                type="number"
                step="0.1"
                onChange={(evt) => calculateMix(evt)}
                value={goalMixData.goalNic}
              />
            </div>
            <div className="flex flex-col gap-1 lg:gap-2 w-full lg:w-1/2 p-3 pb-1 lg:pb-3 lg:mb-2 text-base font-semibold bg-stone-900 rounded-lg">
              <h3 className="p-2 mb-1 lg:mb-3 text-sm font-semibold bg-stone-700 rounded-md">
                Goal Flavor %
              </h3>
              <input
                className="p-2 text-center rounded-md"
                id="goalFlavorPc"
                type="number"
                step="1"
                onChange={(evt) => calculateMix(evt)}
                value={goalMixData.goalFlavorPc}
              />
            </div>
          </div>
          <MixResults result={result} />
        </div>
      </section>
    </>
  );
}

export default MixCalculator