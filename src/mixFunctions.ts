import { MixGoals, MixIngredients } from "./types";
import { VGDensity, PGDensity, nicDensity } from "./constants";

// TODO: Currently fixing nic base at 20 mg/ml 50/50, implement inputs and variable for these

const ingredientsMix = (newMixData: MixGoals): MixIngredients => {
  const { totalVolume, goalVG, goalNic, goalFlavorPc } = newMixData;

  let neededVGMl = totalVolume * goalVG * 0.01;
  let neededPGMl = totalVolume * (100 - goalVG) * 0.01;

  const neededFlavorMl = totalVolume * goalFlavorPc * 0.01;
  const neededNicMl = totalVolume * goalNic / 20.0;

  neededVGMl -= neededNicMl * 0.5;
  neededPGMl -= (neededNicMl * 0.5) + neededFlavorMl;

  const resultVolumeMl =  neededVGMl + neededPGMl + neededFlavorMl + neededNicMl;

  const neededVGGrams = neededVGMl * VGDensity;
  const neededPGGrams = neededPGMl * PGDensity;
  const neededNicGrams = neededNicMl * nicDensity;
  const neededFlavorGrams = neededFlavorMl * 1;

  const baseGrams = neededVGGrams + neededPGGrams;
  const resultGrams = baseGrams + neededNicGrams + neededFlavorGrams;

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

  return resultMix

}

export { ingredientsMix }