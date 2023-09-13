import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

export default function Sorter() {
  const [disabled, setDisabled] = React.useState(true);
  const [valid, setValid] = React.useState(true);
  const [value, setValue] = React.useState("");
  
  return (
    <Typography sx={{ mt: 6, mb: 3 }} color="text.secondary">
      <Stack spacing={2} direction="row">
        <TextField 
          required
          fullWidth
          label="Enter numbers separated by spaces"
          value={value}
          error={!valid}
          helperText={valid ? "" : (value ? "Please use only numeric values and spaces." : "A value is required.")}
          onChange={(event) => {
            console.log("change", event.target.value);
            const regExp = new RegExp(/^[\d\s]+$/);
        
            setValid(regExp.test(event.target.value));
            console.log("valid", event.target.value && regExp.test(event.target.value));
            setDisabled(!event.target.value || !regExp.test(event.target.value));
            setValue(event.target.value);
          }}
        />
        <Button 
          variant="contained"
          disabled={disabled}
          onClick={(event) => { console.log("click"); }}>
          Sort
        </Button>
      </Stack>
    </Typography>
  );
}