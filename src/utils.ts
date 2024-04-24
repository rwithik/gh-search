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
