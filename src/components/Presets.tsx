import { FC, useContext, useEffect, useState, KeyboardEvent } from "react";
import PresetButton from "./PresetButton";
import { MixContext } from "./Mix";
import mixPresets from "../presets";
import { MixGoals, MixPreset } from "../types";

const PRESET_STORAGE_KEY = "mix_presets";

const goalsEqual = (a: MixGoals, b: MixGoals) =>
  a.totalVolume === b.totalVolume &&
  a.goalVG === b.goalVG &&
  a.goalNic === b.goalNic &&
  a.goalFlavorPc === b.goalFlavorPc;

const Presets: FC = () => {
  const mixContext = useContext(MixContext);
  const [presets, setPresets] = useState<MixPreset[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedPresets = localStorage.getItem(PRESET_STORAGE_KEY);

    if (!storedPresets) {
      setPresets(mixPresets);
      localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(mixPresets));
      return;
    }

    try {
      const parsed = JSON.parse(storedPresets) as MixPreset[];
      setPresets(parsed);
    } catch {
      setPresets(mixPresets);
      localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(mixPresets));
    }
  }, []);

  const openModal = () => {
    setNewPresetName("");
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage(null);
    setNewPresetName("");
  };

  const handleSavePreset = () => {
    const trimmedName = newPresetName.trim();
    if (!trimmedName) {
      setErrorMessage("Please enter a preset name.");
      return;
    }

    if (presets.some((preset) => preset.name.toLowerCase() === trimmedName.toLowerCase())) {
      setErrorMessage("A preset with this name already exists.");
      return;
    }

    if (presets.some((preset) => goalsEqual(preset.ingredients, mixContext.goals))) {
      setErrorMessage("These values already match an existing preset.");
      return;
    }

    const newPreset: MixPreset = {
      name: trimmedName,
      ingredients: {
        ...mixContext.goals,
      },
    };

    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(updatedPresets));
    closeModal();
  };

  const handleInputKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      handleSavePreset();
    }
  };

  return (
    <>
      <div className="flex flex-col my-4 px-4 py-2 text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-300">Presets</h3>
          <button
            className="px-3 py-1 text-lg font-semibold rounded-md border border-slate-400 hover:bg-slate-700"
            onClick={openModal}
            aria-label="Save current mix as preset"
          >
            +
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-2 py-2">
          {presets.map((preset) => (
            <PresetButton key={preset.name} preset={preset} />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-stone-900 rounded-lg p-4 w-72 shadow-lg border border-stone-700">
            <h4 className="text-lg font-semibold mb-3">Save Preset</h4>
            <label htmlFor="presetName" className="text-sm text-slate-300">
              Preset name
            </label>
            <input
              id="presetName"
              className="mt-1 w-full rounded-md bg-stone-800 p-2 focus:outline-none focus:ring focus:ring-slate-500"
              value={newPresetName}
              onChange={(evt) => setNewPresetName(evt.target.value)}
              onKeyDown={handleInputKeyDown}
              autoFocus
            />
            {errorMessage && (
              <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-3 py-1 rounded-md border border-slate-500 hover:bg-slate-800"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded-md bg-slate-500 text-white hover:bg-slate-400 disabled:opacity-50"
                onClick={handleSavePreset}
                disabled={!newPresetName.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Presets;
