"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address } = useAccount();

  const { data: checkInCount } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "checkedInCounter",
  });

  const { data: allowed } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "allowList",
    args: [address],
  });

  const { data: contract } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "yourContractAddress",
    args: [address],
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Batch2</span>
          </h1>
          <Image
            height={250}
            width={250}
            alt="BG-Batch2 logo"
            className="cursor-pointer mx-auto dark:invert"
            src="/logo.svg"
          />
          <p className="text-center text-lg">
            Where we elevate expertise by fostering a culture of continuous learning and innovation.
          </p>
          <p className="text-lg flex gap-2 mt-8 justify-center">
            <span className="font-bold">
              Checked in builders count:{" "}
              {checkInCount?.toString() ?? <span className="loading loading-spinner loading-sm"></span>}
            </span>
          </p>
          <p className="text-lg flex gap-2 justify-center">
            {allowed === undefined || contract === undefined ? (
              <></>
            ) : !allowed ? (
              <span>You are not registered in this batch.</span>
            ) : parseInt(contract, 16) === 0 ? (
              <span>You have not checked in yet. Check in and get your reward!</span>
            ) : (
              <span>
                Your contract address:{" "}
                <Link
                  href={`https://optimistic.etherscan.io/address/${contract}`}
                  passHref
                  className="link text-accent"
                >
                  {contract}
                </Link>
              </span>
            )}
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <Link
              href="/builders"
              passHref
              className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl hover:bg-secondary hover:shadow-md"
            >
              <UserIcon className="h-8 w-8 fill-secondary" />
              <p>Check out this batch&apos;s builders!</p>
            </Link>
            <Link
              href="/debug"
              passHref
              className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl hover:bg-secondary hover:shadow-md"
            >
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>Tinker with your smart contract!</p>
            </Link>
            <Link
              href="/blockexplorer"
              passHref
              className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl hover:bg-secondary hover:shadow-md"
            >
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>Explore your local transactions!</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
