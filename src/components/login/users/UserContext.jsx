import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Inicializar username con sessionStorage para persistir el estado a través de recargas de la página
  const [username, setUsername] = useState(
    () => sessionStorage.getItem("username") || ""
  );

  useEffect(() => {
    // Almacenar el username en sessionStorage cada vez que cambie
    if (username) {
      sessionStorage.setItem("username", username);
    } else {
      // Si por alguna razón el username se establece en un estado vacío o falso, lo removemos
      sessionStorage.removeItem("username");
    }
  }, [username]);

  const setUser = (user) => {
    setUsername(user);
  };

  return (
    <UserContext.Provider value={{ username, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
