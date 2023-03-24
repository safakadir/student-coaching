// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge'
}

export default function handler(req: NextRequest) {
  return NextResponse.json({ name: 'John Doe', runtime: 'Edge', url: req.url })
}
