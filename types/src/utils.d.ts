import { HistoData } from "./types";
export declare const getValuesBetween: (min: number, max: number, data: number[]) => number[];
export declare const getHistogramData: (data: number[]) => HistoData;
export declare const isLabelInSliderRange: (label: string, sliderMin: number, sliderMax: number) => boolean;
