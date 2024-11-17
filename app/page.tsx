'use client';
import Image, { StaticImageData } from "next/image";
import human from "@/public/pinnerimages/human.png";
import search from "@/public/images/search.svg";
import map from "@/public/pinnerimages/Ekran Resmi 2024-11-16 15.49.12.png";
import coffee from "@/public/pinnerimages/coffee.svg";
import Link from "next/link";
import userIcon from "@/public/pinnerimages/usericon.svg";
import usersIcon from "@/public/pinnerimages/usersicon.svg";
import location from "@/public/pinnerimages/locaition.svg";
import hug from "@/public/pinnerimages/Hug.svg";
import wallet from "@/public/pinnerimages/wallet-svgrepo-com.svg";
import { useEffect, useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import diamond from "@/public/pinnerimages/toncoin-ton-logo.svg";
type IPlace = {
  day: string;
  name: string;
  place: string;
  date: string;
  checkedBy: string;
  humans: { image: StaticImageData }[];
};
export default function Home() {
  const places: IPlace[] = [
    {
      day: "24 February 2024",
      name: "Starbucks",
      place: "Beylikdüzü",
      date: "24 Feb 2024 at 14:00",
      checkedBy: "Gökhan Sansar",
      humans: [
        {
          image: human,
        },
        {
          image: human,
        },

      ],
    },
    {
      day: "24 February 2024",
      name: "Coffee Lab",
      place: "Bayrampaşa",
      date: "16 Oct 2024 at 8:00",
      checkedBy: "Mert Tekdemir",
      humans: [
        {
          image: human,
        },
        {
          image: human,
        },

      ],
    },
  ];
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('firstPin')) {
      setOpenModal(true);
    }
  }, []);
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-start relative bg-white">
      {
        openModal &&
        <div className="absolute top-0 left-0 w-screen h-screen bg-black/30 z-50 px-8 flex justify-center items-center">
          <div className="w-full flex justify-between items-start gap-5 bg-white rounded-xl p-4">
            <Image alt="hug" src={hug} className="w-12 aspect-square"></Image>
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <span className="font-semibold">Coffe Lover</span>
                <span className="text-sm">First Pinner</span>
              </div>
              <div className="text-xs text-gray-400">
                Congratulations! You’re the first to pin this location! We noticed you’re a coffee lover, so we’ve awarded you this special sticker. This sticker is an on-chain SBT (Soulbound Token), meaning it’s a unique, non-transferable NFT. You can use this sticker in future pins to earn bonus points and boost your score. Enjoy your exclusive reward!
              </div>
              <button
                onClick={() => { localStorage.removeItem('firstPin'); setOpenModal(false) }}
                className="bg-pinner rounded-lg w-full py-2 flex justify-center items-center text-white">
                Claim
              </button>
            </div>
          </div>
        </div>
      }
      <div className="bg-[#24A1DE] w-full px-8 py-4 relative">

        <div className="w-full flex justify-between items-center gap-4">
          <div className="w-14 aspect-square rounded-full border-2 border-white">
            <Image alt="pp" src={human} className="w-14 aspect-square rounded-full" />
          </div>
          <div className="w-full flex justify-center items-center gap-2 bg-black/10 py-1 px-4 rounded-lg text-white text-sm">
            <Image alt="search" src={search} className="w-4 aspect-square"></Image>
            <span>Search</span>
          </div>
          <div onClick={() => setOpenMenu(true)} className="w-12 aspect-square flex justify-center items-center">
            <Image alt="envlp" src={wallet}></Image>
          </div>
        </div>
      </div>
      <div className="w-full  px-8 py-4 rounded-lg flex flex-col justify-start items-start gap-3">
        <Image alt="map" src={map} className="rounded-lg"></Image>
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
        <button className="w-full flex justify-center items-center gap-2 p-2 text-pinner border border-blue-500/50 rounded-3xl">
            <Image alt="diamond" src={diamond} className="w-8 aspect-square"></Image>
            Get Premium
        </button>
        <div className="w-full flex justify-start items-center gap-2 px-8 py-1 text-xs  border-t border-b border-gray-600/10">
          <span className="text-pinner font-bold">400 </span> Check-ins
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-5 px-8 py-4 overflow-scroll scroll-hidden h-[60vh]">
        {
          places.map((place, index) => (
            <div key={index} className="w-full flex flex-col justify-start items-start gap-5">
              <div className="text-sm bg-blue-600/10 p-2 rounded-xl text-blue-500">{place.date}</div>
              <div className="w-full flex justify-start items-start gap-5">
                <div className="rounded-full bg-pinner p-3 flex justify-center items-center">
                  <Image alt="icon" src={coffee} className=""></Image>
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                  <span className="text-sm font-medium">{place.name}</span>
                  <div className="flex flex-col justify-start items-start gap-1">
                    <span className="text-xs text-gray-400">{place.place}</span>
                    <span className="text-xs text-gray-400">{place.date}</span>
                  </div>
                  <span className="text-xs text-gray-400 flex justify-start items-center gap-1">Checked by <span className="text-pinner">{place.checkedBy}</span></span>
                  <div className="w-full flex justify-start items-center gap-1">
                    {
                      place.humans.map((human, index) => (
                        <div key={index} className="w-10 aspect-square rounded-full border-2 border-white">
                          <Image alt="pp" src={human.image} className="w-full aspect-square rounded-full" />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="w-full flex justify-between items-end px-8 py-2 relative">
        <Link href={''} className="w-8 aspect-auto">
          <Image alt="icon" src={userIcon}></Image>
        </Link>
        <Link href={'/pin'} className="w-12 flex justify-center items-center aspect-auto rounded-full p-2 shadow-md absolute left-1/2 -translate-x-1/2 -top-1/2 bg-white">
          <Image alt="icon" src={location} className="w-6"></Image>
        </Link>
        <Link href={'/friends'} className="w-12 aspect-auto">
          <Image alt="icon" src={usersIcon}></Image>
        </Link>
      </div>
      {
        openMenu &&
        <div className="w-full h-[200px] absolute bottom-0 left-0 bg-white z-50 flex justify-center items-center rounded-t-xl  border-t border-blue-500">
          <div onClick={()=>{setOpenMenu(false)}} className="p-1 w-10 aspect-square rounded-full bg-pinner text-2xl flex justify-center items-center absolute top-4 right-4 text-white">X</div>
          <TonConnectButton />
        </div>
      }
    </div>
  );
}
