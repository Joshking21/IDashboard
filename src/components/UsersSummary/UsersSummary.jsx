import styles from "./UsersSummary.module.css"
import userIcon from "@assets/icon/profile-2user.svg"
import userSingleIcon from "@assets/icon/profile.svg"
import sendIcon from "@assets/icon/send-2.svg"
import tourIcon from "@assets/icon/location-tick.svg"
import moneyIcon from "@assets/icon/money-send.svg"
import SvgIconStroke from "../../../components/SvgIcon/svgStroke"
import useGetSummary from "@/hooks/useGetSummary"
import { formatAmount } from "@/utils/formatAmount"


export default function UsersSummary() {
    const { data: summary, error, isLoading} = useGetSummary()
    const data = [
        {
            label: "Total Users",
            icon: userIcon,
            count: summary?.totalUsers ?? 0,
        },
        {
            label: "Total Agents",
            icon: userSingleIcon,
            count: summary?.totalAgents ?? 0
        },
        {
            label: "Total Request",
            icon: sendIcon,
            count: summary?.totalRequest ?? 0
        },
        {
            label: "Total Listing",
            icon: tourIcon,
            count: summary?.totalListing ?? 0
        }
    ]
    return (
        <div className={styles.container}>
            {data.map((info, index)=> (
                <UserItem key={index} icon={info.icon} caption={info.label} count={formatAmount(info.count)} />
            ))}
        </div>
    )
}

function UserItem({icon, caption, count, lightMode}){
    return(
        <div className={styles.userItem}>
            <div className={styles.svgCont}>
                <SvgIconStroke src={icon} height={"25px"} width={"25px"} fill="#fff" />
            </div>
            <div className={styles.textCont}>
                <p>{caption}</p>
                <p>{count}</p>
            </div>
        </div>
    )
}
