"use client";

import React from "react";
import Image from "next/image";
import { AvatarComponentProps } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/AvatarContext";
import { blo } from "blo";

interface CustomAvatarProps extends AvatarComponentProps {
  isCrew?: boolean;
  isCheckedIn?: boolean;
}
type CustomAvatarComponent = React.FunctionComponent<CustomAvatarProps>;

// Custom Avatar for RainbowKit
export const BlockieAvatar: CustomAvatarComponent = ({ address, ensImage, size, isCrew, isCheckedIn }) => (
  <div className={`avatar ${isCrew ? (isCheckedIn ? "online" : "offline") : ""}`}>
    <div className={`w-8 ${isCrew ? "mask mask-hexagon-2" : "rounded-full"}`}>
      <Image src={ensImage || blo(address as `0x${string}`)} width={size} height={size} alt={`${address} avatar`} />
    </div>
  </div>
);
