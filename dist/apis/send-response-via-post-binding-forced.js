"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendResponseViaPostBindingForced = void 0;
var _data = require("../resources/data");
var _generateCompleteSignedSaml2Response = require("./generate-complete-signed-saml2-response");
const sendResponseViaPostBindingForced = ({
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
    <html>
      <head>
          <script>
              function submitForm() {
                  document.forms[0].submit();
              }
          </script>
      </head>
      <body onload="submitForm()">
          <div style="width:100%; display: flex; justify-content: center; padding-top: 40px;">
              <form method="post" action="${ascUrl}" id="SAMLFORM">
                <input type="hidden" name="SAMLResponse" value="${base64EncodedResponse}" />
              </form>
          </div>
      </body>
    </html>
  `;
  return SAMLFormElement;
};
exports.sendResponseViaPostBindingForced = sendResponseViaPostBindingForced;