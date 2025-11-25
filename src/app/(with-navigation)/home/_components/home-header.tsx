import Image from "next/image";
import Link from "next/link";

import Alarm from "@/assets/alarm.svg";
import Search from "@/assets/search.svg";
import { Header, HeaderLeft, HeaderRight } from "@/components";

const tinolife = "/static/tinolife.png";

export default function HomeHeader() {
  return (
    <Header>
      <HeaderLeft className="flex-1">
        <Link href="/home">
          <Image src={tinolife} alt="tinolife" width={124} height={26} />
        </Link>
      </HeaderLeft>
      <HeaderRight className="flex flex-1 justify-end gap-2.5">
        <button>
          <Alarm />
        </button>
        <button>
          <Search />
        </button>
      </HeaderRight>
    </Header>
  );
}
