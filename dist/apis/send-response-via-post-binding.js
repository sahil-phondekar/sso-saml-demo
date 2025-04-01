"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendResponseViaPostBinding = void 0;
var _data = require("../resources/data");
var _generateCompleteSignedSaml2Response = require("./generate-complete-signed-saml2-response");
const sendResponseViaPostBinding = ({
  data,
  keys
}) => {
  const saml2ResponseXMLSigned = (0, _generateCompleteSignedSaml2Response.generateCompleteSignedSaml2Response)({
    data,
    keys
  }).toString();
  const base64EncodedResponse = Buffer.from(saml2ResponseXMLSigned).toString("base64");
  const ascUrl = `${_data.SP_ACS_ENDPOINT}`;
  const SAMLFormElement = `
    <div style="width:100%; display: flex; justify-content: center; padding-top: 40px;">
      <form method="post" action="${ascUrl}">
        <input type="hidden" name="SAMLResponse" value="${base64EncodedResponse}" />
        <input type="submit" value="Send Response"/>
      </form>
    </div>
  `;
  return SAMLFormElement;
};
exports.sendResponseViaPostBinding = sendResponseViaPostBinding;