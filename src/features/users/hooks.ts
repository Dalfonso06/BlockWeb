import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as usersApi from './api'
import type { UserUpdate } from './types'

export const userKeys = {
  all: ['users'] as const,
  detail: (id: number) => ['users', id] as const,
}

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: usersApi.listUsers,
  })
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersApi.getUser(id),
  })
}

export function useUpdateUser(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UserUpdate) => usersApi.updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => usersApi.deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  })
}
