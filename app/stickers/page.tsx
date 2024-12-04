// @typescript-eslint/no-explicit-any
'use client';
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import leftArrow from '@/public/images/right-arrow.svg'
import { useRouter } from 'next/navigation';
import { useTonWallet } from '@tonconnect/ui-react';
import LayoutWrapper from '@/layout';
import { toast } from 'react-toastify';

export default function Stickers() {
    const myWallet = useTonWallet();
    const router = useRouter();
    async function fetchNFTs() {
        const response = await fetch('/api/nfts?wallet=' + myWallet?.account.address);
        if (!response.ok) {
            throw new Error('Failed to fetch NFT data');
        }
        return response.json();
    }
    const [nfts, setNfts] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
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
        const badge = localStorage.getItem('user_badge');
        const index = localStorage.getItem('user_badge_index');
        if (badge && index) {
            setSelectedBadge(Number(index));
        }
    }, []);

    return (
        <LayoutWrapper>
            <div className='w-full h-screen bg-white'>
                <div className='bg-pinner px-8 py-4 flex justify-start items-center gap-2 text-white'>
                    <Image onClick={() => router.push('/pin')} src={leftArrow} className='rotate-180' alt='left'></Image>
                    Osman's Stickers Book
                </div>
                <div className='w-full grid grid-cols-12 justify-start items-center gap-2 py-2 px-8'>
                    {
                        nfts?.map((nft, index) => (
                            <div onClick={() => {
                                if (localStorage.getItem('user_badge') === JSON.stringify(nft.metadata)) {
                                    localStorage.removeItem('user_badge');
                                    localStorage.removeItem('user_badge_index');
                                    toast.error('Removed from your badge!');
                                    setSelectedBadge(null);
                                    return;
                                }
                                localStorage.setItem('user_badge', JSON.stringify(nft.metadata));
                                localStorage.setItem('user_badge_index', index.toString());
                                setSelectedBadge(index);
                                toast.success('Sticker added to your badge!');
                            }} key={index} className={`${selectedBadge === index ? 'border border-blue-400 rounded-lg' : ''} col-span-3 aspect-square p-2`}>
                                <img src={nft.metadata.image} alt='sticker' className='w-full aspect-square'></img>
                            </div>
                        ))
                    }
                </div>
            </div>
        </LayoutWrapper>

    )
}
