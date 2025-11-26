import FilterButtons from "../_components/filter-buttons";
import TinoinHeader from "../_components/tinoin-header";
import type { TinoinSearchParams } from "../page";

export default function TinoinPage(props: TinoinSearchParams) {
  return (
    <main className="pb-navigation h-full">
      <TinoinHeader />
      <FilterButtons {...props} />
    </main>
  );
}
