export const debounce = <TFn extends (...args: any) => any>(
  func: TFn,
  timeout: number = 500
) => {
  let timer: ReturnType<typeof setTimeout> | null;
  return function (this: any, ...args: Parameters<TFn>) {
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
