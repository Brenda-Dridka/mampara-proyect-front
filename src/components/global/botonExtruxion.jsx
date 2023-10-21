import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import { BsMinecart } from "react-icons/bs";

export default function CustomizedButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        startIcon={<BsMinecart />}
        style={{
          backgroundColor: "#F2A71B",
          color: "white",
        }}
      >
        ProductoExtruido
      </Button>
    </Stack>
  );
}
