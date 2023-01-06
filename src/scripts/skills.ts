import { fetchIds } from "../utils/fetchIds";
import { readFile, writeFile } from "node:fs/promises";
import * as _ from "lodash";

async function main() {
  try {
    const skillIds = await fetchIds("skill");
    const skills = await (
      await fetch(`https://api.flyff.com/skill/${skillIds.join(",")}`)
    ).json();

    const classes: any[] = JSON.parse(
      await readFile("./src/data/jobs.json", {
        encoding: "utf-8",
      })
    );

    const cleanedSkillDataResponse = skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      description: skill.description,
      icon: skill.icon,
      level: skill.level,
      job: classes.find((className) => skill.class === className.id),
    }));

    await writeFile(
      "./src/data/skills.json",
      JSON.stringify(cleanedSkillDataResponse)
    );
  } catch (error) {
    console.error(error);
  }
}

main();
