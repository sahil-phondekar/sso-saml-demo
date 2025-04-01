import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export const SP_ACS_ENDPOINT = "https://sso.eu.boxyhq.com/api/oauth/saml";
export const AUDIENCE = "https://saml.boxyhq.com";
export const IDP_ENTITY_ID = "https://saml.example.com/entityid";

export const RESPONSE_ATTRIBUTES = [
  {
    name: "id",
    value: "1dda9fb491dc01bd24d2423ba2f22ae561f56ddf2376b29a11c80281d21201f9",
  },
  {
    name: "email",
    value: "jackson@example.com",
  },
  {
    name: "firstName",
    value: "jackson",
  },
  {
    name: "lastName",
    value: "jackson",
  },
];

export const SSO_SAML_PARAMETERS = {
  saml2ResponseAttributeValues: {
    responseDestination: SP_ACS_ENDPOINT,
    responseId: `_${uuidv4()}`,
    issueInstant: moment.utc().format("YYYY-MM-DDTHH:mm:ss") + "Z",
  },
  saml2IssuerValues: {
    issuer: IDP_ENTITY_ID,
  },
  saml2AssertionValues: {
    assertionId: `_${uuidv4()}`,
    issueInstant: moment.utc().format("YYYY-MM-DDTHH:mm:ss") + "Z",
    issuer: IDP_ENTITY_ID,
    subjectNameId: "jackson@example.com",
    notOnOrAfterDate:
      moment.utc().add(10, "minutes").format("YYYY-MM-DDTHH:mm:ss") + "Z",
    recipient: SP_ACS_ENDPOINT,
    audience: AUDIENCE,
    authnInstant: moment.utc().format("YYYY-MM-DDTHH:mm:ss") + "Z",
    attributeArray: RESPONSE_ATTRIBUTES,
  },
};
