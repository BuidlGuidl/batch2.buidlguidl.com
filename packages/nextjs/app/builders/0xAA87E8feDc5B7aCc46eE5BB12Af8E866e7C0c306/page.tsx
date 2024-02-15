import Image from "next/image";
import Link from "next/link";
import seyedProfile from "./images/seyed.jpg";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";

const Builder: NextPage = () => {
  const address = "0xAA87E8feDc5B7aCc46eE5BB12Af8E866e7C0c306";
  return (
    <>
      <div className="flex-grow  bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-center gapx-5">
          <div className="flex flex-col px-10 py-10 text-center items-center max-w-xs rounded-xl ">
            <Image src={seyedProfile} alt="a boy wearing sunglasses" className="rounded-full" />
          </div>
          <div className="text-left mb-8">
            <span className="block text-4xl font-bold">Seyed</span>
            <span className="block text-2xl">Blockchain developer</span>
            <div className="">
              <Address address={address} />
            </div>
            <ul className="menu menu-horizontal w-full">
              <div className="text-left">
                <Link href="https://telegram.me/smrm_dev" className="link" target="_blank">
                  {" "}
                  telegram{" "}
                </Link>
              </div>
              <span>·</span>
              <div className="text-left">
                <Link href="https://github.com/smrm-dev" className="link" target="_blank">
                  {" "}
                  github{" "}
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Builder;
