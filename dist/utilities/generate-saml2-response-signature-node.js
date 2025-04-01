"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSaml2ResponseSignatureNode = void 0;
var xmlCrypto = _interopRequireWildcard(require("xml-crypto"));
var _generateAssertionSignedSaml2Response = require("../apis/generate-assertion-signed-saml2-response");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const generateSaml2ResponseSignatureNode = ({
  data,
  keys
}) => {
  const saml2ResponseXML = (0, _generateAssertionSignedSaml2Response.generateAssertionSignedSaml2Response)({
    data,
    keys
  });
  const sig = new xmlCrypto.SignedXml();
  sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
  const {
    privateKey,
    cert
  } = keys;
  sig.addReference("//*[local-name(.)='Response']", ["http://www.w3.org/2000/09/xmldsig#enveloped-signature", "http://www.w3.org/2001/10/xml-exc-c14n#"], "http://www.w3.org/2001/04/xmlenc#sha256");
  sig.signingKey = privateKey;
  const x509KeyValue = cert;
  const keyInfoProvider = {
    getKeyInfo: function () {
      return "<X509Data><X509Certificate>" + x509KeyValue + "</X509Certificate></X509Data>";
    }
  };
  sig.keyInfoProvider = keyInfoProvider;
  sig.computeSignature(saml2ResponseXML.toString());
  return sig.getSignatureXml();
};
exports.generateSaml2ResponseSignatureNode = generateSaml2ResponseSignatureNode;