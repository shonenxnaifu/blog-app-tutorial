import React from "react";
import githubIcon from "../../public/github-icon.svg";
import twitterIcon from "../../public/twitter-icon.svg";
import Link from "next/link";
import Image from "next/image";

type Props = {};

function Footer({}: Props) {
  return (
    <div className="bg-gray-800 text-white py-12 px-4">
      <div className="flex container justify-between ">
        <div className="flex flex-row items-center">
          <div>
            <div className="text-2xl mb-3">Neo Blog</div>
            <div className="text-sm">© 2023 Neo Blog</div>
          </div>
        </div>
        <div className="flex">
          <a target="_blank" href="https://www.github.com" className="mr-3">
            <Image src={githubIcon} alt="github" width={32} height={32} />
          </a>
          <a target="_blank" href="https://www.twitter.com">
            <Image src={twitterIcon} alt="twitter" width={32} height={32} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer;