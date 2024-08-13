import { getCurrentUser, login, logout, signup } from "@/db/api-auth"
import { createUrl } from "@/db/api-urls"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"


export const queryKeys = {
  currentUser: "currUser"
} as const

const FIVE_MINUTES = 5 * 60 * 1000


// User and Auth
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

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.currentUser] });
      // navigate('/users'); TODO
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
};


export const useSignupUser = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.currentUser] });
      // navigate('/users'); TODO
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
};


export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.currentUser] });
      navigate('/');
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
};


// URL table fetchers

export const useCreateNewUrl = () => {
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: createUrl,
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: [queryKeys.currentUser] });
      // navigate('/');
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
}