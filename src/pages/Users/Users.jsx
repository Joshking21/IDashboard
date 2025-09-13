import { InputAdornment, TextField } from "@mui/material";
import styles from "./Users.module.css";
import { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import useGetUserSummary from "@/hooks/useGetUserSummary";
import UserTable from "@/components/UserTable/UserTable";
import { Button } from "@/components/ui/button";
import LoadingPage from "../loading";
import {
  ArrowLeft,
  ArrowRight,
  Dot,
  DotIcon,
  ListFilter,
  Landmark,
  MapPin,
  Phone,
  MoveRight,
  Search,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useGetUserDetails from "@/hooks/useGetUserDetailsSummary";
import useUserID from "@/stores/useUserID";

export default function Users() {
  const { userId } = useUserID();
  const { data: usersSummary, isLoading } = useGetUserSummary();
  const { data: usersDetails, isLoading: loading } = useGetUserDetails(userId);
  const [tableState, setTableState] = useState(true);
  const [stater, setStater] = useState(true);
  console.log(usersDetails);

  // Responsive breakpoints
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getContainerStyle = () => {
    if (windowWidth < 375) {
      return { padding: "6px" };
    } else if (windowWidth < 425) {
      return { padding: "8px" };
    } else if (windowWidth < 768) {
      return { padding: "10px" };
    } else if (windowWidth < 1024) {
      return { padding: "12px" };
    } else {
      return { padding: "12px" };
    }
  };

  const getUserInfoCardStyle = () => {
    if (windowWidth < 768) {
      return {
        display: "block",
        gap: "8px",
        padding: "8px",
        borderRadius: "16px",
        marginBottom: "12px",
      };
    } else {
      return {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        padding: "10px",
        borderRadius: "24px",
        marginBottom: "16px",
      };
    }
  };

  // Add resize listener (you might want to use a useEffect for this in a real app)
  // This is simplified for the example

  // Determine screen size category
  const getScreenSize = () => {
    if (windowWidth < 375) return "mobileS";
    if (windowWidth < 425) return "mobileM";
    if (windowWidth < 768) return "mobileL";
    if (windowWidth < 1024) return "tablet";
    if (windowWidth < 1440) return "laptop";
    return "laptopL";
  };

  const screenSize = getScreenSize();

  // Responsive styles
  const responsiveStyles = {
    // Container styles
    container: {
      padding:
        screenSize === "mobileS"
          ? "8px"
          : screenSize === "tablet"
          ? "12px"
          : "16px",
    },

    // User info card styles
    userInfoCard: {
      display:
        screenSize === "mobileS" ||
        screenSize === "mobileM" ||
        screenSize === "mobileL"
          ? "block"
          : "flex",
      flexWrap: "wrap",
      gap: "10px",
      background: "linear-gradient(to right, #2AC769, #2C9455)",
      padding: screenSize === "mobileS" ? "8px" : "10px",
      borderRadius: "24px",
      marginBottom: "16px",
    },

    userInfoItem: {
      flex:
        screenSize === "mobileS" ||
        screenSize === "mobileM" ||
        screenSize === "mobileL"
          ? "1 1 100%"
          : "1 1 0",
      minWidth: screenSize === "tablet" ? "45%" : "auto",
      marginBottom:
        screenSize === "mobileS" ||
        screenSize === "mobileM" ||
        screenSize === "mobileL"
          ? "10px"
          : "0",
      padding: screenSize === "mobileS" ? "4px" : "6px",
    },

    // Content area styles
    contentArea: {
      display: "flex",
      flexDirection:
        screenSize === "mobileS" ||
        screenSize === "mobileM" ||
        screenSize === "mobileL"
          ? "column"
          : "row",
      gap: "16px",
      marginBottom: "16px",
    },

    requestSection: {
      width:
        screenSize === "mobileS" ||
        screenSize === "mobileM" ||
        screenSize === "mobileL"
          ? "100%"
          : "40%",
      padding: "10px",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
    },

    tourSection: {
      flex: "1",
      padding: "10px",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
    },

    // Table styles
    tableHeader: {
      padding: screenSize === "mobileS" ? "4px" : "8px",
      backgroundColor: "#2AC7690D",
      color: "#888888",
    },

    tableCell: {
      padding:
        screenSize === "mobileS"
          ? "12px 4px"
          : screenSize === "mobileL"
          ? "16px 6px"
          : "20px",
      // borderBottom:"0.5px #888888 solid",
      textAlign: "left",
      fontSize: "12px",
    },

    // Button group styles
    buttonGroup: {
      display: "flex",
      flexDirection:
        screenSize === "mobileS" || screenSize === "mobileM" ? "column" : "row",
      gap: "8px",
      justifyContent: "space-between",
      alignItems:
        screenSize === "mobileS" || screenSize === "mobileM"
          ? "flex-start"
          : "center",
      padding: "10px",
    },

    filterGroup: {
      display: "flex",
      flexDirection:
        screenSize === "mobileS" || screenSize === "mobileM" ? "column" : "row",
      gap: "8px",
      alignItems: "center",
    },

    // Grid styles for posts
    postsGrid: {
      display: "grid",
      gridTemplateColumns:
        screenSize === "mobileS"
          ? "1fr"
          : screenSize === "mobileM"
          ? "1fr"
          : screenSize === "mobileL"
          ? "1fr"
          : screenSize === "tablet"
          ? "repeat(2, 1fr)"
          : "repeat(3, 1fr)",
      gap: "16px",
      padding: "16px",
    },

    // Back button
    backButton: {
      marginBottom: "16px",
      cursor: "pointer",
    },
  };

  const TableDetails2 = [
    {
      location: "farnech,Auchi Edo",
      date: "12/03/2022",
      time: "9:30AM - 12PM",
      status: "Completed",
      name: "Edafe Jesugare",
      num: "09123667232",
    },
    {
      location: "farnech,Auchi Edo",
      date: "12/03/2022",
      time: "9:30AM - 12PM",
      status: "Completed",
      name: "Edafe Jesugare",
      num: "09123667232",
    },
    {
      location: "farnech,Auchi Edo",
      date: "12/03/2022",
      time: "9:30AM - 12PM",
      status: "Completed",
      name: "Edafe Jesugare",
      num: "09123667232",
    },
  ];

  const TableDetails = [
    {
      location: "farnech,Auchi Edo",
      date: "12/03/2022",
      time: "9:30AM - 12PM",
      status: "Completed",
    },
    {
      location: "farnech,Auchi Edo",
      date: "12/03/2022",
      time: "9:30AM - 12PM",
      status: "Completed",
    },
    {
      location: "farnech,Auchi Edo",
      date: "12/03/2022",
      time: "9:30AM - 12PM",
      status: "Completed",
    },
  ];
  const TopUserDetails = [
    {
      title: "Name",
      pfp: usersDetails?.pfp || "",
      desc: `${usersDetails?.first_name || ""} ${
        usersDetails?.last_name || ""
      }`,
    },
    {
      title: "Phone Number",
      pfp: Phone,
      desc: usersDetails?.phone_number || "",
    },
    {
      title: "Location",
      pfp: MapPin,
      desc: "Auchi Edo State",
    },
    {
      title: "Bank Name",
      pfp: "/bank.svg",
      desc: usersDetails?.agent?.account?.bankName || "N/A",
    },
    {
      title: "Account Number",
      pfp: "",
      desc: usersDetails?.agent?.account?.accountNumber || "N/A",
    },
  ];

  return (
    <>
      {stater ? (
        isLoading ? (
          <LoadingPage />
        ) : (
          <section style={getContainerStyle()}>
            <div
              className="border rounded-lg"
              style={{
                padding: "14px",
                paddingTop: "33px",
                paddingBottom: "33px",
              }}
            >
              <h1 className={styles.userCount}>
                User List
                <Dot className="text-[#1AB168] " />
                <span className="text-[#1AB168]">
                  {usersSummary?.usersCount ?? "N/A"}
                </span>
              </h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width:
                    screenSize === "mobileS" || "mobileM" || "mobileL"
                      ? "100%"
                      : "100%",
                  padding: "12px",
                  borderRadius: "22px",
                }}
                className="border border-[#8C8C8C42] shadow-sm"
              >
                <Search
                  size={
                    screenSize === "mobileS" || "mobileM" || "mobileL" ? 16 : 20
                  }
                  className="text-[#888888]"
                />
                <input
                  placeholder="Search"
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize:
                      screenSize === "mobileS" || "mobileM" || "mobileL"
                        ? "0.8rem"
                        : "0.9rem",
                    background: "transparent",
                  }}
                />
              </div>
              <UserTable
                userData={usersSummary?.totalUsers}
                state={setStater}
                windowWidth={windowWidth}
              />
            </div>
          </section>
        )
      ) : loading ? (
        <LoadingPage />
      ) : (
        <section style={getContainerStyle()} className="">
          <ArrowLeft
            onClick={() => setStater(true)}
            style={{ padding: "8px", marginBottom: "16px", cursor: "pointer" }}
            className="border bg-[#2AC7690D] border-[#1AB168] rounded-full w-[34px] h-[34px] hover:opacity-50"
          />

          {/* User Info Card */}
          <div
            style={{
              background: "linear-gradient(to right, #2AC769, #2C9455)",
              ...getUserInfoCardStyle(),
            }}
          >
            {TopUserDetails?.map((item, index) => {
              const Icon = item.pfp;
              return (
                <div
                  key={index}
                  style={responsiveStyles.userInfoItem}
                  className="flex gap-3 rounded-full items-center w-fit justify-center"
                >
                  {item.pfp && typeof item.pfp === "string" ? (
                    <img
                      src={item.pfp}
                      className={`w-10 h-10 rounded-full  border-2 border-white`}
                      loading="lazy"
                      style={{ padding: index === 3 ? "4px" : "" }}
                    />
                  ) : item.pfp ? (
                    <Icon
                      className="w-10 h-10 border-2 border-white rounded-full text-white  "
                      style={{ padding: "5px" }}
                    />
                  ) : (
                    ""
                  )}
                  {index === 4 && (
                    <ArrowRight
                      className="w-5 text-white "
                      style={{ marginRight: "20px" }}
                    />
                  )}
                  <div className={``}>
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: screenSize === "mobileS" ? "12px" : "14px",
                        color: "white",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: screenSize === "mobileS" ? "14px" : "16px",
                        color: "white",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Request and Tour Sections */}
          <div style={responsiveStyles.contentArea}>
            <div style={responsiveStyles.requestSection}>
              <p
                style={{
                  margin: "0 0 10px 0",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e0e0e0",
                  fontWeight: "bold",
                  fontFamily: "poppins",
                }}
              >
                Request
              </p>
              <div className="flex flex-col gap-3">
                {usersDetails?.requests?.length > 0 ? (
                  usersDetails?.requests.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "4px",
                      }}
                      className=""
                    >
                      <div className="text-[12px]">
                        <p style={{ margin: "0 0 4px 0" }}>{item?.location}</p>
                        <p style={{ margin: 0 }}>{item?.type}</p>
                      </div>
                      <div style={{ textAlign: "right", fontSize: "8px" }}>
                        <p style={{ margin: "0 0 4px 0" }}>
                          {
                            new Date(item?.createdAt)
                              .toISOString()
                              .split("T")[0]
                          }
                        </p>
                        <p
                          style={{
                            margin: 0,
                            display: "flex",
                            alignItems: "center",
                            color: "#888888",
                          }}
                          className="text-[#888888]"
                        >
                          Eyes on it{" "}
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                            className="text-green-700 text-lg"
                          >
                            <Dot />
                            {item?.eyesOnIt}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "4px",
                      }}
                      className=""
                    >
                      N/A
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={responsiveStyles.tourSection}>
              <p
                style={{
                  margin: "0 0 10px 0",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e0e0e0",
                  fontWeight: "bold",
                  fontFamily: "poppins",
                }}
              >
                Tour
              </p>
              <div style={{ overflowX: "auto" }}>
                {usersDetails?.tours > 0 ? (
                  <table
                    style={{
                      width: "100%",
                      minWidth: screenSize === "mobileS" ? "500px" : "auto",
                    }}
                  >
                    <thead>
                      <tr style={responsiveStyles.tableHeader}>
                        <th
                          style={{
                            ...responsiveStyles.tableCell,
                            fontWeight: "bold",
                          }}
                        >
                          Location
                        </th>
                        <th
                          style={{
                            ...responsiveStyles.tableCell,
                            fontWeight: "bold",
                          }}
                        >
                          Date/Time
                        </th>
                        <th
                          style={{
                            ...responsiveStyles.tableCell,
                            fontWeight: "bold",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersDetails?.tours?.map((user, index) => {
                        const date = user?.daySelected
                          ? new Date(user.daySelected)
                              .toISOString()
                              .split("T")[0]
                          : "N/A";
                        return (
                          <tr key={index}>
                            <td style={responsiveStyles.tableCell}>
                              Auchi Edo State
                            </td>
                            <td style={responsiveStyles.tableCell}>
                              {date}
                              <DotIcon
                                style={{
                                  display: "inline",
                                  margin: "0 4px",
                                  color: "#2C9455",
                                  fontSize: "20px",
                                }}
                              />
                              {user?.tourAvailableAt || "N/A"}
                            </td>
                            <td style={responsiveStyles.tableCell}>
                              {user.status || "N/A"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="">N/A</div>
                )}
              </div>
            </div>
          </div>

          {/* Agent Management Board */}
          <div
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <p
              style={{
                margin: 0,
                padding: "10px",
                borderBottom: "1px solid #e0e0e0",
                fontWeight: "bold",
                paddingLeft: "20px",
                paddingRight: "20px",
                fontFamily: "poppins",
              }}
            >
              User as Agent Management Board
            </p>
            <div>
              {usersDetails?.agent?.account ? (
                <div>
                  <div style={responsiveStyles.buttonGroup}>
                    <div
                      style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                    >
                      <Button
                        variant={tableState ? "default" : "outline"}
                        style={{
                          borderRadius: "20px",
                          paddingLeft: "32px",
                          paddingRight: "32px",
                          fontSize: screenSize === "mobileS" ? "12px" : "14px",
                          fontWeight: "500",
                        }}
                        className={
                          tableState
                            ? "border-[#1AB168] border bg-white font-[500] text-[#1AB168] shadow-sm hover:bg-[#ebebeb]/50 "
                            : "border-[#888888] border font-[500] text-[#888888] shadow-sm hover:bg-[#ebebeb]/50"
                        }
                        onClick={() => setTableState(true)}
                      >
                        Post
                      </Button>
                      <Button
                        variant={!tableState ? "default" : "outline"}
                        style={{
                          borderRadius: "16px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          fontSize: screenSize === "mobileS" ? "12px" : "14px",
                        }}
                        className={
                          !tableState
                            ? "border-[#1AB168]  border bg-white font-[500] text-[#1AB168] shadow-sm hover:bg-[#ebebeb]/50 "
                            : "border-[#888888]  border font-[500] text-[#888888] shadow-sm hover:bg-[#ebebeb]/50"
                        }
                        onClick={() => setTableState(false)}
                      >
                        Tour Management
                      </Button>
                    </div>

                    <div style={responsiveStyles.filterGroup}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          backgroundColor: "#2AC7690D",
                          borderRadius: "62px",
                          color: "#1AB168",
                          padding: "10px",
                        }}
                        className="hover:opacity-70"
                      >
                        <ListFilter size={16} />
                        <span
                          style={{
                            fontSize:
                              screenSize === "mobileS" ? "12px" : "14px",
                          }}
                        >
                          Filter
                        </span>
                      </div>
                      <Sheet>
                        <SheetTrigger>
                          <Button
                            variant="ghost"
                            style={{
                              fontSize:
                                screenSize === "mobileS" ? "12px" : "14px",
                            }}
                            className={
                              "hover:bg-white text-[#888888] hover:text-black"
                            }
                          >
                            Transaction Details
                            <MoveRight />
                          </Button>
                        </SheetTrigger>
                        <SheetContent
                          style={{
                            padding: "16px 0px",
                            width:
                              screenSize === "mobileS"
                                ? "100%"
                                : screenSize === "mobileM"
                                ? "100%"
                                : screenSize === "mobileL"
                                ? "80%"
                                : "400px",
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
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "12px",
                            }}
                            className="overflow-y-auto"
                          >
                            <div style={{ padding: "0px 16px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  borderRadius: "24px",
                                  justifyContent: "space-between",
                                  color: "white",
                                  background:
                                    "linear-gradient(to right, #2AC769, #2C9455)",
                                  padding: "20px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                >
                                  <p
                                    style={{
                                      margin: 0,
                                      fontWeight: "400",
                                      fontSize: "18px",
                                    }}
                                  >
                                    Total earned
                                  </p>
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: "22px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    ₦30000
                                  </p>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                    fontSize: "22px",
                                  }}
                                >
                                  <p style={{ margin: 0 }}>Withdrawable</p>
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: "1.2rem",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    ₦30000
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                backgroundColor: "#2AC7690D",
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                                padding: "16px",
                              }}
                            >
                              <p style={{ margin: 0 }}>
                                <span style={{ color: "#888888" }}>
                                  Bank Name:
                                </span>{" "}
                                <span
                                  className="text-black"
                                  style={{ margin: 0, fontWeight: "500" }}
                                >
                                  {usersDetails?.agent?.account?.bankName ||
                                    "N/A"}
                                </span>
                              </p>
                              <p style={{ margin: 0 }}>
                                <span className="text-[#888888]">
                                  Account Number:
                                </span>{" "}
                                <span className="text-black ">
                                  {" "}
                                  {usersDetails?.agent?.account
                                    ?.accountNumber || "N/A"}
                                </span>
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                                paddingBottom: "12px",
                                padding: "10px 16px",
                                borderBottom: "1px solid #e0e0e0",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: "16px",
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
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <p style={{ margin: 0 }}>₦3,000</p>
                                  <p style={{
                                          color: "#FF4D4F",
                                          padding: "2px",
                                          paddingLeft: "20px",
                                          paddingRight: "20px",
                                        }}
                                        className="text-[#A66F18] border hover:opacity-70 border-[#A66F18] rounded-3xl bg-[#F9EFDE] ">
                                    Paid
                                  </p>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <p style={{ margin: 0 }}>₦3,000</p>
                                  <p  style={{
                                          color: "#1AB168",
                                          padding: "2px",
                                          paddingLeft: "20px",
                                          paddingRight: "20px",
                                        }}
                                        className="border border-[#1AB168] bg-[#2AC7690D] rounded-3xl">
                                    Paid
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                              }}
                            >
                              <p
                                style={{
                                marginBottom: "8px",
                                fontSize: "16px",
                                  fontWeight: "bold",
                                  padding: "5px 16px",
                                color: "#888888",
                                }}
                              >
                                Transaction History
                              </p>
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                     padding: "5px 16px",
                                  borderRadius: "8px",
                                  marginBottom: "8px",
                                    backgroundColor: "#2AC7690D",
                                  }}
                                >
                                  <p style={{ margin: 0 }}  className="text-[#2D2D2D] text-[22px]">Date</p>
                                  <p style={{ margin: 0 }}  className="text-[#2D2D2D] text-[22px]">Amount</p>
                                </div>
                                {[...Array(6)].map((_, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      padding: "8px 12px",
                                    }}
                                  >
                                    <p style={{ margin: 0 }} className="text-[#888888] text-[20px]">12/02/233</p>
                                    <p style={{ margin: 0 }}>3,000</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>

                  {/* Content based on tableState */}
                  {tableState ? (
                    <div style={responsiveStyles.postsGrid}>
                      {[...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          style={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            padding: "12px",
                          }}
                        >
                          <div
                            style={{
                              height: "150px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "4px",
                              marginBottom: "8px",
                            }}
                          ></div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                                flexWrap: "nowrap",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "bold",
                                  fontSize: "12px",
                                }}
                              >
                                Back of farnet
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: "12px",
                                  color: "#666",
                                }}
                              >
                                Rent fee:15000 Agent Fee:$12,000
                              </p>
                            </div>
                            <p
                              style={{
                                margin: 0,
                                display: "flex",
                                alignItems: "center",
                                color: "#2C9455",
                                fontSize: "10.5px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                borderRadius: "20px",
                                backgroundColor: "#F0F0F0",
                              }}
                            >
                              Paid for
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table
                        style={{
                          width: "100%",
                          minWidth: screenSize === "mobileS" ? "600px" : "auto",
                        }}
                        className="border-none"
                      >
                        <thead style={{ padding: "8px" }}>
                          <tr
                            style={{
                              ...responsiveStyles.tableHeader,
                              padding: "8px",
                            }}
                            className=""
                          >
                            <th
                              style={{ paddingLeft: "15px" }}
                              className="text-left"
                            >
                              User Name
                            </th>
                            <th
                              style={{ paddingLeft: "15px" }}
                              className="text-left"
                            >
                              User Number
                            </th>
                            <th
                              style={{ paddingLeft: "15px" }}
                              className="text-left"
                            >
                              Location
                            </th>
                            <th
                              style={{ paddingLeft: "15px" }}
                              className="text-left"
                            >
                              Date/Time
                            </th>
                            <th
                              style={{ paddingLeft: "15px" }}
                              className="text-left"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {TableDetails2.map((user, index) => (
                            <tr key={index} className="text-[#888888]">
                              <td style={responsiveStyles.tableCell}>
                                {user.name}
                              </td>
                              <td style={responsiveStyles.tableCell}>
                                {user.num}
                              </td>
                              <td style={responsiveStyles.tableCell}>
                                {user.location}
                              </td>
                              <td
                                style={responsiveStyles.tableCell}
                                className="text-[#2D2D2D]"
                              >
                                {user.date} {user.time}
                              </td>
                              <td style={responsiveStyles.tableCell}>
                                <div
                                  className={
                                    user.status === "Completed"
                                      ? "text-[#1AB168] bg-[#2AC7690D]"
                                      : ""
                                  }
                                  style={{
                                    textAlign: "center",
                                    padding: "8px",
                                    borderRadius: "16px",
                                  }}
                                >
                                  {user.status}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-[7rem] flex items-center justify-center">
                  {" "}
                  Not an Agent❌
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
