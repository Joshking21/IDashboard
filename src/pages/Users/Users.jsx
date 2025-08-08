import { InputAdornment, TextField } from "@mui/material";
import styles from "./Users.module.css";
import SvgIconRect from "../../../components/SvgIcon/svgIconRect";
import searchIcon from "@assets/icon/search-normal.svg";
import { useState } from "react";
import useGetUserSummary from "@/hooks/useGetUserSummary";
import UserTable from "@/components/UserTable/UserTable";
import { Button } from "@/components/ui/button";
import { Dot, ListFilter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Users() {
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const { data: usersSummary, isLoading } = useGetUserSummary();
  const [tableState, setTableState] = useState(true);
  //   console.log("users:", usersSummary);
  
  console.log("fjfj");

  const TableDetails2 = [
    {
      location: "farnech,Auchi Edo",
      date: "12/03/2022",
      time: "9:30AM - 12PM",
      status: "Completed",
      name:"Edafe Jesugare",
      num:"09123667232"
    },
    {
      location: "farnech,Auchi Edo",
      date: "12/03/2022",
      time: "9:30AM - 12PM",
      status: "Completed",
      name:"Edafe Jesugare",
      num:"09123667232"
    },
    {
      location: "farnech,Auchi Edo",
      date: "12/03/2022",
      time: "9:30AM - 12PM",
      status: "Completed",
      name:"Edafe Jesugare",
      num:"09123667232"
    },
  ];
    // const TableDetails = [
//     {
//       location: "farnech,Auchi Edo",
//       date: "12/03/2022",
//       time: "9:30AM - 12PM",
//       status: "Completed",
//     },
//     {
//       location: "farnech,Auchi Edo",
//       date: "12/03/2022",
//       time: "9:30AM - 12PM",
//       status: "Completed",
//     },
//     {
//       location: "farnech,Auchi Edo",
//       date: "12/03/2022",
//       time: "9:30AM - 12PM",
//       status: "Completed",
//     },
//   ];

  return (
    // <section className={styles.container}>
    //   <h1 className={styles.userCount}>
    //     User List
    //     <span>
    //       <div></div>
    //       {usersSummary?.usersCount ?? "N/A"}
    //     </span>
    //   </h1>
    //   table
    //   <UserTable userData={usersSummary?.totalUsers} />
    // </section>
    <section className="w-full">
      <div
        className="flex gap-3 rounded-3xl justify-between w-full "
        style={{
          background: "linear-gradient(to right, #2AC769, #2C9455)",
          padding: "10px",
        }}
      >
        {[
          "Name",
          "Phone Number",
          "Location",
          "Bank Name",
          "Account Number",
        ].map((item, index) => (
          <div key={index} className="w-full ">
            <div>
              <p>{item}</p>
              <p>Eddie</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 w-full">
        <div
          className="border rounded-lg w-[40%]"
          style={{
            padding: "10px",
          }}
        >
          <p className="border-b"> Request </p>
          <div>
            <div className="flex justify-between border">
              <div className="">
                <p className="text-[13px]">Back of fernet, Auchi, Edo State</p>
                <p>Self-contain</p>
              </div>
              <div>
                <p>2025-06-23</p>
                <p className="flex">
                  Eyes on it{" "}
                  <span className="flex">
                    <Dot />3
                  </span>
                  {console.log("fjfj")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="border rounded-lg flex-1 flex flex-col"
          style={{
            padding: "10px",
          }}
        >
          <p className="border-b"> Request </p>
          <table className="min-w-full ">
            <thead className="bg-[#2AC7690D] " style={{ padding: "10px" }}>
              <tr>
                <th className="text-left" style={{ padding: "6px" }}>
                  Location
                </th>
                <th className="text-left">Date/Time</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {TableDetails2.map((user,index) => (
                <tr
                  key={index}
                  className=""
                  style={{ paddingLeft: "30px" }}
                >
                  <td className="text-left" style={{ padding: "25px" }}>
                    {user.location}
                  </td>
                  <td className="text-left">
                    {user.date}
                    {user.time}
                  </td>
                  <td className="text-left">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="border">
        <p
          className="border-b"
          style={{
            padding: "10px",
          }}
        >
          User as Agent Management Board
        </p>
        <div className="flex justify-between">
          <div className="flex gap-2" style={{ padding: "10px" }}>
            <Button
              variant="outline"
              className="rounded-2xl"
              style={{ paddingLeft: "30px", paddingRight: "30px" }}
            >
              Post
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl"
              style={{ paddingLeft: "30px", paddingRight: "30px" }}
            >
              Tour Management
            </Button>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <div className="flex">
              <ListFilter />
              Filter
            </div>
             <Sheet>
                              <SheetTrigger>
                               
            <Button variant="link">Transaction Details</Button>
                              </SheetTrigger>
                              <SheetContent className="bg-white flex flex-col gap-4" style={{
                                        padding: "15px",
                                      }} >
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
                                    <div className="flex flex-col gap-1 border-b" style={{padding:"10px"}}>
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
                                            {
                                                [...Array(6)].map((item,index)=>(
                                                    <div className="flex justify-between" style={{paddingTop:"5px",paddingBottom:"5px"}}>
                                                        <p>
                                                            12/02/233
                                                        </p>
                                                        <p>
                                                            3,000
                                                        </p>
                                                    </div>
                                                ))
                                            }
            
                                        </div>
                                    </div>
                                  </SheetDescription>
                                </SheetHeader>
                              </SheetContent>
                            </Sheet>
          </div>
        </div>
        {!tableState && (
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <img />
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <p>Back of farnet</p>
                    <p>Rent fee:15000 Agent Fee:$12,000</p>
                  </div>
                  <p className="flex items-center justify-center">Paid for</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {tableState && (
          <table className="min-w-full ">
            <thead className="bg-[#2AC7690D] " style={{ padding: "10px" }}>
              <tr>
                <th className="text-left" style={{ padding: "6px" }}>
                  User Name
                </th>
                <th className="text-left">User Number</th>
                <th className="text-left">Location</th>
                <th className="text-left">Date/Time</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {TableDetails2.map((user,index) => (
                <tr
                  key={index}
                  className=""
                  style={{ paddingLeft: "30px" }}
                >
                  <td className="text-left" style={{ padding: "25px" }}>
                    {user.name}
                  </td>
                   <td className="text-left">
                    {user.num}
                  </td>
                   <td className="text-left">
                    {user.location}
                  </td>
                  <td className="text-left">
                    {user.date}
                    {user.time}
                  </td>
                  <td className="text-left">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
