'use client';
import Image, { StaticImageData } from "next/image";
import human from "@/public/pinnerimages/human.png";
import search from "@/public/images/search.svg";
import heartNone from "@/public/pinnerimages/heart-none.svg";
import heart from "@/public/pinnerimages/heart.webp";
import Link from "next/link";
import notificationIcon from "@/public/pinnerimages/bell.svg";
import discover from "@/public/pinnerimages/discover.svg";
import location from "@/public/pinnerimages/geo-alt.svg"
import hug from "@/public/pinnerimages/Hug.svg";
import diamond from "@/public/pinnerimages/toncoin-ton-logo.svg";
import wallet from "@/public/pinnerimages/wallet-svgrepo-com.svg";
import logo from "@/public/pinnerimages/tonpinner-logo.svg";
import pathIcon from "@/public/pinnerimages/Path.svg";
import rocket from "@/public/pinnerimages/rocket.svg";

import { useEffect, useState } from "react";
import { SendTransactionRequest, TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import { PinnerBadges } from "@/tact_PinnerBadges";
import { Address, beginCell } from "@ton/core";
import LayoutWrapper from "@/layout";
import { MapProvider } from "@/providers/MapProvider";
import { MapComponent } from "@/components/map";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/user-hook";
import { toast } from "react-toastify";
import { useAppContext } from "@/providers/app-provider";
import ApiService from "@/utils/api-service";
import { IUser } from "@/types/user";
import SearchOne from "@/components/search/search-one";

type IPost = {
  _id: string;
  content: string;
  photoURI: string;
  place: string;
  likers?: string[];
  user: IUser;
  checkin_date: string;
  used_badge: {
    image: string;
  };
}
interface Place {
  business_status: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  photos?: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  place_id: string;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
  rating?: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total?: number;
  vicinity: string;
}

export default function Home() {
  const { authLogin } = useUser({});
  const { userToken, handleUserToken, user } = useAppContext();
  const [loginStatus, setLoginStatus] = useState(false);
  const router = useRouter();

  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [section, setSection] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [tonConnectUI] = useTonConnectUI();
  const myWallet = useTonWallet();

  async function walletConnect() {
    try {
      if (myWallet && !user.walletAddress) {
        const data = await ApiService.post(`/users/walletConnect`, { walletAddress: myWallet.account.address });
        if (!data) {
          toast('An error occurred while connecting wallet! Please connect your wallet again', { type: 'error' });
        }
      }
    }
    catch (e: any) {
      toast(e?.response?.data?.error, { type: 'error' });
    }
  }
  async function getDiscoverPosts() {
    setLoading(true);
    try {
      if (localStorage.getItem('token') && section === 0) {
        const { data } = await ApiService.get(`/checkin`);
        if (data) {
          setPosts(data);
        }
      }
      if (localStorage.getItem('token') && section === 1) {
        const { data } = await ApiService.get(`/checkin/followings`);
        if (data) {
          setPosts(data);
        }
      }
    } catch (e: any) {
      toast(e?.response?.data?.error, { type: 'error' })
    }
    setLoading(false);
  }
  const likeCheckIn = async (postId: string) => {
    try {
      const data = await ApiService.post(`/checkin/like`, { post_id: postId });
      if (data) {
        if (likedPosts.includes(postId)) {
          setLikedPosts((prevLikedPosts) =>
            prevLikedPosts.filter((id) => id !== postId)
          );
        } else {
          setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
        }
      }
    } catch (error: any) {
      toast(error.message || "An error occurred while updating like status", {
        type: "error",
      });
    }
  }
  const boostCheckIn = async (postId: string) => {
    try {
      const data = await ApiService.post(`/checkin/boost`, { post_id: postId });
      if (data) {
        toast('Boosted successfully!', { type: 'success' });
      }
    } catch (error: any) {
      toast(error.message || "An error occurred while updating like status", {
        type: "error",
      });
    }
  }
  const mintNft = () => {
    const contract = PinnerBadges.fromAddress(Address.parse('EQBF-L0mnYLMPuX3MK8bnOiqxZHu-lU5MG0HT2D-Sh7GsKdw'));
    const transaction: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
      messages: [
        {
          address:
            "EQBF-L0mnYLMPuX3MK8bnOiqxZHu-lU5MG0HT2D-Sh7GsKdw", // message destination in user-friendly format
          amount: "30000000", // Toncoin in nanotons
          payload: contract.getPayload({
            $$type: 'RequestMint',
            owner_address: Address.parse(myWallet?.account.address!),
            authority_address: Address.parse(myWallet?.account.address!),
            content: beginCell().endCell()
          }).toBoc().toString('base64'),
        },
      ],
    };
    tonConnectUI.sendTransaction(transaction);
  };
  const loginPinner = () => {
    if (typeof window !== 'undefined' && window.Telegram) {
      const Telegram = window.Telegram.WebApp;
      Telegram.expand();
      const initData = Telegram.initData;
      // let startParam = Telegram.initDataUnsafe!.start_param!
      if (initData) {
        authLogin(initData);
      } else {
        toast('You could not log in', { type: 'error' });
      }
      const token = localStorage.getItem('token');
      if (token) {
        setLoginStatus(true);
      }
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleUserToken(token);
      setLoginStatus(true);
    }
  }, []);
  useEffect(() => {
    if (userToken) {
      setLoginStatus(true);
    }
  }, [userToken]);
  useEffect(() => {
    if (posts.length > 0) {
      for (let index = 0; index < posts.length; index++) {
        const element = posts[index];
        if (element.likers && element.likers.includes(user.id)) {
          setLikedPosts((prevLikedPosts) => [...prevLikedPosts, element._id]);
        }
        else {
          setLikedPosts((prevLikedPosts) => prevLikedPosts.filter((id) => id !== element._id));
        }
      }
    }
  }, [posts]);
  useEffect(() => {
    getDiscoverPosts();
  }, [section]);
  useEffect(() => {
    if (localStorage.getItem('firstPin')) {
      setOpenModal(true);
    }
  }, []);
  useEffect(() => {
    if (myWallet && !user.walletAddress) {
      walletConnect();
    }
  }, [myWallet, user]);
  return (
    <LayoutWrapper>
      {
        !loginStatus &&
        <div className="w-full h-screen bg-pinner px-8 flex flex-col justify-center items-center gap-16">
          <div className="w-3/4">
            <Image src={logo} alt="logo" className="w-full"></Image>
          </div>
          <div className="w-full">
            <Button onClick={() => { loginPinner() }} className="text-pinner rounded-lg py-2 border border-[#24A1DE]/30 w-full bg-white flex justify-center items-center gap-2">
              <Image alt="logo" src={pathIcon} className="h-full aspect-square"></Image>
              <span>
                Continue to TonPinner
              </span>
            </Button>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-3 text-xs">
            <span className="text-white">Switch Account | About Signing in with Telegram</span>
            <div className="h-[1px] w-full bg-gray-400"></div>
            <span className="text-gray-300">By using Ton Pinner, you agree to the Terms, Cookie Policy
              and Privacy Policy</span>
          </div>
        </div>
      }
      {
        loginStatus &&
        <div className="w-full h-screen flex flex-col items-start relative bg-white">
          {
            openModal &&
            <div className="absolute top-0 left-0 w-screen h-screen bg-black/30 z-50 px-8 flex justify-center items-center">
              <div className="w-full flex justify-between items-start gap-5 bg-white rounded-xl p-4 relative">
                <div className="w-8 flex justify-center items-center absolute right-2 top-4 aspect-square rounded-full p-1 bg-pinner text-white" onClick={() => { localStorage.removeItem('firstPin'); setOpenModal(false) }}>X</div>

                <Image alt="hug" src={hug} className="w-12 aspect-square"></Image>
                <div className="w-full flex flex-col justify-start items-start gap-2">
                  <div className="w-full flex flex-col justify-start items-start gap-1">
                    <span className="font-semibold">Coffe Lover</span>
                    <span className="text-sm">First Pinner</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Congratulations! You’re the first to pin this location! We noticed you’re a coffee lover, so we’ve awarded you this special sticker. This sticker is an on-chain SBT (Soulbound Token), meaning it’s a unique, non-transferable NFT. You can use this sticker in future pins to earn bonus points and boost your score. Enjoy your exclusive reward!
                  </div>
                  {
                    myWallet &&
                    <button
                      onClick={() => { localStorage.removeItem('firstPin'); setOpenModal(false); mintNft(); }}
                      className="bg-pinner rounded-lg w-full py-2 flex justify-center items-center text-white">
                      Claim
                    </button>
                  }
                  {
                    !myWallet &&
                    <TonConnectButton />
                  }
                </div>
              </div>
            </div>
          }

          <div className="bg-[#24A1DE] w-full px-8 py-4 relative">
            <div className="w-full flex justify-between items-center gap-4">
              {
                user?.photoUrl ?
                  <div onClick={() => { router.push('/profile/' + user.id) }} className="w-8 aspect-square rounded-full border-2 border-white">
                    <Image alt="pp" src={user?.photoUrl} width={32} height={32} className="w-full aspect-square rounded-full" />
                  </div>
                  :
                  <div onClick={() => { router.push('/profile/' + user.id) }} className="w-8 aspect-square rounded-full border-2 border-white">
                    <Image alt="pp" src={human} className="w-8 aspect-square rounded-full" />
                  </div>
              }
              {/* <div className="w-full flex justify-center items-center gap-2 bg-black/10 py-1 px-4 rounded-lg text-white text-sm">
                <Image alt="search" src={search} className="w-4 aspect-square"></Image>
                <span>Search</span>
              </div> */}
              <SearchOne />
              <div onClick={() => setOpenMenu(true)} className="w-8 aspect-square flex justify-center items-center">
                <Image alt="envlp" src={wallet}></Image>
              </div>
            </div>
          </div>
          <div className="w-full h-[90vh] overflow-scroll scroll-hidden  relative flex flex-col justify-start items-start gap-2">
            <div className="w-full grid grid-cols-12 justify-center items-center text-sm sticky top-0 z-40">
              <div className="col-span-6">
                <button onClick={() => { setSection(0) }} className={`${section === 0 ? 'border-[#24A1DE]' : ''} py-2 border-b w-full flex justify-center items-center bg-white text-pinner`}>
                  Discover
                </button>
              </div>
              <div className="col-span-6">
                <button onClick={() => { setSection(1) }} className={`${section === 1 ? 'border-[#24A1DE]' : ''} py-2 border-b w-full flex justify-center items-center bg-white text-pinner`}>
                  Following
                </button>
              </div>
            </div>
            <div className="w-full px-8 py-4 rounded-lg flex flex-col justify-start items-start gap-3">
              <div className="w-full">
                <MapProvider>
                  <MapComponent location={posts.map((post) => {
                    const place: Place = typeof post.place === "string" ? JSON.parse(post.place) : post.place;
                    return { lat: place.geometry.location.lat, lng: place.geometry.location.lng }
                  })} showMe={true} />
                </MapProvider>
              </div>
              <div className="w-full flex justify-between items-center ">
                <button className="rounded-full bg-[#24A1DE] p-2 flex justify-center items-center text-xs text-white">
                  {posts.length} Check-ins
                </button>
                <button className="rounded-full bg-[#24A1DE] p-2 flex justify-center items-center text-xs text-white">
                  0 saved
                </button>
                <button className="rounded-full bg-[#24A1DE] p-2 flex justify-center items-center text-xs text-white">
                  36/100 Categories
                </button>
              </div>
              <button onClick={() => router.push('/premium')} className="w-full flex justify-center items-center gap-2 p-2 text-pinner border border-blue-500/50 rounded-3xl">
                <Image alt="diamond" src={diamond} className="w-8 aspect-square"></Image>
                Get Premium
              </button>

              <div className="w-full flex flex-col justify-start items-start gap-6 py-4">
                {posts &&
                  posts.map((post, index) => {
                    const place: Place = typeof post.place === "string" ? JSON.parse(post.place) : post.place;
                    return (
                      <div key={index} className="w-full flex flex-col justify-start items-start gap-4">
                        <div className="w-full flex justify-between items-center">
                          <div className="text-sm bg-blue-600/10 p-2 rounded-xl text-blue-500">
                            {
                              new Date(post.checkin_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                            }
                          </div>
                          {
                            post.used_badge &&
                            <div className="flex justify-end items-center">
                              <img src={post.used_badge.image} className="w-8 aspect-square" alt="" />
                            </div>
                          }
                        </div>
                        <div className="w-full flex justify-start items-start gap-5">
                          <div onClick={() => { router.push('/profile/' + post.user.id) }} className={`${post.user.ton_pinner_premium && 'border-2 border-yellow-400'} w-[10%] rounded-full bg-pinner flex justify-center items-center`}>
                            <img src={post.user.photoUrl} alt="" className="w-full aspect-square rounded-full" />
                          </div>
                          <div className="w-[90%] flex flex-col justify-start items-start gap-2">
                            {
                              post.user.ton_pinner_premium &&
                              <span className={`text-2xs text-black flex justify-center items-center bg-yellow-400 px-4 rounded-lg`}>Premium</span>

                            }
                            <span className="text-sm font-medium">{place.name}</span>
                            <div className="w-full">
                              <img src={post.photoURI} className="object-contain rounded-lg" alt=""></img>
                            </div>
                            <div className="w-full flex justify-between items-center">
                              <div className="flex flex-col justify-start items-start gap-1">
                                <span className="text-xs text-gray-400">{
                                  new Date(post.checkin_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                                }</span>
                                <span onClick={() => { router.push('/profile/' + post.user.id) }} className="text-xs text-gray-400 w-full flex justify-start items-center gap-1">
                                  Checked by
                                  <span className="text-pinner"> {post.user.firstName} {post.user.lastName} </span>
                                </span>
                              </div>
                              <div className="flex justify-end items-center gap-2">
                                <div className="w-6 aspect-square rounded-full border-2 border-white">
                                  <Image alt="heart-none" onClick={() => { likeCheckIn(post._id) }} src={heartNone} className={`${!likedPosts.includes(post._id) ? 'block' : 'hidden'} w-full aspect-square rounded-full`} />
                                  <Image alt="heart" onClick={() => { likeCheckIn(post._id) }} src={heart} className={`${likedPosts.includes(post._id) ? 'block' : 'hidden'} w-full aspect-square rounded-full`} />
                                </div>
                                <div className="w-6 aspect-square rounded-full border-2 border-white">
                                  <Image alt="boost-rocket" onClick={() => {
                                    if (user.ton_pinner_premium) {
                                      boostCheckIn(post._id)
                                    }
                                    else {
                                      toast.error('Only premium users can use boost')
                                    }
                                  }} src={rocket} className={`w-full aspect-square rounded-full`} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between gap-10 items-end px-16 py-3 relative border-t border-[#24A1DE]/30">
            <Link href={'/'} className="w-7 aspect-auto flex flex-col justify-center items-center gap-1">
              <Image alt="icon" src={discover} className="w-full aspect-square"></Image>
              <span className="text-xs text-gray-700">Discover</span>
            </Link>
            <Link href={'/pin'} className="flex justify-center items-center aspect-auto rounded-full p-2 absolute left-1/2 -translate-x-1/2 -top-1/2 translate-y-3  bg-white">
              <div className="w-full aspect-square bg-pinner flex justify-center items-center rounded-full p-4">
                <Image alt="icon" src={location} className="w-6"></Image>
              </div>
            </Link>
            <Link href={'/notification'} className="w-7 aspect-auto flex flex-col justify-center items-center gap-1">
              <Image alt="icon" src={notificationIcon} className="w-full aspect-square"></Image>
              <span className="text-xs text-gray-700">Notification</span>
            </Link>
          </div>
          {
            openMenu &&
            <div className="w-full h-[300px] absolute bottom-0 left-0 bg-white z-50 flex flex-col gap-5 justify-start py-4 items-center rounded-t-xl  border-t border-blue-500">
              <div onClick={() => { setOpenMenu(false) }} className="p-1 w-10 aspect-square rounded-full bg-pinner text-2xl flex justify-center items-center absolute top-4 right-4 text-white">X</div>
              <div className="w-full flex flex-col justify-center items-center gap-1">
                <div className="text-pinner text-2xl">Wallet Connect</div>
                {
                  myWallet && myWallet?.account.address &&
                  <span>You connected</span>
                }
              </div>
              <TonConnectButton />
            </div>
          }
        </div>
      }

    </LayoutWrapper>

  );
}
