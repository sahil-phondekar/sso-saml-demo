import { SP_ACS_ENDPOINT } from "../resources/data";
import { generateCompleteSignedSaml2Response } from "./generate-complete-signed-saml2-response";

export const sendResponseViaRedirectBinding = ({ data, keys }) => {
  const saml2ResponseXMLSigned = generateCompleteSignedSaml2Response({
    data,
    keys,
  }).toString();

  const base64EncodedResponse = Buffer.from(saml2ResponseXMLSigned).toString(
    "base64"
  );

  const redirectURL = `${SP_ACS_ENDPOINT}?SAMLResponse=${encodeURIComponent(
    base64EncodedResponse
  )}`;
  return redirectURL;
};
