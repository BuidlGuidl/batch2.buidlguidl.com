import type { NextApiRequest, NextApiResponse } from "next";

const UKLOK_API_URL = "https://uklok.hasura.app/api/rest";
type APIProject = {
  title: string;
  image: string;
  description: string;
  link: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<APIProject>) {
  if (req.method !== "GET") throw new Error("Invalid method");

  const config = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const projectsRes = await fetch(`${UKLOK_API_URL}/v0/third_party/projects`, config);
  const { projects } = await projectsRes.json();

  res.status(200).json(projects);
}
