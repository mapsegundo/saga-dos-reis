import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: rgba(0, 0, 0, 0.8);
  color: #d4af37;
  padding: 12px 20px;
  text-align: center;
  font-size: 0.9rem;
  border-top: 2px solid #8b4513;
  width: 100%;
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(139, 69, 19, 0.3);
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const CopyrightText = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const VersionInfo = styled.div`
  font-size: 0.85rem;
  color: #a67c00;
`;

const Link = styled.a`
  color: #d4af37;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  padding: 2px 5px;
  border-radius: 3px;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
    background-color: rgba(139, 69, 19, 0.3);
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <CopyrightText>
          <span>©{currentYear}</span>
          <span>Saga dos Reis</span>
          <span>•</span>
          <Link
            href="https://github.com/mapsegundo/saga-dos-reis"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marshall Paiva
          </Link>
        </CopyrightText>
        <VersionInfo>Versão 1.0.0 • Última atualização: 02/03/2025</VersionInfo>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
