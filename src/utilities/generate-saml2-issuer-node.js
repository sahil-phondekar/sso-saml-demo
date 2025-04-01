export const generateSAML2IssuerNode = ({ issuer }) => {
  const saml2IssuerNode = {
    "saml2:Issuer": {
      "@xmlns:saml2": "urn:oasis:names:tc:SAML:2.0:assertion",
      "#text": issuer,
    },
  };
  return saml2IssuerNode;
};
