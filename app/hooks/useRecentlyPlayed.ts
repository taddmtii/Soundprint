import { useQuery } from '@tanstack/react-query';

export function useRecentlyPlayed() {
  return useQuery({
    queryKey: ['recently-played'],
    queryFn: async () => {
      const res = await fetch('/api/spotify/me/recently-played');
      if (!res.ok) throw new Error('Failed to fetch recently played');
      const data = await res.json();
      return data.items as RecentlyPlayedItem[];
    },
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
  });
}
