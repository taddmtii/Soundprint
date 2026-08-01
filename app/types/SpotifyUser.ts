interface SpotifyUser {
  account_id: string;
  display_name: string | null;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: { url: string; height: number | null; width: number | null }[];
  type: string;
  uri: string;
}
