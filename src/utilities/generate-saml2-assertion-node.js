const generateSAML2AssertionIssuerNode = ({ issuer }) => {
  const saml2AssertionIssuerNode = {
    "saml2:Issuer": {
      "#text": issuer,
    },
  };
  return saml2AssertionIssuerNode;
};

const generateSAML2AssertionSubjectNode = ({
  subjectNameId,
  notOnOrAfterDate,
  recipient,
}) => {
  const saml2AssertionSubjectNode = {
    "saml2:Subject": {
      "saml2:NameID": {
        "@Format": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
        "#text": subjectNameId,
      },
      "saml2:SubjectConfirmation": {
        "@Method": "urn:oasis:names:tc:SAML:2.0:cm:bearer",
        "saml2:SubjectConfirmationData": {
          "@NotOnOrAfter": notOnOrAfterDate,
          "@Recipient": recipient,
        },
      },
    },
  };
  return saml2AssertionSubjectNode;
};

const generateSAML2AssertionConditionsNode = ({
  notOnOrAfterDate,
  audience,
}) => {
  const saml2AssertionConditionsNode = {
    "saml2:Conditions": {
      "@NotOnOrAfter": notOnOrAfterDate,
      "saml2:AudienceRestriction": {
        "saml2:Audience": {
          "#text": audience,
        },
      },
    },
  };
  return saml2AssertionConditionsNode;
};

const generateSAML2AssertionAuthnStatement = ({ authnInstant }) => {
  const saml2AssertionAuthnStatementNode = {
    "saml2:AuthnStatement": {
      "@AuthnInstant": authnInstant,
      "@SessionIndex": "42",
      "saml2:AuthnContext": {
        "saml2:AuthnContextClassRef": {
          "#text": "urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified",
        },
      },
    },
  };
  return saml2AssertionAuthnStatementNode;
};

const generateSAML2AssertionAttributeNode = ({ name, value }) => {
  const saml2AssertionAttributeNode = {
    "@Name": name,
    "saml2:AttributeValue": {
      "#text": value,
    },
  };
  return saml2AssertionAttributeNode;
};

const generateSAML2AssertionAttributeStatementNode = (attributeArray) => {
  const saml2AssertionAttrubuteArray = [];
  attributeArray.map(({ name, value }) => {
    return saml2AssertionAttrubuteArray.push(
      generateSAML2AssertionAttributeNode({ name, value })
    );
  });
  const saml2AssertionAttributeStatementNode = {
    "saml2:AttributeStatement": {
      "saml2:Attribute": saml2AssertionAttrubuteArray,
    },
  };
  return saml2AssertionAttributeStatementNode;
};

export const generateSAML2AssertionNode = ({
  issuer,
  subjectNameId,
  notOnOrAfterDate,
  recipient,
  audience,
  attributeArray,
  authnInstant,
  issueInstant,
  assertionID,
}) => {
  const saml2AssertionAttributeFields = {
    "@xmlns:saml2": "urn:oasis:names:tc:SAML:2.0:assertion",
    "@Version": "2.0",
    "@ID": assertionID,
    "@IssueInstant": issueInstant,
  };
  const saml2AssertionIssuerNode = generateSAML2AssertionIssuerNode({ issuer });
  const saml2AssertionSubjectNode = generateSAML2AssertionSubjectNode({
    subjectNameId,
    notOnOrAfterDate,
    recipient,
  });
  const saml2AssertionConditionsNode = generateSAML2AssertionConditionsNode({
    notOnOrAfterDate,
    audience,
  });
  const saml2AssertionAuthnStatementNode = generateSAML2AssertionAuthnStatement(
    { authnInstant }
  );
  const saml2AssertionAttributeStatementNode =
    generateSAML2AssertionAttributeStatementNode(attributeArray);
  const saml2AssertionNode = {
    "saml2:Assertion": {
      ...saml2AssertionAttributeFields,
      ...saml2AssertionIssuerNode,
      ...saml2AssertionSubjectNode,
      ...saml2AssertionConditionsNode,
      ...saml2AssertionAuthnStatementNode,
      ...saml2AssertionAttributeStatementNode,
    },
  };
  return saml2AssertionNode;
};
