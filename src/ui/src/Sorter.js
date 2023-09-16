import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SortedArray from "./SortedArray";
import MetricsVisualization from "./MetricsVisualization";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

export default function Sorter() {
  const anchorRef = React.useRef(null);
  const [disabled, setDisabled] = React.useState(false);
  const [valid, setValid] = React.useState(true);
  const [value, setValue] = React.useState("");
  const [response, setResponse] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([
    { name: "insert", selected: true },
    { name: "select", selected: true },
    { name: "quick", selected: true },
    { name: "merge", selected: true },
    { name: "bubble", selected: true },
    { name: "counting", selected: true },
    { name: "heap", selected: true },
  ]);

  const handleMenuItemClick = (event, optionName) => {
    let optionsCopy = JSON.parse(JSON.stringify(options));
    let clickedOption = optionsCopy.find(
      (option) => option.name === optionName
    );

    clickedOption.selected = !clickedOption.selected;

    setOptions(optionsCopy);
  };

  return (
    <Typography sx={{ mt: 6, mb: 3 }} color="text.secondary">
      <Stack spacing={1} direction="row" alignItems="flex-start">
        <TextField
          required
          fullWidth
          label="Enter numbers separated by comma"
          value={value}
          error={!valid}
          helperText={
            valid
              ? ""
              : value
              ? "Please use whole numeric values, commas, and spaces."
              : "A value is required."
          }
          onChange={(event) => setValue(event.target.value)}
        />
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button
            variant="contained"
            disabled={disabled}
            style={{ "min-height": "56px" }}
            onClick={(event) => {
              const values = value.split(",").map((element) => {
                return element && element.length ? Number(element) : NaN;
              });
              const valid = values.reduce(
                (allValid, element) => allValid && Number.isInteger(element),
                true
              );

              setValid(valid);
              setDisabled(values && values.length && valid);

              if (values && values.length && valid) {
                fetch("/sort?" + new URLSearchParams({ 
                  unsorted_arr: values,
                  algorithms: options.filter(option => option.selected).map(option => option.name)
                }))
                  .then((response) => response.json())
                  .then((data) => setResponse(data))
                  .finally(() => setDisabled(false));
              }
            }}
          >
            Sort
          </Button>
          <Button
            size="small"
            onClick={() => {
              setOpen((prevOpen) => !prevOpen);
            }}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener
                  onClickAway={(event) => {
                    if (anchorRef.current && anchorRef.current.contains(event.target)) {
                      return;
                    }

                    setOpen(false);
                  }}
                >
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option) => (
                      <MenuItem
                        key={option.name}
                        onClick={(event) => handleMenuItemClick(event, option.name)}
                      >
                        <Checkbox checked={option.selected} />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Stack>

      {response && (
        <Stack paddingTop={2} spacing={2} direction="column">
          <SortedArray sorted_arr={response.sorted_arr} />
          <MetricsVisualization metrics={response.metrics} />
        </Stack>
      )}
    </Typography>
  );
}
