import { Button } from "@/components/ui/button";
import { Dot, ListFilter, Search } from "lucide-react";
import React, { useEffect } from "react";
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

export default function TableSummary() {
  const [changeTable, setChangeTable] = React.useState(true);
  const { userId, setUserId } = useUserID();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = React.useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

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

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        padding: isMobile ? "8px" : "16px",
        border: "1px solid #8C8C8C42",
        borderRadius: "24px",
      }}
    >
      {/* Toggle buttons */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "24px",
            border: changeTable ? "none" : "1px solid #8C8C8C42",
            backgroundColor: changeTable ? "#1AB168" : "transparent",
            color: changeTable ? "white" : "inherit",
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            cursor: "pointer",
          }}
          onClick={() => setChangeTable(true)}
        >
          Withdraw Request
        </button>
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "24px",
            border: !changeTable ? "none" : "1px solid #8C8C8C42",
            backgroundColor: !changeTable ? "#1AB168" : "transparent",
            color: !changeTable ? "white" : "inherit",
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            cursor: "pointer",
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
          padding: isMobile ? "6px 8px" : "8px 12px",
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
          <Search size={isMobile ? 16 : 20} />
          <input
            placeholder="Search anything...."
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              background: "transparent",
            }}
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
            }}
          >
            <thead style={{ backgroundColor: "#2AC7690D" }}>
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
                  <TableCell>{user?.amount || "0"}</TableCell>
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
            }}
          >
            <thead style={{ backgroundColor: "#2AC7690D" }}>
              <tr>
                <TableHeader style={{ width: isMobile ? "120px" : "150px" }}>
                  User Details
                </TableHeader>
                <TableHeader style={{ width: isMobile ? "120px" : "150px" }}>
                  Agent Details
                </TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Date/Time</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {summaryTransactions.receivedPayments.map((user, index) => (
                <tr
                  key={index}
                  onClick={() => setUserId(user?.agent?.user?.id)}
                >
                  <TableCell style={{ width: isMobile ? "120px" : "150px" }}>
                    <UserDetail user={user.user} title="User" />
                  </TableCell>
                  <TableCell style={{ width: isMobile ? "120px" : "150px" }}>
                    <UserDetail user={user?.agent?.user} title="Agent" />
                  </TableCell>
                  <TableCell>₦{user.amount?.toLocaleString() || "0"}</TableCell>

                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {new Date(user?.createdAt).toLocaleDateString("en-GB")}{" "}
                      <Dot />{" "}
                      {new Date(user?.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        backgroundColor:
                          user.status === "Completed" ? "#E6F7EF" : "#FFF0F0",
                        color:
                          user.status === "Completed" ? "#1AB168" : "#FF4D4F",
                      }}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        style={{
                          width: isMobile ? "100%" : "400px",
                          padding: "16px",
                          overflowY: "auto",
                        }}
                      >
                        <SheetHeader style={{ marginBottom: "16px" }}>
                          <SheetTitle>Transaction Details</SheetTitle>
                        </SheetHeader>
                        <SheetDescription
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                          }}
                        >
                          <div
                            style={{
                              background:
                                "linear-gradient(to right, #2AC769, #2C9455)",
                              color: "white",
                              borderRadius: "16px",
                              padding: "16px",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                              }}
                            >
                              <span>Total earned</span>
                              <span
                                style={{
                                  fontSize: "1.2rem",
                                  fontWeight: "bold",
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
                              }}
                            >
                              <span>Withdrawable</span>
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

                          <div
                            style={{
                              backgroundColor: "#2AC7690D",
                              borderRadius: "16px",
                              padding: "16px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <p style={{ margin: "0", fontWeight: "500" }}>
                              <span>Bank Name:</span>{" "}
                              {summaryTransactionsDetails?.userDetails
                                ?.bankName || "N/A"}
                            </p>
                            <p style={{ margin: "0", fontWeight: "500" }}>
                              <span>Account Number:</span>{" "}
                              {summaryTransactionsDetails?.userDetails
                                ?.accountNumber || "N/A"}
                            </p>
                          </div>

                          <div
                            style={{
                              borderBottom: "1px solid #e0e0e0",
                              paddingBottom: "16px",
                            }}
                          >
                            <p
                              style={{ fontWeight: "500", marginBottom: "8px" }}
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
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span>₦3,000</span>
                                <span style={{ color: "#1AB168" }}>Paid</span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span>₦3,000</span>
                                <span style={{ color: "#FF4D4F" }}>Pay</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p
                              style={{ fontWeight: "500", marginBottom: "8px" }}
                            >
                              Transaction History
                            </p>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  backgroundColor: "#2AC7690D",
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  marginBottom: "8px",
                                }}
                              >
                                <span>Date</span>
                                <span>Amount</span>
                              </div>
                              {summaryTransactionsDetails?.transactionHistory?.map(
                                (item, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      padding: "8px 12px",
                                      borderBottom: "1px solid #f0f0f0",
                                    }}
                                  >
                                    <span>{item.date || "12/02/2023"}</span>
                                    <span>
                                      ₦{item.amount?.toLocaleString() || "0"}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </SheetDescription>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
