import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { useSession } from "next-auth/react";
import ErrorPage from 'next/error'
import Head from "next/head";
import Link from "next/link";
import { VscArrowLeft } from "react-icons/vsc";
import Button from "~/components/Button";
import IconHoverEffect from "~/components/IconHoverEffect";
import InfiniteTweetList from "~/components/InfiniteTweetList";
import ProfileImage from "~/components/ProfileImage";
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";


const pluralRules = new Intl.PluralRules
function getPlural(number: number, singular: string, plural: string) {
  return pluralRules.select(number) === "one" ? singular : plural
}


const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ id }) => {
  const { data: profile } = api.profile.getById.useQuery({ id })
  const tweets = api.tweet.infiniteProfileFeed.useInfiniteQuery({ userId: id }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })

  const trpcUtils = api.useUtils()
  const toggleFollow = api.profile.toggleFollow.useMutation({
    onSuccess: ({ addedFollow }) => {
      trpcUtils.profile.getById.setData({ id }, oldData => {
        if (oldData == null) return;

        const countModifier = addedFollow ? 1 : -1;

        return {
          ...oldData,
          isFollowing: addedFollow,
          followersCount: oldData.followersCount + countModifier
        }
      })
    }
  })

  if (profile == null || profile.name == null) {
    return (<ErrorPage statusCode={404} />)
  }

  return (
    <>
      <Head>
        <title>{`Twitter Clone - ${profile.name}`}</title>
      </Head>
      <header className="sticky top-0 z-10 flex items-center border-b bg-white px-4 py-2">
        <Link href=".." className="mr-2">
          <IconHoverEffect>
            <VscArrowLeft className="h-6 w-6" />
          </IconHoverEffect>
        </Link>
        <ProfileImage src={profile.image} className="flex-shrink-0" />
        <div className="flex-grow ml-2">
          <h1 className="text-lg font-bold">{profile.name}</h1>
          <div className="text-gray-500">
            {profile.tweetsCount}{" "}
            {getPlural(profile.tweetsCount, "Tweet", "Tweets")} - {" "}
            {profile.followersCount}{" "}
            {getPlural(profile.followersCount, "Follower", "Followers")} - {" "}
            {profile.followsCount}{" "} Following
          </div>
        </div>
        <FollowButton isFollowing={profile.isFollowing} userId={id} onClick={() => toggleFollow.mutate({ userId: id })} isLoading={toggleFollow.isLoading} />
      </header>
      <main>
        <InfiniteTweetList tweets={tweets.data?.pages.flatMap(page => page.tweets)}
          isError={tweets.isError}
          isLoading={tweets.isLoading}
          hasMore={tweets.hasNextPage ?? false}
          fetchNewTweets={tweets.fetchNextPage}
        />
      </main>
      {profile.name}
    </>
  )
}

type FollowButtonProps = {
  userId: string,
  onClick: () => void,
  isFollowing: boolean,
  isLoading: boolean
}

function FollowButton({ isFollowing, onClick, userId, isLoading }: FollowButtonProps) {
  const session = useSession()

  if (session.status !== "authenticated" || session.data.user.id === userId) return null

  return (
    <Button onClick={onClick} small gray={isFollowing} disabled={isLoading}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}



// Next SSR setup
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
  const id = context.params?.id

  if (id == null) {
    return {
      redirect: {
        destination: "/"
      }
    }
  }

  const ssg = ssgHelper()
  await ssg.profile.getById.prefetch({ id })

  return {
    props: {
      id,
      trpcState: ssg.dehydrate()
    }
  }
}

export default ProfilePage