import Image from "next/image";
import Link from "next/link";
import Button from "./components/buttons/Button";

export default function NotFound() {
  return (
    <div className="pb-[120px] pt-[80px]">
      <div className="auc-container">
        <div className="grid grid-cols-12">
          <Image
            src={"/assets/img/404.png"}
            className="col-span-10 col-start-2"
            width={1012}
            height={621}
            alt={""}
          />
        </div>
        {/* <Link href="/">Return Home</Link> */}
        <Button text={"Back To Home"} styles={"auc-btn-primary w-[309px] mx-auto mt-[60px]"} isLink={true} href="/" />
      </div>
    </div>
  );
}
