import { FC, useContext, useEffect, useState } from "react";
import PresetButton from "./PresetButton";
import mixPresets from "../presets";
import { MixPreset } from "../types";

const Presets: FC = () => {

  const [presets, setPresets] = useState <MixPreset[]> ([]);

  useEffect(() => {
    const storedPresets = localStorage.getItem('mix_presets');

    if (!storedPresets) {
      setPresets(mixPresets);
      localStorage.setItem('mix_presets', JSON.stringify(mixPresets));
      
    } else {
      setPresets(JSON.parse(storedPresets));
    }
  }, []);

  return <>
    <div className="flex flex-col my-4 px-4 py-2 text-left">
      <h3 className="font-semibold text-slate-300">Presets</h3>
      <div className="flex flex-row gap-2 py-2">
        {
          presets.map((preset) => {
            return <PresetButton key={preset.name} preset={preset}/>
          })
        }
      </div>
    </div>
  </>
}

export default Presets