import { MixGoals, MixIngredients, NicBaseData } from "./types";

const defaultNicBaseData: NicBaseData = {
  totalVolume: 50.0,
  nicBaseConcentration: 20.0,
  concentrationGoal: 1.2,
}

const defaultNicBaseResult: number = 3.19

const defaultMixGoals: MixGoals = {
  totalVolume: 60.0,
  goalVG: 60.0,
  goalNic: 1.2,
  goalFlavorPc: 5.0,
};

const defaultMixIngredients: MixIngredients = {
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

export { defaultMixGoals, defaultMixIngredients, defaultNicBaseData, defaultNicBaseResult };


