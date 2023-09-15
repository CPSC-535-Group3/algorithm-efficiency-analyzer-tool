import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Sorter from "./Sorter";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          CPSC 535 | Group 3 | Project 1 | Algorithm Efficiency Analyzer Tool
        </Typography>
        <Sorter />
      </Box>
    </Container>
  );
}
