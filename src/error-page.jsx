import React from "react";
import { Transition } from "react-transition-group";

const duration = 300; // Duración de la animación en milisegundos

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const NotFound = () => {
  return (
    <div>
      <h1>Error 404 - Página no encontrada</h1>
      <Transition in={true} timeout={duration}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <img src="https://example.com/error-image.png" alt="Error 404" />
          </div>
        )}
      </Transition>
    </div>
  );
};

export default NotFound;
