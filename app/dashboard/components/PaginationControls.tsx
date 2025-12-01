"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

interface PaginationControlsProps {
    cursors: {
        before?: string
        after?: string
    }
    isLoading?: boolean
}

export function PaginationControls({ cursors, isLoading }: PaginationControlsProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handlePageChange = (direction: "before" | "after") => {
        const cursor = cursors[direction]
        if (!cursor) return

        const params = new URLSearchParams(searchParams)
        // Clear existing cursors
        params.delete("before")
        params.delete("after")
        // Set new cursor
        params.set(direction, cursor)

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange("before")}
                disabled={!cursors.before || isLoading}
                className="bg-white/70 backdrop-blur-md shadow-sm hover:bg-white/90 transition-all"
            >
                {isLoading && !cursors.after ? ( // Heuristic: loading previous page
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                    <ChevronLeft className="h-4 w-4 mr-2" />
                )}
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange("after")}
                disabled={!cursors.after || isLoading}
                className="bg-white/70 backdrop-blur-md shadow-sm hover:bg-white/90 transition-all"
            >
                Next
                {isLoading && !cursors.before ? ( // Heuristic: loading next page
                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                ) : (
                    <ChevronRight className="h-4 w-4 ml-2" />
                )}
            </Button>
        </div>
    )
}
