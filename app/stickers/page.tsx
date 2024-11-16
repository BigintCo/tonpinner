'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import leftArrow from '@/public/images/right-arrow.svg'
import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/navigation';

export default function Stickers() {
    const router = useRouter();
    async function fetchNFTs() {
        const response = await fetch('/api/nfts');
        if (!response.ok) {
            throw new Error('Failed to fetch NFT data');
        }
        return response.json();
    }
    const [nfts, setNfts] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);

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
        <div className='w-full h-screen'>
            <div className='bg-pinner px-8 py-4 flex justify-start items-center gap-2 text-white'>
                <Image onClick={()=> router.push('/pin')} src={leftArrow} className='rotate-180' alt='left'></Image>
                Osman's Stickers Book
            </div>
            <div className='w-full grid grid-cols-12 justify-start items-center gap-2 py-2 px-8'>
                {
                    nfts?.map((nft, index) => (
                        <div key={index} className='col-span-3 aspect-square'>
                            <img src={nft.metadata.image} alt='sticker'  className='w-full aspect-square'></img>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
