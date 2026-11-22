import { useQuery } from '@tanstack/react-query'
import * as sourcesApi from './api'

export const sourceKeys = {
  all: ['sources'] as const,
}

export function useSources() {
  return useQuery({
    queryKey: sourceKeys.all,
    queryFn: sourcesApi.listSources,
  })
}
