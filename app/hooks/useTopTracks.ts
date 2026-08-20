import { useQuery } from '@tanstack/react-query';

export function useTopTracks(timeRange: string) {
  return useQuery({
    queryKey: ['top-tracks', timeRange],
    queryFn: async () => {
      const res = await fetch(`/api/spotify/top-tracks?time_range=${timeRange}?limit=${50}`);
      if (!res.ok) throw new Error('Failed to fetch top tracks...');
      return res.json();
    },
    staleTime: 36000000, // 1 Hour
  });
}
