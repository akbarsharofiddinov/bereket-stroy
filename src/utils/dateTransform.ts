export const dateTransform = (str: string) => {
  const date = str.split(",")[0];
  return `${date}`;
};
