"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Search, Calendar, DollarSign, Mail, Phone } from "lucide-react"

export function FilterBar() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string, key: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set(key, term)
        } else {
            params.delete(key)
        }
        // Reset page when filters change
        params.set("page", "1")
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <Card className="p-4 mb-6 bg-white/70 backdrop-blur-md shadow-sm border-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Start Date
                    </Label>
                    <Input
                        id="startDate"
                        type="date"
                        className="h-9 bg-white/50"
                        onChange={(e) => handleSearch(e.target.value, "startDate")}
                        defaultValue={searchParams.get("startDate")?.toString()}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> End Date
                    </Label>
                    <Input
                        id="endDate"
                        type="date"
                        className="h-9 bg-white/50"
                        onChange={(e) => handleSearch(e.target.value, "endDate")}
                        defaultValue={searchParams.get("endDate")?.toString()}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="priceMin" className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> Min Price
                    </Label>
                    <Input
                        id="priceMin"
                        type="number"
                        placeholder="0.00"
                        className="h-9 bg-white/50"
                        onChange={(e) => handleSearch(e.target.value, "priceMin")}
                        defaultValue={searchParams.get("priceMin")?.toString()}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="customer@example.com"
                        className="h-9 bg-white/50"
                        onChange={(e) => handleSearch(e.target.value, "email")}
                        defaultValue={searchParams.get("email")?.toString()}
                    />
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234..."
                        className="h-9 bg-white/50"
                        onChange={(e) => handleSearch(e.target.value, "phone")}
                        defaultValue={searchParams.get("phone")?.toString()}
                    />
                </div>
            </div>
        </Card>
    )
}
