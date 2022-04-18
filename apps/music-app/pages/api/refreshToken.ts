import { NextApiRequest, NextApiResponse } from "next";
import { refreshTokenQuery } from "../../utils/helpers/authHelpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { refreshToken } = JSON.parse(req.body);
  if (refreshToken) {
    const tokenResponse = await refreshTokenQuery(refreshToken);
    if (tokenResponse) res.status(200).json(tokenResponse);
  } else {
    res.status(400).json({ error: true });
  }
}
