import { Sidebar } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50/50 flex">
            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        AutoBizz
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                        <Sidebar className="w-5 h-5" />
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
                <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4 sticky top-0 z-20">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        AutoBizz
                    </h1>
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
