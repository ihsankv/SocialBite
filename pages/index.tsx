import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useCallback, useState } from "react";
import { BiHash, BiHomeCircle, BiImageAlt, BiMoney, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { graphqlClient } from "@/clients/api";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import Twitterlayout from "@/components/FeedCard/Layout/TwitterLayout";
import { GetServerSideProps } from "next";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
//SocialBite

// Hype Connect 
//EchoSync
interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string
}
const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
    link: "/",

  },
  {
    title: "Explore",
    icon: <BiHash />,
    link: "/",
  },
  {
    title: "Notifications",
    icon: <BsBell />,
    link: "/",
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
    link: "/",
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
    link: "/",
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
    link: "/",
  },
  {
    title: "Profile",
    icon: <BiUser />,
    link: `/`,
    // link: `/${user?.id}`,
  },
  {
    title: "More",
    icon: <SlOptions />,
    link: "/",
  },
];

interface HomeProps {
  tweets?: Tweet[];
}

export default function Home(props:HomeProps) {

  console.log("homeProps",props)
  const { user } = useCurrentUser();
  // const { tweets = [] } = useGetAllTweets();

  const queryClient = useQueryClient()
  const [content, setContent] = useState('')
  const { mutate } = useCreateTweet()
  console.log("user", user)

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);

      const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery,
        { token: googleToken })
      // const { verifyGoogleToken } = await graphqlClient.request(
      //   verifyUserGoogleTokenQuery,
      //   { token: googleToken }
      // )
      toast.success("Verified Success");
      console.log(verifyGoogleToken);
      if (verifyGoogleToken)
        window.localStorage.setItem('__socialBite_token', verifyGoogleToken);
      // await queryClient.invalidateQueries(['curent-user'])
      await queryClient.invalidateQueries({ queryKey: ['curent-user'] });
      // await queryClient.invalidateQueries({ predicate: ['curent-user'] });

    }, [queryClient]
  );

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    // const handlerFn = handleInputChangeFile(input);

    // input.addEventListener("change", handlerFn);

    input.click();
  }, []);
  // }, [handleInputChangeFile]);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,

    })
  }, [content, mutate])
  // const handleCreateTweet = useCallback(async () => {
  //   await mutateAsync({
  //     content,
  //     imageURL,
  //   });
  //   setContent("");
  //   setImageURL("");
  // }, [mutateAsync, content, imageURL]);


  return (
    <div>
    <Twitterlayout>
    <div>
            <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                  {user?.profileImageURL && (
                    <Image
                      className="rounded-full"
                      src={user?.profileImageURL}
                      alt="user-image"
                      height={50}
                      width={50}
                    />
                  )}
                </div>
                <div className="col-span-11">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                    placeholder="What's happening?"
                    rows={3}
                  ></textarea>
                  {user && (
                    // {imageURL && (
                    <Image
                      src={user?.profileImageURL}
                      // src={imageURL}
                      alt="tweet-image"
                      width={50}
                      height={50}
                    />
                  )}
                  <div className="mt-2 flex justify-between items-center">
                    <BiImageAlt
                      onClick={handleSelectImage}
                      className="text-xl" />
                    <button
                      onClick={handleCreateTweet}
                      className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full"
                    >
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {props?.tweets?.map((tweet) => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null)}
    </Twitterlayout>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return {
    props: {
      tweets: allTweets.getAllTweets as Tweet[],
    },
  };
};
