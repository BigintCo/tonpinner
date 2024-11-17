'use client';
import Image, { } from "next/image";
import human from "@/public/pinnerimages/human.png";
import photo from "@/public/pinnerimages/photo.svg";
import sticker from "@/public/pinnerimages/sticker-1.svg";
import sticker2 from "@/public/pinnerimages/sticker-2.png";
import sticker3 from "@/public/pinnerimages/sticker-3.png";
import sticker4 from "@/public/pinnerimages/sticker-4.png";
import sticker5 from "@/public/pinnerimages/sticker-5.png";
import points from "@/public/pinnerimages/points.png";
import add from "@/public/pinnerimages/􀉰.svg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";

export default function Pin() {
    const router = useRouter();
    const myWallet = useTonWallet();
    async function fetchNFTs() {
        const response = await fetch('/api/nfts?wallet=' + myWallet?.account.address);
        if (!response.ok) {
            throw new Error('Failed to fetch NFT data');
        }
        return response.json();
    }
   
    const [nfts, setNfts] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => { }, [error]);
    useEffect(() => {
        async function loadNFTs() {
            try {
                const data = await fetchNFTs(); // API'den gelen JSON
                setNfts(data.nft_items); // Gelen verinin 'nfts' kısmını state'e ata
            } catch (err: any) {
                setError(err.message); // Hata varsa state'e ata
            }
        }
        loadNFTs();
    }, []);
    return (
        <div className="w-full h-screen overflow-hidden flex flex-col items-start justify-between bg-white">
            <div className="w-full flex flex-col items-start">
                <div className="bg-[#24A1DE] w-full px-8 py-4">
                    <div className="w-full flex justify-start items-center gap-4">
                        <div className="w-16 aspect-square rounded-full border-2 border-white">
                            <Image alt="pp" src={human} className="w-full aspect-square rounded-full" />
                        </div>
                        <div className="flex flex-col justify-start items-start gap-1 text-white">
                            <div className="text-xl">Starbucks</div>
                            <div className="text-sm">Change Location </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-start items-center gap-2 px-8 py-4">
                    <Image alt="photo" src={photo} className="w-10 aspect-square"></Image>
                    <div className="w-[1px] h-full bg-blue-500"></div>
                    {/* <Image onClick={() => { router.push('/stickers') }} alt="photo" src={sticker} className="w-10 aspect-square"></Image>
                    <Image onClick={() => { router.push('/stickers') }} alt="photo" src={sticker2} className="w-10 aspect-square"></Image>
                    <Image onClick={() => { router.push('/stickers') }} alt="photo" src={sticker3} className="w-10 aspect-square"></Image>
                    <Image onClick={() => { router.push('/stickers') }} alt="photo" src={sticker4} className="w-10 aspect-square"></Image>
                    <Image onClick={() => { router.push('/stickers') }} alt="photo" src={sticker5} className="w-10 aspect-square"></Image>
                    */}
                    {
                        nfts?.slice(0, 5).map((nft, index) => (

                            <img onClick={() => { router.push('/stickers') }} key={index} src={nft.metadata.image} alt='sticker' className='w-10 aspect-square rounded-lg'></img>
                        ))
                    }
                    <Image onClick={() => { router.push('/stickers') }} alt="photo" src={points} className="w-6"></Image>
                </div>
                <label htmlFor="" className="w-full px-8 py-2 h-[150px] flex flex-col justify-start items-end gap-2">
                    <textarea className="rounded-lg border p-1 border-blue-600/30 w-full h-full focus-within:outline-none flex justify-start items-start" />
                    <Image alt="add" src={add}></Image>
                </label>
                <div className="w-full flex justify-between items-center gap-2 px-8 py-2 ">
                    <button
                        onClick={() => {
                            router.push("/");
                        }}
                        className="w-full flex justify-center items-center py-2 px-4 rounded-lg border border-blue-600/30 text-sm text-pinner">Cancel</button>
                    <button
                        onClick={() => {
                            router.push("/");
                            localStorage.setItem("firstPin", "true");
                        }}
                        className="w-full flex justify-center items-center py-2 px-4 rounded-lg border bg-pinner text-sm text-white">Pin Me</button>
                </div>
            </div>

        </div>
    )
}
