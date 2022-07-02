const values = {
  dirs: ["src/schema"],
};

import { readFileSync } from "fs";
import { isEqual, sortBy } from "lodash";

export async function validateAttr(body: any, schemaName: string) {
  const nameFile = `${values.dirs[0]}/${schemaName}.json`;
  const rawdata: Buffer = readFileSync(nameFile);
  const schema: { properties: any } = JSON.parse(rawdata.toString());

  const attNamesBody: string[] = Object.keys(body);
  const attNamesSchema: string[] = Object.keys(schema.properties);

  if (!isEqual(sortBy(attNamesBody), sortBy(attNamesSchema))) return false;

  const attTypeValue: boolean = attNamesBody.some(
    (nameAtt: string) =>
      typeof body[nameAtt] !== schema.properties[nameAtt]["type"]
  );

  return !attTypeValue;
}