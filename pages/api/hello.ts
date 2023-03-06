// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge'
}

type Data = {
  name: string,
  runtime: string
}

export default function handler(req: NextRequest) {
  NextResponse.json({ name: 'John Doe', runtime: 'Edge' })
}
