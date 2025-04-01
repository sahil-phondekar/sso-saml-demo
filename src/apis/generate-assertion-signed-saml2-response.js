import * as xmlbuilder2 from "xmlbuilder2";
import { generateSAML2IssuerNode } from "../utilities/generate-saml2-issuer-node";
import { generateSAML2StatusNode } from "../utilities/generate-saml2-status-node";
import { generateSAML2AssertionNode } from "../utilities/generate-saml2-assertion-node";
import { generateSignedSAML2AssertionNode } from "../utilities/generate-signed-saml2-assertion-node";

export const generateAssertionSignedSaml2Response = ({ data, keys }) => {
  const {
    saml2ResponseAttributeValues,
    saml2IssuerValues,
    saml2AssertionValues,
  } = data;

  const { responseDestination, responseId, issueInstant } =
    saml2ResponseAttributeValues;

  const { issuer } = saml2IssuerValues;

  const {
    assertionId,
    issueInstant: assertionIssueInstant,
    issuer: assertionIssuer,
    subjectNameId,
    notOnOrAfterDate,
    recipient,
    audience,
    authnInstant,
    attributeArray,
  } = saml2AssertionValues;

  const options = {
    version: "1.0",
    encoding: "UTF-8",
  };

  const saml2ResponseAttributes = {
    "@xmlns:saml2p": "urn:oasis:names:tc:SAML:2.0:protocol",
    "@Destination": responseDestination,
    "@ID": responseId,
    "@Version": "2.0",
    "@IssueInstant": issueInstant,
  };

  const saml2IssuerNode = generateSAML2IssuerNode({ issuer: issuer });

  const saml2StatusNode = generateSAML2StatusNode();

  const saml2AssertionNode = generateSAML2AssertionNode({
    assertionID: assertionId,
    issueInstant: assertionIssueInstant,
    issuer: assertionIssuer,
    subjectNameId: subjectNameId,
    notOnOrAfterDate: notOnOrAfterDate,
    recipient: recipient,
    audience: audience,
    authnInstant: authnInstant,
    attributeArray: attributeArray,
  });

  const saml2AssertionNodeXml = xmlbuilder2.create(saml2AssertionNode);

  const signedAssertion = generateSignedSAML2AssertionNode({
    assertionNodeXML: saml2AssertionNodeXml,
    keys,
  });

  const saml2XML = xmlbuilder2.create(options, {
    "saml2p:Response": {
      ...saml2ResponseAttributes,
      ...saml2IssuerNode,
      ...saml2StatusNode,
    },
  });
  saml2XML.root().ele(signedAssertion.toString());
  saml2XML.end({ prettyPrint: true });
  return saml2XML;
};
