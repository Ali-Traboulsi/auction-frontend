import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardCard = () => (
  <div
    suppressHydrationWarning
    data-wow-delay="0.2s"
    className={`
flex flex-col gap-[16px] items-center p-[32px] rounded-[8px] border border-opacity-0 hover:border-opacity-100 text-center transition-all duration-300 ease-in-out wow fadeInUp`}
  >
    <div className="flex flex-col gap-[8px]">
      <p className="text-[24px] leading-[31.2px] font-semibold">
        <Skeleton width={80} height={80} />
      </p>
      <p className="text-[18px] leading-[21.6px]">
        <Skeleton width={200} count={3} />
      </p>
    </div>
  </div>
);

export const DashboardSkeleton = (props) => {
  return (
    <div>
      <div className="auc-container">
        <div className="flex flex-wrap min-768:flex-nowrap gap-4">
          <div className="w-full min-768:w-3/4 ml-4 mt-4">
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 mb-4">
              <Skeleton width={"full"} height={60} />
            </div>
            <div className="grid min-320:grid-cols-1 min-768:grid-cols-2 min-1440:grid-cols-4 gap-[28px] mx-auto">
              <DashboardCard />
              <DashboardCard />
              <DashboardCard />
              <DashboardCard />
            </div>

            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 mb-4">
              <Skeleton width={"full"} height={60} />
            </div>

            <div className="mb-4 mt-4">
              <Skeleton width={"100%"} height={60} />
              <Skeleton width={"100%"} height={60} />
              <Skeleton width={"100%"} height={60} />
              <Skeleton width={"100%"} height={60} />
              <Skeleton width={"100%"} height={60} />
              <Skeleton width={"100%"} height={60} />
              <Skeleton width={"100%"} height={60} />
              <Skeleton width={"100%"} height={60} />
              <Skeleton width={"100%"} height={60} />
              <Skeleton width={"100%"} height={60} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TableSkeleton = (props) => {
  return (
    <div>
      <div className="auc-container">
        <div className="flex  flex-wrap min-768:flex-nowrap gap-4">
          <div className="w-full  min-768:w-3/4  ml-4 mt-4">
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 mb-4">
              <Skeleton width={"full"} height={60} />
            </div>

            <div className="mb-4 mt-4">
              <Skeleton width={"90%"} height={60} />
              <Skeleton width={"90%"} height={60} />
              <Skeleton width={"90%"} height={60} />
              <Skeleton width={"90%"} height={60} />
              <Skeleton width={"90%"} height={60} />
              <Skeleton width={"90%"} height={60} />
              <Skeleton width={"90%"} height={60} />
              <Skeleton width={"90%"} height={60} />
              <Skeleton width={"90%"} height={60} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FrontendPageSkeleton = (props) => {
  return (
    <div className="auc-container">
      <div className="grid min-768:grid-cols-2 items-center py-[60px]">
        <div className="">
          <Skeleton width={"30%"} height={20} className="mb-4" />
          <Skeleton width={"70%"} height={30} className="mb-4" />
          <Skeleton width={"70%"} height={30} className="mb-4" />
          <Skeleton width={"70%"} height={150} className="mb-4" />
          <Skeleton width={"20%"} height={50} className="mb-4" />
        </div>
        <div>
          <Skeleton width={"100%"} height={500} className="mb-4" />
        </div>
      </div>
      <div>
        <Skeleton width={"100%"} height={600} className="mb-4" />
      </div>
    </div>
  );
};

export const KycFormSkeleton = (props) => {
  return (
    <div className="auc-container">
      <div className="flex  flex-wrap min-768:flex-nowrap gap-4">
        <div className="w-full  min-768:w-3/4  ml-4 mt-4">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 mb-4">
            <Skeleton width={"full"} height={60} />
          </div>

          <div className="mb-4 mt-4">
            <Skeleton className="mb-4" width={"full"} height={80} />
            <Skeleton className="mb-4" width={"full"} height={80} />
            <Skeleton className="mb-4" width={"full"} height={80} />
          </div>
          <div className="grid grid-cols-2 gap-4" style={{ width: "full" }}>
            <Skeleton className="mb-4" width={"full"} height={170} />
            <Skeleton className="mb-4" width={"full"} height={170} />
          </div>
          <div className="mb-4 mt-4">
            <Skeleton className="mb-4" width={"full"} height={60} />
            <Skeleton className="mb-4" width={"full"} height={60} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const KycInfoSkeleton = (props) => {
  return (
    <div className="auc-container">
      <div className="flex flex-wrap min-768:flex-nowrap gap-4">
        <div className="w-full  min-768:w-3/4  ml-4 mt-4">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 mb-4">
            <Skeleton width={"full"} height={60} />
          </div>

          <div className="mb-4 mt-4">
            <Skeleton className="mb-4" width={"full"} height={80} />
            <Skeleton className="mb-4" width={"full"} height={80} />
            <Skeleton className="mb-4" width={"full"} height={80} />
          </div>
          <div className="grid grid-cols-2 gap-4" style={{ width: "full" }}>
            <Skeleton className="mb-4" width={"full"} height={170} />
            <Skeleton className="mb-4" width={"full"} height={170} />
          </div>
          <div className="mb-4 mt-4">
            <Skeleton className="mb-4" width={"full"} height={60} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuctionCreateSkeleton = (props) => {
  return (
    <div className="auc-container">
      <div className="flex flex-wrap min-768:flex-nowrap gap-4">
        <div className="w-full  min-768:w-3/4  ml-4 mt-4">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 mb-4">
            <Skeleton width={"full"} height={60} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="mb-4" height={70} />
            <Skeleton className="mb-4" height={70} />
            <Skeleton className="mb-4" height={70} />
            <Skeleton className="mb-4" height={70} />
            <Skeleton className="mb-4" height={70} />
            <Skeleton className="mb-4" height={70} />
            <Skeleton className="mb-4" height={70} />
            <Skeleton className="mb-4" height={70} />
            <Skeleton className="mb-4" height={70} />
          </div>
          <div className="mb-4 mt-4">
            <Skeleton className="mb-4" height={90} />
          </div>
          <div className="mb-4 mt-4 max-768:w-2/4 w-1/4">
            <Skeleton className="mb-4" height={300} />
          </div>
          <div className="mb-4 mt-4">
            <Skeleton className="mb-4" height={220} width={"100%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddMoneySkeleton = (props) => {
  return (
    <div className="auc-container">
      <div className="flex flex-wrap min-768:flex-nowrap gap-4">
        <div className="w-full  min-768:w-3/4  ml-4 mt-4">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 mb-4">
            <Skeleton width={"full"} height={60} />
          </div>

          <div className="mb-4 mt-10 flex justify-center">
            <div
              className="min-768:w-2/4 w-3/4"
              style={{
                // width: "50%",
                border: "1px solid #ccc",
                height: 500,
                borderRadius: 8,
              }}
            >
              <div className="mt-10  text-center ">
                <Skeleton className="mb-4" width={"80%"} height={120} />
                <Skeleton className="mb-4" width={"80%"} height={80} />
                <Skeleton className="mb-4" width={"80%"} height={80} />
                <Skeleton className="mb-4" width={"80%"} height={80} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileSettingSkeleton = (props) => {
  return (
    <div className="auc-container">
      <div className="flex flex-wrap min-768:flex-nowrap gap-4">
        <div className="w-full  min-768:w-3/4  ml-4 mt-4">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 mb-4">
            <Skeleton width={"full"} height={60} />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="mb-4">
              <Skeleton className="mb-2" width={"40%"} height={25} />
              <Skeleton className="mb-10" width={"100%"} height={60} />
              <Skeleton className="mb-2" width={"40%"} height={25} />
              <Skeleton className="mb-10" width={"100%"} height={60} />
              <Skeleton className="mb-2" width={"40%"} height={25} />
              <Skeleton className="mb-10" width={"100%"} height={60} />
              <Skeleton className="mb-2" width={"40%"} height={25} />
              <Skeleton className="mb-10" width={"100%"} height={60} />
            </div>
            <div className="mb-4">
              <Skeleton className="mb-2" width={"40%"} height={25} />
              <Skeleton className="mb-10" width={"100%"} height={60} />
              <Skeleton className="mb-2" width={"40%"} height={25} />
              <Skeleton className="mb-10" width={"100%"} height={60} />
              <Skeleton className="mb-2" width={"40%"} height={25} />
              <Skeleton className="mb-10" width={"100%"} height={60} />
              <Skeleton className="mb-2" width={"40%"} height={25} />
              <Skeleton className="mb-10" width={"100%"} height={60} />
            </div>
            <div className="mb-4">
              <Skeleton className="mb-6" width={"90%"} height={220} />
              <Skeleton className="mb-10" width={"90%"} height={60} />
            </div>
          </div>
          <div className="w-3/4">
            <Skeleton className="mb-10" width={"88%"} height={60} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const TwoFactorSkeleton = (props) => {
  return (
    <div className="auc-container">
      <div className="flex flex-wrap min-768:flex-nowrap gap-4">
        <div className="w-full  min-768:w-3/4  ml-4 mt-4">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 mb-4">
            <Skeleton width={"full"} height={60} />
          </div>

          <div className="mb-4 mt-10 flex justify-center">
            <div
              className=" w-3/4"
              style={{
                // width: "70%",
                border: "1px solid #ccc",
                height: 870,
                borderRadius: 8,
              }}
            >
              <div className="mt-10 text-center">
                <Skeleton className="mb-4" width={"80%"} height={70} />
                <Skeleton className="mb-4" width={"40%"} height={250} />
                <Skeleton className="mb-4" width={"80%"} height={150} />
                <Skeleton className="mb-4" width={"80%"} height={70} />
                <Skeleton className="mb-4" width={"80%"} height={70} />
                <Skeleton className="mb-4" width={"80%"} height={70} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChangePasswordSkelton = (props) => {
  return (
    <div className="auc-container">
      <div className="flex flex-wrap min-768:flex-nowrap gap-4">
        <div className="w-full  min-768:w-3/4  ml-4 mt-4">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 mb-4">
            <Skeleton width={"full"} height={60} />
          </div>

          <div className="mb-4 mt-10 flex justify-center">
            <div
              className=" w-3/4"
              style={{
                // width: "50%",
                border: "1px solid #ccc",
                height: 590,
                borderRadius: 8,
              }}
            >
              <div className="mt-10 text-center">
                <Skeleton className="mb-8" width={"80%"} height={90} />

                <Skeleton className="mb-8" width={"80%"} height={70} />
                <Skeleton className="mb-8" width={"80%"} height={70} />
                <Skeleton className="mb-8" width={"80%"} height={70} />
                <Skeleton className="mb-4" width={"80%"} height={70} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeaderSkelton = (props) => {
  return (
    <div className="auc-container">
      <Skeleton className="mb-8" width={"100%"} height={100} />
    </div>
  );
};
