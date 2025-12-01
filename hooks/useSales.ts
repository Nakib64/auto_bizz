import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

interface SalesResponse {
    data: any[]
    pagination: {
        before?: string
        after?: string
    }
    totalSales?: any[]
}

const fetchSales = async (queryString: string): Promise<SalesResponse> => {
    console.log(queryString)
    const response = await fetch(`/api/sales?${queryString}`)
    if (!response.ok) {
        throw new Error("Network response was not ok")
    }
    return response.json()
}

export function useSales() {
    const searchParams = useSearchParams()
    const queryString = searchParams.toString()

    return useQuery({
        queryKey: ["sales", queryString],
        queryFn: () => fetchSales(queryString),
        staleTime: 60 * 1000,
        placeholderData: (previousData) => previousData,
    })
}
