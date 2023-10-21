import React, { Component } from "react";
import { ReactSortable } from "react-sortablejs";
import "../../style/DragAnDrop/DragAnDrop.css";
import "../../style/cards.css";
import BotonOption from "../global/botonOptions";
import "../../style/global/global.css";

export default class List2 extends Component {
  state = {
    list: [
      {
        id: 1,
        name: "FLAT BLACK 6587M",
        clave: "ZNL66587M",
        kilos: "550",
        date: "30/10/2023",
      },
      {
        id: 2,
        name: " BEIGE ARENA 944/14586",
        clave: "HML50078 ",
        kilos: "500 ",
        date: " 06/11/2023",
      },
      {
        id: 3,
        name: " BEIGE PERGAMINO",
        clave: "HML20067 ",
        kilos: " 600",
        date: " 06/11/2023",
      },

      {
        id: 4,
        name: " NEGRO DRBX CR 32481",
        clave: "PNT632481 ",
        kilos: " 2100",
        date: " 06/11/2023",
      },

      {
        id: 5,
        name: "BEIGE SEMIMATE 5918 ",
        clave: "HML30248 ",
        kilos: "1200 ",
        date: " 06/11/2023",
      },

      {
        id: 6,
        name: "OYSTER WHITE 15520 ",
        clave: "HBL30257 ",
        kilos: "600 ",
        date: " 06/11/2023",
      },

      {
        id: 7,
        name: "GRIS 212 5922",
        clave: " PGL435922",
        kilos: "600 ",
        date: "06/11/2023 ",
      },
      {
        id: 8,
        name: " GRIS REMOLQUE 38967",
        clave: " ZGL138967",
        kilos: "1000 ",
        date: " 06/11/2023",
      },
      {
        id: 9,
        name: "JOHN DEERE GREEN 8775 ",
        clave: "PVL10033 ",
        kilos: "600 ",
        date: " 06/11/2023",
      },
    ],
    list2: [
      {
        id: 10,
        name: "MARILLO C-109",
        clave: "HAL20011",
        kilos: "4200",
        date: "30/10/2023",
      },
    ],
    list3: [
      {
        id: 11,
        name: "GLOSS BLACK 35296",
        clave: "PNL335296",
        kilos: "24000",
        date: "30/10/2023",
      },
    ],
    list4: [
      {
        id: 12,
        name: "GLOSS BLACK 35296",
        clave: "PNL335296",
        kilos: "6000",
        date: "0/10/2023",
      },
    ],
    list5: [
      {
        id: 13,
        name: "BLACK MATTE 45 PS 37552 NPL ",
        clave: "HNL437552",
        kilos: "4500",
        date: "30/10/2023",
      },
    ],
    list6: [
      {
        id: 14,
        name: "DUSK 21056	1200 ",
        clave: "FNT60120",
        kilos: "1200",
        date: "30/10/2023",
      },
    ],
    list7: [
      {
        id: 15,
        name: "921 BLACK WHITE SPECKLE 30233",
        clave: "HNG530233",
        kilos: "300",
        date: "30/10/2023",
      },
    ],
    list8: [
      {
        id: 16,
        name: "HIGH GLOSS CAT YELLOW 35491	1200",
        clave: "ZAL135491",
        kilos: "1200",
        date: "30/10/2023",
      },
    ],
    list9: [
      {
        id: 17,
        name: "TH BLACK TEX 0038H	6000",
        clave: "ZNT60038H",
        kilos: "6000",
        date: "30/10/202",
      },
    ],
    list10: [
      {
        id: 18,
        name: "MONARCH BLACK 35215	4200 ",
        clave: "ZNL335215",
        kilos: "4200",
        date: "30/10/2023",
      },
    ],
    list11: [
      {
        id: 19,
        name: " GUN METAL GREY 163013 RYJ270 39046",
        clave: "HGL439046 ",
        kilos: " 1800",
        date: "30/10/2023",
      },
    ],
    list12: [
      {
        id: 20,
        name: "HIGH CORROSION RESIST P-88 18785 ",
        clave: " ZMT60015",
        kilos: " 4000",
        date: "30/10/2023",
      },
    ],
    list13: [
      {
        id: 21,
        name: "IK BLACK MCX 37307 ",
        clave: "PNL437307 ",
        kilos: "600 ",
        date: "30/10/2023",
      },
    ],
    list14: [
      {
        id: 22,
        name: " AMARILLO MCX 37281",
        clave: "PAL137281 ",
        kilos: " 2000",
        date: "31/10/2023",
      },
    ],
    list15: [
      {
        id: 23,
        name: " HAMMER BLACK 25560",
        clave: "PNG525560 ",
        kilos: " 600",
        date: "31/10/2023",
      },
    ],
    list16: [
      {
        id: 24,
        name: " NARANJA BRILLANTE",
        clave: "HOL10195 ",
        kilos: " 1200",
        date: "31/10/2023",
      },
    ],
    list17: [
      {
        id: 25,
        name: "CHARCOAL BROWN 10849 ",
        clave: " FCL10017",
        kilos: " 2000",
        date: "31/10/2023",
      },
    ],
  };
  render() {
    return (
      <div class="container ">
        <div className="row align-items-start ">
          <div className="col bg-success">
            <div
              /*   style={{
                display: "flex",
              }} */
              className=" position etiquetasAgregadas"
            >
              <h6 className="text-center tittle">Etiquetas Agregadas</h6>
              <ReactSortable
                list={this.state.list}
                setList={(newState) => this.setState({ list: newState })}
                group="shared-group-name"
                className="position"
              >
                {this.state.list.map((item) => (
                  <div key={item.id} className="etiqueta">
                    <div className="  m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="card-body titulosTyle">{item.name}</div>
                        <BotonOption />
                      </div>

                      <hr className="linea-etiqueta" />

                      <hr className="linea-etiqueta" />
                      <div className="position">
                        <p className="tamañoLetra"> {item.date}</p>
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
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT54-II</h6>

                <ReactSortable
                  list={this.state.list2}
                  setList={(newState) => this.setState({ list2: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list2.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />

                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXTBUSS-I</h6>

                <ReactSortable
                  list={this.state.list3}
                  setList={(newState) => this.setState({ list3: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list3.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT70-II</h6>

                <ReactSortable
                  list={this.state.list4}
                  setList={(newState) => this.setState({ list4: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list4.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <hr className="linea-etiqueta" />

                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT54-IV</h6>

                <ReactSortable
                  list={this.state.list5}
                  setList={(newState) => this.setState({ list5: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list5.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <hr className="linea-etiqueta" />

                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT54-V</h6>

                <ReactSortable
                  list={this.state.list6}
                  setList={(newState) => this.setState({ list6: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list6.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <hr className="linea-etiqueta" />

                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT54-I</h6>

                <ReactSortable
                  list={this.state.list7}
                  setList={(newState) => this.setState({ list7: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list7.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT-58</h6>

                <ReactSortable
                  list={this.state.list8}
                  setList={(newState) => this.setState({ list8: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list8.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT-40</h6>

                <ReactSortable
                  list={this.state.list9}
                  setList={(newState) => this.setState({ list9: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list9.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT54-III</h6>

                <ReactSortable
                  list={this.state.list10}
                  setList={(newState) => this.setState({ list10: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list10.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT54-VII</h6>

                <ReactSortable
                  list={this.state.list11}
                  setList={(newState) => this.setState({ list11: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list11.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT70-I</h6>

                <ReactSortable
                  list={this.state.list12}
                  setList={(newState) => this.setState({ list12: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list12.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXTBUSS-II</h6>

                <ReactSortable
                  list={this.state.list13}
                  setList={(newState) => this.setState({ list13: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list13.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT-26-I</h6>

                <ReactSortable
                  list={this.state.list14}
                  setList={(newState) => this.setState({ list14: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list14.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT54-VI</h6>

                <ReactSortable
                  list={this.state.list15}
                  setList={(newState) => this.setState({ list15: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list15.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT70-III</h6>

                <ReactSortable
                  list={this.state.list16}
                  setList={(newState) => this.setState({ list16: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list16.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
                          <p className="tamañoLetra">{item.clave}</p>
                          <p className="tamañoLetra">{item.kilos}kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            </div>
            <div>
              <div class="col bg-danger" className="position">
                <h6 className="text-center tittle">EXT54-VIII</h6>

                <ReactSortable
                  list={this.state.list17}
                  setList={(newState) => this.setState({ list17: newState })}
                  group="shared-group-name"
                  className="position"
                >
                  {this.state.list17.map((item) => (
                    <div key={item.id} className="etiqueta">
                      <div className=" m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta">
                          <div className="card-body titulosTyle">
                            {item.name}
                          </div>
                          <BotonOption />
                        </div>
                        <hr className="linea-etiqueta" />
                        <div className="position">
                          <p className="tamañoLetra"> {item.date}</p>
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
}
