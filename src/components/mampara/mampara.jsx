import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import "../../style/DragAnDrop/DragAnDrop.css";
import "../../style/cards.css";
import BotonOption from "../global/botonOptions";
import "../../style/global/global.css";
import AgregarProducto from "../productos/formulario";

const apiUrlEtiquetasExt54_2 = "http://localhost:3000/api/v1/etiquetasExt54_2";
const apiUrlBuss1 = "http://localhost:3000/api/v1/etiquetasBussl";
const apiUrlEtiquetasExt70_2 = "http://localhost:3000/api/v1/etiquetasExt70_2";
const apiUrlEtiquetasExt54_4 = "http://localhost:3000/api/v1/etiquetasExt54_4";
const apiUrlEtiquetasExt54_5 = "http://localhost:3000/api/v1/etiquetasExt54_5";
const apiUrlEtiquetasExt54_1 = "http://localhost:3000/api/v1/etiquetasExt54_1";
const apiUrlEtiquetasExt58 = "http://localhost:3000/api/v1/etiquetasExt58";
const apiUrlEtiquetasExt40 = "http://localhost:3000/api/v1/etiquetasExt40";
const apiUrlEtiquetasExt54_3 = "http://localhost:3000/api/v1/etiquetasExt54_3";
const apiUrlEtiquetasExt54_7 = "http://localhost:3000/api/v1/etiquetasExt54_7";
const apiUrlEtiquetasExt70_1 = "http://localhost:3000/api/v1/etiquetasExt70_1";
const apiUrlBuss2 = "http://localhost:3000/api/v1/etiquetasBussll";
const apiUrlEtiquetasExt26_1 = "http://localhost:3000/api/v1/etiquetasExt26_1";
const apiUrlEtiquetasExt26_2 = "http://localhost:3000/api/v1/etiquetasExt26_2";
const apiUrlEtiquetasExt54_6 = "http://localhost:3000/api/v1/etiquetasExt54_6";
const apiUrlEtiquetasExt70_3 = "http://localhost:3000/api/v1/etiquetasExt70_3";
const apiUrlEtiquetasExt54_8 = "http://localhost:3000/api/v1/etiquetasExt54_8";
const apiUrlEtiqueras = "http://localhost:3000/api/v1/etiquetas";

