import * as _ from "lodash";
import { writeFile } from "node:fs/promises";

async function main() {
  try {
    const itemIdResponse = await fetch("https://api.flyff.com/item");
    const itemIdData: number[] = await itemIdResponse.json();

    // put item ids into chunks to get around large request error
    const chunkedItemIds = _.chunk(itemIdData, 399);

    const itemPromises = chunkedItemIds.map(async (item) => {
      return await (
        await fetch(`https://api.flyff.com/item/${item.join(",")}`)
      ).json();
    });

    const items = await Promise.all(itemPromises);

    await writeFile("./data/items.json", JSON.stringify(items));
  } catch (error) {
    console.error(error);
  }
}

main();