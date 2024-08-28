import { FC, useContext, useEffect, useState } from "react";
import PresetButton from "./PresetButton";
import mixPresets from "../presets";
import { MixPreset } from "../types";
import { MixContext } from "./Mix";

const Presets: FC = () => {

  const [presets, setPresets] = useState <MixPreset[]> ([]);

  const mixContext = useContext(MixContext);

  const handleAddPresets = () => {
    const newPresets: MixPreset[] = [
      ...presets,
      {
        name: 'New Preset',
        ingredients: mixContext.goals
      }
    ];

    setPresets(newPresets);
    localStorage.setItem('mix_presets', JSON.stringify(newPresets));
  }

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
        <button onClick={handleAddPresets} className="px-4 py-2 rounded-md border-2 border-slate-500">+</button>
      </div>
    </div>
  </>
}

export default Presets