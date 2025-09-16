import { Button } from "@/components/ui/button";
import { ChevronRight, Dot, ListFilter, Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useGetFinanceSummary from "@/hooks/useAdminSummary";
import useGetTransactionDetailSummary from "@/hooks/useTransactionDetailsSummary";
import useUserID from "@/stores/useUserID";
import SmallLoadingPage from "@/pages/small-loading";
import useGetPaid from "@/hooks/useCheckedPaid";

// UserDetail Component
const UserDetail = ({ user, title }) => (
  <div
    style={{
      display: "flex",
      gap: "8px",
      alignItems: "center",
      padding: "10px 0",
    }}
  >
    <img
      src={user?.pfp || ""}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
      alt={`${title} profile`}
    />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontWeight: "500" }}>
        {user?.first_name || ""} {user?.last_name || ""}
      </span>
      <span style={{ fontSize: "0.8rem", color: "#666" }}>
        {user?.phone || ""}
      </span>
    </div>
  </div>
);

// TableHeader Component
const TableHeader = ({ children, style }) => (
  <th
    style={{
      textAlign: "left",
      padding: "12px 8px",
      fontSize: "0.9rem",
      fontWeight: "500",
      ...style,
    }}
  >
    {children}
  </th>
);

// TableCell Component
const TableCell = ({ children, style }) => (
  <td
    style={{
      padding: "16px 8px",
      borderBottom: "1px solid #f0f0f0",
      fontSize: "0.9rem",
      ...style,
    }}
  >
    {children}
  </td>
);

