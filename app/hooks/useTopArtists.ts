import { useQuery } from '@tanstack/react-query';

export function useTopArtists(timeRange: string) {
  return useQuery({
    queryKey: ['top-artists', timeRange],
    queryFn: async () => {
      const res = await fetch(`/api/spotify/top-artists?time_range=${timeRange}?limit=${50}`);
      if (!res.ok) throw new Error('Failed to fetch top artists...');
      const data = await res.json();
      return data;
    },
    staleTime: 36000000, // 1 Hour
  });
}
