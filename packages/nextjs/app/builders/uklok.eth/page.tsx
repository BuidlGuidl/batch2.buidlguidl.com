"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { Address } from "~~/components/scaffold-eth";

type PlatformLink = {
  name: string;
  description: string;
  url: string;
  network: string;
};

type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
};

type UserProfileProps = {
  bio: string;
  avatar: string;
  slogan: string;
  address: string;
  links: PlatformLink[];
  portfolio: Project[];
  loadedAt?: number;
};

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileProps>({} as UserProfileProps);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const _profile: UserProfileProps = JSON.parse(localStorage.getItem("uklok-profile") || "{}");
    const _setProfile = (profile: UserProfileProps) => {
      setProfile(profile);
      setLoading(false);

      localStorage.setItem("uklok-profile", JSON.stringify(profile));
    };

    if (_profile?.loadedAt && Date.now() - _profile.loadedAt < 1000 * 60 * 60 * 24) return _setProfile(_profile);
    getProps().then(_setProfile);
  }, []);

  const { bio, avatar, slogan, address, links, portfolio } = profile;
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="max-w-fit">
            {isLoading ? (
              <span className="loading loading-ring loading-lg"></span>
            ) : (
              <>
                <h1 className="text-center">
                  <div className="avatar">
                    <div className="w-32 mask mask-hexagon">
                      <Image src={avatar} width={128} height={128} alt="Avatar" />
                    </div>
                  </div>
                </h1>

                <div className="mockup-code my-8">
                  <pre data-prefix="$">
                    <code>npm i @uklok/team</code>
                  </pre>
                  <pre data-prefix=">" className="text-warning">
                    <code>installing...</code>
                  </pre>
                  <pre data-prefix=">" className="text-info">
                    <code>{slogan}</code>
                  </pre>
                  <pre data-prefix=">" className="text-success">
                    <code>Done!</code>
                  </pre>
                </div>

                <div className="flex flex-col items-center">
                  <Address address={address} size="3xl"></Address>
                </div>

                <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
                  {links.map(({ description, url, network }, index) => (
                    <div
                      key={index}
                      className="px-4 py-4 max-w-xs rounded-3xl tooltip tooltip-primary tooltip-bottom"
                      data-tip={description}
                    >
                      <SocialIcon network={network} href={url}></SocialIcon>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {!isLoading && (
        <div className="flex items-center flex-col flex-grow pt-10">
          <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
            <h1 className="text-center font-extrabold text-xl">Portfolio</h1>
            <p className="text-center my-8 text-lg font-serif">{bio}</p>

            {portfolio.map(({ title, image, description, link }, index) => (
              <div key={index} className="card w-96 glass">
                <figure>
                  <Image src={image} alt={`${title} | image`} width={300} height={300} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{title}</h2>
                  <p>{description}</p>
                  <div className="card-actions justify-end">
                    <Link href={link}>
                      <button className="btn btn-primary">More Details?</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

async function getProps(): Promise<UserProfileProps> {
  const [profile, links, portfolio] = await Promise.all([
    fetch(`/api/uklok/profile`),
    fetch(`/api/uklok/links`),
    fetch(`/api/uklok/projects`),
  ]);

  return {
    ...(await profile.json()),
    links: ((await links.json()) as PlatformLink[]) || [],
    portfolio: ((await portfolio.json()) as Project[]) || [],
    loadedAt: Date.now(),
  };
}

export default UserProfile;
