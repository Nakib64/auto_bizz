"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface Sale {
    _id: string
    date: string
    price: number
    customerEmail: string
    customerPhone: string
}

interface SalesTableProps {
    data: Sale[]
    loading?: boolean
}

export function SalesTable({ data, loading }: SalesTableProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const sortBy = searchParams.get("sortBy")
    const sortOrder = searchParams.get("sortOrder")

    const handleSort = (key: string) => {
        const params = new URLSearchParams(searchParams)
        if (sortBy === key && sortOrder === "asc") {
            params.set("sortOrder", "desc")
        } else {
            params.set("sortBy", key)
            params.set("sortOrder", "asc")
        }
        replace(`${pathname}?${params.toString()}`)
    }

    const getSortIcon = (key: string) => {
        if (sortBy !== key) return <ArrowUpDown className="ml-2 h-4 w-4 text-slate-400" />
        if (sortOrder === "asc") return <ArrowUp className="ml-2 h-4 w-4 text-blue-600" />
        return <ArrowDown className="ml-2 h-4 w-4 text-blue-600" />
    }

    if (loading) {
        return (
            <Card className="bg-white/70 backdrop-blur-md border-none shadow-sm">
                <div className="p-4 space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </Card>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Card className="bg-white/70 backdrop-blur-md border-none shadow-sm overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/50 sticky top-0 z-10 backdrop-blur-sm">
                            <TableRow>
                                <TableHead className="w-[150px] cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort("date")}>
                                    <div className="flex items-center">
                                        Date
                                        {getSortIcon("date")}
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort("price")}>
                                    <div className="flex items-center">
                                        Price
                                        {getSortIcon("price")}
                                    </div>
                                </TableHead>
                                <TableHead>Customer Email</TableHead>
                                <TableHead>Phone</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="wait">
                                {data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((sale, index) => (
                                        <motion.tr
                                            key={sale._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="group hover:bg-blue-50/50 transition-colors border-b border-slate-100 last:border-0"
                                        >
                                            <TableCell className="font-medium text-slate-700">{new Date(sale.date).toLocaleDateString()}</TableCell>
                                            <TableCell className="font-bold text-slate-900">${sale.price.toLocaleString()}</TableCell>
                                            <TableCell className="text-slate-600">{sale.customerEmail}</TableCell>
                                            <TableCell className="text-slate-600">{sale.customerPhone}</TableCell>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </motion.div>
    )
}
