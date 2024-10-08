import Link from "next/link"
import InfiniteScroll from "react-infinite-scroll-component"
import ProfileImage from "./ProfileImage"
import { VscHeart, VscHeartFilled } from 'react-icons/vsc'
import { useSession } from "next-auth/react"
import IconHoverEffect from "./IconHoverEffect"
import { api } from "~/utils/api"
import LoadingSpinner from "./LoadingSpinner"


const dateTimeFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: "short" })


type Tweet = {
  id: string,
  content: string,
  createdAt: Date,
  likeCount: number,
  likedByMe: boolean,
  user: {
    id: string,
    name: string | null,
    image: string | null,
  }
}

type InfiniteTweetListProps = {
  isError: boolean,
  isLoading: boolean,
  hasMore: boolean,
  fetchNewTweets: () => Promise<unknown>,
  tweets?: Tweet[]
}

export default function InfiniteTweetList(
  { tweets, isError, isLoading, fetchNewTweets, hasMore }: InfiniteTweetListProps
) {

  if (isLoading) return <LoadingSpinner />
  if (isError) return <h1>Error</h1>

  if (tweets == null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">
        No tweets
      </h2>
    )
  }
  return (
    <ul>
      <InfiniteScroll dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={<LoadingSpinner />}>
        {tweets.map(tweet => (
          <TweetCard key={tweet.id} {...tweet} />
        ))}
      </InfiniteScroll>
    </ul>
  )
}



function TweetCard({ id, user, content, createdAt, likeCount, likedByMe }: Tweet) {

  const trpcUtils = api.useUtils()

  const toggleLike = api.tweet.toggleLike.useMutation({
    onSuccess: ({ addedLike }) => {
      // await trpcUtils.tweet.infiniteFeed.invalidate() // one way, invalidate the whole feed

      // better way below
      const updateData: Parameters<typeof trpcUtils.tweet.infiniteFeed.setInfiniteData>[1] = (oldData) => {
        if (oldData == null) return;

        const countModifier = addedLike ? 1 : -1

        return {
          ...oldData,
          pages: oldData.pages.map(page => {
            return {
              ...page,
              tweets: page.tweets.map(tweet => {
                if (tweet.id == id) {
                  return {
                    ...tweet,
                    likeCount: tweet.likeCount + countModifier,
                    likedByMe: addedLike
                  }
                }
                return tweet
              })
            }
          })
        }
      }

      trpcUtils.tweet.infiniteFeed.setInfiniteData({}, updateData)
      trpcUtils.tweet.infiniteFeed.setInfiniteData({ onlyFollowing: true }, updateData)
      trpcUtils.tweet.infiniteProfileFeed.setInfiniteData({ userId: user.id }, updateData)
    }
  })

  function handleToggleLike() {
    toggleLike.mutate({ id })
  }
  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-col flex-grow">
        <div className="flex gap-1">
          <Link href={`/profiles/${user.id}`} className="font-bold hover:underline focus-visible:underline">
            {user.name}
          </Link>
          <span className="text-gray-400">-</span>
          <span className="text-gray-400">{dateTimeFormatter.format(createdAt)}</span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <HeartButton likedByMe={likedByMe} likeCount={likeCount} onClick={handleToggleLike} isLoading={toggleLike.isLoading} />
      </div>
    </li>
  )
}


type HeartButtonProps = {
  likedByMe: boolean,
  likeCount: number,
  isLoading: boolean,
  onClick: () => void
}

function HeartButton({ likedByMe, likeCount, isLoading, onClick }: HeartButtonProps) {
  const session = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart

  if (session.status != "authenticated") {
    return (
      <div className="my-1 flex items-center gap-3 self-start text-gray-500">
        <HeartIcon />
      </div>)
  }
  return (
    <button className={`group items-center gap-1 self-start flex transit duration-200 -ml-2 ${likedByMe ? "text-red-500" : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"}`}
      disabled={isLoading} onClick={onClick}>
      <IconHoverEffect red >
        <HeartIcon className={`transition-colors duration-200 ${likedByMe ? "fill-red-500" : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"}`} />
      </IconHoverEffect>
      <span>{likeCount}</span>
    </button>
  )
}