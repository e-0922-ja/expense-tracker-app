export const isSessionExpired = (unixTimestamp: number): boolean => {
  const currentTimestamp = Date.now();
  const expirationTimestamp = unixTimestamp * 1000;
  return expirationTimestamp < currentTimestamp;
};
