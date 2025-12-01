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

const fetchSales = async (searchParams: URLSearchParams): Promise<SalesResponse> => {
    const response = await fetch(`/api/sales?${searchParams.toString()}`)
    if (!response.ok) {
        throw new Error("Network response was not ok")
    }
    return response.json()
}

export function useSales() {
    const searchParams = useSearchParams()

    return useQuery({
        queryKey: ["sales", searchParams.toString()],
        queryFn: () => fetchSales(searchParams),
        staleTime: 60 * 1000, // 1 minute
        placeholderData: (previousData) => previousData,
    })
}
