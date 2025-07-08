import { InputAdornment, TextField } from "@mui/material"
import styles from "./Users.module.css"
import SvgIconRect from "../../../components/SvgIcon/svgIconRect"
import searchIcon from "@assets/icon/search-normal.svg"
import { useState } from "react"
import useGetUserSummary from "@/hooks/useGetUserSummary"
import UserTable from "@/components/UserTable/UserTable"

export default function Users() {
    const [ searchTerm, setSearchTerm ] = useState("")
    const { data: usersSummary, isLoading } = useGetUserSummary()
    
    console.log("users:",usersSummary)

    return (
        <section className={styles.container}>
            <h1 className={styles.userCount}>
                User List
                <span>
                    <div></div>
                    {usersSummary?.usersCount ?? "N/A"}
                </span>
            </h1>

            {/* search */}
            <div className={styles.searchWrapper}>
                <TextField 
                    placeholder="Search user list"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                    enterKeyHint='Search'
                    InputProps={{
                        // endAdornment: (
                        //   <Button 
                        //     onClick={(e)=> handleOpenSheet(e)}
                        //     className={styles.filterButton}
                        //     startIcon={<FilterList />}
                        //     sx={{
                        //         fontSize: "12px"
                        //     }}
                        //   >
                        //     Filter
                        //   </Button>
                        // ),
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SvgIconRect src={searchIcon} height={"20px"} width={"20px"} />
                            </InputAdornment>
                        ),
                        sx:{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '0.3px solid #1AB168',
                        },
                        }
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "50px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px",
                            border: "none"
                        }
                    }}
                />
            </div>

            {/* table */}
            <UserTable
                userData={usersSummary?.totalUsers}
            />
        </section>
    )
}
