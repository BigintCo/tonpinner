'use client';
import Image from 'next/image'
import React, { useEffect } from 'react'
import leftArrow from '@/public/images/right-arrow.svg'
import { NextApiRequest, NextApiResponse } from 'next';

export default function Stickers() {
    async function fetchNFTs() {
        const response = await fetch('/api/nfts');
        if (!response.ok) {
            throw new Error('Failed to fetch NFT data');
        }
        console.log(response);
        return response.json();
    }
 
    useEffect(() => { fetchNFTs() }, [])
    return (
        <div className='w-full h-screen'>
            <div className='bg-pinner px-8 py-4 flex justify-start items-center gap-2 text-white'>
                <Image src={leftArrow} className='rotate-180' alt='left'></Image>
                Osman's Stickers Book
            </div>

        </div>
    )
}
