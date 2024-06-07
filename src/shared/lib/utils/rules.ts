// Идея такая, что надо сделать отдельный список функций валидации
// isValidSomething(value):boolean, которые будут просто true/false возвращать.
// а список функции rules будут переиспользовать и возвращать error-message

export type ValidateFunction = (value: any) => boolean;
export const validate: Record<string, ValidateFunction> = {
  isValidHttpUrl(value: string) {
    let url;

    try {
      url = new URL(value);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  },
};

export const requiredField = (value: any) => {
  return (value && value.length >= 1) || "Обязательное поле";
};
