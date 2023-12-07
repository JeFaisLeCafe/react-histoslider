import DEFAULTS from "./defaults";
import { HistoData } from "./types";

export const getValuesBetween = (
  min: number,
  max: number,
  data: number[]
): number[] => {
  return data.filter((value) => value >= min && value <= max);
};

export const getHistogramData = (data: number[]): HistoData => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const step = (max - min) / DEFAULTS.STEPS;
  const xLabels = [];
  const yValues = [];
  for (let i = 1; i <= DEFAULTS.STEPS; i++) {
    xLabels.push(
      `${Math.round(min + (i - 1) * step).toString()} - ${Math.round(
        min + i * step
      ).toString()}`
    );
    yValues.push(
      getValuesBetween(min + (i - 1) * step, min + i * step, data).length
    ); // this is the number of values between min and max
  }

  return {
    min: Math.floor(min),
    max: Math.ceil(max),
    step: Math.ceil(step),
    xLabels,
    yValues
  };
};

export const isLabelInSliderRange = (
  label: string,
  sliderMin: number,
  sliderMax: number
) => {
  const [min, max] = label.split("-");

  return parseFloat(min) >= sliderMin && parseFloat(max) <= sliderMax;
};
