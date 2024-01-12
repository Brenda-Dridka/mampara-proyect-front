import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select";
import { fetchProductos } from "../../api/productosApi";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../../style/cards.css";

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
      polvos: etiquetaData.polvos,
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
          style={{ backgroundColor: "#005C53" }}
        >
          <AddCircleIcon />
          Agregar Etiqueta
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Agrega una etiqueta"}
          </DialogTitle>
          <DialogContent>
            <div style={{ padding: "0.3rem" }}>
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
                      <Checkbox
                        checked={polvos}
                        onChange={handlePolvosChange}
                      />
                    }
                    label="POLVOS"
                  />
                </div>
                <hr className="linea-etiqueta" />

                <div
                  style={{
                    display: "flex",
                    gap: "0.3rem",
                    paddingBottom: "1.5rem",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DemoItem label="Clve de producto">
                        <DatePicker
                          label="Fecha de entrega"
                          value={etiquetaData.fecha.value}
                          onChange={(date) =>
                            setEtiquetaData((prevData) => ({
                              ...prevData,
                              fecha: { value: date },
                            }))
                          }
                        />{" "}
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                  <div style={{ paddingTop: "0.5rem" }}>
                    <DemoItem label="Clve de producto">
                      <TextField
                        id="outlined-basic"
                        label="Clave de Producto"
                        variant="outlined"
                        disabled
                        value={selectedArticle ? selectedArticle.clave : ""}
                      />
                    </DemoItem>
                  </div>

                  <FormControl
                    sx={{ width: "34%" }}
                    variant="outlined"
                    style={{ paddingTop: "0.5rem" }}
                  >
                    <DemoItem label="Agregar los kilogramos">
                      <OutlinedInput
                        value={etiquetaData.kilos}
                        id="outlined-adornment-weight"
                        onChange={(e) =>
                          handleChange({
                            name: "kilos",
                            value: e.target.value,
                          })
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
                  <Alert
                    severity="error"
                    sx={{ marginBottom: 2, marginTop: 2 }}
                  >
                    {alertMessage}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "green" }}
                >
                  Guardar Etiqueta
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default EtiquetaForm;