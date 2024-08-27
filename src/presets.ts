import { MixPreset } from "./types"

const MIX_60_5050: MixPreset = {
  name: '60ml 50/50',
  ingredients: {
    totalVolume: 60.0,
    goalVG: 50,
    goalNic: 1.5,
    goalFlavorPc: 10
  }
}
const MIX_60_7030: MixPreset = {
  name: '60ml 70/30',
  ingredients: {
    totalVolume: 60.0,
    goalVG: 70,
    goalNic: 1.5,
    goalFlavorPc: 10
  }
}
const MIX_10_5050: MixPreset = {
  name: '10ml 50/50',
  ingredients: {
    totalVolume: 10.0,
    goalVG: 50,
    goalNic: 1.5,
    goalFlavorPc: 10
  }
}
const MIX_10_7030: MixPreset = {
  name: '10ml 70/30',
  ingredients: {
    totalVolume: 10.0,
    goalVG: 70,
    goalNic: 1.5,
    goalFlavorPc: 10
  }
}

export default [MIX_60_5050, MIX_60_7030, MIX_10_5050, MIX_10_7030]