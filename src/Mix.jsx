import { useState } from "react";
import MixResults from "./MixResults";

const defaultMixGoals = {
  totalVolume: 60.0,
  goalVG: 60.0,
  goalNic: 1.2,
  goalFlavorPc: 5.0,
};
const defaultMixIngredients = {
  needVG: {
    volume: 34.2,
    grams: 43.13,
  },
  needPG: {
    volume: 19.2,
    grams: 19.9,
  },
  needNic: {
    volume: 3.6,
    grams: 4.13,
  },
  needFlavor: {
    volume: 3.0,
    grams: 3.0,
  },
  total: {
    volume: 60,
    grams: 70.16,
    baseGrams: 69.16,
  },
};

export default function MixCalculator() {
  const [goalMixData, setGoalMixData] = useState(defaultMixGoals);
  const [result, setResult] = useState(defaultMixIngredients);

  function calculateMix(event) {
    const emptyField = Object.values(goalMixData).some(
      (input) => input === null || input === undefined
    );

    if (emptyField) {
      setResult("n/d");
      console.log("Empty field");
      return false;
    }

    setGoalMixData((prevBaseData) => {
      const newMixData = {
        ...prevBaseData,
        [event.target.id]: parseFloat(event.target.value),
      };

      const { totalVolume, goalVG, goalNic, goalFlavorPc } = newMixData;

      // console.log({ totalVolume, goalVG, goalNic, goalFlavorPc })

      const neededFlavorMl = (totalVolume * goalFlavorPc) / 100;
      const neededNicMl = (totalVolume * goalNic) / 20.0;

      let neededVGMl =
        (totalVolume * goalVG) / 100.0 -
        neededNicMl * 0.5 +
        (neededFlavorMl * goalVG) / 100;
      let neededPGMl =
        totalVolume -
        neededVGMl -
        neededNicMl * 0.5 -
        (neededFlavorMl * goalVG) / 100;

      let resultVolumeMl = neededVGMl + neededPGMl;
      const resultRatio =
        (totalVolume - neededFlavorMl - neededNicMl) / resultVolumeMl;

      neededVGMl = neededVGMl * resultRatio;
      neededPGMl = neededPGMl * resultRatio;

      resultVolumeMl = parseFloat(
        neededVGMl + neededPGMl + neededNicMl + neededFlavorMl
      );

      const neededVGGrams = neededVGMl * 1.26;
      const neededPGGrams = neededPGMl * 1.038;
      const neededNicGrams = neededNicMl * 1.15;
      const neededFlavorGrams = neededFlavorMl;

      const baseGrams = neededVGGrams + neededPGGrams;
      const resultGrams =
        neededVGGrams + neededPGGrams + neededNicGrams + neededFlavorGrams;

      const resultMix = {
        needVG: {
          volume: neededVGMl,
          grams: neededVGGrams,
        },
        needPG: {
          volume: neededPGMl,
          grams: neededPGGrams,
        },
        needNic: {
          volume: neededNicMl,
          grams: neededNicGrams,
        },
        needFlavor: {
          volume: neededFlavorMl,
          grams: neededFlavorGrams,
        },
        total: {
          volume: resultVolumeMl,
          grams: resultGrams,
          baseGrams: baseGrams,
        },
      };

      setResult(resultMix);
      return newMixData;
    });
  }

  return (
    <>
      <section className="mix-calc p-6 pt-4 bg-stone-900 rounded-lg">
        <h2 className="mb-4 text-xl font-semibold">Ingredients Calculator</h2>
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row content-center justify-around gap-4 mb-4">
            <div className="flex flex-col gap-2 w-1/2 p-3 mb-2 text-base font-semibold bg-stone-900 rounded-lg">
              <h3 className="p-2 mb-3 text-sm font-semibold bg-stone-700 rounded-md">
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
            <div className="flex flex-col gap-2 w-1/2 p-3 mb-2 text-base font-semibold bg-stone-900 rounded-lg">
              <h3 className="p-2 mb-3 text-sm font-semibold bg-stone-700 rounded-md">
                Goal VG
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
            <div className="flex flex-col gap-2 w-1/2 p-3 mb-2 text-base font-semibold bg-stone-900 rounded-lg">
              <h3 className="p-2 mb-3 text-sm font-semibold bg-stone-700 rounded-md">
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
            <div className="flex flex-col gap-2 w-1/2 p-3 mb-2 text-base font-semibold bg-stone-900 rounded-lg">
              <h3 className="p-2 mb-3 text-sm font-semibold bg-stone-700 rounded-md">
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
