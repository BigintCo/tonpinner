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
import { useEffect, useState } from "react";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import LayoutWrapper from "@/layout";
import { useAppContext } from "@/providers/app-provider";
import { toast } from "react-toastify";
import ApiService from "@/utils/api-service";
import { IUser } from "@/types/user";
import { IPost } from "../profile/[slug]/page";
import SearchOne from "@/components/search/search-one";

export default function Home() {
  type INotification = {
    "post_id": string,
    "receiver": number,
    "sender": number,
    "notification_type": string,
    "notification_date": string,
    "sender_user": IUser,
    "post": IPost
  }
  const { user } = useAppContext();
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const myWallet = useTonWallet();

  const getNotifications = async () => {
    try {
      const { data } = await ApiService.get(`/users/notifications`);
      if (data) {
        setNotifications(data);
      }
    }
    catch (e: any) {
      toast(e?.response?.data?.error, { type: 'error' });
    }
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotifications();
    }
  }, []);
  useEffect(() => {
    console.log(notifications, 'notifications');
  }, [notifications]);
  return (
    <LayoutWrapper>
      <div className="w-full h-screen flex flex-col items-start relative bg-white">
        <div className="bg-[#24A1DE] w-full px-8 py-4 ">
          <div className="w-full flex justify-between items-center gap-4">
            {
              user?.photoUrl ?
                <div onClick={()=>{router.push('/profile/' + user.id)}} className="w-8 aspect-square rounded-full border-2 border-white">
                  <Image alt="pp" src={user?.photoUrl} width={25} height={25} className="w-full aspect-square rounded-full" />
                </div>
                :
                <div onClick={()=>{router.push('/profile/' + user.id)}} className="w-8 aspect-square rounded-full border-2 border-white">
                  <Image alt="pp" src={human} className="w-8 aspect-square rounded-full" />
                </div>
            }
           <SearchOne/>
            <div onClick={() => setOpenMenu(true)} className="w-8 aspect-square flex justify-center items-center">
              <Image alt="envlp" src={envelop}></Image>
            </div>
          </div>
        </div>
        <div className="w-full h-[90vh] overflow-scroll scroll-hidden">
          {
            notifications.length === 0 ?
              <div className="w-full flex justify-center items-center text-pinner h-full">
                You have no notifications!
              </div>
              :
              <div className="w-full flex flex-col gap-3">
                {
                  notifications.map((notification, index) => {
                    return (
                      <div key={index} className="w-full flex justify-start items-center gap-2 px-4 py-2">
                        <div className="w-10 aspect-square rounded-full border-2 border-white">
                          <img alt="pp" src={notification.sender_user.photoUrl} className="w-full aspect-square rounded-full" />
                        </div>
                        <div className="w-3/4 flex flex-col gap-1">
                          <span className="text-xs text-gray-700">{notification.sender_user.firstName} {notification.sender_user.lastName} {notification.notification_type === 'like' ? 'liked' : 'follow' ? 'followed' : 'commented on'} your post</span>
                          <span className="text-xs text-gray-500">
                            {
                              new Date(notification.notification_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                            }
                          </span>
                        </div>
                        
                      </div>
                    );
                  })
                }
              </div>
          }
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
    </LayoutWrapper>
  );
}
