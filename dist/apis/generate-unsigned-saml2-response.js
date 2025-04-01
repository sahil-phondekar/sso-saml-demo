"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUnsignedSaml2Response = void 0;
var xmlbuilder2 = _interopRequireWildcard(require("xmlbuilder2"));
var _generateSaml2IssuerNode = require("../utilities/generate-saml2-issuer-node");
var _generateSaml2StatusNode = require("../utilities/generate-saml2-status-node");
var _generateSaml2AssertionNode = require("../utilities/generate-saml2-assertion-node");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const generateUnsignedSaml2Response = ({
  data
}) => {
  const {
    saml2ResponseAttributeValues,
    saml2IssuerValues,
    saml2AssertionValues
  } = data;
  const {
    responseDestination,
    responseId,
    issueInstant
  } = saml2ResponseAttributeValues;
  const {
    issuer
  } = saml2IssuerValues;
  const {
    assertionId,
    issueInstant: assertionIssueInstant,
    issuer: assertionIssuer,
    subjectNameId,
    notOnOrAfterDate,
    recipient,
    audience,
    authnInstant,
    attributeArray
  } = saml2AssertionValues;
  const options = {
    version: "1.0",
    encoding: "UTF-8"
  };
  const saml2ResponseAttributes = {
    "@xmlns:saml2p": "urn:oasis:names:tc:SAML:2.0:protocol",
    "@Destination": responseDestination,
    "@ID": responseId,
    "@Version": "2.0",
    "@IssueInstant": issueInstant
  };
  const saml2IssuerNode = (0, _generateSaml2IssuerNode.generateSAML2IssuerNode)({
    issuer: issuer
  });
  const saml2StatusNode = (0, _generateSaml2StatusNode.generateSAML2StatusNode)();
  const saml2AssertionNode = (0, _generateSaml2AssertionNode.generateSAML2AssertionNode)({
    assertionID: assertionId,
    issueInstant: assertionIssueInstant,
    issuer: assertionIssuer,
    subjectNameId: subjectNameId,
    notOnOrAfterDate: notOnOrAfterDate,
    recipient: recipient,
    audience: audience,
    authnInstant: authnInstant,
    attributeArray: attributeArray
  });
  const saml2XML = xmlbuilder2.create(options, {
    "saml2p:Response": _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, saml2ResponseAttributes), saml2IssuerNode), saml2StatusNode), saml2AssertionNode)
  });
  return saml2XML;
};
exports.generateUnsignedSaml2Response = generateUnsignedSaml2Response;