const values = {
  json2ts: {
    output: "./types/",
    extOutPut: ".d.ts",
    dirs: ["src/schema"],
  },
};

import { writeFileSync, readdirSync, readFileSync } from "fs";
import { compileFromFile } from "json-schema-to-typescript";

async function json2ts() {
  const files: string[] = readdirSync(values.json2ts.dirs[0]);

  for (const key in files) {
    if (Object.hasOwnProperty.call(files, key)) {
      const file: string = files[key];
      const nameFile = `${values.json2ts.dirs[0]}/${file}`;
      const rawdata: Buffer = readFileSync(nameFile);
      const schema: any = JSON.parse(rawdata.toString());

      if (Object.hasOwnProperty.call(schema, "title")) {
        let name_file: string = schema.title.replace(
          /[A-Z]/g,
          (letter: string) => `_${letter.toLowerCase()}`
        );

        name_file = `${values.json2ts.output}${name_file.substring(
          1,
          name_file.length
        )}${values.json2ts.extOutPut}`;
        generate(name_file, nameFile);
      }
    }
  }
}

async function generate(name_file: string, file: string) {
  writeFileSync(name_file, await compileFromFile(file));
}

json2ts();
