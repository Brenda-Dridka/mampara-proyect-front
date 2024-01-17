import React, { useState } from "react";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select";
import { fetchProductos } from "../../../../api/productosApi";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import "../../../../style/cards.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const EtiquetaForm = ({ onEtiquetaCreated }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [polvos, setPolvos] = useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const [productos, setProductos] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [etiquetaData, setEtiquetaData] = useState({
    fecha: { value: null },
    clave: "",
    nombre: "",
    kilos: "",
    polvos: false,
  });

  useEffect(() => {
    const cargarProductos = async () => {
      const productos = await fetchProductos();
      setProductos(productos);
    };
    cargarProductos();
  }, []);

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedArticle(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e;

    if (name === "kilos" && isNaN(value)) {
      return;
    }

    setEtiquetaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!etiquetaData.fecha.value || !selectedArticle || !etiquetaData.kilos) {
      console.error("Todos los campos obligatorios deben estar llenos.");

      setAlertMessage("Todos los campos obligatorios deben estar llenos.");
      return;
    }

    const datosAEnviar = {
      nombre: selectedArticle.nombre,
      clave: selectedArticle.clave,
      kilos: etiquetaData.kilos,
      fecha: etiquetaData.fecha.value,
      polvos, // Utilizar el valor actual de 'polvos'
      estado: "activo",
      extrusor: " ",
      posicion: " ",
    };

    onEtiquetaCreated(datosAEnviar);

    setEtiquetaData({
      fecha: { value: null },
      clave: "",
      nombre: "",
      kilos: "",
      polvos: false,
      estado: "activo",
      extrusor: " ",
      posicion: " ",
    });

    setPolvos(false); // Restablecer 'polvos' a falso después de guardar
    setAlertMessage("");

    if (!alertMessage) {
      handleClose();
    }
  };

  const handlePolvosChange = (event) => {
    setPolvos(event.target.checked);
  };

  return (
    <>
      <React.Fragment>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<AddCircleOutlineIcon />}
        >
          Agregar Etiqueta
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Agregar Etiqueta"}
          </DialogTitle>

          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="posicionamientoEtiquetas">
                <Select
                  className="select-formulario"
                  value={selectedOption}
                  onChange={(value) => {
                    setSelectedOption(value);
                    handleAutocompleteChange(null, value);
                  }}
                  options={productos}
                  isSearchable
                  placeholder="Nombre del producto"
                  getOptionLabel={(option) => option.nombre}
                  getOptionValue={(option) => option.id}
                />
              </div>
              <hr className="linea-etiqueta " />
              <div className="posicionamientoEtiquetas">
                <FormControlLabel
                  control={
                    <Checkbox checked={polvos} onChange={handlePolvosChange} />
                  }
                  label="POLVOS"
                />
              </div>

              <hr className="linea-etiqueta" />
              <div className="sepadadorInferior">
                <div
                  style={{
                    marginTop: "-9px",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DemoItem label="Agregar fecha de entrega">
                        <DatePicker
                          label="Fecha de entrega"
                          value={etiquetaData.fecha.value}
                          onChange={(date) =>
                            setEtiquetaData((prevData) => ({
                              ...prevData,
                              fecha: { value: date },
                            }))
                          }
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <DemoItem label="Clve de producto">
                  <TextField
                    id="outlined-basic"
                    label="Clave de Producto"
                    variant="outlined"
                    disabled
                    value={selectedArticle ? selectedArticle.clave : ""}
                  />
                </DemoItem>
                <FormControl sx={{ width: "34%" }} variant="outlined">
                  <DemoItem label="Agregar los kilogramos">
                    <OutlinedInput
                      value={etiquetaData.kilos}
                      id="outlined-adornment-weight"
                      onChange={(e) =>
                        handleChange({ name: "kilos", value: e.target.value })
                      }
                      endAdornment={
                        <InputAdornment position="end">kg</InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                    />
                  </DemoItem>
                </FormControl>
              </div>

              {alertMessage && (
                <Alert severity="error" sx={{ marginBottom: 2, marginTop: 2 }}>
                  {alertMessage}
                </Alert>
              )}
              <div className="styleBotton">
                <Button
                  variant="contained"
                  type="submit"
                  style={{ backgroundColor: "green" }}
                >
                  Guardar Etiqueta
                </Button>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  style={{ backgroundColor: "red" }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default EtiquetaForm;
