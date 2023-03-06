// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  runtime: 'edge'
}

type Data = {
  name: string,
  runtime: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.json({ name: 'John Doe', runtime: 'Edge' })
}
