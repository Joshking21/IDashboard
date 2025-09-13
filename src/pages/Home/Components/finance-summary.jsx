import React from "react";
import useGetFinanceSummary from "@/hooks/useAdminSummary";
import { useState, useEffect } from "react";

export default function FinanceSummary({ windowWidth }) {
  const {
    data: summaryTransactions,
    error,
    isLoading,
  } = useGetFinanceSummary();

  const getContainerStyle = () => {
    if (windowWidth < 375) {
      // mobileS
      return {
        flexDirection: "column",
        padding: "12px",
        gap: "12px",
      };
    } else if (windowWidth < 768) {
      // mobileM, mobileL
      return {
        flexDirection: windowWidth < 425 ? "column" : "row",
        padding: "14px",
        gap: "14px",
        flexWrap: "wrap",
      };
    } else {
      // tablet and larger
      return {
        flexDirection: "row",
        padding: "1.5rem",
        gap: "16px",
      };
    }
  };

  const getItemStyle = () => {
    if (windowWidth < 375) {
      // mobileS
      return {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
      };
    } else if (windowWidth < 425) {
      // mobileM
      return {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
      };
    } else if (windowWidth < 768) {
      // mobileL
      return {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: windowWidth < 600 ? "100%" : "45%",
      };
    } else {
      // tablet and larger
      return {
        flexDirection: "row",
        // justifyContent: "flex-start",
        width: "100%",
      };
    }
  };

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

  return (
    <div
      className="flex w-full border border-[#DADADA] rounded-3xl"
      style={getContainerStyle()}
    >
      {FinanceDetails.map((item, index) => (
        <div
          key={index}
          style={getItemStyle()}
          className={`flex items-center border-r gap-2 ${
            index === 1 ? "justify-center" : index === 2 ? "justify-end border-none" : ""
          }`}
        >
          <div
            className="border-[1px] border-[#1AB168] rounded-full"
            style={{ padding: windowWidth < 768 ? "2px" : "8px" }}
          >
            <img
              src="/money.svg"
              alt="cash"
              style={{ width: windowWidth < 768 ? "24px" : "26px" }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: windowWidth < 768 ? "12px" : "14px" }}>
              {item.title}
            </p>
            <p style={{ fontSize: windowWidth < 768 ? "22px" : "28px" }}>
              ₦{item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}