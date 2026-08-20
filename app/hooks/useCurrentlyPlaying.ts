import { useQuery } from '@tanstack/react-query';

export function useCurrentlyPlaying() {
  return useQuery({
    queryKey: ['currently-playing'],
    queryFn: async () => {
      const res = await fetch('/api/spotify/me/player');
      if (!res.ok) throw new Error('Failed to fetch currently playing...');
      return res.json();
    },
    refetchInterval: 30000,
    refetchIntervalInBackground: false, // dont pull when tab is not focused
  });
}
