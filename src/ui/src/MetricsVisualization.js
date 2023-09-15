import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.subtitle1,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const valueFormatter = (value) => `${value}s`;

export default function SortedArray({ metrics }) {
  return (
    <Stack direction="column">
      <Div>{"Metrics Visualization:"}</Div>
      <BarChart
        series={[
          {
            data: Object.values(metrics),
            label: "Algorithm Efficiency",
            valueFormatter,
          },
        ]}
        xAxis={[{ data: Object.keys(metrics), scaleType: "band" }]}
        width={500}
        height={500}
      />
    </Stack>
  );
}
