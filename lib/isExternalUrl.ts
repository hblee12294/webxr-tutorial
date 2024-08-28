export function isExternalUrl(url: string) {
  const externalUrlPattern = /^(https?:\/\/)/;
  return externalUrlPattern.test(url);
}
