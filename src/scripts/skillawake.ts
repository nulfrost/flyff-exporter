import { readFile, writeFile } from "node:fs/promises";

async function main() {
  try {
    const skillAwakes: any[] = await (
      await fetch("https://api.flyff.com/skillawake")
    ).json();

    const skills: any[] = JSON.parse(
      await readFile("./src/data/skills.json", {
        encoding: "utf-8",
      })
    );
    const cleanedSkillAwakeData = Object.entries(skillAwakes).map(
      ([key, value]) => ({
        weaponType: key,
        skillAwakes: Object.entries(value.skills).map(([key, value]) => ({
          [`${skills.find((skill) => skill.id === Number(key)).name.en}`]:
            value,
        })),
      })
    );
    await writeFile(
      "./src/data/awake.json",
      JSON.stringify(cleanedSkillAwakeData)
    );
  } catch (error) {
    console.error(error);
  }
}

main();
