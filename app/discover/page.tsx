'use client';
import Image, { } from "next/image";
import human from "@/public/pinnerimages/human.png";
import envelop from "@/public/pinnerimages/wallet-svgrepo-com.svg";
import search from "@/public/images/search.svg";
import Link from "next/link";
import mekan1 from "@/public/pinnerimages/mekan1.jpeg";
import mekan2 from "@/public/pinnerimages/mekan2.webp";
import mekan3 from "@/public/pinnerimages/mekan3.webp";
import mekan4 from "@/public/pinnerimages/mekan4.webp";
import notificationIcon from "@/public/pinnerimages/bell.svg";
import location from "@/public/pinnerimages/geo-alt.svg";
import discover from "@/public/pinnerimages/discover.svg";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import LayoutWrapper from "@/layout";
import { useAppContext } from "@/providers/app-provider";
import ApiService from "@/utils/api-service";
import { toast } from "react-toastify";
import { MapProvider } from "@/providers/MapProvider";
import { MapComponent } from "@/components/map";


export default function Home() {
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
  const { user } = useAppContext();
  const [openMenu, setOpenMenu] = useState(false);
  const [section, setSection] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  async function getDiscoverPosts() {
    setLoading(true);
    try {
      if (localStorage.getItem('token')) {
        const { data } = await ApiService.query(`/checkin`, { isOnlyPhoto: true });
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
  useEffect(() => {
    getDiscoverPosts();
  }, []);
  useEffect(() => {
    console.log(posts, 'posts');
  }, [posts]);
  return (
    <LayoutWrapper>
      <div className="w-full h-screen flex flex-col items-start relative bg-white">
        <div className="bg-[#24A1DE] w-full px-8 py-4 ">
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
              <Image alt="envlp" src={envelop}></Image>
            </div>
          </div>
        </div>
        <div className="w-full h-[90vh] overflow-scroll scroll-hidden  relative flex flex-col justify-start items-start gap-2">
          <div className="w-full grid grid-cols-12 justify-center items-center text-sm sticky top-0 z-50">
            <div className="col-span-6">
              <button onClick={() => { setSection(0) }} className={`${section === 0 ? 'border-[#24A1DE]' : ''} py-2 border-b   w-full flex justify-center items-center bg-white text-pinner`}>
                Discover
              </button>
            </div>
            <div className="col-span-6">
              <button onClick={() => { setSection(1) }} className={`${section === 1 ? 'border-[#24A1DE]' : ''} py-2 border-b  w-full flex justify-center items-center bg-white text-pinner`}>
                Following
              </button>
            </div>
          </div>
          <div className="w-full  px-8 py-4 rounded-lg flex flex-col justify-start items-start gap-3">
            <div className="w-full">
              <MapProvider>
                <MapComponent />
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
          <Link href={'/discover'} className="w-7 aspect-auto flex flex-col justify-center items-center gap-1">
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
    </LayoutWrapper>
  );
}
