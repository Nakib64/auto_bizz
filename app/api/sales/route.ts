import { NextResponse } from "next/server"
import { getAuthToken, API_BASE_URL } from "@/lib/api/authorize"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    try {
        const token = await getAuthToken()

        const apiParams = new URLSearchParams()
        searchParams.forEach((value, key) => {
            // Map frontend params to API params if needed
            if (key === "minPrice") apiParams.append("priceMin", value)
            else if (key === "page") {
                // API uses cursor pagination, so 'page' param isn't directly used for fetching
                // but we might need to handle it if we were maintaining page state.
                // For now, we'll rely on 'after' and 'before' cursors passed from frontend.
            }
            else apiParams.append(key, value)
        })

        const response = await fetch(`${API_BASE_URL}/sales?${apiParams.toString()}`, {
            headers: {
                "X-AUTOBIZZ-TOKEN": token,
            },
        })

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()

        return NextResponse.json({
            data: data.results.Sales,
            pagination: data.pagination,
            totalSales: data.results.TotalSales // Optional: pass this through if needed
        })
    } catch (error) {
        console.error("Sales API Error:", error)
        return NextResponse.json({ error: "Failed to fetch sales data" }, { status: 500 })
    }
}
