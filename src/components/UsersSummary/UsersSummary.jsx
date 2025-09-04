import styles from "./UsersSummary.module.css"
import userIcon from "@assets/icon/profile-2user.svg"
import userSingleIcon from "@assets/icon/profile.svg"
import sendIcon from "@assets/icon/send-2.svg"
import tourIcon from "@assets/icon/location-tick.svg"
import SvgIconStroke from "../../../components/SvgIcon/svgStroke"
import useGetSummary from "@/hooks/useGetSummary"
import { formatAmount } from "@/utils/formatAmount"

export default function UsersSummary({ windowWidth }) {
    const { data: summary, error, isLoading} = useGetSummary()
    
    const getContainerStyle = () => {
      if (windowWidth < 375) { // mobileS
        return { 
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '4px',
          padding:"0.2rem"
        };
      } else if (windowWidth < 768) { // mobileM, mobileL
        return { 
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '0px',
          padding:"0rem"
        };
      } else if (windowWidth < 1024) { // tablet
        return { 
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        };
      } else { // laptop and larger
        return { 
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        };
      }
    };

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
        <div className={styles.container} style={getContainerStyle()}>
            {data.map((info, index)=> (
                <UserItem 
                  key={index} 
                  icon={info.icon} 
                  caption={info.label} 
                  count={formatAmount(info.count)} 
                  windowWidth={windowWidth}
                />
            ))}
        </div>
    )
}

function UserItem({icon, caption, count, windowWidth}){
    return(
        <div className={styles.userItem} style={{
          padding: windowWidth < 768 ? '12px' : '16px'
        }}>
            <div className={styles.svgCont} style={{
              width: windowWidth < 768 ? '36px' : '44px',
              height: windowWidth < 768 ? '36px' : '44px'
            }}>
                <SvgIconStroke src={icon} height={windowWidth < 768 ? "20px" : "25px"} width={windowWidth < 768 ? "20px" : "25px"} fill="#fff" />
            </div>
            <div className={styles.textCont}>
                <p style={{ fontSize: windowWidth < 768 ? '12px' : '14px' }}>{caption}</p>
                <p style={{ fontSize: windowWidth < 768 ? '16px' : '18px', fontWeight: 'bold' }}>{count}</p>
            </div>
        </div>
    )
}