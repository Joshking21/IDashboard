import { baseUrl } from "@/constants/urls";
import { sendHttp } from "@/utils/sendHttp";
import { useQuery } from "@tanstack/react-query";

async function getTransactionDetailSummary(userId) {
  try {
    const method = "GET";
    const URL = `${baseUrl}/admin/transactions/user/${userId}`;
    const token = localStorage.getItem("accessToken");
    const data = await sendHttp(method, URL, token);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default function useGetTransactionDetailSummary(userId) {
  return useQuery({
    queryKey: ["summaryTransactionsDetails", userId],
    queryFn: () => getTransactionDetailSummary(userId),
    enabled: !!userId,
  });
}
