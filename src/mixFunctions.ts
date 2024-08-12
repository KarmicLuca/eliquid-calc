import { MixGoals, MixIngredients } from "./types";
import { VGDensity, PGDensity, nicDensity } from "./constants";

const ingredientsMix = (newMixData: MixGoals): MixIngredients => {
  const { totalVolume, goalVG, goalNic, goalFlavorPc } = newMixData;

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

  let resultVolumeMl: number = neededVGMl + neededPGMl;
  const resultRatio =
    (totalVolume - neededFlavorMl - neededNicMl) / resultVolumeMl;

  neededVGMl = neededVGMl * resultRatio;
  neededPGMl = neededPGMl * resultRatio;

  resultVolumeMl = neededVGMl + neededPGMl + neededNicMl + neededFlavorMl;

  const neededVGGrams = neededVGMl * VGDensity;
  const neededPGGrams = neededPGMl * PGDensity;
  const neededNicGrams = neededNicMl * nicDensity;
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

  return resultMix

}

export { ingredientsMix }