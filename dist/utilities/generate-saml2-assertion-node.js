"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSAML2AssertionNode = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const generateSAML2AssertionIssuerNode = ({
  issuer
}) => {
  const saml2AssertionIssuerNode = {
    "saml2:Issuer": {
      "#text": issuer
    }
  };
  return saml2AssertionIssuerNode;
};
const generateSAML2AssertionSubjectNode = ({
  subjectNameId,
  notOnOrAfterDate,
  recipient
}) => {
  const saml2AssertionSubjectNode = {
    "saml2:Subject": {
      "saml2:NameID": {
        "@Format": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
        "#text": subjectNameId
      },
      "saml2:SubjectConfirmation": {
        "@Method": "urn:oasis:names:tc:SAML:2.0:cm:bearer",
        "saml2:SubjectConfirmationData": {
          "@NotOnOrAfter": notOnOrAfterDate,
          "@Recipient": recipient
        }
      }
    }
  };
  return saml2AssertionSubjectNode;
};
const generateSAML2AssertionConditionsNode = ({
  notOnOrAfterDate,
  audience
}) => {
  const saml2AssertionConditionsNode = {
    "saml2:Conditions": {
      "@NotOnOrAfter": notOnOrAfterDate,
      "saml2:AudienceRestriction": {
        "saml2:Audience": {
          "#text": audience
        }
      }
    }
  };
  return saml2AssertionConditionsNode;
};
const generateSAML2AssertionAuthnStatement = ({
  authnInstant
}) => {
  const saml2AssertionAuthnStatementNode = {
    "saml2:AuthnStatement": {
      "@AuthnInstant": authnInstant,
      "@SessionIndex": "42",
      "saml2:AuthnContext": {
        "saml2:AuthnContextClassRef": {
          "#text": "urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified"
        }
      }
    }
  };
  return saml2AssertionAuthnStatementNode;
};
const generateSAML2AssertionAttributeNode = ({
  name,
  value
}) => {
  const saml2AssertionAttributeNode = {
    "@Name": name,
    "saml2:AttributeValue": {
      "#text": value
    }
  };
  return saml2AssertionAttributeNode;
};
const generateSAML2AssertionAttributeStatementNode = attributeArray => {
  const saml2AssertionAttrubuteArray = [];
  attributeArray.map(({
    name,
    value
  }) => {
    return saml2AssertionAttrubuteArray.push(generateSAML2AssertionAttributeNode({
      name,
      value
    }));
  });
  const saml2AssertionAttributeStatementNode = {
    "saml2:AttributeStatement": {
      "saml2:Attribute": saml2AssertionAttrubuteArray
    }
  };
  return saml2AssertionAttributeStatementNode;
};
const generateSAML2AssertionNode = ({
  issuer,
  subjectNameId,
  notOnOrAfterDate,
  recipient,
  audience,
  attributeArray,
  authnInstant,
  issueInstant,
  assertionID
}) => {
  const saml2AssertionAttributeFields = {
    "@xmlns:saml2": "urn:oasis:names:tc:SAML:2.0:assertion",
    "@Version": "2.0",
    "@ID": assertionID,
    "@IssueInstant": issueInstant
  };
  const saml2AssertionIssuerNode = generateSAML2AssertionIssuerNode({
    issuer
  });
  const saml2AssertionSubjectNode = generateSAML2AssertionSubjectNode({
    subjectNameId,
    notOnOrAfterDate,
    recipient
  });
  const saml2AssertionConditionsNode = generateSAML2AssertionConditionsNode({
    notOnOrAfterDate,
    audience
  });
  const saml2AssertionAuthnStatementNode = generateSAML2AssertionAuthnStatement({
    authnInstant
  });
  const saml2AssertionAttributeStatementNode = generateSAML2AssertionAttributeStatementNode(attributeArray);
  const saml2AssertionNode = {
    "saml2:Assertion": _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, saml2AssertionAttributeFields), saml2AssertionIssuerNode), saml2AssertionSubjectNode), saml2AssertionConditionsNode), saml2AssertionAuthnStatementNode), saml2AssertionAttributeStatementNode)
  };
  return saml2AssertionNode;
};
exports.generateSAML2AssertionNode = generateSAML2AssertionNode;