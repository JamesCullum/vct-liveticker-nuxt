export function getLocalStorage(keyName: string, defaultValue: any): any {
  if (typeof window !== "undefined") {
    const value = window.localStorage.getItem(keyName);
    return value ? JSON.parse(value) : defaultValue;
  } else {
    return defaultValue;
  }
}

// Returns the value again for chaining
export function setLocalStorage(keyName: string, value: any): any {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(keyName, JSON.stringify(value));
  }
  return value;
}
