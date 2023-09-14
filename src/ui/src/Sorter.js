import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import SortedArray from "./SortedArray";
import MetricsVisualization from "./MetricsVisualization";

export default function Sorter() {
  const [disabled, setDisabled] = React.useState(true);
  const [valid, setValid] = React.useState(true);
  const [value, setValue] = React.useState("");
  const [response, setResponse] = React.useState(undefined);
  
  return (
    <Typography sx={{ mt: 6, mb: 3 }} color="text.secondary">
      <Stack spacing={2} direction="row">
        <TextField 
          required
          fullWidth
          label="Enter numbers separated by comma"
          value={value}
          error={!valid}
          helperText={valid ? "" : (value ? "Please use only numeric values, commas, and spaces." : "A value is required.")}
          onChange={(event) => {
            const regExp = new RegExp(/^ *\d+ *(?:, *\d+ *)*$/);
        
            setValid(regExp.test(event.target.value));
            setDisabled(!event.target.value || !regExp.test(event.target.value));
            setValue(event.target.value);
          }}
        />
        <Button 
          variant="contained"
          disabled={disabled}
          onClick={event => { 
            console.log("/sort?"+"unsorted_arr="+value.split(/[ ]+/).join(","));
            // fetch("/sort?", new URLSearchParams({ unsorted_arr: value.split(/[ ]+/).join(",") }))
            fetch("/sort?"+"unsorted_arr="+value.split(/[ ]+/).join(""))
              .then(response => response.json())
              .then(data => {
                console.log("data", data);
                setResponse(data);
              });
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