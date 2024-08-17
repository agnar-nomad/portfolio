import { getCurrentUser, login, logout, signup } from "@/db/api-auth"
import { getClicksForSingleUrl, getClicksForUser, storeClicks } from "@/db/api-clicks"
import { createUrl, deleteUrl, getLongUrl, getSingleUrl, getUrls } from "@/db/api-urls"
import { URLsType } from "@/types/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"


export const queryKeys = {
  currentUser: "currUser",
  urls: "urls",
  singleUrl: "singleUrl_ID",
  longUrlFromShort: "longUrlFromShort_ID",
  clicksUser: "clicksUser",
  clicksForSingleUrl: "clicksForSingleUrl_ID"
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

export const useFetchUrls = () => {
  const { user } = useUser()

  return useQuery({
    queryKey: [queryKeys.urls],
    queryFn: () => getUrls(user?.id || ""),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useCreateNewUrl = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createUrl,
    onSuccess: (newUrlData) => {
      navigate(`/link/${newUrlData[0].id}`);
      console.log("New Url Link created successfully")
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
}

export const useDeleteUrl = (urlId: URLsType["id"]) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteUrl(urlId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.urls] });
      navigate('/dashboard');
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
}

export const useFetchSingleUrl = (urlId: URLsType["id"]) => {
  const { user } = useUser()

  return useQuery({
    queryKey: [(queryKeys.singleUrl, urlId)],
    queryFn: () => getSingleUrl({ userId: user?.id || "", urlId }),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useFetchLongUrlFromShortUrl = (shortUrl: URLsType["short_url"] | URLsType["custom_url"]) => {

  return useQuery({
    queryKey: [(queryKeys.longUrlFromShort, shortUrl)],
    queryFn: () => getLongUrl(shortUrl),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}




// Clicks table fetchers

export const useFetchClicksForUser = (urlIdsList: URLsType["id"][]) => {

  return useQuery({
    queryKey: [queryKeys.clicksUser],
    queryFn: () => getClicksForUser(urlIdsList),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useFetchClicksForSingleUrl = (urlId: URLsType["id"]) => {

  return useQuery({
    queryKey: [(queryKeys.clicksForSingleUrl, urlId)],
    queryFn: () => getClicksForSingleUrl(urlId),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useReportUrlClick = () => {

  return useMutation({
    mutationFn: storeClicks,
    onSuccess: () => {
      console.log("Redirect successful")
    },
  });
}