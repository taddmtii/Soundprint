import { useQuery } from '@tanstack/react-query';

export function useCurrentlyPlaying() {
  return useQuery({
    queryKey: ['currently-playing'],
    queryFn: async () => {
      const res = await fetch('/api/spotify/me/player');
      if (!res.ok) throw new Error('Failed to fetch currently playing...');
      const data = await res.json();
      return data;
    },
    refetchInterval: 3000,
    refetchIntervalInBackground: false, // dont pull when tab is not focused
  });
}
