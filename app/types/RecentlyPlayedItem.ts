interface RecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
  context: {
    type: 'playlist' | 'album' | 'artist' | 'show';
    external_urls: { spotify: string };
    href: string;
    uri: string;
  };
}
