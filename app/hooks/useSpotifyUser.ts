import { useQuery } from '@tanstack/react-query';

export function useSpotifyUser() {
  return useQuery({
    queryKey: ['spotify-user'],
    queryFn: async () => {
      const res = await fetch('/api/spotify/me');
      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      return data;
    },
    staleTime: 36000000,
  });
}
