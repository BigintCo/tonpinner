'use client';
import Image, { } from "next/image";
import human from "@/public/pinnerimages/human.png";
import photo from "@/public/pinnerimages/photo.svg";
import sticker from "@/public/pinnerimages/sticker-1.svg";
import sticker2 from "@/public/pinnerimages/sticker-2.png";
import sticker3 from "@/public/pinnerimages/sticker-3.png";
import sticker4 from "@/public/pinnerimages/sticker-4.png";
import sticker5 from "@/public/pinnerimages/sticker-5.png";
import leftArrow from "@/public/images/right-arrow.svg";
import points from "@/public/pinnerimages/points.png";
import add from "@/public/pinnerimages/􀉰.svg";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import LayoutWrapper from "@/layout";
import ApiService from "@/utils/api-service";
import { toast } from "react-toastify";

export default function Pin() {
    type IPlaces = {
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
        opening_hours: {
            open_now: boolean;
        };
        place_id: string;
        price_level: number
        rating: number;
        reference: string;
        scope: string;
        types: string[];
        user_ratings_total: number;
        vicinity: string;
    };
    type Coordinates = {
        lat: number;
        lng: number;
    };
    const router = useRouter();
    const path = usePathname();
    const myWallet = useTonWallet();
    const [loading, setLoading] = useState<boolean>(false);
    const [pinnedPlace, setPinnedPlace] = useState<string>('Choose a place');
    const [placesWindow, setPlacesWindow] = useState<boolean>(false);
    const [places, setPlaces] = useState<IPlaces[] | null>(null);
    const [nfts, setNfts] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentPosition, setCurrentPosition] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const capturePhoto = async () => {
        try {
            // Kamera akışını başlat
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });

            // Geçici bir video elementi oluşturalım
            const video = document.createElement("video");
            video.srcObject = stream;
            video.play();

            // Video hazır olduğunda fotoğrafı yakalayalım
            video.onloadedmetadata = () => {
                if (canvasRef.current) {
                    const context = canvasRef.current.getContext("2d");
                    if (context) {
                        canvasRef.current.width = video.videoWidth;
                        canvasRef.current.height = video.videoHeight;
                        context.drawImage(video, 0, 0);

                        // Kamera akışını durdur
                        stream.getTracks().forEach((track) => track.stop());
                    }
                }
            };
        } catch (error) {
            console.error("Kamera erişim hatası:", error);
        }
    };
    const downloadPhoto = () => {
        if (canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL("image/jpeg");
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "photo.jpg";
            link.click();
        }
    };
    async function fetchNFTs() {
        const response = await fetch('/api/nfts?wallet=' + myWallet?.account.address);
        if (!response.ok) {
            throw new Error('Failed to fetch NFT data');
        }
        return response.json();
    }
    async function getNearMePlaces() {
        setLoading(true);
        console.log('currentPosition');
        try {
            if (localStorage.getItem('token')) {
                if (!currentPosition) {
                    toast('Location not found', { type: 'error' })
                    return;
                }
                if (currentPosition) {
                    const { data } = await ApiService.query(`/maps/nearMePlaces`,
                        {
                            latitude: currentPosition.lat,
                            longitude: currentPosition.lng
                        });
                    if (data) {
                        setPlaces(data);
                    }
                    else {
                        toast('Location not found', { type: 'error' })
                    }
                }
            }
        } catch (e: any) {
            localStorage.removeItem('token');
            toast(e?.response?.data?.error, { type: 'error' })
        }
        setLoading(false);
    }
    function getNavigation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                    localStorage.setItem('latlong', JSON.stringify({ lat: latitude, lng: longitude }));
                    console.log('navigator.geolocation');
                },
                (error) => {
                    console.error("Konum alınırken hata oluştu:", error);
                },
                { enableHighAccuracy: true }
            );
        } else {
            console.error("Geolocation API desteklenmiyor.");
        }
    }
    const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
        const R = 6371000; // Dünya'nın yarıçapı (metre cinsinden)

        const lat1 = (coord1.lat * Math.PI) / 180;
        const lat2 = (coord2.lat * Math.PI) / 180;
        const deltaLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
        const deltaLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;

        const a =
            Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Mesafe (metre)
    };

    useEffect(() => {
        getNavigation()
    }, []);
    useEffect(() => {
        async function loadNFTs() {
            try {
                const data = await fetchNFTs(); // API'den gelen JSON
                setNfts(data.nft_items); // Gelen verinin 'nfts' kısmını state'e ata
            } catch (err: any) {
                setError(err.message); // Hata varsa state'e ata
            }
        }
        if (myWallet) {
            loadNFTs();
        }
    }, [myWallet]);
    useEffect(() => {
        if (!currentPosition) {
            console.log('currentPosition', currentPosition);
            getNavigation();
            const latlong = localStorage.getItem('latlong');
            if (latlong) {
                setCurrentPosition(JSON.parse(latlong));
            }
        }
        if (currentPosition) {
            getNearMePlaces();
        }
    }, [currentPosition]);

    return (
        <LayoutWrapper>
            <div key={path} className="w-full h-screen overflow-hidden flex flex-col items-start justify-between bg-white">
                <div className={`${placesWindow ? 'top-0' : 'top-[1000px] '} transition-all duration-300 w-full h-screen absolute z-50 bg-white flex flex-col justify-start items-start`}>
                    <div className="bg-[#24A1DE] w-full flex justify-between items-center px-8 py-4">
                        <div className="w-full flex justify-start items-center gap-4">
                            <div className="flex flex-col justify-start items-start gap-1 text-white">
                                <div className="text-xl">Near Places</div>
                            </div>
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                setPlacesWindow(false);
                            }}
                        >
                            <Image alt="left" src={leftArrow} className="rotate-180"></Image>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start items-start gap-4 p-2">
                        {
                            places?.map((place, index) => (
                                <div
                                    onClick={() => { localStorage.setItem("pinnedPlace", JSON.stringify(place)); setPinnedPlace(place.name); setPlacesWindow(false) }}
                                    key={index} className="w-full flex justify-start items-center gap-2">
                                    <Image alt="photo" src={place.icon} width={35} height={35} className=""></Image>
                                    <div className="w-full flex flex-col justify-start items-start ">
                                        <p className="text-2xs">{place.name}</p>
                                        <p className="text-2xs text-gray-500">{
                                            currentPosition
                                                ? ((calculateDistance(currentPosition, place.geometry.location) / 1000).toFixed(2)) + " km"
                                                : null
                                        }</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="w-full flex flex-col items-start">
                    <div className="bg-[#24A1DE] w-full flex justify-between items-center px-8 py-4">
                        <div className="w-full flex justify-start items-center gap-4">
                            <div className="w-16 aspect-square rounded-full border-2 border-white">
                                <Image alt="pp" src={human} className="w-full aspect-square rounded-full" />
                            </div>
                            <div className="flex flex-col justify-start items-start gap-1 text-white">
                                <div className="text-xs,">{pinnedPlace}</div>
                                <button onClick={() => { setPlacesWindow(true) }} className="text-sm">Change Location</button>
                            </div>
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                router.push("/");
                                localStorage.removeItem("pinnedPlace");
                                setPinnedPlace('Choose a place');
                            }}
                        >
                            <Image alt="left" src={leftArrow} className="rotate-180"></Image>
                        </div>
                    </div>
                    <div className="w-full flex justify-start items-center gap-2 px-8 py-4">
                        <button onClick={capturePhoto}>
                            <Image alt="photo" src={photo} className="w-10 aspect-square"></Image>
                        </button>
                        <button onClick={downloadPhoto}>Download Photo</button>
                        <div className="w-[1px] h-full bg-blue-500"></div>
                        {
                            nfts?.length === 0 &&
                            <div className="w-full flex justify-start items-center gap-1">
                                <Image onClick={() => { router.push('/stickers') }} alt="photo" src={sticker} className="w-10 aspect-square"></Image>
                                <Image onClick={() => { router.push('/stickers') }} alt="photo" src={sticker2} className="w-10 aspect-square"></Image>
                                <Image onClick={() => { router.push('/stickers') }} alt="photo" src={sticker3} className="w-10 aspect-square"></Image>
                                <Image onClick={() => { router.push('/stickers') }} alt="photo" src={sticker4} className="w-10 aspect-square"></Image>
                                <Image onClick={() => { router.push('/stickers') }} alt="photo" src={sticker5} className="w-10 aspect-square"></Image>
                            </div>

                        }
                        {
                            nfts && nfts?.length > 0 &&
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
        </LayoutWrapper>
    )
}
