import FilterButtons from "../_components/filter-buttons";
import TinoinHeader from "../_components/tinoin-header";
import TinoinList from "../_components/tinoin-list";
import type { TinoinSearchParams } from "../page";

export default function TinoinPage(props: TinoinSearchParams) {
  return (
    <main className="pb-navigation h-full">
      <TinoinHeader />
      <FilterButtons {...props} />
      <TinoinList filter={props.filter} />
    </main>
  );
}
