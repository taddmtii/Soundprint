interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  external_urls: { spotify: string };
  href: string;
  uri: string;
  type: 'artist';
}
