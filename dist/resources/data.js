"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SSO_SAML_PARAMETERS = exports.SP_ACS_ENDPOINT = exports.RESPONSE_ATTRIBUTES = exports.IDP_ENTITY_ID = exports.AUDIENCE = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _uuid = require("uuid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SP_ACS_ENDPOINT = exports.SP_ACS_ENDPOINT = "https://sso.eu.boxyhq.com/api/oauth/saml";
const AUDIENCE = exports.AUDIENCE = "https://saml.boxyhq.com";
const IDP_ENTITY_ID = exports.IDP_ENTITY_ID = "https://saml.example.com/entityid";
const RESPONSE_ATTRIBUTES = exports.RESPONSE_ATTRIBUTES = [{
  name: "id",
  value: "1dda9fb491dc01bd24d2423ba2f22ae561f56ddf2376b29a11c80281d21201f9"
}, {
  name: "email",
  value: "jackson@example.com"
}, {
  name: "firstName",
  value: "jackson"
}, {
  name: "lastName",
  value: "jackson"
}];
const SSO_SAML_PARAMETERS = exports.SSO_SAML_PARAMETERS = {
  saml2ResponseAttributeValues: {
    responseDestination: SP_ACS_ENDPOINT,
    responseId: `_${(0, _uuid.v4)()}`,
    issueInstant: _moment.default.utc().format("YYYY-MM-DDTHH:mm:ss") + "Z"
  },
  saml2IssuerValues: {
    issuer: IDP_ENTITY_ID
  },
  saml2AssertionValues: {
    assertionId: `_${(0, _uuid.v4)()}`,
    issueInstant: _moment.default.utc().format("YYYY-MM-DDTHH:mm:ss") + "Z",
    issuer: IDP_ENTITY_ID,
    subjectNameId: "jackson@example.com",
    notOnOrAfterDate: _moment.default.utc().add(10, "minutes").format("YYYY-MM-DDTHH:mm:ss") + "Z",
    recipient: SP_ACS_ENDPOINT,
    audience: AUDIENCE,
    authnInstant: _moment.default.utc().format("YYYY-MM-DDTHH:mm:ss") + "Z",
    attributeArray: RESPONSE_ATTRIBUTES
  }
};