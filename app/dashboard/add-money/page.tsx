import React, { Suspense } from "react";
import DepositCard from "../../components/cards/DepositCard";
import TitleBoxTwo from "../../components/TitleBoxTwo";
import { AddMoneySkeleton } from "../../components/skeleton/skeleton";

const page = () => {
  const title = "Add Money";
  return (
    <Suspense fallback={<AddMoneySkeleton />}>
      <div>
        <TitleBoxTwo
          cls="auc-primary-heading-with-extra-mb"
          delay="0.1s"
          title="Deposit Methods"
        />
        <DepositCard component_type="add" title={title} />
      </div>
    </Suspense>
  );
};

export default page;
