"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { createPost } from "@/app/actions/publishPost";

type Props = {};

import "@uploadthing/react/styles.css";

import { UploadButton } from "@/app/utils/uploadthing";

const NewBlogForm = (props: Props) => {
  const { data: session, status } = useSession();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!session && status !== "loading")
    return <div>You must be signed in to post</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = session?.user as any;
    const userId = user?.id;

    if (!userId) return;
    try {
      const post = await createPost({ title, content, authorId: userId, imgURL: thumbnail });
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (submitted) return <div>Post submitted!</div>;

  return (
    <div className="min-h-[calc(100vh-130px)] py-2 container flex flex-col mt-12">
      <form
        className="flex flex-col flex-1 items-stretch justify-center h-full text-left"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="text-6xl focus-within:outline-none"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />
        <textarea
          name="content"
          className="flex-1 focus-within:outline-none text-4xl mt-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="self-start">
          <label className="text-slate-600 mb-3">Add thumbnail image (optional)</label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);

              if (res) {
                setThumbnail(res[0].url);
              }
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <button
          type="submit"
          className="w-fit text-white bg-indigo-400 px-4 py-2 sm:px-6 sm:py-4 border-2 rounded shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)]"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;
