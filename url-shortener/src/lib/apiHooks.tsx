import { getCurrentUser } from "@/db/api-auth"
import { useQuery } from "@tanstack/react-query"


export const queryKeys = {
  currentUser: "currUser"
} as const

const FIVE_MINUTES = 5 * 60 * 1000

export const useUser = () => {
  const { data: user, ...rest } = useQuery({
    queryKey: [queryKeys.currentUser],
    queryFn: getCurrentUser,
    staleTime: FIVE_MINUTES,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true
  })

  const isAuthenticated = user?.role === 'authenticated';

  return {
    user,
    isAuthenticated,
    ...rest
  }
}

