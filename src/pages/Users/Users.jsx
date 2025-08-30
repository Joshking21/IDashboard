import { InputAdornment, TextField } from "@mui/material";
import styles from "./Users.module.css";
import SvgIconRect from "../../../components/SvgIcon/svgIconRect";
import searchIcon from "@assets/icon/search-normal.svg";
import { useState } from "react";
import useGetUserSummary from "@/hooks/useGetUserSummary";
import UserTable from "@/components/UserTable/UserTable";
import { Button } from "@/components/ui/button";
import LoadingPage from "../loading";
import {
  ArrowLeft,
  Dot,
  DotIcon,
  ListFilter,
  Landmark,
  MapPin,
  Phone,
  MoveRight,
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
      padding: screenSize === "mobileS" ? "4px" : "6px",
      backgroundColor: "#2AC7690D",
    },

    tableCell: {
      padding:
        screenSize === "mobileS"
          ? "12px 4px"
          : screenSize === "mobileL"
          ? "16px 6px"
          : "25px",
      textAlign: "left",
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
      borderBottom: "1px solid #e0e0e0",
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
      pfp: Landmark,
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
          <section style={responsiveStyles.container}>
            <h1 className={styles.userCount}>
              User List
              <span>
                {usersSummary?.usersCount ?? "N/A"}
              </span>
            </h1>
            <UserTable userData={usersSummary?.totalUsers} state={setStater} />
          </section>
        )
      ) : loading ? (
        <LoadingPage />
      ) : (
        <section style={responsiveStyles.container}>
          <ArrowLeft
            onClick={() => setStater(true)}
            style={responsiveStyles.backButton}
          />

          {/* User Info Card */}
          <div style={responsiveStyles.userInfoCard}>
            {TopUserDetails?.map((item, index) => {
              const Icon = item.pfp;
              return (
                <div
                  key={index}
                  style={responsiveStyles.userInfoItem}
                  className="flex gap-3 rounded-full"
                >
                  {item.pfp && typeof item.pfp === "string" ? (
                    <img
                      src={item.pfp}
                      className="w-10 h-10 rounded-full border-2 border-white"
                      loading="lazy"
                    />
                  ) : item.pfp ? (
                    <Icon
                      className="w-10 h-10 border-2 border-white rounded-full text-white  "
                      style={{ padding: "10px" }}
                    />
                  ) : (
                    ""
                  )}
                  <div>
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: screenSize === "mobileS" ? "12px" : "14px",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: screenSize === "mobileS" ? "12px" : "14px",
                        fontWeight: "bold",
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
                }}
              >
                Request
              </p>
              {usersDetails?.requests?.length > 0 ? (
                usersDetails?.requests.map((item, index) => (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "4px",
                      }}
                    >
                      <div>
                        <p style={{ margin: "0 0 4px 0", fontSize: "13px" }}>
                          {item?.location}
                        </p>
                        <p style={{ margin: 0 }}>{item?.type}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
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
                          }}
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
                  >
                    N/A
                  </div>
                </div>
              )}
            </div>

            <div style={responsiveStyles.tourSection}>
              <p
                style={{
                  margin: "0 0 10px 0",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e0e0e0",
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
                          borderRadius: "16px",
                          paddingLeft: "20px",

                          paddingRight: "20px",
                          fontSize: screenSize === "mobileS" ? "12px" : "14px",
                        }}
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
                        }}
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
                            variant="link"
                            style={{
                              fontSize:
                                screenSize === "mobileS" ? "12px" : "14px",
                            }}
                          >
                            Transaction Details
                          </Button>
                        </SheetTrigger>
                        <SheetContent
                          style={{
                            padding: "15px",
                            width:
                              screenSize === "mobileS"
                                ? "100%"
                                : screenSize === "mobileM"
                                ? "100%"
                                : screenSize === "mobileL"
                                ? "80%"
                                : "400px",
                          }}
                        >
                          <SheetHeader>
                            <SheetTitle>Transaction Details</SheetTitle>
                            <SheetDescription
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                              }}
                            >
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
                                  <p style={{ margin: 0 }}>Total earned</p>
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    30000
                                  </p>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                >
                                  <p style={{ margin: 0 }}>Withdrawable</p>
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    30000
                                  </p>
                                </div>
                              </div>
                              <div
                                style={{
                                  backgroundColor: "#2AC7690D",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                  borderRadius: "24px",
                                  padding: "15px",
                                }}
                              >
                                <p style={{ margin: 0 }}>
                                  <span style={{ fontWeight: "bold" }}>
                                    Bank Name:
                                  </span>{" "}
                                  {usersDetails?.agent?.account?.bankName ||
                                    "N/A"}
                                </p>
                                <p style={{ margin: 0 }}>
                                  <span style={{ fontWeight: "bold" }}>
                                    Account Number:
                                  </span>{" "}
                                  {usersDetails?.agent?.account
                                    ?.accountNumber || "N/A"}
                                </p>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                  paddingBottom: "12px",
                                  borderBottom: "1px solid #e0e0e0",
                                }}
                              >
                                <p style={{ margin: 0, fontWeight: "bold" }}>
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
                                    <p style={{ margin: 0 }}>3,000</p>
                                    <p style={{ margin: 0, color: "#2C9455" }}>
                                      Paid
                                    </p>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <p style={{ margin: 0 }}>3,000</p>
                                    <p style={{ margin: 0, color: "#2C9455" }}>
                                      Pay
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
                                <p style={{ margin: 0, fontWeight: "bold" }}>
                                  Transaction History
                                </p>
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      padding: "8px",
                                      backgroundColor: "#2AC7690D",
                                    }}
                                  >
                                    <p style={{ margin: 0 }}>Date</p>
                                    <p style={{ margin: 0 }}>Amount</p>
                                  </div>
                                  {[...Array(6)].map((_, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "8px",
                                        borderBottom: "1px solid #f0f0f0",
                                      }}
                                    >
                                      <p style={{ margin: 0 }}>12/02/233</p>
                                      <p style={{ margin: 0 }}>3,000</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </SheetDescription>
                          </SheetHeader>
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
                              }}
                            >
                              <p style={{ margin: 0, fontWeight: "bold" }}>
                                Back of farnet
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: "14px",
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
                      >
                        <thead>
                          <tr style={responsiveStyles.tableHeader}>
                            <th
                              style={{
                                ...responsiveStyles.tableCell,
                                fontWeight: "bold",
                              }}
                            >
                              User Name
                            </th>
                            <th
                              style={{
                                ...responsiveStyles.tableCell,
                                fontWeight: "bold",
                              }}
                            >
                              User Number
                            </th>
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
                          {TableDetails2.map((user, index) => (
                            <tr key={index}>
                              <td style={responsiveStyles.tableCell}>
                                {user.name}
                              </td>
                              <td style={responsiveStyles.tableCell}>
                                {user.num}
                              </td>
                              <td style={responsiveStyles.tableCell}>
                                {user.location}
                              </td>
                              <td style={responsiveStyles.tableCell}>
                                {user.date} {user.time}
                              </td>
                              <td style={responsiveStyles.tableCell}>
                                {user.status}
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
