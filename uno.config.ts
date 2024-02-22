import { defineConfig } from "unocss";
import { ogogoPreset } from "@tumarsoft/ogogo-ui";
import presetUno from "@unocss/preset-uno";

export default defineConfig({
  presets: [presetUno(), ogogoPreset()],
  rules: [
    [/^gap-([\.\d]+)$/, ([_, num]) => ({ gap: `${num}px` })],

    [/^font-size-(\d+)$/, ([_, size]) => ({ "font-size": `${size}px` })],

    [/^color-green-50$/, ([_, color]) => ({ color: "#f7ffee" })],
    [/^color-green-100$/, ([_, color]) => ({ color: "#e1ffbd" })],
    [/^color-green-200$/, ([_, color]) => ({ color: "#bae48b" })],
    [/^color-green-300$/, ([_, color]) => ({ color: "#a5d66e" })],
    [/^color-green-400$/, ([_, color]) => ({ color: "#8fc353" })],
    [/^color-green-500$/, ([_, color]) => ({ color: "#7eae47" })],
    [/^color-green-600$/, ([_, color]) => ({ color: "#6f9b3d" })],
    [/^color-green-700$/, ([_, color]) => ({ color: "#5d8631" })],
    [/^color-green-800$/, ([_, color]) => ({ color: "#4c7125" })],
    [/^color-green-900$/, ([_, color]) => ({ color: "#355415" })],

    [/^color-violet-50$/, ([_, color]) => ({ color: "#f5f3ff" })],
    [/^color-violet-100$/, ([_, color]) => ({ color: "#ede9fe" })],
    [/^color-violet-200$/, ([_, color]) => ({ color: "#ddd6fe" })],
    [/^color-violet-300$/, ([_, color]) => ({ color: "#c4b5fd" })],
    [/^color-violet-400$/, ([_, color]) => ({ color: "#a78bfa" })],
    [/^color-violet-500$/, ([_, color]) => ({ color: "#8b5cf6" })],
    [/^color-violet-600$/, ([_, color]) => ({ color: "#7c3aed" })],
    [/^color-violet-700$/, ([_, color]) => ({ color: "#6d28d9" })],
    [/^color-violet-800$/, ([_, color]) => ({ color: "#5b21b6" })],
    [/^color-violet-900$/, ([_, color]) => ({ color: "#4c1d95" })],

    [/^color-gray-50$/, ([_, color]) => ({ color: "#f7f8fa" })],
    [/^color-gray-100$/, ([_, color]) => ({ color: "#f2f3f5" })],
    [/^color-gray-100$/, ([_, color]) => ({ color: "#f3f4f6" })],
    [/^color-gray-200$/, ([_, color]) => ({ color: "#dfe1e5" })],
    [/^color-gray-300$/, ([_, color]) => ({ color: "#c5c9d1" })],
    [/^color-gray-400$/, ([_, color]) => ({ color: "#a5abb8" })],
    [/^color-gray-500$/, ([_, color]) => ({ color: "#7b818c" })],
    [/^color-gray-600$/, ([_, color]) => ({ color: "#5a5f69" })],
    [/^color-gray-700$/, ([_, color]) => ({ color: "#3e424a" })],
    [/^color-gray-800$/, ([_, color]) => ({ color: "#282b30" })],
    [/^color-gray-900$/, ([_, color]) => ({ color: "#141619" })],

    [/^color-red-50$/, ([_, color]) => ({ color: "#fef2f2" })],
    [/^color-red-100$/, ([_, color]) => ({ color: "#fee2e2" })],
    [/^color-red-200$/, ([_, color]) => ({ color: "#fecaca" })],
    [/^color-red-300$/, ([_, color]) => ({ color: "#fca5a5" })],
    [/^color-red-400$/, ([_, color]) => ({ color: "#f87171" })],
    [/^color-red-500$/, ([_, color]) => ({ color: "#ef4444" })],
    [/^color-red-600$/, ([_, color]) => ({ color: "#dc2626" })],
    [/^color-red-700$/, ([_, color]) => ({ color: "#b91c1c" })],
    [/^color-red-800$/, ([_, color]) => ({ color: "#991b1b" })],
    [/^color-red-900$/, ([_, color]) => ({ color: "#e32d2d" })],

    [/^color-orange-50$/, ([_, color]) => ({ color: "#fff7ed" })],
    [/^color-orange-100$/, ([_, color]) => ({ color: "#ffedd5" })],
    [/^color-orange-200$/, ([_, color]) => ({ color: "#fed7aa" })],
    [/^color-orange-300$/, ([_, color]) => ({ color: "#fdba74" })],
    [/^color-orange-400$/, ([_, color]) => ({ color: "#fb923c" })],
    [/^color-orange-500$/, ([_, color]) => ({ color: "#f97316" })],
    [/^color-orange-600$/, ([_, color]) => ({ color: "#ea580c" })],
    [/^color-orange-700$/, ([_, color]) => ({ color: "#c2410c" })],
    [/^color-orange-800$/, ([_, color]) => ({ color: "#9a3412" })],
    [/^color-orange-900$/, ([_, color]) => ({ color: "#7c2d12" })],

    [/^color-yellow-50$/, ([_, color]) => ({ color: "#fefce8" })],
    [/^color-yellow-100$/, ([_, color]) => ({ color: "#fef9c3" })],
    [/^color-yellow-200$/, ([_, color]) => ({ color: "#fef08a" })],
    [/^color-yellow-300$/, ([_, color]) => ({ color: "#fde047" })],
    [/^color-yellow-400$/, ([_, color]) => ({ color: "#facc15" })],
    [/^color-yellow-500$/, ([_, color]) => ({ color: "#eab308" })],
    [/^color-yellow-600$/, ([_, color]) => ({ color: "#ca8a04" })],
    [/^color-yellow-700$/, ([_, color]) => ({ color: "#a16207" })],
    [/^color-yellow-800$/, ([_, color]) => ({ color: "#854d0e" })],
    [/^color-yellow-900$/, ([_, color]) => ({ color: "#713f12" })],

    [/^color-sky-50$/, ([_, color]) => ({ color: "#f0f9ff" })],
    [/^color-sky-100$/, ([_, color]) => ({ color: "#e0f2fe" })],
    [/^color-sky-200$/, ([_, color]) => ({ color: "#bae6fd" })],
    [/^color-sky-300$/, ([_, color]) => ({ color: "#7dd3fc" })],
    [/^color-sky-400$/, ([_, color]) => ({ color: "#38bdf8" })],
    [/^color-sky-500$/, ([_, color]) => ({ color: "#0ea5e9" })],
    [/^color-sky-600$/, ([_, color]) => ({ color: "#0284c7" })],
    [/^color-sky-700$/, ([_, color]) => ({ color: "#0369a1" })],
    [/^color-sky-800$/, ([_, color]) => ({ color: "#075985" })],
    [/^color-sky-900$/, ([_, color]) => ({ color: "#0c4a6e" })],
  ],
});
