import {
  BarControllerDatasetOptions,
  ChartData,
  ChartOptions,
  ScriptableContext
} from "chart.js/auto";

import { BoxProps, SliderProps, TextFieldProps } from "@mui/material";

export interface HistoData {
  yValues: number[];
  xLabels: string[];
  min: number;
  max: number;
  step: number;
}

export interface HistoSliderProps {
  sliderProps?: SliderProps;
  containerProps?: BoxProps;
  data: number[];
  textFieldsContainerProps?: BoxProps;
  textFieldsProps?: TextFieldProps[];
  hasTextFields?: boolean;
  barChartProps?: BarChartProps;
}

export interface BarChartProps {
  yValues: number[];
  xLabels: string[];
  sliderValues: [number, number];
  barChartOptions?: ChartOptions<"bar">;
  barChartData?: ChartData<"bar">;
  barDatasetOptions?: BarControllerDatasetOptions;
  getBarsColors?: (
    context: ScriptableContext<"bar">
  ) =>
    | CanvasGradient
    | CanvasPattern
    | string
    | string[]
    | CanvasGradient[]
    | CanvasPattern[];
}
