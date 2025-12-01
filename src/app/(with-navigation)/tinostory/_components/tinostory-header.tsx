import Search from "@/assets/search.svg";
import { Header, HeaderLeft, HeaderRight } from "@/components";

export default function TinostoryHeader() {
  return (
    <Header sticky>
      <HeaderLeft className="flex-1">
        <p className="text-xl font-medium">티노스토리</p>
      </HeaderLeft>
      <HeaderRight className="flex-1 justify-end">
        <button>
          <Search />
        </button>
      </HeaderRight>
    </Header>
  );
}
