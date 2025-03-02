import React, { useState } from "react";
import styled from "styled-components";

// Estilo para o contêiner de imagem
const ImageContainer = styled.div`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  background-color: #2a2a2a;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: ${(props) => props.borderRadius || "0"};
`;

// Estilo para a imagem
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${(props) => props.objectFit || "cover"};
  opacity: ${(props) => (props.loading ? 0.5 : 1)};
  transition: opacity 0.3s ease;
`;

// Estilo para o texto de fallback
const FallbackText = styled.div`
  color: #d4af37;
  text-align: center;
  padding: 10px;
  font-size: ${(props) => props.fontSize || "14px"};
  font-weight: bold;
`;

/**
 * Componente de imagem com fallback
 * @param {Object} props - Propriedades do componente
 * @param {string} props.src - URL da imagem
 * @param {string} props.alt - Texto alternativo para a imagem
 * @param {string} props.width - Largura do contêiner
 * @param {string} props.height - Altura do contêiner
 * @param {string} props.fallbackSrc - URL da imagem de fallback
 * @param {string} props.fallbackText - Texto a ser exibido se a imagem falhar
 * @param {string} props.objectFit - Propriedade object-fit da imagem
 * @param {string} props.borderRadius - Raio da borda do contêiner
 */
const ImageWithFallback = ({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  fallbackText,
  objectFit,
  borderRadius,
  ...rest
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Manipuladores de eventos
  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <ImageContainer width={width} height={height} borderRadius={borderRadius}>
      {error ? (
        fallbackSrc ? (
          <StyledImage
            src={fallbackSrc}
            alt={alt || "Imagem"}
            objectFit={objectFit}
            {...rest}
          />
        ) : (
          <FallbackText
            fontSize={height ? `${parseInt(height) / 8}px` : "14px"}
          >
            {fallbackText || alt || "Imagem não disponível"}
          </FallbackText>
        )
      ) : (
        <StyledImage
          src={src}
          alt={alt || "Imagem"}
          onError={handleError}
          onLoad={handleLoad}
          loading={loading}
          objectFit={objectFit}
          {...rest}
        />
      )}
    </ImageContainer>
  );
};

export default ImageWithFallback;
