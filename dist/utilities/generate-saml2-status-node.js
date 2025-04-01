"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSAML2StatusNode = void 0;
const generateSAML2StatusNode = () => {
  const saml2StatusNode = {
    "saml2p:Status": {
      "saml2p:StatusCode": {
        "@Value": "urn:oasis:names:tc:SAML:2.0:status:Success"
      }
    }
  };
  return saml2StatusNode;
};
exports.generateSAML2StatusNode = generateSAML2StatusNode;