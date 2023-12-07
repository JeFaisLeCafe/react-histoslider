import { ChartData, ChartOptions, ScriptableContext } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import { useTheme } from "@mui/material";

import { BarChartProps } from "./types";
import { isLabelInSliderRange } from "./utils";

const BarChart = ({
  yValues,
  xLabels,
  sliderValues: [minSlider, maxSlider],
  getBarsColors,
  barDatasetOptions,
  barChartOptions,
  barChartData
}: BarChartProps) => {
  const { palette } = useTheme();

  const defaultGetBarsColors = (context: ScriptableContext<"bar">) => {
    const label = context.dataset?.label;
    if (!label) {
      return palette.primary.main;
    }
    return isLabelInSliderRange(label, minSlider, maxSlider)
      ? palette.primary.main
      : palette.grey[500];
  };

  const barData = {
    legend: {
      display: false
    },
    labels: xLabels,
    datasets: [
      {
        backgroundColor: (context: ScriptableContext<"bar">) =>
          getBarsColors?.(context) ?? defaultGetBarsColors(context),
        borderRadius: 10,
        ...barDatasetOptions,
        data: yValues
      }
    ],
    ...barChartData
  } as ChartData<"bar">;

  const options: ChartOptions<"bar"> = {
    plugins: {
      tooltip: {
        displayColors: false,
        bodyFont: {
          size: 16,
          family: "Montserrat",
          weight: "normal"
        },
        // display only the value of the bar
        callbacks: {
          labelTextColor: (context) => {
            return isLabelInSliderRange(context.label, minSlider, maxSlider)
              ? palette.primary.main
              : palette.grey[500];
          }
        }
      },
      legend: {
        display: false
      }
    },
    responsive: true,
    scales: {
      y: {
        display: false
      },
      x: {
        display: false
      },

      xAxis: {
        display: false
      },
      yAxes: {
        display: false
      }
    },
    ...barChartOptions
  };
  return <Bar data={barData} options={options} />;
};

export default BarChart;
