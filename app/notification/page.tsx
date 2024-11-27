'use client';
import Image, { } from "next/image";
import human from "@/public/pinnerimages/human.png";
import envelop from "@/public/pinnerimages/wallet-svgrepo-com.svg";
import search from "@/public/images/search.svg";
import Link from "next/link";
import notificationIcon from "@/public/pinnerimages/bell.svg";
import location from "@/public/pinnerimages/geo-alt.svg";
import discover from "@/public/pinnerimages/discover.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import LayoutWrapper from "@/layout";
import { useAppContext } from "@/providers/app-provider";

export default function Home() {
  const { user } = useAppContext();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <LayoutWrapper>
      <div className="w-full h-screen overflow-hidden flex flex-col items-start relative bg-white">
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
        <div className="w-full h-[90vh] overflow-scroll scroll-hidden">
          <div className="w-full flex justify-center items-center text-pinner h-full">
            You have no notifications!
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
