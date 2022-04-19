import { Redis } from "@upstash/redis";
import { refreshTokenQuery } from "./authHelpers";

export const getAccessTokenInRedis = async (redis: Redis) => {
  let accessToken: string | null = await redis.get("accessToken");
  if (!accessToken) {
    let refreshToken: string | null = await redis.get("refreshToken");
    const refreshTokenResult = await refreshTokenQuery(refreshToken || "");
    if (refreshTokenResult.access_token) {
      accessToken = refreshTokenResult.access_token;
      await redis.set("accessToken", refreshTokenResult.access_token, {});
      redis.expire("accessToken", refreshTokenResult.expires_in - 100);
    }
  }
  return accessToken;
};

export const createRedisClient = (): Redis => {
  const redis = new Redis({
    url: "https://usw2-awake-anemone-30070.upstash.io",
    token: process.env.UPSTASH_SECRET || "",
  });
  return redis;
};

export const incrementSearchCount = async (redis: Redis) => {
  let searchCount = await redis.get("searchCount");
  await redis.set("searchCount", Number(searchCount) + 1, {});
};
