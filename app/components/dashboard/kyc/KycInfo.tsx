import Image from "next/image";
import React from "react";
import { cookies } from "next/headers";
async function getKycInfo() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies().get("user_token")?.value}`,
    },
    next: { revalidate: 3600 },
  };

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/user/user-kyc`,
    requestOptions
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = res.json();
  return data;
}

const KycInfo = async () => {
  const user_data = await getKycInfo();

  return (
    <div className="min-768:w-[68%] mx-auto min-1024:mx-0">
      <h2 className="auc-primary-heading">Your KYC Information</h2>
      <form className="flex flex-col items-start gap-[32px] kycForm">
        <div className="w-full">
          <label htmlFor="first-name">Name</label>
          <input
            className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[12px]"
            type="name"
            autoComplete="off"
            name="first-name"
            id="first-name"
            placeholder="First Name"
            defaultValue={user_data.data.username}
            readOnly={true}
          />
        </div>

        <div className="w-full">
          <label htmlFor="name">
            Document Number (NID, Passport or Driving License)
          </label>
          <input
            className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[12px]"
            type="text"
            autoComplete="off"
            name="document-number"
            id="document-number"
            placeholder="Document Number"
            defaultValue={user_data?.data?.user_info?.nid}
            readOnly={true}
          />
        </div>
        <div className="flex justify-between gap-[28px] flex-wrap">
          <div>
            <label htmlFor="document-font-side">Document Front Side</label>
            <Image
              className="mt-[16px] w-[291px] h-[180px] object-contain"
              src={`${
                user_data?.data?.user_info?.image?.nid_screenshot
                  ? user_data?.data?.user_info?.image?.nid_screenshot
                  : "/assets/img/NIDF.png"
              }`}
              width={291}
              height={180}
              alt=""
            />
          </div>
          <div>
            <label htmlFor="document-font-side">Document Back Side</label>
            <Image
              className="mt-[16px] w-[291px] h-[180px] object-contain"
              src={`${
                user_data?.data?.user_info?.image?.nid_backside
                  ? user_data?.data?.user_info?.image?.nid_backside
                  : "/assets/img/NIDB.png"
              }`}
              width={291}
              height={180}
              alt=""
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="description-of-address">Description of address</label>
          <input
            className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[12px]"
            type="text"
            autoComplete="off"
            name="description-of-address"
            id="description-of-address"
            placeholder="Description of address"
            defaultValue={`${user_data?.data?.user_info?.details?.description_of_address ? user_data?.data?.user_info?.details?.description_of_address : " "}`}
            readOnly={true}
          />
        </div>
      </form>
    </div>
  );
};

export default KycInfo;
