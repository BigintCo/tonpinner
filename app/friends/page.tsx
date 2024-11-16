'use client';
import Image, {  } from "next/image";
import human from "@/public/pinnerimages/human.png";
import envelop from "@/public/pinnerimages/envelop.png";
import search from "@/public/images/search.svg";
import heart from "@/public/pinnerimages/heart.svg";
import Link from "next/link";
import userIcon from "@/public/pinnerimages/usericon.svg";
import usersIcon from "@/public/pinnerimages/usersicon.svg";
import location from "@/public/pinnerimages/locaition.svg";
import rocket from "@/public/pinnerimages/rocket.svg";
import { useRouter } from "next/navigation";
type IPlace = {
  day: string;
  userName: string;
  name: string;
  place: string;
  date: string;
};
export default function Home() {
  const router = useRouter();
  const users: IPlace[] = [
    {
      userName: "Mert Metin",
      name: "Starbucks",
      day: "24 February 2024",
      place: "Bebek / İstanbul",
      date: "24 Feb",
    },
    {
      userName: "Mert Metin",
      name: "Starbucks",
      day: "24 February 2024",
      place: "Bebek / İstanbul",
      date: "24 Feb",
    },
    {
      userName: "Mert Metin",
      name: "Starbucks",
      day: "24 February 2024",
      place: "Bebek / İstanbul",
      date: "24 Feb",
    },
    {
      userName: "Mert Metin",
      name: "Starbucks",
      day: "24 February 2024",
      place: "Bebek / İstanbul",
      date: "24 Feb",
    },
    {
      userName: "Mert Metin",
      name: "Starbucks",
      day: "24 February 2024",
      place: "Bebek / İstanbul",
      date: "24 Feb",
    },
  ];

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-start relative">
      <div className="bg-[#24A1DE] w-full px-8 py-4 ">
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
      <div className="w-full h-[90vh] overflow-scroll scroll-hidden">
        {
          users.map((user, index) => (
            <div key={index} className="w-full flex justify-start items-center gap-4 px-8 py-4 border-b border-gray-300/30">
              <div className="w-20 aspect-square rounded-full border-2 border-white">
                <Image alt="pp" src={human} className="w-20 aspect-square rounded-full" />
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="text-sm">{user.userName}</div>
                <div className="text-lg">{user.name}</div>
                <div className="text-sm text-gray-500">{user.place}</div>
                <div className="text-sm text-gray-500">{user.date}</div>
              </div>
              <div className="w-full flex justify-end items-center gap-4">
                <Image onClick={()=> {router.push('/premium')}} src={rocket} alt="rocket"></Image>
                <Image src={heart} alt="rocket"></Image>
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
        <Link href={''} className="w-12 aspect-auto">
          <Image alt="icon" src={usersIcon}></Image>
        </Link>
      </div>
    </div>
  );
}
