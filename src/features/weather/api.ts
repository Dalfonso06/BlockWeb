import { request } from '@/api/client'
import type { Weather } from '@/types/models'

export function getCurrentWeather(latitude: number, longitude: number): Promise<Weather> {
  return request<Weather>(`/weather/current?latitude=${latitude}&longitude=${longitude}`)
}
