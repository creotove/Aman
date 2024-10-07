import React, { memo } from "react";
import useAxios from "../hooks/useAxios";
import axios from "../apis/admin";
import FormatSlotNumber from "../components/newCreated/FormatSlotNumber";
import FormatNumber from "../components/newCreated/FormatNumber";
import DateFormatter from "../components/newCreated/DateFormatter";
import MonthlyIncomeChart from "../components/newCreated/MonthlyIncomeChart";

const Dashboard = memo(() => {
  const [analytics, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/admin/analytics",
  });
  return (
    <>
      {/* Row 1 */}
      <section className="grid lg:grid-cols-12 gap-4">
        <div className="smallContainer radius slot min-h-[15rem] md:col-span-6 shadow-sm">
          <div className="flex justify-between">
            <h3 className=" headerText">Graph</h3>

            {!loading && analytics?.monthlyData && <MonthlyIncomeChart data={analytics?.monthlyData} />}
          </div>
        </div>

        <section className="md:col-span-4">
          <section className="grid lg:grid-cols-2 gap-4">
            <div className="text-center smallContainer radius slot md:col-span-1 min-w-[10rem] min-h-[10rem] max-h-[15rem] shadow-sm">
              <h3 className=" headerText">Purchased</h3>
              <p className="text-8xl slotNumbers">
                {analytics?.salesBillCount && FormatSlotNumber(analytics?.salesBillCount)}
              </p>
            </div>
            <div className="text-center smallContainer radius slot md:col-span-1 min-w-[10rem] min-h-[10rem] max-h-[15rem] shadow-sm">
              <h3 className=" headerText">Stitched</h3>
              <p className="text-8xl slotNumbers">
                {analytics?.stitchBillCount && FormatSlotNumber(analytics?.stitchBillCount)}
              </p>
            </div>
          </section>
          <section className="grid lg:grid-cols-2 gap-4 mt-4">
            <div className="text-center smallContainer radius slot md:col-span-1 min-w-[10rem] min-h-[10rem] max-h-[15rem] shadow-sm">
              <h3 className=" headerText">New</h3>
              <p className="text-8xl slotNumbers">
                {analytics?.newCustomers && FormatSlotNumber(analytics?.newCustomers)}
              </p>
            </div>
            <div className="text-center smallContainer radius slot md:col-span-1 min-w-[10rem] min-h-[10rem] max-h-[15rem] shadow-sm">
              <h3 className=" headerText">Customers</h3>
              <p className="text-8xl slotNumbers">
                {analytics?.customers && FormatSlotNumber(analytics?.customers)}
              </p>
            </div>
          </section>
        </section>
        <div className="md:col-span-2 grid gap-[1px] radius slot">
          <div className="smallContainer rounded-t-xl min-h-[10rem] shadow-sm">
            <h1 className="headerText">
              {analytics?.dailyData[analytics?.dailyData.length - 2]?.income && DateFormatter(
                analytics?.dailyData[analytics?.dailyData.length - 2]?.date
              )}
            </h1>
            <p>
              Income :&nbsp;
              {analytics?.dailyData[analytics?.dailyData.length - 2]?.income && analytics?.dailyData[analytics?.dailyData.length - 2]?.income}
            </p>
          </div>
          <div className="smallContainer rounded-b-xl min-h-[10rem] shadow-sm">
            <h1 className="headerText">
              {analytics?.dailyData[analytics?.dailyData.length - 1]?.date && DateFormatter(
                analytics?.dailyData[analytics?.dailyData.length - 1]?.date
              )}
            </h1>
            <p>
              Income :&nbsp;
              {analytics && analytics?.dailyData[analytics?.dailyData.length - 1]?.income}
            </p>
          </div>
        </div>
      </section>
      {/* Row 2 */}
      <section className="flex mt-5 flex-wrap gap-4">
        <div className="smallContainer radius slot flex-1 min-w-[15rem] min-h-[15rem] shadow-sm">
          <h1 className=" headerText">Total sold bill income</h1>
          <p className="text-7xl h-full justify-center items-center flex slotNumbers">
            {analytics?.sales && FormatNumber(analytics?.sales)}
          </p>
        </div>
        <div className="smallContainer headerText radius slot flex-1 min-w-[15rem] min-h-[15rem] shadow-sm">
          <h1 className=" headerText">Total stitch bill income</h1>
          <p className="text-7xl h-full justify-center items-center flex slotNumbers">
            {analytics?.stitch && FormatNumber(analytics?.stitch)}
          </p>
        </div>
        <div className="smallContainer headerText radius slot flex-1 min-w-[15rem] min-h-[15rem] shadow-sm">
          <h1 className=" headerText">
            Stitched Items Count{" "}
            <p className="text-sm text-neutral-400 font-normal">(Today)</p>
          </h1>
          <p className="text-7xl h-full justify-center items-center flex slotNumbers">
            {analytics?.stitch && FormatNumber(analytics?.dailyData[-1]?.stitch ? analytics?.dailyData[-1]?.stitch : 0)}
          </p>
        </div>
        <div className="smallContainer headerText radius slot flex-1 min-w-[15rem] min-h-[15rem] shadow-sm">
          <h1 className=" headerText">Monthly Revenue</h1>
          <p className="text-7xl h-full justify-center items-center flex slotNumbers">
            {analytics?.monthlyData[analytics?.monthlyData.length - 1]?.income && FormatNumber(
              analytics?.monthlyData[analytics?.monthlyData.length - 1]?.income
            )}
          </p>
        </div>
      </section>
    </>
  );
});

export default Dashboard;
//eslint-disable-next-line
{
  /* <div className=" grid md:grid-cols-2 gap-4 md:col-span-4">
     <div className="smallContainer headerText radius slot min-h-[10rem] min-w-[10rem] shadow-sm"></div>
     <div className="smallContainer headerText radius slot min-h-[10rem] min-w-[10rem] shadow-sm"></div>
     <div className="smallContainer headerText radius slot min-h-[10rem] min-w-[10rem] shadow-sm"></div>
     <div className="smallContainer headerText radius slot min-h-[10rem] min-w-[10rem] shadow-sm"></div>
    </div> */
}
