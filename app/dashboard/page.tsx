"use client"

import { FilterBar } from "./components/FilterBar"
import { SalesChart } from "./components/SalesChart"
import { SalesTable } from "./components/SalesTable"
import { PaginationControls } from "./components/PaginationControls"
import { useSales } from "@/hooks/useSales"
import { motion } from "framer-motion"
import { Suspense } from "react"

function DashboardContent() {
    const { data, isLoading, isError } = useSales()

    if (isError) {
        return (
            <div className="flex items-center justify-center h-[50vh] text-red-500">
                Failed to load sales data. Please try again.
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
                    <p className="text-slate-500">Overview of your sales performance.</p>
                </div>
            </div>

            <FilterBar />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <SalesChart data={data?.data || []} loading={isLoading} />
            </div>

            <div className="space-y-4">
                <SalesTable data={data?.data || []} loading={isLoading} />
                <PaginationControls
                    cursors={data?.pagination || {}}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <DashboardContent />
        </Suspense>
    )
}
