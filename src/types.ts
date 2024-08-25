export interface Page {
  handle: string,
  title: string
}

export interface Pages {
  pages: Page[]
}

export interface MixComponent {
  volume: number,
  grams: number
}

export interface MixGoals {
  totalVolume: number,
  goalVG: number,
  goalNic: number,
  goalFlavorPc: number,
}

export interface NicBaseData {
  totalVolume: number;
  nicBaseConcentration: number;
  concentrationGoal: number;
}

export interface MixTotal {
  volume: number,
  grams: number,
  baseGrams: number
}

export interface MixIngredients {
  needVG: MixComponent,
  needPG: MixComponent,
  needNic: MixComponent,
  needFlavor: MixComponent,
  total: MixTotal,
}

export interface MixResultsProps {
  result: MixIngredients;
}

export interface ResultProperty {
  property: {
    volume: number,
    grams: number,
    baseGrams?: number
  },
  name: string
}

