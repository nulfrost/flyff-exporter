import * as _ from "lodash";
import { writeFile, readFile } from "node:fs/promises";
import { fetchIds } from "../utils/fetchIds";

async function main() {
  try {
    const itemIds = await fetchIds("item");
    const classes: any[] = JSON.parse(
      await readFile("./src/data/jobs.json", {
        encoding: "utf-8",
      })
    );

    // put item ids into chunks to get around large request error
    const chunkedItemIds = chunkArray(itemIds, 399);

    const itemPromises = chunkedItemIds.map(async (item) => {
      return await (
        await fetch(`https://api.flyff.com/item/${item.join(",")}`)
      ).json();
    });

    const items = await Promise.all(itemPromises);

    const itemsWithClassNames = items
      .flatMap((item) => item)
      .filter((item) => item.category === "weapon" || item.category === "armor")
      .map((item) => ({
        ...item,
        job: classes.find((className) => className.id === item.class),
      }));

    await writeFile(
      "./src/data/items.json",
      JSON.stringify(itemsWithClassNames)
    );
  } catch (error) {
    console.error(error);
  }
}

function chunkArray(array: unknown[], sizePerChunk: number) {
  return _.chunk(array, sizePerChunk);
}

main();
