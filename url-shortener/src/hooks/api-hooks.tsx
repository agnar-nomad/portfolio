import { getCurrentUser, login, logout, signup } from "@/db/api-auth"
import { getClicksForSingleUrl, getClicksForUser, storeClicks } from "@/db/api-clicks"
import { createUrl, deleteUrl, getLongUrl, getSingleUrl, getUrls } from "@/db/api-urls"
import { URLsType } from "@/types/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useUtilHelpers } from "./helper-hooks"
import toast from "react-hot-toast"


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
  const { createNewUrlSearchParam, navigate } = useUtilHelpers()

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate user and navigate
      queryClient.invalidateQueries({ queryKey: [queryKeys.currentUser] });
      toast.success("Login successful")
      navigate(`/dashboard?${createNewUrlSearchParam ? `createNew=${createNewUrlSearchParam}` : ''}`);
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
};


export const useSignupUser = () => {
  const queryClient = useQueryClient();
  const { createNewUrlSearchParam, navigate } = useUtilHelpers()

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      // Invalidate and navigate
      queryClient.invalidateQueries({ queryKey: [queryKeys.currentUser] });
      toast.success("Signup successful")
      navigate(`/dashboard?${createNewUrlSearchParam ? `createNew=${createNewUrlSearchParam}` : ''}`);
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
};


export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const { navigate } = useUtilHelpers();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Invalidate and navigate
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
  const { navigate } = useUtilHelpers();

  return useMutation({
    mutationFn: createUrl,
    onSuccess: (newUrlData) => {
      console.log("New Url Link created successfully")
      toast.success("New link created successfully")
      navigate(`/link/${newUrlData[0].id}`);
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
}

export const useDeleteUrl = (urlId: URLsType["id"]) => {
  const queryClient = useQueryClient();
  const { navigate } = useUtilHelpers();

  return useMutation({
    mutationFn: () => deleteUrl(urlId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.urls] });
      toast.success("Link successfully deleted")
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
    queryKey: [queryKeys.singleUrl, urlId],
    queryFn: () => getSingleUrl({ userId: user?.id || "", urlId }),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useFetchLongUrlFromShortUrl = (shortUrl: URLsType["short_url"] | URLsType["custom_url"]) => {

  return useQuery({
    queryKey: [queryKeys.longUrlFromShort, shortUrl],
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
    queryKey: [queryKeys.clicksForSingleUrl, urlId],
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