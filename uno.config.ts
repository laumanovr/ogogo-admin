import { defineConfig } from "unocss";
// import config from "./node_modules/ogogo-uikit/uno.config";
const config = {rules: {}};
console.log(config);

export default defineConfig({
  presets: [],
  rules: [
    // Flexbox properties
    [/^d-flex$/, () => ({ display: "flex" })],
    [/^flex-([\d]+)$/, ([_, num]) => ({ flex: `${num}` })], // flex: {number}
    [/^flex-grow$/, () => ({ "flex-grow": "1" })],
    [/^flex-shrink$/, () => ({ "flex-shrink": "1" })],
    [/^flex-no-shrink$/, () => ({ "flex-shrink": "0" })],
    [/^flex-initial$/, () => ({ flex: "initial" })],
    [/^flex-auto$/, () => ({ flex: "auto" })],
    [/^flex-row$/, () => ({ "flex-direction": "row" })],
    [/^flex-col$/, () => ({ "flex-direction": "column" })],
    [/^flex-wrap$/, () => ({ "flex-wrap": "wrap" })],
    [/^flex-nowrap$/, () => ({ "flex-wrap": "nowrap" })],
    [/^justify-start$/, () => ({ "justify-content": "flex-start" })],
    [/^justify-end$/, () => ({ "justify-content": "flex-end" })],
    [/^justify-center$/, () => ({ "justify-content": "center" })],
    [/^justify-between$/, () => ({ "justify-content": "space-between" })],
    [/^justify-around$/, () => ({ "justify-content": "space-around" })],
    [/^justify-evenly$/, () => ({ "justify-content": "space-evenly" })],
    [/^items-start$/, () => ({ "align-items": "flex-start" })],
    [/^items-end$/, () => ({ "align-items": "flex-end" })],
    [/^items-center$/, () => ({ "align-items": "center" })],
    [/^items-baseline$/, () => ({ "align-items": "baseline" })],
    [/^items-stretch$/, () => ({ "align-items": "stretch" })],
    [/^self-auto$/, () => ({ "align-self": "auto" })],
    [/^self-start$/, () => ({ "align-self": "flex-start" })],
    [/^self-end$/, () => ({ "align-self": "flex-end" })],
    [/^self-center$/, () => ({ "align-self": "center" })],
    [/^self-baseline$/, () => ({ "align-self": "baseline" })],
    [/^self-stretch$/, () => ({ "align-self": "stretch" })],

    // Padding shorthand
    [
      /^padding-(\d+)-(\d+)$/,
      ([_, top, right]) => ({ padding: `${top}px ${right}px` }),
    ],

    // Margin shorthand
    [
      /^mr-(\d+)$/,
      ([_, num]) => ({ "margin-right": `${num}px` }),
    ],
    [
      /^mt-(\d+)$/,
      ([_, num]) => ({ "margin-top": `${num}px` }),
    ],

    // Text styles
    [/^text-(\d+)$/, ([_, size]) => ({ "font-size": `${size}px` })], // Text size
    [/^font-bold$/, () => ({ "font-weight": "bold" })], // Bold text

    // Font weight
    [/^font-bold$/, () => ({ "font-weight": "bold" })], // Bold text
    [/^font-normal$/, () => ({ "font-weight": "normal" })], // Normal text

    // Cursor styles
    [/^cursor-auto$/, () => ({ cursor: "auto" })],
    [/^cursor-default$/, () => ({ cursor: "default" })],
    [/^cursor-pointer$/, () => ({ cursor: "pointer" })],
    [/^cursor-wait$/, () => ({ cursor: "wait" })],

    [/^text-(\w+)$/, ([_, color]) => ({ color })], // Text color
    [/^bg-(\w+)$/, ([_, color]) => ({ "background-color": color })], // Background color
  ],
});
