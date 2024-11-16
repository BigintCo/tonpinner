"use client";
import React from "react";
import kingLogo from "@/public/pinnerimages/kinglogo.svg";
import tick from "@/public/pinnerimages/tick.svg";
import tonicon from "@/public/pinnerimages/toncoin-ton-logo.svg";
import leftArrow from "@/public/images/right-arrow.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Premium() {
  const router = useRouter();
  return (
    <div className="w-full h-screen relative">
      <div
        className="absolute top-4 left-4 text-white"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image alt="left" src={leftArrow} className="rotate-180"></Image>
      </div>
      <div className="bg-pinner w-full">
        <div className="w-full flex flex-col justify-start items-center gap-4 px-8 py-4">
          <Image
            alt="ss"
            src={kingLogo}
            className="w-[250px] aspect-square"
          ></Image>
          <div className="text-2xl font-semibold text-white text-center w-full flex justify-center items-start">
            Upgrade to Premium
          </div>
          <div className="w-full flex justify-start items-center gap-2">
            <Image alt="tick" src={tick} className="w-6 aspect-square"></Image>
            <span className="text-white text-sm">
              30 Free Booster per month
            </span>
          </div>
          <div className="w-full flex justify-start items-center gap-2">
            <Image alt="tick" src={tick} className="w-6 aspect-square"></Image>
            <span className="text-white text-sm">Unlimited Area Discovery</span>
          </div>
          <div className="w-full flex justify-start items-center gap-2">
            <Image alt="tick" src={tick} className="w-6 aspect-square"></Image>
            <span className="text-white text-sm">Ads Free!</span>
          </div>
        </div>
      </div>
      <div className="w-full px-8 py-4 flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <div className=" rounded-lg py-2 px-4 w-full flex justify-between items-center bg-blue-300/30">
            <span className="w-full">Monthly</span>
            <div className="w-full flex justify-end items-center gap-2">
              <span className="w-full font-semibold text-lg flex justify-end items-center gap-2">
                <Image alt="fff" className="w-6" src={tonicon}></Image>
                1.99
              </span>
              /Month
            </div>
          </div>
          <div className="rounded-lg py-2 px-4 w-full flex justify-between items-center border border-blue-600/30">
            <span className="w-full">Yearly</span>
            <div className="w-full flex justify-end items-center gap-2">
              <span className="w-full font-semibold text-lg flex justify-end items-center gap-2">
                <Image alt="fff" className="w-6" src={tonicon}></Image>
                1.99
              </span>
              /Month
            </div>
          </div>
        </div>
        <button className="rounded-lg py-2 px-4 w-full flex justify-center items-center bg-pinner text-white">
          Ton Connect
        </button>
      </div>
    </div>
  );
}