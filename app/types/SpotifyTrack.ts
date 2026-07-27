interface SpotifyTrack {
  id: string;
  name: string;
  artists: {
    id: string;
    name: string;
    external_urls: { spotify: string };
  }[];
  album: {
    id: string;
    name: string;
    album_type: string;
    release_date: string;
    images: { url: string; height: number; width: number }[];
    external_urls: { spotify: string };
  };
  duration_ms: number;
  explicit: boolean;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  disc_number: number;
  is_local: boolean;
  external_urls: { spotify: string };
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  href: string;
  uri: string;
}
