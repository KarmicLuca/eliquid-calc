import { useState, FC, createContext, useEffect } from "react";
import MixResults from "./MixResults";
import Presets from "./Presets";
import { ingredientsMix } from "../mixFunctions";
import { MixIngredients, MixGoals, MixContextType } from "../types";
import { defaultMixGoals, defaultMixIngredients } from "../defaults";

export const MixContext = createContext<MixContextType>({
  goals: defaultMixGoals,
  setGoals: () => {}
});

const MixCalculator: FC = () => {
  const [goalMixData, setGoalMixData] = useState<MixGoals>(defaultMixGoals);
  const [result, setResult] = useState<MixIngredients>(defaultMixIngredients);

  const handleInputChange = (inputEl: HTMLInputElement) => {
    setGoalMixData((prevBaseData) => {
      const newMixData = {
        ...prevBaseData,
        [inputEl.id]: inputEl.value,
      };
      return newMixData;
    });
  }

  useEffect(() => {
    const resultMix = ingredientsMix(goalMixData);
    setResult(resultMix);
  }, [goalMixData])
    

  return (
    <>
      <MixContext.Provider value={{ goals: goalMixData, setGoals: setGoalMixData }}>
        <Presets />
        <section className="mix-calc w-full p-6 pt-4 bg-stone-900 rounded-lg">
          <h2 className="mb-4 p-2 text-xl font-semibold">Full Mix Calculator</h2>
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
                  onChange={(evt) => handleInputChange(evt.target)}
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
                  onChange={(evt) => handleInputChange(evt.target)}
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
                  onChange={(evt) => handleInputChange(evt.target)}
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
                  onChange={(evt) => handleInputChange(evt.target)}
                  value={goalMixData.goalFlavorPc}
                />
              </div>
            </div>
            <MixResults result={result} />
          </div>
        </section>
      </MixContext.Provider>
    </>
  );
}

export default MixCalculator