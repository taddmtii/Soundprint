interface SpotifyTrack {
  id: string;
  name: string;
  artists: {
    id: string;
    name: string;
    href: string;
    type: "artist";
    uri: string;
    external_urls: { spotify: string };
  }[];
  album: {
    id: string;
    name: string;
    album_type: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    is_playable: boolean;
    type: "album";
    href: string;
    images: { url: string; height: number; width: number }[];
    artists: {
      id: string;
      name: string;
      href: string;
      type: "artist";
      uri: string;
      external_urls: { spotify: string };
    }[];
    external_urls: { spotify: string };
    uri: string;
  };
  duration_ms: number;
  explicit: boolean;
  track_number: number;
  disc_number: number;
  is_local: boolean;
  is_playable: boolean;
  external_urls: { spotify: string };
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  href: string;
  uri: string;
  type: "track";
}
