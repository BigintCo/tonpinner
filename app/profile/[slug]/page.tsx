'use client';
import Image, { StaticImageData } from "next/image";
import human from "@/public/pinnerimages/human.png";
import search from "@/public/images/search.svg";
import coffee from "@/public/pinnerimages/coffee.svg";
import Link from "next/link";
import notificationIcon from "@/public/pinnerimages/bell.svg";
import discover from "@/public/pinnerimages/discover.svg";
import location from "@/public/pinnerimages/geo-alt.svg"
import hug from "@/public/pinnerimages/Hug.svg";
import diamond from "@/public/pinnerimages/toncoin-ton-logo.svg";
import wallet from "@/public/pinnerimages/wallet-svgrepo-com.svg";
import logo from "@/public/pinnerimages/tonpinner-logo.svg";
import pathIcon from "@/public/pinnerimages/Path.svg";


import { useEffect, useState } from "react";
import { SendTransactionRequest, TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useParams, useRouter } from "next/navigation";
import { PinnerBadges } from "@/tact_PinnerBadges";
import { Address, beginCell } from "@ton/core";
import LayoutWrapper from "@/layout";
import { MapProvider } from "@/providers/MapProvider";
import { MapComponent } from "@/components/map";
import { log } from "console";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/user-hook";
import { toast } from "react-toastify";
import { useAppContext } from "@/providers/app-provider";
import ApiService from "@/utils/api-service";
type IPlace = {
  day: string;
  name: string;
  place: string;
  date: string;
  checkedBy: string;
  location?: { lat: number; lng: number };
  humans: { image: StaticImageData }[];
};
type IPost = {
  content: string;
  photoURI: string;
  place: string;
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
  const { slug: userTelegramId } = useParams();
  const [tonConnectUI] = useTonConnectUI();
  const myWallet = useTonWallet();
  const { authLogin } = useUser({});
  const { userToken, handleUserToken, user } = useAppContext();
  const [loginStatus, setLoginStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  
  async function getDiscoverPosts() {
    setLoading(true);
    try {
      if (localStorage.getItem('token') && userTelegramId) {
        const { data } = await ApiService.query(`/checkin/user`, { tg_user_id: userTelegramId });
        if (data) {
          setPosts(data);
        }
        // else {
        //     localStorage.removeItem('token');
        // }
      }

    } catch (e: any) {
      // localStorage.removeItem('token');
      toast(e?.response?.data?.error, { type: 'error' })
    }
    setLoading(false);
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
    getDiscoverPosts();
  }, [userTelegramId]);
  useEffect(() => {
    if (localStorage.getItem('firstPin')) {
      setOpenModal(true);
    }
  }, []);
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
                  <div className="w-14 aspect-square rounded-full border-2 border-white">
                    <Image alt="pp" src={user?.photoUrl} width={56} height={56} className="w-full aspect-square rounded-full" />
                  </div>
                  :
                  <div className="w-14 aspect-square rounded-full border-2 border-white">
                    <Image alt="pp" src={human} className="w-14 aspect-square rounded-full" />
                  </div>
              }
              <div className="w-full flex justify-center items-center gap-2 bg-black/10 py-1 px-4 rounded-lg text-white text-sm">
                <Image alt="search" src={search} className="w-4 aspect-square"></Image>
                <span>Search</span>
              </div>
              <div onClick={() => setOpenMenu(true)} className="w-12 aspect-square flex justify-center items-center">
                <Image alt="envlp" src={wallet}></Image>
              </div>
            </div>
          </div>
          <div className="w-full h-[90vh] overflow-scroll scroll-hidden  relative flex flex-col justify-start items-start gap-2">
            <div className="w-full px-8 py-4 rounded-lg flex flex-col justify-start items-start gap-3">
              <div className="w-full">
                <MapProvider>
                  <MapComponent location={posts.map((post) => {
                    const place: Place = typeof post.place === "string" ? JSON.parse(post.place) : post.place;
                    return { lat: place.geometry.location.lat, lng: place.geometry.location.lng }
                  })} />
                </MapProvider>
              </div>
              <div className="w-full flex justify-between items-center ">
                <button className="rounded-full bg-[#24A1DE] p-2 flex justify-center items-center text-xs text-white">
                  282 visited
                </button>
                <button className="rounded-full bg-[#24A1DE] p-2 flex justify-center items-center text-xs text-white">
                  0 saved
                </button>
                <button className="rounded-full bg-[#24A1DE] p-2 flex justify-center items-center text-xs text-white">
                  36/100 Categories
                </button>
              </div>
              {/* <div className="w-full flex justify-start items-center gap-2 px-8 py-1 text-xs  border-t border-b border-gray-600/10">
              <span className="text-pinner font-bold">400 </span> Check-ins
            </div> */}
              <div className="w-full flex flex-col justify-start items-start gap-6 py-4">
                {posts &&
                  posts.map((post, index) => {
                    const place: Place = typeof post.place === "string" ? JSON.parse(post.place) : post.place;
                    return (

                      <div key={index} className="w-full flex flex-col justify-start items-start gap-4">
                        <div className="text-sm bg-blue-600/10 p-2 rounded-xl text-blue-500">Today</div>
                        <div className="w-full flex justify-start items-start gap-5">
                          <div className="w-[15%] rounded-full bg-pinner p-3 flex justify-center items-center">
                            <Image src={place.icon} alt="" width={20} height={20} className="w-5 h-5" />
                          </div>
                          <div className="w-[85%] flex flex-col justify-start items-start gap-2">
                            <span className="text-sm font-medium">{place.name}</span>
                            <div className="w-full">
                              <img src={post.photoURI} className="object-contain" alt=""></img>
                            </div>
                            <div className="flex flex-col justify-start items-start gap-1">
                              <span className="text-xs text-gray-400">Today</span>
                            </div>
                            <span className="text-xs text-gray-400 flex justify-start items-center gap-1">Checked by <span className="text-pinner">Today</span></span>
                            {/* <div className="w-full flex justify-start items-center gap-1">
                          {
                            place.humans.map((human, index) => (
                              <div key={index} className="w-10 aspect-square rounded-full border-2 border-white">
                                <Image alt="pp" src={human.image} className="w-full aspect-square rounded-full" />
                              </div>
                            ))
                          }
                        </div> */}
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
            <div className="w-full h-[200px] absolute bottom-0 left-0 bg-white z-50 flex justify-center items-center rounded-t-xl  border-t border-blue-500">
              <div onClick={() => { setOpenMenu(false) }} className="p-1 w-10 aspect-square rounded-full bg-pinner text-2xl flex justify-center items-center absolute top-4 right-4 text-white">X</div>
              <TonConnectButton />
            </div>
          }
        </div>
      }

    </LayoutWrapper>

  );
}
