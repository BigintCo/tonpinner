// /app/api/nfts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            'https://testnet.tonapi.io/v2/accounts/0QA1DRT3O4ILDDHKsVGaDE3IT7w9TXapo44Ix-6IKH2Yojg6/nfts?limit=1000&offset=0&indirect_ownership=false'
        );

        if (!response.ok) {
            throw new Error('Failed to fetch NFT data');
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch NFT data' }, { status: 500 });
    }
}
