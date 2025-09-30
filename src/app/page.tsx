import MainSection from "@/components/pages/mainSectio";
import ShowCaseSection from "@/components/pages/showcase";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <ShowCaseSection />
      <MainSection />
    </Fragment>
  );
}
