"use client"

import { Menu, X, Home } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-50/50 flex" suppressHydrationWarning>
            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
                <div className="p-6 border-b border-slate-100">
                    <Link href={'/'}>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            AutoBizz
                        </h1>
                    </Link>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                        <Home className="w-5 h-5" />
                        Dashboard
                    </a>
                    {/* Add more links here */}
                </nav>
                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            JD
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-slate-900">John Doe</p>
                            <p className="text-xs text-slate-500">Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-20">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        AutoBizz
                    </h1>

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64 p-0">
                            <div className="flex flex-col h-full">
                                <div className="p-6 border-b border-slate-100">
                                    <SheetTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Navigation Menu
                                    </SheetTitle>
                                </div>
                                <nav className="flex-1 p-4 space-y-2">
                                    <a
                                        href="#"
                                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Home className="w-5 h-5" />
                                        Dashboard
                                    </a>
                                    {/* Add more links here */}
                                </nav>
                                <div className="p-4 border-t border-slate-100">
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            JD
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium text-slate-900">John Doe</p>
                                            <p className="text-xs text-slate-500">Admin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </header>

                <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
