// /app/api/nfts/route.ts
import { NextResponse } from 'next/server'

export async function GET (request: Request) {
  //   const walletAddress = '0QA1DRT3O4ILDDHKsVGaDE3IT7w9TXapo44Ix-6IKH2Yojg6'
  const { searchParams } = new URL(request.url)
  const walletAddress = searchParams.get('wallet');
  console.log(walletAddress, 'wallAAAAAAAAAAAAAAetAddress');
  try {
    const response = await fetch(
      'https://tonapi.io/v2/accounts/' +
        walletAddress +
        '/nfts?limit=1000&offset=0&indirect_ownership=false'
    )

    if (!response.ok) {
      throw new Error('Failed to fetch NFT data')
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch NFT data' },
      { status: 500 }
    )
  }
}
