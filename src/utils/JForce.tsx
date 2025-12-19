import jsforce from "jsforce";

const conn = new jsforce.Connection({
  loginUrl: "https://login.salesforce.com" // sandbox → test.salesforce.com
});

await conn.login("", "");

const metadata = conn.metadata;

await metadata.create("CustomField", {});
