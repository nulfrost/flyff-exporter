import { writeFile } from "node:fs/promises";
import { fetchIds } from "../../utils/fetchIds";

async function main() {
  try {
    const classIds: number[] = await fetchIds("class");

    const classes = await (
      await fetch(`https://api.flyff.com/class/${classIds.join(",")}`)
    ).json();

    await writeFile("./data/classes.json", JSON.stringify(classes));
  } catch (error) {
    console.error(error);
  }
}

main();
