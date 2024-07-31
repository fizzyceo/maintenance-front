import { useLanguageStore } from "../Language";
export const getLocalizedData = (arrayOfObjects) => {
  // debugger;
  const currentLang = useLanguageStore.getState().currentLang;
  if (currentLang !== "ar") {
    return arrayOfObjects;
  }

  const newLocalizedArrayOfObjects = arrayOfObjects.map((object) => {
    const newObj = { ...object };

    for (const key in newObj) {
      newObj[key] = newObj[`${key}Ar`] || newObj[key];
    }
    return newObj;
  });

  // console.log(newLocalizedArrayOfObjects);
  return newLocalizedArrayOfObjects;
};
