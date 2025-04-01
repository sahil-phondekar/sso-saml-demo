"use strict";

var _express = _interopRequireDefault(require("express"));
var _generateUnsignedSaml2Response = require("./apis/generate-unsigned-saml2-response");
var _data = require("./resources/data");
var _generateSignedSaml2Response = require("./apis/generate-signed-saml2-response");
var _generateCompleteSignedSaml2Response = require("./apis/generate-complete-signed-saml2-response");
var _keys = require("./resources/keys/keys");
var _sendResponseViaRedirectBinding = require("./apis/send-response-via-redirect-binding");
var _sendResponseViaPostBinding = require("./apis/send-response-via-post-binding");
var _sendResponseViaPostBindingForced = require("./apis/send-response-via-post-binding-forced");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const keys = {
  privateKey: _keys.PRIVATE_KEY,
  cert: _keys.PUBLIC_KEY
};
const app = (0, _express.default)();
const PORT = process.env.PORT || 3000;
app.use(_express.default.static(__dirname));
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});
app.get("/unsigned", async (req, res) => {
  res.set("Content-Type", "application/xml");
  const saml2ResponseXML = (0, _generateUnsignedSaml2Response.generateUnsignedSaml2Response)({
    data: _data.SSO_SAML_PARAMETERS
  }).toString();
  res.send(saml2ResponseXML);
});
app.get("/signed", async (req, res) => {
  res.set("Content-Type", "application/xml");
  const saml2ResponseXML = (0, _generateSignedSaml2Response.generateSignedSAML2Response)({
    data: _data.SSO_SAML_PARAMETERS,
    keys
  }).toString();
  res.send(saml2ResponseXML);
});
app.get("/signed-all", async (req, res) => {
  res.set("Content-Type", "application/xml");
  const saml2ResponseXML = (0, _generateCompleteSignedSaml2Response.generateCompleteSignedSaml2Response)({
    data: _data.SSO_SAML_PARAMETERS,
    keys
  }).toString();
  res.send(saml2ResponseXML);
});
app.get("/redirect-binding", async (req, res) => {
  const redirectURL = (0, _sendResponseViaRedirectBinding.sendResponseViaRedirectBinding)({
    data: _data.SSO_SAML_PARAMETERS,
    keys
  });
  res.redirect(redirectURL);
});
app.get("/post-binding-manual", async (req, res) => {
  const SAMLFormElement = (0, _sendResponseViaPostBinding.sendResponseViaPostBinding)({
    data: _data.SSO_SAML_PARAMETERS,
    keys
  });
  res.send(SAMLFormElement);
});
app.get("/post-binding-programmatic", async (req, res) => {
  const SAMLFormElement = (0, _sendResponseViaPostBindingForced.sendResponseViaPostBindingForced)({
    data: _data.SSO_SAML_PARAMETERS,
    keys
  });
  res.send(SAMLFormElement);
});
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));