export default function Component2() {
  const [labelColor, setLabelColor] = React.useState("#ffffff");
  const [etiquetasAgregadas, setEtiquetasAgregadas] = useState([]);

  const [ext54lletiquetas, setExt54lletiquetas] = useState([]);
  const [etiquetasBussl, setEtiquetasBussl] = useState([]);
  const [etiquetasExt70_2, setEtiquetasExt70_2] = useState([]);
  const [etiquetasExt54_4, setEtiquetasExt54_4] = useState([]);
  const [etiquetasExt54_5, setEtiquetasExt54_5] = useState([]);
  const [etiquetasExt54_1, setEtiquetasExt54_1] = useState([]);
  const [etiquetasExt58, setEtiquetasExt58] = useState([]);
  const [etiquetasExt40, setEtiquetasExt40] = useState([]);
  const [etiquetasExt54_3, setEtiquetasExt54_3] = useState([]);
  const [etiquetasExt54_7, setEtiquetasExt54_7] = useState([]);
  const [etiquetasExt70_1, setEtiquetasExt70_1] = useState([]);
  const [etiquetasBuss2, setEtiquetasBuss2] = useState([]);
  const [etiquetasExt26_1, setEtiquetasExt26_1] = useState([]);
  const [etiquetasExt26_2, setEtiquetasExt26_2] = useState([]);
  const [etiquetasExt54_6, setEtiquetasExt54_6] = useState([]);
  const [etiquetasExt70_3, setEtiquetasExt70_3] = useState([]);
  const [etiquetasExt54_8, setEtiquetasExt54_8] = useState([]);

  const [watchEtiquetas, setWatchEtiquetas] = useState(null);
  const [watchExt54ll, setWatch54ll] = useState(null);
  const [watchBuss1, setWaBuss1] = useState(null);
  const [watchExt70_2, setWatchExt70_2] = useState(null);
  const [watchExt54_4, setWatchExt54_4] = useState(null);
  const [watchExt54_5, setWatchExt54_5] = useState(null);
  const [watchExt54_1, setWatchExt54_1] = useState(null);
  const [watchExt58, setWatchExt58] = useState(null);
  const [watchExt40, setWatchExt40] = useState(null);
  const [watchExt54_3, setWatchExt54_3] = useState(null);
  const [watchExt54_7, setWatchExt54_7] = useState(null);
  const [watchExt70_1, setWatchExt70_1] = useState(null);
  const [watchExtBuss2, setWatchExtBuss2] = useState(null);
  const [watchExt26_1, setWatchExt26_1] = useState(null);
  const [watchExt26_2, setWatchExt26_2] = useState(null);
  const [watchExt54_6, setWatchExt54_6] = useState(null);
  const [watchExt70_3, setWatchExt70_3] = useState(null);
  const [watchExt54_8, setWatchExt54_8] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt54_2")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt54ll.");
        }
        setExt54lletiquetas(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt54ll:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasBussl")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasBussl.");
        }
        setEtiquetasBussl(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasBussl:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt70_2")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt70_2.");
        }
        setEtiquetasExt70_2(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt70_2:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt54_4")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt70_2.");
        }
        setEtiquetasExt54_4(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt70_2:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt54_5")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt70_2.");
        }
        setEtiquetasExt54_5(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt54_5:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt54_1")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt54_1.");
        }
        setEtiquetasExt54_1(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt54_1:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt58")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt58");
        }
        setEtiquetasExt58(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt58:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt40")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt58");
        }
        setEtiquetasExt40(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt40:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt54_3")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt58");
        }
        setEtiquetasExt54_3(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt58:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt54_7")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt58");
        }
        setEtiquetasExt54_7(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt58:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt70_2")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt58");
        }
        setEtiquetasExt70_2(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt58:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasBussll")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasBUSS2");
        }
        setEtiquetasBuss2(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt58:", error);
      });
  }, []);
  /* 26 1 */
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt26_1")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetas26_1");
        }
        setEtiquetasExt26_1(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt58:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt26_2")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetas26_2");
        }
        setEtiquetasExt26_2(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt26_2:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt54_6")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetas54_6");
        }
        setEtiquetasExt54_6(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt54_6:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt70_3")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasext 70 3");
        }
        setEtiquetasExt70_3(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt70 3:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt54_8")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetas54_8");
        }
        setEtiquetasExt54_8(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt54_8:", error);
      });
  }, []);

  /* --------------EXTRUSORES------------------------------------ */
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetas")
      .then((response) => {
        if (response.status !== 200) {
          throw Error("No se pudieron cargar las etiquetas.");
        }
        setEtiquetasAgregadas(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetas:", error);
      });
  }, []);

  const handleTagDelete = (tagId) => {
    setEtiquetasAgregadas(
      etiquetasAgregadas.filter((item) => item.id !== tagId)
    );
  };

  const formatDateWithoutTime = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  };

  /* Etiquetas */
  useEffect(() => {
    if (watchEtiquetas !== null) {
      console.log("chekEtiquetas ", etiquetasAgregadas);

      // Aquí manejas el guardado masivo al cambiar etiquetasAgregadas
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiqueras, etiquetasAgregadas);

          console.log("Etiquetas guardadas con éxito");
        } catch (error) {
          console.error("Error al guardar las etiquetas", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasAgregadas
      guardarEtiquetasMasivo();
    }
  }, [etiquetasAgregadas]);

  const handlEtiquetasChange = (newState) => {
    setWatchEtiquetas(new Date());
    setEtiquetasAgregadas(newState);
  };
  /* ------ */
  /* implementacion de el guardado de etiquetas para cada extrusor */
  useEffect(() => {
    if (watchExt54ll !== null) {
      console.log("chek1 ", ext54lletiquetas);

      // Aquí manejas el guardado masivo al cambiar ext54lletiquetas
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt54_2, ext54lletiquetas);

          console.log("Etiquetas guardadas con éxito");
        } catch (error) {
          console.error("Error al guardar las etiquetas", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia ext54lletiquetas
      guardarEtiquetasMasivo();
    }
  }, [ext54lletiquetas]);

  const handleext54lletiquetasChange = (newState) => {
    setWatch54ll(new Date());
    setExt54lletiquetas(newState);
  };
  /* ------BUSS1 */
  useEffect(() => {
    if (watchBuss1 !== null) {
      console.log("chekBuss1 ", etiquetasBussl);

      // Aquí manejas el guardado masivo al cambiar etiquetasBussl
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlBuss1, etiquetasBussl);

          console.log("Etiquetas guardadas con éxito Buss 1");
        } catch (error) {
          console.error("Error al guardar las etiquetas Buss1", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasBussl
      guardarEtiquetasMasivo();
    }
  }, [etiquetasBussl]);

  const handleBuss1etiquetasChange = (newState) => {
    setWaBuss1(new Date());
    setEtiquetasBussl(newState);
  };
  /* Ext 70-2 */
  useEffect(() => {
    if (watchExt70_2 !== null) {
      console.log("chekBussbuss1 ", etiquetasExt70_2);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt70_2
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt70_2, etiquetasExt70_2);

          console.log("Etiquetas guardadas con éxito Buss 1");
        } catch (error) {
          console.error("Error al guardar las etiquetas Buss1", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt70_2
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt70_2]);

  const handleEXT70IIetiquetasChange = (newState) => {
    setWatchExt70_2(new Date());
    setEtiquetasExt70_2(newState);
  };

  /* 54_4 */
  useEffect(() => {
    if (watchExt54_4 !== null) {
      console.log("chekBussbuss1 ", etiquetasExt54_4);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt70_2
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt54_4, etiquetasExt54_4);

          console.log("Etiquetas guardadas con éxito 54-4");
        } catch (error) {
          console.error("Error al guardar las etiquetas 54-4", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt54_4]);

  const handleEXT54_4etiquetasChange = (newState) => {
    setWatchExt54_4(new Date());
    setEtiquetasExt54_4(newState);
  };
  /* 54_5 */
  useEffect(() => {
    if (watchExt54_5 !== null) {
      console.log("chek54_5", etiquetasExt54_5);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt70_2
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt54_5, etiquetasExt54_5);

          console.log("Etiquetas guardadas con éxito 54-5");
        } catch (error) {
          console.error("Error al guardar las etiquetas 54-5", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt54_5]);

  const handleEXT54_5etiquetasChange = (newState) => {
    setWatchExt54_5(new Date());
    setEtiquetasExt54_5(newState);
  };

  /* 54_1 */
  useEffect(() => {
    if (watchExt54_1 !== null) {
      console.log("chek54_1 ", etiquetasExt54_1);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt54_1
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt54_1, etiquetasExt54_1);

          console.log("Etiquetas guardadas con éxito 54-1");
        } catch (error) {
          console.error("Error al guardar las etiquetas 54-1", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt54_1]);

  const handleEXT54_1etiquetasChange = (newState) => {
    setWatchExt54_1(new Date());
    setEtiquetasExt54_1(newState);
  };
  /* 58*/
  useEffect(() => {
    if (watchExt58 !== null) {
      console.log("chek58 ", etiquetasExt58);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt58
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt58, etiquetasExt58);

          console.log("Etiquetas guardadas con éxito 54-8");
        } catch (error) {
          console.error("Error al guardar las etiquetas 54-8", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt58]);

  const handleEXT58etiquetasChange = (newState) => {
    setWatchExt58(new Date());
    setEtiquetasExt58(newState);
  };

  /* 40*/
  useEffect(() => {
    if (watchExt40 !== null) {
      console.log("chek58 ", etiquetasExt40);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt58
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt40, etiquetasExt40);

          console.log("Etiquetas guardadas con éxito 40");
        } catch (error) {
          console.error("Error al guardar las etiquetas 40", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt40]);

  const handleEXT40etiquetasChange = (newState) => {
    setWatchExt40(new Date());
    setEtiquetasExt40(newState);
  };
  /* 54_3*/
  useEffect(() => {
    if (watchExt54_3 !== null) {
      console.log("chek58 ", etiquetasExt54_3);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt58
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt54_3, etiquetasExt54_3);

          console.log("Etiquetas guardadas con éxito 54_3");
        } catch (error) {
          console.error("Error al guardar las etiquetas 54_3", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt54_3]);

  const handleEXT54_3etiquetasChange = (newState) => {
    setWatchExt54_3(new Date());
    setEtiquetasExt54_3(newState);
  };

  /* 54_7*/
  useEffect(() => {
    if (watchExt54_7 !== null) {
      console.log("chek58 ", etiquetasExt54_7);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt58
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt54_7, etiquetasExt54_7);

          console.log("Etiquetas guardadas con éxito 54_7");
        } catch (error) {
          console.error("Error al guardar las etiquetas 54_7", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt54_7]);

  const handleEXT54_7etiquetasChange = (newState) => {
    setWatchExt54_7(new Date());
    setEtiquetasExt54_7(newState);
  };

  /* 70_2*/
  useEffect(() => {
    if (watchExt70_1 !== null) {
      console.log("chek70_1 ", etiquetasExt70_1);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt58
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt70_1, etiquetasExt70_1);

          console.log("Etiquetas guardadas con éxito 70_1");
        } catch (error) {
          console.error("Error al guardar las etiquetas 70_1", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt70_1]);

  const handleEXT70_1etiquetasChange = (newState) => {
    setWatchExt70_1(new Date());
    setEtiquetasExt70_1(newState);
  };
  /* BUSS 2 */
  useEffect(() => {
    if (watchExtBuss2 !== null) {
      console.log("chekBUSS2 ", etiquetasBuss2);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt58
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlBuss2, etiquetasBuss2);

          console.log("Etiquetas guardadas con éxito BUSS2");
        } catch (error) {
          console.error("Error al guardar las etiquetas BUSS2", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasBuss2]);

  const handleBUSS2etiquetasChange = (newState) => {
    setWatchExtBuss2(new Date());
    setEtiquetasBuss2(newState);
  };

  /* 26_1*/
  useEffect(() => {
    if (watchExt26_1 !== null) {
      console.log("chek26_1 ", etiquetasExt26_1);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt58
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt26_1, etiquetasExt26_1);

          console.log("Etiquetas guardadas con éxito 26_1");
        } catch (error) {
          console.error("Error al guardar las etiquetas 26_1", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt26_1]);

  const handleExt26_1etiquetasChange = (newState) => {
    setWatchExt26_1(new Date());
    setEtiquetasExt26_1(newState);
  };
  /* 26_2 */
  useEffect(() => {
    if (watchExt26_2 !== null) {
      console.log("chek26_2 ", etiquetasExt26_2);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt58
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt26_2, etiquetasExt26_2);

          console.log("Etiquetas guardadas con éxito 26_2");
        } catch (error) {
          console.error("Error al guardar las etiquetas 26_2", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt26_2]);

  const handleExt26_2etiquetasChange = (newState) => {
    setWatchExt26_2(new Date());
    setEtiquetasExt26_2(newState);
  };

  useEffect(() => {
    if (watchExt54_6 !== null) {
      console.log("chek54_6 ", etiquetasExt54_6);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt58
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt54_6, etiquetasExt54_6);

          console.log("Etiquetas guardadas con éxito EXT 54_6");
        } catch (error) {
          console.error("Error al guardar las etiquetas  EXT 54_6", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt54_6]);

  const handleExt54_6etiquetasChange = (newState) => {
    setWatchExt54_6(new Date());
    setEtiquetasExt54_6(newState);
  };

  useEffect(() => {
    if (watchExt70_3 !== null) {
      console.log("chekExt ", etiquetasExt70_3);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt58
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt70_3, etiquetasExt70_3);

          console.log("Etiquetas guardadas con éxito EXT 70 3");
        } catch (error) {
          console.error("Error al guardar las etiquetas 70 3", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt70_3]);

  const handleExt70_3etiquetasChange = (newState) => {
    setWatchExt70_3(new Date());
    setEtiquetasExt70_3(newState);
  };

  useEffect(() => {
    if (watchExt54_8 !== null) {
      console.log("chek54_8 ", etiquetasExt54_8);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt58
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt54_8, etiquetasExt54_8);

          console.log("Etiquetas guardadas con éxito Ext 54_8");
        } catch (error) {
          console.error("Error al guardar las etiquetas EXT 54_8", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt54_8]);

  const handleEXT54_8etiquetasChange = (newState) => {
    setWatchExt54_8(new Date());
    setEtiquetasExt54_8(newState);
  };
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
                /* setList={setEtiquetasAgregadas} */
                setList={(newState) => handlEtiquetasChange(newState)}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAgregadas.map((item) => (
                  <div
                    key={item.id}
                    className="etiqueta"
                    style={{
                      backgroundColor:
                        item.estado === "pendiente" ? "#FFE224" : labelColor,
                    }}
                    data-id={item.id}
                  >
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-II</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-II"
                  list={ext54lletiquetas}
                  setList={(newState) => handleext54lletiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {ext54lletiquetas.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">BUSS-I</h6>
              </div>
              <div>
                <ReactSortable
                  value="BUSS-I"
                  list={etiquetasBussl}
                  setList={(newState) => handleBuss1etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasBussl.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT70-II</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT70-II"
                  list={etiquetasExt70_2}
                  setList={(newState) => handleEXT70IIetiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt70_2.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-IV</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-IV"
                  list={etiquetasExt54_4}
                  setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_4.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            {/* ---------------------------------------------------------------------------------------- */}
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-V</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-V"
                  list={etiquetasExt54_5}
                  setList={(newState) => handleEXT54_5etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_5.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-I</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-I"
                  list={etiquetasExt54_1}
                  setList={(newState) => handleEXT54_1etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_1.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT58</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT58"
                  list={etiquetasExt58}
                  setList={(newState) => handleEXT58etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt58.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT40</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT40"
                  list={etiquetasExt40}
                  setList={(newState) => handleEXT40etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt40.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-III</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-III"
                  list={etiquetasExt54_3}
                  setList={(newState) => handleEXT54_3etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_3.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-VII</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-VII"
                  list={etiquetasExt54_7}
                  setList={(newState) => handleEXT54_7etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_7.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT70-I</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT70-I"
                  list={etiquetasExt70_1}
                  setList={(newState) => handleEXT70_1etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt70_1.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">BUSS II</h6>
              </div>
              <div>
                <ReactSortable
                  value="BUSS II"
                  list={etiquetasBuss2}
                  setList={(newState) => handleBUSS2etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasBuss2.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT26-1</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT26-1"
                  list={etiquetasExt26_1}
                  setList={(newState) => handleExt26_1etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt26_1.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT26-2</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT26-2"
                  list={etiquetasExt26_2}
                  setList={(newState) => handleExt26_2etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt26_2.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-VI</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-VI"
                  list={etiquetasExt54_6}
                  setList={(newState) => handleExt54_6etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_6.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT70-III</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT70-III"
                  list={etiquetasExt70_3}
                  setList={(newState) => handleExt70_3etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt70_3.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-VIII</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-VIII"
                  list={etiquetasExt54_8}
                  setList={(newState) => handleEXT54_8etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_8.map((item) => (
                    <div
                      key={item.id}
                      className="etiqueta"
                      style={{
                        backgroundColor:
                          item.estado === "pendiente" ? "#FFE224" : labelColor,
                      }}
                      data-id={item.id}
                    >
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

            {/* ---------------------------------------------------------------------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}
