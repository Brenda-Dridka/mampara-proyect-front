import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import "../../style/cards.css";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";

//data
const data = [
  { id: "01", name: "SMURF BLUE 8359", clave: "PZL10038" },
  { id: "02", name: "BASE BLUE 12390", clave: "HZL10091" },
  { id: "03", name: "Blue Ral 5007/7379", clave: "HZL10091" },
  { id: "04", name: "Azul Ral 5012/7218", clave: "PZL10033" },
  { id: "05", name: "AZUL 7083 ", clave: "PZL20125" },
  { id: "06", name: " BLUE ONE ", clave: "HZL20051" },
  { id: "07", name: "AZUL PERLA 7805 ", clave: "HZL10077" },
  { id: "08", name: "AZUL CAT-40/10010 ", clave: "PZL10036" },
  { id: "09", name: "AZUL REGIO 9318", clave: "HZL30043" },
  { id: "10", name: "AZUL VALVULA II/10048 ", clave: "PZL20127" },
  { id: "11", name: "AZUL TRANSPARENTE 10667", clave: "EZL20002" },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/productos")
      .then((response) => {
        return response.json();
      })
      .then((articulos) => {
        setArticulos(articulos);
      });
  }, []);
  //implementacion del select
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  //implementacion del select

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<AddBoxIcon />}
      >
        Agregar etiqueta
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title">
          Agrega una etiqueta
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div>
            <FormControl
              sx={{ m: 1 }}
              style={{
                minWidth: "90%",
              }}
            >
              <InputLabel id="demo-simple-select-helper-label">
                Nombre del producto
              </InputLabel>

              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                {articulos.map((articulos, idex) => (
                  <MenuItem value={articulos.nombre}>
                    {articulos.nombre}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Nombre del producto</FormHelperText>
            </FormControl>
            <hr className="linea-etiqueta" />
            <div
              style={{
                height: "50px",
              }}
            ></div>
            <hr className="linea-etiqueta" />
            <div>
              <FormControl
                style={{
                  width: "200px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DemoItem label="Agregar fecha de entrega" valueType="date">
                      <DatePicker className="separacionCard" />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 130 }} disabled>
                <DemoItem label="Clave del producto">
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {articulos.map((articulos, index) => (
                      <MenuItem value={articulos.nombre}>
                        {articulos.clave}
                      </MenuItem>
                    ))}
                  </Select>
                </DemoItem>
              </FormControl>

              <FormControl sx={{ m: 1, width: "150px" }} variant="outlined">
                <DemoItem label="Agregar los kilogramos">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">kg</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                </DemoItem>
              </FormControl>
              <hr className="linea-etiqueta" />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Guardar Producto
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
