import * as _ from "lodash";

interface ObjectWithChildren {
  [key: string]: any;
  childMarketplaceCategoryIdList?: ObjectWithChildren[];
}

export function findObjectInMultidimensionalArray<T extends ObjectWithChildren>(
  array: T[],
  propName: string
): T {
  let result = null;

  _.some(array, (obj) => {
    if (
      Boolean(obj[propName]) &&
      obj.childMarketplaceCategoryIdList.length === 0
    ) {
      result = obj;
      return true; // Exit loop if found
    }

    if (_.isArray(obj.childMarketplaceCategoryIdList)) {
      result = findObjectInMultidimensionalArray(
        obj.childMarketplaceCategoryIdList,
        propName
      );
      return !!result; // Exit loop if found
    }

    return false;
  });

  return result;
}
