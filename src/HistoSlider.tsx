import "chart.js/auto";

import { useState } from "react";

import { Box, InputAdornment, Slider, TextField } from "@mui/material";

import BarChart from "./BarChart";
import { HistoSliderProps } from "./types";
import { getHistogramData } from "./utils";

const HistoSlider = ({
  data,
  sliderProps,
  containerProps,
  hasTextFields = true,
  textFieldsProps,
  textFieldsContainerProps,
  barChartProps
}: HistoSliderProps) => {
  const { xLabels, yValues, min, max, step } = getHistogramData(data);

  const [values, setValues] = useState<[number, number]>([min, max]);

  const handleSliderChange = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (typeof newValue === "number") {
      return;
    }
    const [min, max] = newValue;
    setValues([min, max]);
    sliderProps?.onChange?.(_event, newValue, activeThumb);
  };

  return (
    <Box display="flex" flexDirection="column" flex={1} {...containerProps}>
      <BarChart
        xLabels={xLabels}
        yValues={yValues}
        sliderValues={values}
        {...barChartProps}
      />
      <Slider
        step={step}
        value={values}
        min={min}
        max={max}
        {...sliderProps}
        onChange={handleSliderChange}
      />
      {hasTextFields && (
        <Box
          flex={1}
          flexDirection="row"
          display="flex"
          mt={1}
          justifyContent="space-between"
          alignItems="space-between"
          gap={1}
          {...textFieldsContainerProps}
        >
          <Box>
            <TextField
              variant="outlined"
              label="From"
              value={values[0]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
              {...textFieldsProps?.[0]}
              onChange={(evt) => {
                setValues([parseInt(evt.target.value), values[1]]);
                textFieldsProps?.[0]?.onChange?.(evt);
              }}
            />
          </Box>

          <Box>
            <TextField
              variant="outlined"
              label="To"
              value={values[1]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
              {...textFieldsProps?.[1]}
              onChange={(evt) => {
                setValues([values[0], parseInt(evt.target.value)]);
                textFieldsProps?.[1]?.onChange?.(evt);
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HistoSlider;
