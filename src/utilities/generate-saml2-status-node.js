export const generateSAML2StatusNode = () => {
  const saml2StatusNode = {
    "saml2p:Status": {
      "saml2p:StatusCode": {
        "@Value": "urn:oasis:names:tc:SAML:2.0:status:Success",
      },
    },
  };
  return saml2StatusNode;
};
