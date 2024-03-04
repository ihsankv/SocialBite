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
export default function Home() {

  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();

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
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 ml-28">
          <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all relative">
            <BsTwitter />
          </div>
          <div className="mt-1 text-xl pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                  key={item.title}>
                  {/* <Link
                      className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                      href={item.link}
                    > */}
                  <span >{item.icon}</span>
                  <span>{item.title}</span>
                  {/* </Link> */}
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                Tweet
              </button>
              <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                <BsTwitter />
              </button>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div className="hidden sm:block">
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-5  border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">

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

          {tweets?.map((tweet) => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null)}
          {/* <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard /> */}
        </div>

        {/* <GoogleLogin onSuccess={cred => console.log(cred)} /> */}
        <div className="col-span-3 p-5">
          {!user && <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="Text-2xl my-2">New to Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
            {/* <GoogleLogin onSuccess={(cred) => console.log(cred)} /> */}
          </div>}
        </div>
      </div>
    </div>
  );
}
