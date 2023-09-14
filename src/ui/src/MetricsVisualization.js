import * as React from "react";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.subtitle1,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export default function SortedArray({ metrics }) {
  return (
    <Stack direction="column">
      <Div>{"Metrics Visualization:"}</Div>
    </Stack>
  );
}