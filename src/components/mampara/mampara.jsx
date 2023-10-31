import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import "../../style/DragAnDrop/DragAnDrop.css";
import "../../style/cards.css";
import BotonOption from "../global/botonOptions";
import "../../style/global/global.css";
import AgregarProducto from "../productos/formulario";
import DeleteTagButton from "../Etiquetas/eliminarEtiqueta";

export default function Component2() {
  const [etiquetasAgregadas, setEtiquetasAgregadas] = useState([]);
  const [etiquetasAbajo1, setEtiquetasAbajo1] = useState([]);
  const [etiquetasAbajo2, setEtiquetasAbajo2] = useState([]);
  const [etiquetasAbajo3, setEtiquetasAbajo3] = useState([]);
  const [etiquetasAbajo4, setEtiquetasAbajo4] = useState([]);
  const [etiquetasAbajo5, setEtiquetasAbajo5] = useState([]);
  const [etiquetasAbajo6, setEtiquetasAbajo6] = useState([]);
  const [etiquetasAbajo7, setEtiquetasAbajo7] = useState([]);
  const [etiquetasAbajo8, setEtiquetasAbajo8] = useState([]);
  const [etiquetasAbajo9, setEtiquetasAbajo9] = useState([]);
  const [etiquetasAbajo10, setEtiquetasAbajo10] = useState([]);
  const [etiquetasAbajo11, setEtiquetasAbajo11] = useState([]);
  const [etiquetasAbajo12, setEtiquetasAbajo12] = useState([]);
  const [etiquetasAbajo13, setEtiquetasAbajo13] = useState([]);
  const [etiquetasAbajo14, setEtiquetasAbajo14] = useState([]);
  const [etiquetasAbajo15, setEtiquetasAbajo15] = useState([]);
  const [etiquetasAbajo16, setEtiquetasAbajo16] = useState([]);
  const [etiquetasAbajo17, setEtiquetasAbajo17] = useState([]);

  useEffect(() => {
    const fetchEtiquetas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/etiquetas");
        if (!response.ok) {
          throw new Error("No se pudo cargar las etiquetas.");
        }
        const etiquetas = await response.json();
        setEtiquetasAgregadas(etiquetas);
      } catch (error) {
        console.error("Error al cargar etiquetas:", error);
      }
    };

    fetchEtiquetas();
  }, []);

  const handleTagDelete = (tagId) => {
    // Elimina la etiqueta del estado local
    setEtiquetasAgregadas(
      etiquetasAgregadas.filter((item) => item.id !== tagId)
    );
  };
  // Función para formatear la fecha
  function formatDateWithoutTime(date) {
    // Convierte la fecha en un objeto Date
    const parsedDate = new Date(date);
    // Formatea la fecha como "DD/MM/AAAA"
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  }
  return (
    <div style={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
      <AgregarProducto />
      <div className="container">
        <div className="row align-items-start">
          <div className="col bg-success">
            <div className="position etiquetasAgregadas">
              <h6 className="text-center tittle">Etiquetas Agregadas</h6>
              <ReactSortable
                list={etiquetasAgregadas}
                setList={setEtiquetasAgregadas}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAgregadas.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                        <div className="card-body titulosTyle ">
                          {item.nombre}
                        </div>
                        <BotonOption
                          etiqueta={item}
                          onDelete={handleTagDelete}
                        />
                      </div>
                      <hr className="linea-etiqueta" />
                      <strong>
                        {console.log("Valor de polvos:", item.polvos)}
                        {item.polvos === true && (
                          <p className="tamañoLetra posicionamientoEtiquetas spaciadoEtiquetaLetras">
                            POLVOS
                          </p>
                        )}
                      </strong>
                      <hr className="linea-etiqueta" />
                      <div className="position2 spaciadoEtiquetaLetras">
                        <p className="tamañoLetra ">
                          {formatDateWithoutTime(item.fecha)}
                        </p>

                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
          </div>
          <div className="fondo">
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT54-II</h6>
              <ReactSortable
                list={etiquetasAbajo1}
                setList={setEtiquetasAbajo1}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo1.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                        <div className="card-body titulosTyle ">
                          {item.nombre}
                        </div>
                        <BotonOption
                          etiqueta={item}
                          onDelete={handleTagDelete}
                        />
                      </div>
                      <hr className="linea-etiqueta" />
                      <strong>
                        {console.log("Valor de polvos:", item.polvos)}
                        {item.polvos === true && (
                          <p className="tamañoLetra posicionamientoEtiquetas spaciadoEtiquetaLetras">
                            POLVOS
                          </p>
                        )}
                      </strong>
                      <hr className="linea-etiqueta" />
                      <div className="position2 spaciadoEtiquetaLetras">
                        <p className="tamañoLetra ">
                          {formatDateWithoutTime(item.fecha)}
                        </p>

                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">BUSS I</h6>
              <ReactSortable
                list={etiquetasAbajo2}
                setList={setEtiquetasAbajo2}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo2.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                        <div className="card-body titulosTyle ">
                          {item.nombre}
                        </div>
                        <BotonOption
                          etiqueta={item}
                          onDelete={handleTagDelete}
                        />
                      </div>
                      <hr className="linea-etiqueta" />
                      <strong>
                        {console.log("Valor de polvos:", item.polvos)}
                        {item.polvos === true && (
                          <p className="tamañoLetra posicionamientoEtiquetas spaciadoEtiquetaLetras">
                            POLVOS
                          </p>
                        )}
                      </strong>
                      <hr className="linea-etiqueta" />
                      <div className="position2 spaciadoEtiquetaLetras">
                        <p className="tamañoLetra ">
                          {formatDateWithoutTime(item.fecha)}
                        </p>

                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT70-II</h6>
              <ReactSortable
                list={etiquetasAbajo3}
                setList={setEtiquetasAbajo3}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo3.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                        <div className="card-body titulosTyle ">
                          {item.nombre}
                        </div>
                        <BotonOption
                          etiqueta={item}
                          onDelete={handleTagDelete}
                        />
                      </div>
                      <hr className="linea-etiqueta" />
                      <strong>
                        {console.log("Valor de polvos:", item.polvos)}
                        {item.polvos === true && (
                          <p className="tamañoLetra posicionamientoEtiquetas spaciadoEtiquetaLetras">
                            POLVOS
                          </p>
                        )}
                      </strong>
                      <hr className="linea-etiqueta" />
                      <div className="position2 spaciadoEtiquetaLetras">
                        <p className="tamañoLetra ">
                          {formatDateWithoutTime(item.fecha)}
                        </p>

                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT54-IV</h6>
              <ReactSortable
                list={etiquetasAbajo4}
                setList={setEtiquetasAbajo4}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo4.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                        <div className="card-body titulosTyle ">
                          {item.nombre}
                        </div>
                        <BotonOption
                          etiqueta={item}
                          onDelete={handleTagDelete}
                        />
                      </div>
                      <hr className="linea-etiqueta" />
                      <strong>
                        {console.log("Valor de polvos:", item.polvos)}
                        {item.polvos === true && (
                          <p className="tamañoLetra posicionamientoEtiquetas spaciadoEtiquetaLetras">
                            POLVOS
                          </p>
                        )}
                      </strong>
                      <hr className="linea-etiqueta" />
                      <div className="position2 spaciadoEtiquetaLetras">
                        <p className="tamañoLetra ">
                          {formatDateWithoutTime(item.fecha)}
                        </p>

                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT54-V</h6>
              <ReactSortable
                list={etiquetasAbajo5}
                setList={setEtiquetasAbajo5}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo5.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT54-I</h6>
              <ReactSortable
                list={etiquetasAbajo6}
                setList={setEtiquetasAbajo6}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo6.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT-58</h6>
              <ReactSortable
                list={etiquetasAbajo7}
                setList={setEtiquetasAbajo7}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo7.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT-40</h6>
              <ReactSortable
                list={etiquetasAbajo8}
                setList={setEtiquetasAbajo8}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo8.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT54-III</h6>
              <ReactSortable
                list={etiquetasAbajo9}
                setList={setEtiquetasAbajo9}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo9.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT54-VII</h6>
              <ReactSortable
                list={etiquetasAbajo10}
                setList={setEtiquetasAbajo10}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo10.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT70-I</h6>
              <ReactSortable
                list={etiquetasAbajo11}
                setList={setEtiquetasAbajo11}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo11.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXTBUSS-II</h6>
              <ReactSortable
                list={etiquetasAbajo12}
                setList={setEtiquetasAbajo12}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo12.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT-26-I</h6>
              <ReactSortable
                list={etiquetasAbajo13}
                setList={setEtiquetasAbajo13}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo13.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT-26-II</h6>
              <ReactSortable
                list={etiquetasAbajo14}
                setList={setEtiquetasAbajo14}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo14.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT54-VI</h6>
              <ReactSortable
                list={etiquetasAbajo15}
                setList={setEtiquetasAbajo15}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo15.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT70-III</h6>
              <ReactSortable
                list={etiquetasAbajo16}
                setList={setEtiquetasAbajo16}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo16.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div className="col bg-danger position">
              <h6 className="text-center tittle">EXT54-VIII</h6>
              <ReactSortable
                list={etiquetasAbajo17}
                setList={setEtiquetasAbajo17}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAbajo17.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">
                          {item.nombre}
                        </div>
                        <BotonOption />
                      </div>
                      <hr className="linea-etiqueta" />
                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra">{item.fecha}</p>
                        <p className="tamañoLetra">{item.clave}</p>
                        <p className="tamañoLetra">{item.kilos}kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
