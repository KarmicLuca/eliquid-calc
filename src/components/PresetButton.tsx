import { FC, useContext } from "react";
import { MixPreset } from "../types";
import { MixContext } from "./Mix";



const PresetButton: FC<{preset: MixPreset}> = ({preset, ...props}) => {
  const mixContext = useContext(MixContext);

  return <>
    <button className="px-4 py-2 rounded-md border-2 border-slate-400" onClick={() => {mixContext.setGoals(preset.ingredients)}}>
      {preset.name}
    </button>
  </>
}


export default PresetButton