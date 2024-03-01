import * as _ from "lodash";

interface ObjectWithChildren {
  [key: string]: any;
  childMarketplaceCategoryIdList?: ObjectWithChildren[];
}

export function findObjectInMultidimensionalArray<T extends ObjectWithChildren>(
  array: T[],
  propName: string,
  propValue: boolean
): T {
  let result = null;

  _.some(array, (obj) => {
    if (obj[propName] === propValue) {
      result = obj;
      return true; // Exit loop if found
    }

    if (_.isArray(obj.childMarketplaceCategoryIdList)) {
      result = findObjectInMultidimensionalArray(
        obj.childMarketplaceCategoryIdList,
        propName,
        propValue
      );
      return !!result; // Exit loop if found
    }

    return false;
  });

  return result;
}
