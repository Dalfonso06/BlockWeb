import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as activitiesApi from './api'
import type { ActivityCreate } from './types'

export const activityKeys = {
  all: ['activities'] as const,
}

export function useCreateActivity() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ActivityCreate) => activitiesApi.createActivity(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.all })
    },
  })
}
