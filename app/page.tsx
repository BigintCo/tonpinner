'use client';
import Image, { StaticImageData } from "next/image";
import human from "@/public/pinnerimages/human.png";
import envelop from "@/public/pinnerimages/envelop.png";
import search from "@/public/images/search.svg";
import map from "@/public/pinnerimages/Ekran Resmi 2024-11-16 15.49.12.png";
import coffee from "@/public/pinnerimages/coffee.svg";
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
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="bg-[#24A1DE] w-full px-8 py-4">
        <div className="w-full flex justify-between items-center gap-4">
          <div className="w-14 aspect-square rounded-full border-2 border-white">
            <Image alt="pp" src={human} className="w-14 aspect-square rounded-full" />
          </div>
          <div className="w-full flex justify-center items-center gap-2 bg-black/10 py-1 px-4 rounded-lg text-white text-sm">
            <Image alt="search" src={search} className="w-4 aspect-square"></Image>
            <span>Search</span>
          </div>
          <div className="w-12 aspect-square flex justify-center items-center">
            <Image alt="envlp" src={envelop}></Image>
          </div>
        </div>
      </div>
      <div className="w-full px-8 py-4 rounded-lg flex flex-col justify-start items-start gap-3">
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
      </div>
      <div className="w-full flex justify-start items-center gap-2 px-8 py-1 text-xs  border-t border-b border-gray-600/10">
        <span className="text-pinner font-bold">400 </span> Check-ins
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-5 px-8 py-4 overflow-scroll scroll-hidden h-[300px]">
        {
          places.map((place, index) => (
            <div key={index} className="w-full flex flex-col justify-start items-start gap-5">
              <div className="text-sm bg-blue-400/30 p-2 rounded-xl">{place.date}</div>
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
                        <div key={index} className="w-6 aspect-square rounded-full border-2 border-white">
                          <Image alt="pp" src={human.image} className="w-8 aspect-square rounded-full" />
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
    </div>
  );
}
