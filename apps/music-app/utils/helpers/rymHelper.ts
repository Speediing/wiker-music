export const formatArtist = (artist: string) => {
  console.log(artist);
  return artist
    .toLowerCase()
    .replaceAll(".", "_")
    .replaceAll(",", "")
    .replaceAll("&", "and")
    .split(" ")
    .join("-");
};
export const formatAlbum = (album: string) => {
  return album
    .toLowerCase()
    .replaceAll(".", "_")
    .replaceAll(",", "")
    .replaceAll("&", "and")
    .replaceAll(" (deluxe edition)", "")
    .split(" ")
    .join("-");
};
