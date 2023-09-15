import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.subtitle1,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function SortedArray({ sorted_arr }) {
  return (
    <Stack direction="column">
      <Div>{"Sorted Array:"}</Div>
      <Grid container spacing={0.5}>
        {sorted_arr.map((element) => {
          return (
            <Grid item>
              <Item variant="outlined">{element}</Item>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
