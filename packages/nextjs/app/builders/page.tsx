"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Builder = ({ builder }: { builder?: string }) => {
  return (
    <Link href={`/builders/${builder}`}>
      <div className="flex items-center justify-center w-80 h-20 rounded-xl bg-base-100 hover:bg-primary">
        <Address address={builder} disableAddressLink disableCopyIcon size="2xl" />
      </div>
    </Link>
  );
};

const Builders: NextPage = () => {
  // get CheckedIn events
  const { data: checkedInEvents, isLoading } = useScaffoldEventHistory({
    contractName: "BatchRegistry",
    eventName: "CheckedIn",
    fromBlock: 115767272n,
  });
  // create builders list from events
  const buildersSet = new Set(checkedInEvents?.map(event => event.args.builder));
  const builders = Array.from(buildersSet);
  // create builders components from builders list
  const buildersComponents = builders?.map((builder, index) => {
    return <Builder key={index} builder={builder} />;
  });
  // return builders components
  return (
    <>
      <div className="flex flex-col items-center pt-10">
        <div className="text-center py-10">
          <h1>Buidlers List</h1>
        </div>
        <div className="flex flex-col space-y-4 md:grid md:gap-4 md:grid-cols-2 md:space-y-0 lg:grid-cols-3">
          {isLoading ? new Array(9).fill(<Builder />) : buildersComponents}
        </div>
      </div>
    </>
  );
};

export default Builders;
