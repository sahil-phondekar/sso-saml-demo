import express from "express";
import { generateUnsignedSaml2Response } from "./apis/generate-unsigned-saml2-response";
import { SSO_SAML_PARAMETERS } from "./resources/data";
import { generateSignedSAML2Response } from "./apis/generate-signed-saml2-response";
import { generateCompleteSignedSaml2Response } from "./apis/generate-complete-signed-saml2-response";
import { PRIVATE_KEY, PUBLIC_KEY } from "./resources/keys/keys";
import { sendResponseViaRedirectBinding } from "./apis/send-response-via-redirect-binding";
import { sendResponseViaPostBinding } from "./apis/send-response-via-post-binding";
import { sendResponseViaPostBindingForced } from "./apis/send-response-via-post-binding-forced";

const keys = {
  privateKey: PRIVATE_KEY,
  cert: PUBLIC_KEY,
};

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

app.get("/unsigned", async (req, res) => {
  res.set("Content-Type", "application/xml");

  const saml2ResponseXML = generateUnsignedSaml2Response({
    data: SSO_SAML_PARAMETERS,
  }).toString();

  res.send(saml2ResponseXML);
});

app.get("/signed", async (req, res) => {
  res.set("Content-Type", "application/xml");

  const saml2ResponseXML = generateSignedSAML2Response({
    data: SSO_SAML_PARAMETERS,
    keys,
  }).toString();

  res.send(saml2ResponseXML);
});

app.get("/signed-all", async (req, res) => {
  res.set("Content-Type", "application/xml");

  const saml2ResponseXML = generateCompleteSignedSaml2Response({
    data: SSO_SAML_PARAMETERS,
    keys,
  }).toString();

  res.send(saml2ResponseXML);
});

app.get("/redirect-binding", async (req, res) => {
  const redirectURL = sendResponseViaRedirectBinding({
    data: SSO_SAML_PARAMETERS,
    keys,
  });

  res.redirect(redirectURL);
});

app.get("/post-binding-manual", async (req, res) => {
  const SAMLFormElement = sendResponseViaPostBinding({
    data: SSO_SAML_PARAMETERS,
    keys,
  });

  res.send(SAMLFormElement);
});

app.get("/post-binding-programmatic", async (req, res) => {
  const SAMLFormElement = sendResponseViaPostBindingForced({
    data: SSO_SAML_PARAMETERS,
    keys,
  });

  res.send(SAMLFormElement);
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
