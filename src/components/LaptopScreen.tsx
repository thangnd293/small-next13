import { Spinner } from "@chakra-ui/react";
import classNames from "classnames";
import React, { SVGProps, useRef, useState } from "react";

interface Props {
  url: string;
}
export default function LaptopScreen({ url }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoadDone, setIsLoadDone] = useState(false);
  const handleLoad = () => {
    setIsLoadDone(true);
  };

  return (
    <div className="relative">
      <LaptopScreenSvg />
      <iframe
        className={classNames(
          "absolute overflow-hidden -top-[135px] -left-[210px] scale-[0.5]",
          { hidden: !isLoadDone, block: isLoadDone }
        )}
        ref={iframeRef}
        title="Preview"
        src={url}
        width={1440}
        height={900}
        seamless
        onLoad={handleLoad}
      />
      <div
        className={classNames("absolute inset-0", {
          hidden: isLoadDone,
          "flex items-center justify-center": !isLoadDone,
        })}
      >
        <Spinner />
      </div>
    </div>
  );
}

const LaptopScreenSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={1008} height={635} fill="none">
    <g filter="url(#a)">
      <ellipse cx={504.5} cy={586} fill="#000" rx={452.5} ry={5} />
    </g>
    <path
      fill="#1A202C"
      stroke="#4A5568"
      strokeWidth={2}
      d="M99 28c0-14.912 12.088-27 27-27h760c14.912 0 27 12.088 27 27v522a3 3 0 0 1-3 3H102a3 3 0 0 1-3-3V28Z"
    />
    <path
      fill="#000"
      d="M103 27c0-12.15 9.85-22 22-22h762c12.15 0 22 9.85 22 22v506H103V27Z"
    />
    <path
      fill="#A3ACB1"
      d="M0 552a2 2 0 0 1 2-2h1004c1.1 0 2 .895 2 2v16H0v-16Z"
    />
    <path
      fill="url(#b)"
      d="M0 552a2 2 0 0 1 2-2h1004c1.1 0 2 .895 2 2v16H0v-16Z"
    />
    <path
      fill="#647279"
      d="M0 568h1008l-20.354 4.105a400.021 400.021 0 0 1-79.08 7.895H97.909a400.007 400.007 0 0 1-86.772-9.525L0 568Z"
    />
    <path
      fill="url(#c)"
      d="M0 568h1008l-20.354 4.105a400.021 400.021 0 0 1-79.08 7.895H97.909a400.007 400.007 0 0 1-86.772-9.525L0 568Z"
    />
    <path
      fill="#96A1A8"
      fillRule="evenodd"
      d="M421.033 550c.514 7.818 7.019 14 14.967 14h137c7.948 0 14.453-6.182 14.967-14H421.033Z"
      clipRule="evenodd"
    />
    <path
      fill="url(#d)"
      fillRule="evenodd"
      d="M421.033 550c.514 7.818 7.019 14 14.967 14h137c7.948 0 14.453-6.182 14.967-14H421.033Z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="b"
        x1={0}
        x2={1008}
        y1={559}
        y2={559}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0D1012" />
        <stop offset={0.03} stopColor="#CAD4DB" />
        <stop offset={0.063} stopColor="#242729" />
        <stop offset={0.134} stopColor="#A3ACB1" />
        <stop offset={0.866} stopColor="#A3ACB1" />
        <stop offset={0.942} stopColor="#242729" />
        <stop offset={0.971} stopColor="#CAD4DB" />
        <stop offset={0.996} stopColor="#0D1012" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={504}
        x2={504}
        y1={568}
        y2={580}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7A7F83" />
        <stop offset={1} stopColor="#0B0B0E" />
      </linearGradient>
      <linearGradient
        id="d"
        x1={437.5}
        x2={574.5}
        y1={558.5}
        y2={558.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3C3C3C" />
        <stop offset={0.318} stopColor="#3C3C3C" stopOpacity={0} />
        <stop offset={0.661} stopColor="#3C3C3C" stopOpacity={0} />
        <stop offset={1} stopColor="#444" />
      </linearGradient>
      <filter
        id="a"
        width={993}
        height={98}
        x={8}
        y={537}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_4_49"
          stdDeviation={22}
        />
      </filter>
    </defs>
  </svg>
);
