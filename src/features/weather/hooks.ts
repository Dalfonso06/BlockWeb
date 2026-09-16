import { useQuery } from '@tanstack/react-query'
import { useGeolocation } from '@/hooks/useGeolocation'
import * as weatherApi from './api'

export const weatherKeys = {
  current: (latitude: number, longitude: number) => ['weather', 'current', { latitude, longitude }] as const,
}

// The backend caches upstream responses for 10 minutes (see api/app/services/weather_service.py),
// so there's no point refetching more often than that on the client either.
const STALE_TIME_MS = 10 * 60 * 1000

// Always sources coordinates from the browser's current location — callers
// never pass latitude/longitude in directly.
export function useCurrentWeather() {
  const { coords, error: geolocationError, isLoading: isLocating } = useGeolocation()

  const query = useQuery({
    queryKey: weatherKeys.current(coords?.latitude ?? 0, coords?.longitude ?? 0),
    queryFn: () => weatherApi.getCurrentWeather(coords!.latitude, coords!.longitude),
    enabled: coords !== null,
    staleTime: STALE_TIME_MS,
  })

  return {
    ...query,
    isLoading: isLocating || query.isLoading,
    error: geolocationError ? new Error(geolocationError) : query.error,
  }
}
