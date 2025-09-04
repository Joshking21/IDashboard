import React from "react";
import useGetFinanceSummary from "@/hooks/useAdminSummary";
import { useState, useEffect } from "react";

export default function FinanceSummary({ windowWidth }) {
    const { data: summaryTransactions, error, isLoading} = useGetFinanceSummary()
    
    const getContainerStyle = () => {
      if (windowWidth < 375) { // mobileS
        return {
          flexDirection: 'column',
          padding: '12px',
          gap: '12px'
        };
      } else if (windowWidth < 768) { // mobileM, mobileL
        return {
          flexDirection: windowWidth < 425 ? 'column' : 'row',
          padding: '14px',
          gap: '14px',
          flexWrap: 'wrap'
        };
      } else { // tablet and larger
        return {
          flexDirection: 'row',
          padding: "1.5rem",
          gap: '16px'
        };
      }
    };

    const getItemStyle = () => {
      if (windowWidth < 375) { // mobileS
        return {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%'
        };
      } else if (windowWidth < 425) { // mobileM
        return {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%'
        };
      } else if (windowWidth < 768) { // mobileL
        return {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: windowWidth < 600 ? '100%' : '45%'
        };
      } else { // tablet and larger
        return {
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%'
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
        {FinanceDetails.map((item,index) => (
          <div 
            key={index} 
            style={getItemStyle()}
            className="flex items-center gap-2"
          >
            <div 
              className="border-2 border-[#1AB168] rounded-full"
              style={{ padding: windowWidth < 768 ? "2px" : "3px" }}
            >
              <img 
                src="/money.svg" 
                alt="cash" 
                style={{ width: windowWidth < 768 ? "24px" : "32px" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p style={{ fontSize: windowWidth < 768 ? "12px" : "14px" }}>
                {item.title}
              </p>
              <p style={{ fontSize: windowWidth < 768 ? "18px" : "24px" }}>
                ₦{item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
}