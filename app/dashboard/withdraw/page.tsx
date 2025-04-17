import React,{Suspense} from "react";
import TitleBoxTwo from "../../components/TitleBoxTwo";

import WithdrawCard from "../../components/cards/WithdrawCard";
import { AddMoneySkeleton } from "../../components/skeleton/skeleton";

// import WithdrawCard from "../../components/cards/WithdrawCard";

const page = () => {
  const title = "Withdraw Money";
  return (
    <Suspense fallback={<AddMoneySkeleton/>}>
    <div>
      <TitleBoxTwo
        cls="auc-primary-heading-with-extra-mb"
        delay="0.1s"
        title="Withdraw Money"
      />

      <WithdrawCard component_type="withdraw" title={title} />
    </div>
    </Suspense>
  );
};

export default page;
