import React from "react";
import useGetFinanceSummary from "@/hooks/useAdminSummary";
export default function FinanceSummary() {
    const { data: summaryTransactions, error, isLoading} = useGetFinanceSummary()
  console.log(error)
  console.log(summaryTransactions)
 
  const FinanceDetails = [
    {
      title: "Inflow",
      desc: summaryTransactions?.totalInflow ?? 0,
    },
    {
      title: "Payouts",
      desc: summaryTransactions?.totalPayout ?? 0,
    },

    {
      title: "Profits",
      desc: summaryTransactions?.totalProfits ?? 0,
    },
  ];
  return <div className="flex w-full border border-[#DADADA] rounded-3xl p-3 justify-between"
  style={{
    padding:"1.5rem"
  }}>
    {
        FinanceDetails.map((item,index)=>(
            <div key={index} className="w-full gap-2 justify-center flex items-center ">
                <div className="border-2 border-[#1AB168] rounded-full"style={{
                    padding:"3px"
                }}>

                <img src="/money.svg" alt="cash" className="w-8 "/>
                </div>
                <div className="flex flex-col gap-2">

                <p>
                    {item.title}
                </p>
                <p className="text-2xl">
                    {item.desc}
                    </p>
                </div>
            </div>
        ))
    }
  </div>;
}
