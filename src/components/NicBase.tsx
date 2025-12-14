import { useState, FC } from "react";
import { NicBaseData } from "../types";
import { defaultNicBaseData, defaultNicBaseResult } from "../defaults";
import { NumericInputConfig, NumericInputGroup } from "./NumericInputs";

type NicBaseInputKey = keyof NicBaseData;

const nicBaseInputConfigs: NumericInputConfig<NicBaseInputKey>[] = [
  {
    id: "totalVolume",
    label: "Base ml",
    step: "1",
  },
  {
    id: "nicBaseConcentration",
    label: "Nic mg/ml",
    step: "1",
  },
  {
    id: "concentrationGoal",
    label: "Goal mg/ml",
    step: "0.1",
  },
];

const NicBaseCalculator: FC = () => {
  const [nicBaseData, setNicBaseData] = useState(defaultNicBaseData);
  const [result, setResult] = useState(defaultNicBaseResult);

  const handleInputChange = (id: NicBaseInputKey, value: string) => {
    setNicBaseData((prevBaseData): NicBaseData => {
      const newBaseData: NicBaseData = {
        ...prevBaseData,
        [id]: parseFloat(value),
      };

      const emptyField = Object.values(newBaseData).some(
        (input) =>
          input === null || input === undefined || Number.isNaN(input)
      );

      if (emptyField) {
        setResult(0);
        return newBaseData;
      }

      const { totalVolume, nicBaseConcentration, concentrationGoal }: NicBaseData = newBaseData;
      const resultMl: number = (
        (totalVolume * concentrationGoal) /
        (nicBaseConcentration - concentrationGoal)
      );
      setResult(resultMl);

      return newBaseData;
    });
  };

  const { totalVolume, nicBaseConcentration, concentrationGoal }: NicBaseData = nicBaseData;
  const totalMl : number = (totalVolume + result);
  const resultGrams : number = (result * 1.15);

  return (
    <>
      <section className="base-nic w-full p-6 pt-4 my-2 bg-stone-900 rounded-lg">
        <h2 className="text-xl font-semibold mb-6">Nic + Base Calculator</h2>
        <div className="flex flex-col gap-4">
          <div>
            <NumericInputGroup
              values={nicBaseData}
              config={nicBaseInputConfigs}
              onValueChange={handleInputChange}
              containerClassName="flex flex-col lg:flex-row content-center justify-center gap-8 mb-6 px-12"
              fieldClassName="flex flex-col w-full lg:w-1/3"
              labelClassName="p-2 mb-3 text-sm font-semibold bg-stone-700 rounded-md"
              inputClassName="p-2 text-center rounded-md"
            />
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
