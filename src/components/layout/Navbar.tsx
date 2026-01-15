import Link from 'next/link';
import { Search, UserCircle, Briefcase } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-gray-950 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Briefcase className="h-6 w-6" />
            <span>Contraktor</span>
        </Link>
        <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Explore
            </Link>
            <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                Admin
            </Link>
        </div>
        <div className="flex items-center gap-4">
             <button className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800">
                <Search className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800">
                <UserCircle className="h-6 w-6 text-gray-500" />
            </button>
        </div>
      </div>
    </nav>
  );
}
