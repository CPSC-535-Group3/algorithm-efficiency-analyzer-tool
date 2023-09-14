import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import SortedArray from "./SortedArray";
import MetricsVisualization from "./MetricsVisualization";

export default function Sorter() {
  const [disabled, setDisabled] = React.useState(false);
  const [valid, setValid] = React.useState(true);
  const [value, setValue] = React.useState("");
  const [response, setResponse] = React.useState(undefined);
  
  return (
    <Typography sx={{ mt: 6, mb: 3 }} color="text.secondary">
      <Stack spacing={1} direction="row" alignItems="flex-start">
        <TextField 
          required
          fullWidth
          label="Enter numbers separated by comma"
          value={value}
          error={!valid}
          helperText={valid ? "" : (value ? "Please use only numeric values, commas, and spaces." : "A value is required.")}
          onChange={event => setValue(event.target.value)}
        />
        <Button 
          variant="contained"
          disabled={disabled}
          style={{ "min-height": "56px" }}
          onClick={event => { 
            const regExp = new RegExp(/^ *\d+ *(?:, *\d+ *)*$/);

            setValid(regExp.test(value.trim().replace(/,*$/, '')));
            setDisabled(value && valid);
            
            if (value && valid) {
              fetch("/sort?" + new URLSearchParams({ 
                unsorted_arr: value.split(",").map(item => parseInt(item, 10)).filter(item => !!item) 
              }))
                .then(response => response.json())
                .then(data => setResponse(data))
                .finally(() => setDisabled(false));
            }
          }}>
          Sort
        </Button>
      </Stack>

      {
        response &&
          <Stack paddingTop={2} spacing={2} direction="column">
            <SortedArray sorted_arr={response.sorted_arr} />
            <MetricsVisualization metrics={response.metrics} />
          </Stack>
      }
    </Typography>
  );
}