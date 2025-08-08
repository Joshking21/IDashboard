import { Button } from "@/components/ui/button";
import { Dot, ListFilter, Search } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useGetFinanceSummary from "@/hooks/useAdminSummary";

export default function TableSummary() {
  const [changeTable, setChangeTable] = React.useState(true);
  const {
    data: summaryTransactions,
    isError,
    error,
    isLoading,
  } = useGetFinanceSummary();
  console.log(summaryTransactions.receivedPayments);

  if (isError) {
    return <div>Error: error</div>;
  }

  if (isLoading) return <p>Loading finance summary...</p>;

  const TableDetails = [
    {
      userName: "Edafe Jesugare",
      bank: "First Bank",
      account: "12334545435",
      amount: "3000",
      status: "Pay",
    },
  ];
  const TableDetails2 = [
    {
      user: {
        name: "Edafe Jesugare",
        num: "09123667232",
        pic: "",
      },
      agent: {
        name: "Edafe Jesugare",
        num: "09123667232",
        pic: "",
      },
      date: "12/03/2022",
      time: "9:30AM",
      amount: "3000",
      status: "Cash Payment",
    },
    {
      user: {
        name: "Edafe Jesugare",
        num: "09123667232",
        pic: "",
      },
      agent: {
        name: "Edafe Jesugare",
        num: "09123667232",
        pic: "",
      },
      date: "12/03/2022",
      time: "9:30AM",
      amount: "3000",
      status: "Done Payment",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 ">
        <button
          className={`${
            changeTable
              ? "bg-[#1AB168] text-white"
              : "border border-[#8C8C8C42]"
          } rounded-3xl`}
          onClick={() => {
            setChangeTable(true);
          }}
          style={{ padding: "8px" }}
        >
          Withdraw Request
        </button>
        <button
          className={`${
            !changeTable
              ? "bg-[#1AB168] text-white"
              : "border border-[#8C8C8C42]"
          } rounded-3xl`}
          onClick={() => {
            setChangeTable(false);
          }}
          style={{ padding: "8px" }}
        >
          Recieved Payment
        </button>
      </div>
      <div
        className="flex justify-between border border-[#8C8C8C42] rounded-3xl"
        style={{ padding: "2px", paddingLeft: "10px", paddingRight: "10px" }}
      >
        <div className="flex items-center gap-1 w-1/2">
          <Search />
          <input
            placeholder="Search anything...."
            className="w-full focus:outline-0"
          />
        </div>
        <Button
          className="bg-[#2AC7690D] text-[#1AB168] rounded-3xl"
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          <ListFilter />
          Filter
        </Button>
      </div>
      {changeTable && (
        <table className="min-w-full ">
          <thead className="bg-[#2AC7690D] " style={{ padding: "10px" }}>
            <tr>
              <th className="text-left" style={{ padding: "6px" }}>
                User Name
              </th>
              <th className="text-left">Bank Name</th>
              <th className="text-left">Account Number</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {summaryTransactions.withdrawalRequest.map((user, index) => (
              <tr key={index} className="" style={{ paddingLeft: "30px" }}>
                <td className="" style={{ padding: "25px" }}>
                  {user?.agent?.account?.name}
                </td>
                <td className="">{user?.agent?.account?.bankName}</td>
                <td className="">{user?.agent?.account?.accountNumber}</td>
                <td className="">{user?.amount}</td>
                <td className="">{JSON.stringify(user?.isProcessed)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!changeTable && (
        <table className="min-w-full ">
          <thead className="bg-[#2AC7690D] " style={{ padding: "10px" }}>
            <tr>
              <th className="text-left" style={{ padding: "6px" }}>
                User Details
              </th>
              <th className="text-left">Agent Details</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Date/Time</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {summaryTransactions.receivedPayments.map((user, index) => (
              <tr key={index} className="" style={{ paddingLeft: "30px" }}>
                <td className="" style={{ padding: "25px" }}>
                  <img
                    src={user.user.pfp ?? ""}
                    className="w-[10px] h-[10px]"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="flex">
                      {user.user.first_name ?? ""} {user.user.last_name ?? ""}
                    </p>
                    <p>{}</p>
                  </div>
                </td>
                <td className="flex gap-1 items-center bg-red-400 w-[10rem]" style={{ padding: "25px" }}>
                  <img src={user?.agent?.user?.pfp} className="w-[30px] h-[30px] rounded-full" />
                  <div className="flex flex-col gap-1">
                    <p>{user?.agent?.user?.first_name ?? ""} {" "}
                      {user?.agent?.user?.last_name ?? ""}
                    </p>
                    <p>{}</p>
                  </div>
                </td>
                <td className="">{user.amount ?? ""}</td>
                <td className="flex" style={{ padding: "25px" }}>
                  {} <Dot /> {user.time}
                </td>
                <td className="text-center">{user.status}</td>

                <Sheet>
                  <SheetTrigger>
                    <td className="text-center">i</td>
                  </SheetTrigger>
                  <SheetContent
                    className="bg-white flex flex-col gap-4"
                    style={{
                      padding: "15px",
                    }}
                  >
                    <SheetHeader>
                      <SheetTitle> Transaction Details</SheetTitle>
                      <SheetDescription className="flex flex-col gap-1">
                        <div
                          className="flex rounded-3xl gap-1 justify-between text-white"
                          style={{
                            background:
                              "linear-gradient(to right, #2AC769, #2C9455)",
                            padding: "20px",
                          }}
                        >
                          <div className="flex flex-col gap-5">
                            <p>Total earned</p>
                            <p>30000</p>
                          </div>
                          <div className="flex flex-col gap-5">
                            <p>Withdrawable</p>
                            <p>30000</p>
                          </div>
                        </div>
                        <div
                          className="bg-[#2AC7690D] flex flex-col gap-1 rounded-3xl"
                          style={{
                            padding: "10px",
                          }}
                        >
                          <p>
                            <span>Bank Name:</span> First Bank
                          </p>
                          <p>
                            <span>Account Number:</span>097654554
                          </p>
                        </div>
                        <div
                          className="flex flex-col gap-1 border-b"
                          style={{ padding: "10px" }}
                        >
                          <p>Witdrawal Request</p>
                          <div className="flex flex-col">
                            <div className="flex justify-between">
                              <p>3,000</p>
                              <p>Paid</p>
                            </div>
                            <div className="flex justify-between">
                              <p>3,000</p>
                              <p>Pay</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p>Transaction History</p>
                          <div>
                            <div className="flex justify-between bg-[#2AC7690D]">
                              <p>Date</p>
                              <p>Amount</p>
                            </div>
                            {[...Array(6)].map((item, index) => (
                              <div
                                className="flex justify-between"
                                style={{
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                }}
                              >
                                <p>12/02/233</p>
                                <p>3,000</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
