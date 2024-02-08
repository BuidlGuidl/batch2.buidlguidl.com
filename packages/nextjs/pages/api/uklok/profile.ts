import type { NextApiRequest, NextApiResponse } from "next";

// const UKLOK_API_URL = "https://uklok.hasura.app/api/rest";
type APIProfile = {
  bio: string;
  avatar: string;
  slogan: string;
  address: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIProfile>) {
  if (req.method !== "GET") throw new Error("Invalid method");

  // TODO: Load from ENS. [socials, slogan, avatar]. https://docs.ens.domains/contract-api-reference/publicresolver#get-text-data
  const profile: APIProfile = {
    bio: "I'm a software engineer with a deep passion for complex problems resolution.",
    avatar: "https://euc.li/uklok.eth",
    slogan: "Tools for the society of Tomorrow. Built Today.",
    address: "0xdb253953AeD478908635De50CC49C35619bcE04E",
  };

  res.status(200).json(profile);
}
