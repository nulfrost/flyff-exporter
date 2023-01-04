import { writeFile } from "node:fs/promises";
import { fetchIds } from "../utils/fetchIds";

async function main() {
  try {
    const classIds: number[] = await fetchIds("class");

    const classes = await (
      await fetch(`https://api.flyff.com/class/${classIds.join(",")}`)
    ).json();

    const cleanedClassDataResponse = classes.map((className) => ({
      id: className.id,
      name: className.name,
      icon: className.icon,
    }));

    await writeFile(
      "./src/data/classes.json",
      JSON.stringify(cleanedClassDataResponse)
    );
  } catch (error) {
    console.error(error);
  }
}

main();
