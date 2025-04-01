import { SP_ACS_ENDPOINT } from "../resources/data";
import { generateCompleteSignedSaml2Response } from "./generate-complete-signed-saml2-response";

export const sendResponseViaPostBindingForced = ({ data, keys }) => {
  const saml2ResponseXMLSigned = generateCompleteSignedSaml2Response({
    data,
    keys,
  }).toString();

  const base64EncodedResponse = Buffer.from(saml2ResponseXMLSigned).toString(
    "base64"
  );

  const ascUrl = `${SP_ACS_ENDPOINT}`;

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
