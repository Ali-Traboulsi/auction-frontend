import DashboardCard from "../../cards/DashboardCard";
import Transactions from "../transactions/Transactions";
import { cookies } from "next/headers";
import TitleBoxTwo from "../../TitleBoxTwo";

async function getDashboardHomeData() {
  try {
    // const userToken = cookies().get("user_token")?.value;

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies().get("user_token")?.value}`,
      },
      next: { revalidate: 3600 },
    };

    const res = await fetch(
      `${process.env.API_BASE_URL}/api/user/dashboard`,
      requestOptions
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`); // Provide more specific error message
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: true, message: error.message };
  }
}

const Dashboard = async () => {
  const data = await getDashboardHomeData();

  if (data.status === 401) {
    return <h1>Unauthinticated!!</h1>;
  }

  return (
    <div>
      <TitleBoxTwo cls="auc-primary-heading" delay="0.1s" title="Dashboard" />

      <div className="grid min-320:grid-cols-1 min-768:grid-cols-2  min-1440:grid-cols-4 gap-[28px] mx-auto">
        <DashboardCard
          img={`/assets/img/balance.png`}
          value={data?.data?.currenct_balance}
          title={`Current Balance`}
          currencySymbol={true}
        />
        <DashboardCard
          img={`/assets/img/deposit.png`}
          value={data?.data?.total_deposit}
          title={`Total Deposit`}
          currencySymbol={true}
        />
        <DashboardCard
          img={`/assets/img/transaction.png`}
          value={data?.data?.total_transaction}
          title={`Total withdraw`}
          currencySymbol={true}
        />
        <DashboardCard
          img={`/assets/img/tickets.png`}
          value={data?.data?.total_tickets}
          title={`Total Tickets`}
          currencySymbol={false}
        />
        <DashboardCard
          img={`/assets/img/totalBid.png`}
          value={data?.data?.total_bid}
          title={`Total Bid`}
          currencySymbol={false}
        />
        <DashboardCard
          img={`/assets/img/bidAmount.png`}
          value={data?.data?.total_bid_amount}
          title={`Total Bid Amount`}
          currencySymbol={true}
        />
        <DashboardCard
          img={`/assets/img/winProduct.png`}
          value={data?.data?.win_product}
          title={`Win Product`}
          currencySymbol={false}
        />
        <DashboardCard
          img={`/assets/img/looseBid.png`}
          value={data?.data?.total_loose_bid}
          title={`Total Lost Bid`}
          currencySymbol={false}
        />
      </div>
      <TitleBoxTwo
        cls="text-[20px] min-768:text-[24px] min-1200:text-[32px] mt-[32px] mb-[24px]"
        delay="0.2s"
        title="Recent Transactions"
      />
      {data?.data?.transactions?.data && (
        <Transactions transections_data={data.data.transactions.data} />
      )}
    </div>
  );
};

export default Dashboard;
