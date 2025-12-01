import { NextResponse } from "next/server"
import { getAuthToken, API_BASE_URL } from "@/lib/api/authorize"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    try {
        const token = await getAuthToken()

        const apiParams = new URLSearchParams()

        const paramMapping: Record<string, string> = {
            minPrice: "priceMin",
        }

        const expectedParams = [
            "startDate", "endDate", "priceMin",
            "email", "phone",
            "sortBy", "sortOrder",
            "after", "before"
        ]

        searchParams.forEach((value, key) => {
            if (key === "page") return
            const apiKey = paramMapping[key] || key
            apiParams.set(apiKey, value)
        })

        expectedParams.forEach(key => {
            if (!apiParams.has(key)) {
                apiParams.set(key, "")
            }
        })

        const finalUrl = `${API_BASE_URL}/sales?${apiParams.toString()}`

        const response = await fetch(finalUrl, {
            headers: {
                "X-AUTOBIZZ-TOKEN": token,
            },
        })

        const raw = await response.text()

        if (!response.ok) {
            return NextResponse.json({
                error: "Sales API error",
                status: response.status,
                response: raw,
            }, { status: 500 })
        }

        const data = JSON.parse(raw)

        return NextResponse.json({
            data: data.results?.Sales ?? [],
            pagination: data.pagination ?? {},
            totalSales: data.results?.TotalSales ?? []
        })

    } catch (error: any) {
        console.error("Sales API Error:", error)
        return NextResponse.json(
            { error: error.message || "Failed to fetch sales data" },
            { status: 500 }
        )
    }
}
