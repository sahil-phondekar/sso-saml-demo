import * as xmlCrypto from "xml-crypto";
import { generateAssertionSignedSaml2Response } from "../apis/generate-assertion-signed-saml2-response";

export const generateSaml2ResponseSignatureNode = ({ data, keys }) => {
  const saml2ResponseXML = generateAssertionSignedSaml2Response({ data, keys });

  const sig = new xmlCrypto.SignedXml();
  sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";

  const { privateKey, cert } = keys;

  sig.addReference(
    "//*[local-name(.)='Response']",
    [
      "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
      "http://www.w3.org/2001/10/xml-exc-c14n#",
    ],
    "http://www.w3.org/2001/04/xmlenc#sha256"
  );

  sig.signingKey = privateKey;

  const x509KeyValue = cert;

  const keyInfoProvider = {
    getKeyInfo: function () {
      return (
        "<X509Data><X509Certificate>" +
        x509KeyValue +
        "</X509Certificate></X509Data>"
      );
    },
  };

  sig.keyInfoProvider = keyInfoProvider;

  sig.computeSignature(saml2ResponseXML.toString());

  return sig.getSignatureXml();
};
