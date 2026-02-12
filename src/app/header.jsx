"use client";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Search, LogOut, Pizza, ChefHat } from "lucide-react";

export default function Headers() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((input) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (input) {
      params.set("query", input.trim());
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(input);
  }, 300);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-zinc-50 backdrop-blur">
      <div className="mx-auto flex items-center justify-between px-6 py-5">
        {/* LEFT: LOGO */}
        <div className="flex items-center group gap-3">
          <div className="p-2 bg-orange-100 rounded-2xl group-hover:bg-orange-200 transtion-colors">
            <ChefHat size={32} className="text-orange-600" />
          </div>
          <span className="text-4xl font-extrabold">
            Can<span className="text-orange-600">Cook</span>
          </span>
        </div>

        {/* CENTER: NAV*/}
        <nav className="hidden lg:flex items-center gap-2">
          {["HOME", "PANTRY", "STORE", "MY RECIPIES"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "")}`}
              className="text-black subpixel-antialiased px-4 py-2 text-base font-medium hover:text-orange-700 hover:bg-zinc-100 rounded-xl transition-all"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* RIGHT: SEARCH + LOGOUT */}
        <div className="flex items-center gap-4">
          {/* Search Bar  */}
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
            <input
              type="text"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get("query")?.toString()}
              placeholder="Search recipes..."
              className="w-64 rounded-2xl border-2 border-zinc-400 bg-zinc-50 pl-12 pr-4 py-3 text-base font-medium transition-all focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Logout Button */}
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-8 py-3 text-base font-black tracking-wide text-white shadow-lg hover:bg-orange-600 hover:-translate-y-1 active:translate-y-0 transition-all"
          >
            LOGOUT
            <LogOut size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
