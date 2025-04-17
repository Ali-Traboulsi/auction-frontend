import React, { cache } from "react";
import { cookies } from "next/headers";
import CreateAuctions from "../../../../components/dashboard/auctions/CreateAuctions";

//  async function getAuctionEditedValue(id, c_token) {
async function getAuctionEditedValue(id) {
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/user/auction/edit/${id}}`, // Optional cache busting
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies().get("user_token")?.value}`,
      },
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

const EditPage = async ({ params: { id } }) => {

  const title = "Edit Auctions";
  // const page_data = await getAuctionEditedValue(id, token);
  const page_data = await getAuctionEditedValue(id);

  return (
    <CreateAuctions
      title={title}
      isEdit={true}
      edited_id={id}
      page_data={page_data}
    />
  );
};

export default EditPage;
