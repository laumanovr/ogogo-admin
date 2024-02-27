export const findComponent = (path: string, fileName: string) => () =>
  import(`../../../pages/${path}/ui/${fileName}.vue`);
