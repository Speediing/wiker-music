export const formatWikipediaName = (artist: string) => {
  const words = artist.toLowerCase().split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join("_");
};