export default function TableSummary({ windowWidth }) {
  const [changeTable, setChangeTable] = React.useState(true);
  const { userId, setUserId } = useUserID();
  const [isTablet, setIsTablet] = React.useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const getContainerStyle = () => {
    if (windowWidth < 375) {
      // mobileS
      return {
        padding: "8px",
        gap: "12px",
      };
    } else if (windowWidth < 425) {
      // mobileM
      return {
        padding: "10px",
        gap: "12px",
      };
    } else if (windowWidth < 768) {
      // mobileL
      return {
        padding: "12px",
        gap: "14px",
      };
    } else if (windowWidth < 1024) {
      // tablet
      return {
        padding: "14px",
        gap: "16px",
      };
    } else {
      // laptop and larger
      return {
        padding: "16px",
        gap: "16px",
      };
    }
  };

  const getButtonStyle = () => {
    const baseStyle = {
      padding: "8px 16px",
      borderRadius: "12px",
      fontSize: windowWidth < 768 ? "12px" : "14px",
    };

    return baseStyle;
  };

  const getSearchStyle = () => {
    if (windowWidth < 375) {
      return {
        padding: "6px 8px",
        fontSize: "12px",
      };
    } else if (windowWidth < 768) {
      return {
        padding: "8px 10px",
        fontSize: "13px",
      };
    } else {
      return {
        padding: "5px 6px",
        fontSize: "14px",
      };
    }
  };

  const {
    mutate,
    isPending: getPaidIsPending,
    isError: getPaidIsError,
    error: getPaidError,
  } = useGetPaid();

  const {
    data: summaryTransactions,
    isError,
    error,
    isLoading,
    isFetching,
  } = useGetFinanceSummary();

  const { data: summaryTransactionsDetails } =
    useGetTransactionDetailSummary(userId);
  console.log(summaryTransactions);
  console.log(summaryTransactionsDetails);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [search, setSearch] = useState();

  if (isError) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        Error: {error.message} ....... Please{" "}
        <Button variant="link" onClick={() => window.location.reload()}>
          Refresh Page{" "}
        </Button>{" "}
        or Try Again Later
      </div>
    );
  }

  if (isLoading || isFetching) return <SmallLoadingPage />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        border: "1px solid #8C8C8C42",
        borderRadius: "24px",
        ...getContainerStyle(),
      }}
    >
      {/* Toggle buttons */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: windowWidth < 425 ? "wrap" : "nowrap",
        }}
      >
        <button
          style={{
            ...getButtonStyle(),
            border: changeTable ? "none" : "1px solid #8C8C8C42",
            backgroundColor: changeTable ? "#1AB168" : "transparent",
            color: changeTable ? "white" : "#888888",
          }}
          onClick={() => setChangeTable(true)}
        >
          Withdraw Request
        </button>
        <button
          style={{
            ...getButtonStyle(),
            border: !changeTable ? "none" : "1px solid #8C8C8C42",
            backgroundColor: !changeTable ? "#1AB168" : "transparent",
            color: !changeTable ? "white" : "#888888",
          }}
          onClick={() => setChangeTable(false)}
        >
          Received Payment
        </button>
      </div>

      {/* Search and filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #8C8C8C42",
          borderRadius: "24px",
          ...getSearchStyle(),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: isMobile ? "70%" : "80%",
          }}
        >
          <Search size={isMobile ? 16 : 20} className="text-[#888888]" />
          <input
            placeholder="Search anything...."
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              background: "transparent",
            }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <Button
          style={{
            backgroundColor: "#2AC7690D",
            color: "#1AB168",
            borderRadius: "24px",
            padding: isMobile ? "4px 8px" : "6px 12px",
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <ListFilter size={isMobile ? 14 : 16} />
          {!isMobile && "Filter"}
        </Button>
      </div>

      {/* Tables */}
      {changeTable ? (
        // Withdraw Request Table
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: isMobile ? "600px" : "auto",
              color: "#2D2D2D",
            }}
          >
            <thead style={{ backgroundColor: "#2AC7690D", color: "#888888" }}>
              <tr>
                <TableHeader>User Name</TableHeader>
                <TableHeader>Bank Name</TableHeader>
                <TableHeader>Account Number</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {summaryTransactions.withdrawalRequest.map((user, index) => (
                <tr key={index}>
                  <TableCell>{user?.agent?.account?.name || "N/A"}</TableCell>
                  <TableCell>
                    {user?.agent?.account?.bankName || "N/A"}
                  </TableCell>
                  <TableCell>
                    {user?.agent?.account?.accountNumber || "N/A"}
                  </TableCell>
                  <TableCell>₦{user?.amount || "0"}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        backgroundColor: user?.isProcessed
                          ? "#E6F7EF"
                          : "#FFF0F0",
                        color: user?.isProcessed ? "#1AB168" : "#FF4D4F",
                      }}
                    >
                      {user?.isProcessed ? "Processed" : "Pending"}
                    </span>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Received Payment Table
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: isMobile ? "700px" : "auto",
              color: "#2D2D2D",
            }}
          >
            <thead style={{ backgroundColor: "#2AC7690D", color: "#888888" }}>
              <tr>
                <TableHeader style={{ width: isMobile ? "120px" : "150px" }}>
                  User Details
                </TableHeader>
                <TableHeader style={{ width: isMobile ? "120px" : "150px" }}>
                  Agent Details
                </TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Date/Time</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {summaryTransactions?.receivedPayments
                ?.filter((user) => {
                  if (!search) return true; // show all if no search

                  const email = user?.user?.email?.toLowerCase() || "";
                  const amount = user?.amount?.toString() || "";
                  const date = new Date(user?.createdAt)
                    .toLocaleDateString("en-GB")
                    .toLowerCase();
                  return (
                    user?.user?.first_name
                      ?.toLowerCase()
                      .includes(search.toLowerCase()) ||
                    user?.agent?.user?.first_name
                      ?.toLowerCase()
                      .includes(search.toLowerCase()) ||
                    amount.includes(search.toLowerCase()) ||
                    date.includes(search.toLowerCase())
                  );
                })
                .map((user, index) => (
                  <tr
                    key={index}
                    onClick={() => setUserId(user?.agent?.user?.id)}
                  >
                    <TableCell style={{ width: isMobile ? "120px" : "150px" }}>
                      <UserDetail user={user?.user} title="User" />
                    </TableCell>
                    <TableCell style={{ width: isMobile ? "120px" : "150px" }}>
                      <UserDetail user={user?.agent?.user} title="Agent" />
                    </TableCell>
                    <TableCell>
                      ₦{user.amount?.toLocaleString() || "0"}
                    </TableCell>

                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {new Date(user?.createdAt).toLocaleDateString("en-GB")}{" "}
                        <Dot className="text-[#1AB168]" />{" "}
                        {new Date(user?.createdAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </TableCell>

                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          style={{ padding: "5px" }}
                          size="sm"
                        >
                          <ChevronRight />
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        style={{
                          width: isMobile ? "100%" : "400px",
                          padding: "16px 0px",
                          overflowY: "auto",
                        }}
                      >
                        <SheetHeader
                          style={{
                            marginBottom: "5px",
                            color: "#2D2D2D",
                            fontSize: "20px",
                            fontWeight: "700",
                            padding: "0px 16px",
                          }}
                          className="border-b"
                        >
                          <SheetTitle>Transaction Details</SheetTitle>
                        </SheetHeader>
                        <SheetDescription
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                          }}
                        >
                          <div style={{ padding: "0px 16px" }}>
                            <div
                              style={{
                                background:
                                  "linear-gradient(to right, #2AC769, #2C9455)",
                                color: "white",
                                borderRadius: "16px",

                                display: "flex",
                                justifyContent: "space-between",
                                padding: "16px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "18px",
                                  }}
                                >
                                  Total earned
                                </span>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "22px",
                                  }}
                                >
                                  ₦
                                  {summaryTransactionsDetails?.totalEarned?.toLocaleString() ||
                                    "0"}
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                  fontSize: "22px",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "18px",
                                  }}
                                >
                                  Withdrawable
                                </span>
                                <span
                                  style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                  }}
                                >
                                  ₦
                                  {summaryTransactionsDetails?.withdrawable?.toLocaleString() ||
                                    "0"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#2AC7690D",
                              padding: "16px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <p style={{ margin: "0", fontWeight: "500" }}>
                              <span>Bank Name:</span>{" "}
                              <span className="text-black">
                                {" "}
                                {summaryTransactionsDetails?.userDetails
                                  ?.bankName || "N/A"}
                              </span>
                            </p>
                            <p style={{ margin: "0", fontWeight: "500" }}>
                              <span>Account Number:</span>{" "}
                              <span className="text-black">
                                {" "}
                                {summaryTransactionsDetails?.userDetails
                                  ?.accountNumber || "N/A"}
                              </span>
                            </p>
                          </div>

                          <div
                            style={{
                              borderBottom: "1px solid #e0e0e0",
                              paddingBottom: "18px",
                              padding: "10px 16px",
                            }}
                            className="border-b"
                          >
                            <p
                              style={{
                                fontWeight: "500",
                                marginBottom: "12px",
                              }}
                              className="text-[#888888]"
                            >
                              Withdrawal Request
                            </p>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                              }}
                            >
                              {summaryTransactionsDetails?.withdrawalRequest?.map(
                                (item, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <p className="flex items-center justify-center text-[20px] text-[#2D2D2D]">
                                      ₦ {item?.amount ?? "N/A"}
                                    </p>
                                    {item?.isProcessed ? (
                                      <p
                                        style={{
                                          color: "#1AB168",
                                          padding: "2px",
                                          paddingLeft: "20px",
                                          paddingRight: "20px",
                                        }}
                                        className="border border-[#1AB168] bg-[#2AC7690D] rounded-3xl"
                                      >
                                        Paid
                                      </p>
                                    ) : (
                                      <button
                                        style={{
                                          color: "#FF4D4F",
                                          padding: "2px",
                                          paddingLeft: "20px",
                                          paddingRight: "20px",
                                        }}
                                        disabled={getPaidIsPending}
                                        onClick={() => mutate(item?.id)}
                                        className="text-[#A66F18] border hover:opacity-70 border-[#A66F18] rounded-lg bg-[#F9EFDE] "
                                      >
                                        {getPaidIsPending
                                          ? "Paying..."
                                          : getPaidIsError
                                          ? getPaidError
                                          : "Pay"}
                                      </button>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          <div>
                            <p
                              style={{
                                fontWeight: "500",
                                marginBottom: "8px",
                                color: "#888888",
                                fontSize: "16px",
                                padding: "5px 16px",
                              }}
                            >
                              Transaction History
                            </p>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  backgroundColor: "#2AC7690D",
                                  padding: "5px 16px",
                                  borderRadius: "8px",
                                  marginBottom: "8px",
                                }}
                              >
                                <span className="text-[#2D2D2D] text-[22px]">
                                  Date
                                </span>
                                <span className="text-[#2D2D2D] text-[22px]">
                                  Amount
                                </span>
                              </div>
                              <div style={{ padding: "0px 16px" }}>
                                {" "}
                                {summaryTransactionsDetails?.transactionHistory?.map(
                                  (item, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "8px 12px",
                                      }}
                                    >
                                      <span className="text-[#888888] text-[20px]">
                                        {item.date || "12/02/2023"}
                                      </span>
                                      <span>
                                        ₦{item.amount?.toLocaleString() || "0"}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </SheetDescription>
                      </SheetContent>
                    </Sheet>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
