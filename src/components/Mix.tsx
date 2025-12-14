import { useState, FC, createContext, useEffect } from "react";
import MixResults from "./MixResults";
import Presets from "./Presets";
import { NumericInputConfig, NumericInputGroup } from "./NumericInputs";
import { ingredientsMix } from "../mixFunctions";
import { MixIngredients, MixGoals, MixContextType } from "../types";
import { defaultMixGoals, defaultMixIngredients } from "../defaults";

export const MixContext = createContext<MixContextType>({
  goals: defaultMixGoals,
  setGoals: () => {}
});

type GoalInputKey = keyof MixGoals;

const goalInputConfigs: NumericInputConfig<GoalInputKey>[] = [
  {
    id: "totalVolume",
    label: "Goal ml",
    step: "1",
  },
  {
    id: "goalVG",
    label: "Goal VG %",
    step: "1",
  },
  {
    id: "goalNic",
    label: "Goal Nic mg/ml",
    step: "0.1",
  },
  {
    id: "goalFlavorPc",
    label: "Goal Flavor %",
    step: "1",
  },
];

const MixCalculator: FC = () => {
  const [goalMixData, setGoalMixData] = useState<MixGoals>(defaultMixGoals);
  const [result, setResult] = useState<MixIngredients>(defaultMixIngredients);

  const handleInputChange = (id: GoalInputKey, value: string) => {
    setGoalMixData((prevBaseData) => ({
      ...prevBaseData,
      [id]: Number(value),
    }));
  };

  useEffect(() => {
    const resultMix = ingredientsMix(goalMixData);
    setResult(resultMix);
  }, [goalMixData]);
    

  return (
    <>
      <MixContext.Provider value={{ goals: goalMixData, setGoals: setGoalMixData }}>
        <Presets />
        <section className="mix-calc w-full p-6 pt-4 bg-stone-900 rounded-lg">
          <h2 className="mb-4 p-2 text-xl font-semibold">Full Mix Calculator</h2>
          <div className="flex flex-col gap-2 ">
            <NumericInputGroup
              values={goalMixData}
              config={goalInputConfigs}
              onValueChange={handleInputChange}
              containerClassName="flex flex-col lg:flex-row content-center justify-around lg:gap-4 mb-4"
              fieldClassName="flex flex-col gap-1 lg:gap-2 w-full lg:w-1/2 p-3 pb-1 lg:pb-3 lg:mb-2 text-base font-semibold bg-stone-900 rounded-lg"
              labelClassName="p-2 mb-1 lg:mb-3 text-sm font-semibold bg-stone-700 rounded-md"
              inputClassName="p-2 text-center rounded-md"
            />
            <MixResults result={result} />
          </div>
        </section>
      </MixContext.Provider>
    </>
  );
}

export default MixCalculator
