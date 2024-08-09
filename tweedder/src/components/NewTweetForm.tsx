import { useSession } from "next-auth/react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import { type FormEvent, useLayoutEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

function updateTextareaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;

  textArea.style.height = "0"
  textArea.style.height = `${textArea.scrollHeight}px`
}

export default function NewTweetForm() {
  const session = useSession()

  if (session.status !== "authenticated") return null

  // creates a server-client boundary so that useLayoutEffect only runs on the client
  // if not authenticated on the client, the component won’t even run

  return <Form />
}

function Form() {
  const session = useSession()
  const [inputValue, setInputValue] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const trpcUtils = api.useUtils()

  useLayoutEffect(() => {
    textAreaRef.current && updateTextareaSize(textAreaRef.current)
    // auto resize textarea height as needed
  }, [inputValue])

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      console.log("newTweet", newTweet);
      setInputValue("")

      if (session.status !== "authenticated") return

      trpcUtils.tweet.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null || oldData.pages[0] == null) return

        const newCachedTweet = {
          ...newTweet,
          likeCount: 0,
          likedByMe: false,
          user: {
            id: session.data.user.id,
            name: session.data.user.name || null,
            image: session.data.user.image || null
          }
        }

        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              tweets: [newCachedTweet, ...oldData.pages[0].tweets]
            },
            ...oldData.pages.slice(1)
          ]
        }
      })
    }
  });

  const imgSrc = session.data?.user?.image

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    createTweet.mutate({ content: inputValue })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage src={imgSrc} />
        <textarea
          ref={textAreaRef}
          className="flex-grow h-4 p-4 resize-none overflow-hidden text-lg outline-none"
          placeholder="What's happening?"
          style={{ height: 0 }}
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
        ></textarea>
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  )
}