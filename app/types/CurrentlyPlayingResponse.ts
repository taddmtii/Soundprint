interface CurrentlyPlayingResponse {
  device: Device;
  repeat_state: 'off' | 'track' | 'context';
  shuffle_state: boolean;
  context: PlaybackContext | null;
  timestamp: number;
  progress_ms: number | null;
  is_playing: boolean;
  item: Track | null;
  currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown';
  actions: Actions;
}

interface Device {
  id: string | null;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string; // e.g. "computer" | "smartphone" | "speaker"
  volume_percent: number | null;
  supports_volume: boolean;
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

interface Restrictions {
  reason: string; // e.g. "market" | "product" | "explicit"
}

interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

interface Album {
  album_type: 'album' | 'single' | 'compilation';
  total_tracks: number;
  available_markets: string[];
  artists: Artist[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restrictions?: Restrictions;
  type: 'album';
  uri: string;
}

interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: Record<string, unknown>;
  restrictions?: Restrictions;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

interface PlaybackContext {
  type: 'playlist' | 'album' | 'artist' | 'show';
  href: string;
  external_urls: ExternalUrls;
  uri: string;
}

interface Actions {
  interrupting_playback?: boolean;
  pausing?: boolean;
  resuming?: boolean;
  seeking?: boolean;
  skipping_next?: boolean;
  skipping_prev?: boolean;
  toggling_repeat_context?: boolean;
  toggling_shuffle?: boolean;
  toggling_repeat_track?: boolean;
  transferring_playback?: boolean;
}
