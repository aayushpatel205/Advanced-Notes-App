import { tagType } from "./types";

export const createStringArray = (tagsObject: tagType[] , tags?: string[]): (string | undefined)[] => {
    if (tagsObject) {
      const strArray = tagsObject?.map((element) => {
        if (!tags?.includes(element.label.toLowerCase())) {
          return element.label.toLowerCase();
        }
      });
      const finalArray =  strArray.filter((element)=>element !== undefined);
      return finalArray;
    }
    return [];
};

export const createObjectArray = (tags: string[]): tagType[] => {
    const objectsArray = tags.map((element) => ({
      label: element[0].toUpperCase() + element.slice(1),
      value: element[0].toUpperCase() + element.slice(1),
    }));
    return objectsArray;
  };