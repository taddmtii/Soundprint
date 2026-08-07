interface CurrentlyPlayingResponse {
  is_playing: boolean;
  timestamp: number;
  context: PlaybackContext | null;
  progress_ms: number | null;
  item: Track | null;
  currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown';
  actions: Actions;
}

interface ExternalUrls {
  spotify: string;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface Album {
  album_type: string;
  artists: Artist[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: 'album';
  uri: string;
}

interface Track {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

interface PlaybackContext {
  external_urls: ExternalUrls;
  href: string;
  type: 'playlist' | 'album' | 'artist' | 'show';
  uri: string;
}

interface Actions {
  disallows: {
    resuming?: boolean;
    pausing?: boolean;
    skipping_next?: boolean;
    skipping_prev?: boolean;
    seeking?: boolean;
    [key: string]: boolean | undefined;
  };
}
