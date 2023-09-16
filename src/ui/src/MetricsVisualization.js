import React from "react";
import { Bar } from "react-chartjs-2";
import { styled } from "@mui/material/styles";
import Chart from "chart.js/auto";
import Stack from "@mui/material/Stack";


const Div = styled("div")(({ theme }) => ({
  ...theme.typography.subtitle1,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const SortedArray = ({ metrics }) => {
  const colorPalette = [
    "#0000FF", "#FFFF00", "#800080", "#00FF00",
    "#FF0000", "#FFA500", "#FF69B4", "#008080"
  ];

  const algorithmNames = Object.keys(metrics);
  const efficiencyValues = Object.values(metrics);

  const barColors = colorPalette.slice(0, algorithmNames.length);

  const data = {
    labels: algorithmNames,
    datasets: [
      {
        label: "Efficiency",
        data: efficiencyValues,
        backgroundColor: barColors,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value}s`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Algorithms",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Efficiency",
        },
      },
    },
  };


  return (
    <Stack direction="column">
      <Div>{"Metrics Visualization:"}</Div>
      <Bar data={data} options={options} />
    </Stack>
  );
};

export default SortedArray;
