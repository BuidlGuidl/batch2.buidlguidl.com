import type { NextApiRequest, NextApiResponse } from "next";

const UKLOK_API_URL = "https://uklok.hasura.app/api/rest";
type APILink = { url: string; platform: { name: string; description: string } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") throw new Error("Invalid method");

  const config = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const linksRes = await fetch(`${UKLOK_API_URL}/v0/third_party/links`, config);
  const { links: array } = await linksRes.json();

  const links = (array as Array<APILink>).map(({ url, platform: { name, description } }) => ({
    name,
    description,
    url,
    network: name.split(".").pop(),
  }));

  res.status(200).json(links);
}
