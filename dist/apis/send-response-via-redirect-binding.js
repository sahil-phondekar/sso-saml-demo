"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendResponseViaRedirectBinding = void 0;
var _data = require("../resources/data");
var _generateCompleteSignedSaml2Response = require("./generate-complete-signed-saml2-response");
const sendResponseViaRedirectBinding = ({
  data,
  keys
}) => {
  const saml2ResponseXMLSigned = (0, _generateCompleteSignedSaml2Response.generateCompleteSignedSaml2Response)({
    data,
    keys
  }).toString();
  const base64EncodedResponse = Buffer.from(saml2ResponseXMLSigned).toString("base64");
  const redirectURL = `${_data.SP_ACS_ENDPOINT}?SAMLResponse=${encodeURIComponent(base64EncodedResponse)}`;
  return redirectURL;
};
exports.sendResponseViaRedirectBinding = sendResponseViaRedirectBinding;