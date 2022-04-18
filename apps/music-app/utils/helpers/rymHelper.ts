export const formatArtist = (artist: string) => {
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
