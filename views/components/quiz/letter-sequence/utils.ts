import { shuffle } from "lodash";
import { ItemState } from "./type";
import faker from "faker";
import DataSource from "@root/image-data.json";

const findSrc = (letter: string) => {
  const f = DataSource.find(
    (item) => item.letter.toLocaleLowerCase() === letter
  );
  return f ? "/letters/" + f.letter.toLocaleLowerCase() + "0.png" : "";
};

export function parse(text: string, showHint: boolean): Array<ItemState> {
  const arr = text.split("");
  const items = arr.map(
    (item, index): ItemState => {
      return {
        originalIndex: index,
        currentIndex: index,
        letter: item,
        id: faker.unique(faker.datatype.uuid),
        imageUrl: findSrc(item),
      };
    }
  );
  if (showHint) return items;
  const shufled = shuffle(items);
  return items.map(
    (item, index): ItemState => {
      return {
        ...item,
        currentIndex: shufled[index].currentIndex,
      };
    }
  );
}
