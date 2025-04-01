"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSAML2IssuerNode = void 0;
const generateSAML2IssuerNode = ({
  issuer
}) => {
  const saml2IssuerNode = {
    "saml2:Issuer": {
      "@xmlns:saml2": "urn:oasis:names:tc:SAML:2.0:assertion",
      "#text": issuer
    }
  };
  return saml2IssuerNode;
};
exports.generateSAML2IssuerNode = generateSAML2IssuerNode;