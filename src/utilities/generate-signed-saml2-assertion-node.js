import * as xmlCrypto from "xml-crypto";
import { DOMParser, XMLSerializer } from "xmldom";

export const generateSignedSAML2AssertionNode = ({
  assertionNodeXML,
  keys,
}) => {
  const sig = new xmlCrypto.SignedXml();
  sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";

  const { privateKey, cert } = keys;

  sig.addReference(
    "//*[local-name(.)='Assertion']",
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

  sig.computeSignature(assertionNodeXML.toString());

  // Convert XML to DOM for manipulation
  const doc = new DOMParser().parseFromString(
    assertionNodeXML.toString(),
    "text/xml"
  );

  const signedXml = new DOMParser().parseFromString(
    sig.getSignedXml(),
    "text/xml"
  );

  // Extract the generated Signature element
  const signatureElement = signedXml.getElementsByTagName("Signature")[0];

  // Locate the Issuer element
  const issuerElement = doc.getElementsByTagName("saml2:Issuer")[0];

  if (issuerElement && signatureElement) {
    // Insert the Signature element right after the Issuer element
    issuerElement.parentNode.insertBefore(
      signatureElement,
      issuerElement.nextSibling
    );
  }

  // Convert back to XML string
  return new XMLSerializer().serializeToString(doc);
};
