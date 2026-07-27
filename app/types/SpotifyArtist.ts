interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  images: { url: string; height: number; width: number }[];
  external_urls: { spotify: string };
  followers: { total: number };
}
