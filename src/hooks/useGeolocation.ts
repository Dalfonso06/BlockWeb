import { useEffect, useState } from 'react'

export interface GeolocationCoords {
  latitude: number
  longitude: number
}

interface GeolocationState {
  coords: GeolocationCoords | null
  error: string | null
  isLoading: boolean
}

// One-shot read of the browser's current location — not a continuous watch,
// since nothing in the app needs live position updates.
export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({ coords: null, error: null, isLoading: true })

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setState({ coords: null, error: 'Geolocation is not supported by this browser.', isLoading: false })
      return
    }

    let isMounted = true

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!isMounted) return
        setState({
          coords: { latitude: position.coords.latitude, longitude: position.coords.longitude },
          error: null,
          isLoading: false,
        })
      },
      (error) => {
        if (!isMounted) return
        setState({ coords: null, error: error.message, isLoading: false })
      },
    )

    return () => {
      isMounted = false
    }
  }, [])

  return state
}
