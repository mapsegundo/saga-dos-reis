import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Componente Portal para renderizar conteúdo fora da hierarquia DOM normal
const Portal = ({ children, containerId = "portal-root" }) => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    // Verifica se já existe um container com o ID especificado
    let portalContainer = document.getElementById(containerId);

    // Se não existir, cria um novo
    if (!portalContainer) {
      portalContainer = document.createElement("div");
      portalContainer.id = containerId;
      portalContainer.style.position = "fixed";
      portalContainer.style.top = "0";
      portalContainer.style.left = "0";
      portalContainer.style.width = "100%";
      portalContainer.style.height = "100%";
      portalContainer.style.zIndex = "99999"; // Z-index extremamente alto
      portalContainer.style.pointerEvents = "none"; // Não interfere com eventos, apenas seus filhos
      document.body.appendChild(portalContainer);
    }

    setContainer(portalContainer);

    // Cleanup: não removeremos o container para evitar problemas com múltiplos portais
    return () => {};
  }, [containerId]);

  // Só renderiza quando o container estiver disponível
  return container ? createPortal(children, container) : null;
};

export default Portal;
