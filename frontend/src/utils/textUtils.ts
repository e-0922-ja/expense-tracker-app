export const addNewLinesAfterPunctuation = (message: string) => {
  return message.replace(/([.,])/g, "$1\n");
};
