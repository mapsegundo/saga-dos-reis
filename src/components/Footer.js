import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: rgba(0, 0, 0, 0.7);
  color: #d4af37;
  padding: 8px 15px;
  text-align: center;
  font-size: 0.85rem;
  border-top: 1px solid #8b4513;
  width: 100%;
  z-index: 100;
`;

const CopyrightText = styled.p`
  margin: 0;
`;

const Link = styled.a`
  color: #d4af37;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <CopyrightText>
        © {currentYear} Saga dos Reis - Desenvolvido por{" "}
        <Link
          href="https://github.com/marshallpaiva"
          target="_blank"
          rel="noopener noreferrer"
        >
          Marshall Paiva
        </Link>
        . Todos os direitos reservados.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
