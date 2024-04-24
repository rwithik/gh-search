// any is fine here since we are handling it in the next line
export const debounce = <TFn extends (...args: any) => void>(
  func: TFn extends (...args: infer R) => void ? (...args: R) => void : never,
  timeout: number = 500
) => {
  let timer: ReturnType<typeof setTimeout> | null;
  return function (this: ThisType<TFn>, ...args: Parameters<TFn>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(this, args);
    }, timeout);
  };
};

export const copyText = async (textToCopy?: string) => {
  if (!textToCopy) return;
  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch (error) {
    console.log("Failed to copy. Error: " + error);
  }
};

export const getOptionId = (id: number) => {
  return `listbox-option-${id}`;
};

function getLocale() {
  return navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language ?? "en-IN";
}

export const shortNumber = (number: number) => {
  const posNum = number < 0 ? -number : number;
  if (!posNum) return "0";
  return new Intl.NumberFormat(getLocale(), { notation: "compact" }).format(
    number
  );
};
