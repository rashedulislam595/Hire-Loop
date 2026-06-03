"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/company" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  // console.log(session)

  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut(); // ✅ FIXED (correct way)

      toast.success("Successfully logged out.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });

      // optional better UX than reload
      window.location.href = "/";
    } catch (error) {
      console.error(error);

      toast.error("Failed to logout. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0B10]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={100}
            priority
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-4 lg:flex">

          {/* LINKS */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-full px-5 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-white/10" />

          {/* AUTH SECTION */}
          {!isPending && !user ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign In
              </Link>

              <Button
                as={Link}
                href="/register"
                className="rounded-full bg-white px-5 text-black hover:bg-gray-200"
              >
                Get Started
              </Button>
            </>
          ) : (
            !isPending && (
              <div className="flex items-center gap-3">

                {/* USER INFO */}
                <div className="flex items-center gap-3 rounded-full  px-3 py-2">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                </div>

                {/* LOGOUT */}
                <Button
                  size="sm"
                  variant="bordered"
                  onPress={handleLogout}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </Button>
              </div>
            )
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center lg:hidden text-white"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isMenuOpen ? "max-h-[500] border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="space-y-5 px-4 py-5">

          {/* LINKS */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium text-gray-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}

          <div className="border-t border-white/10 pt-5">

            {!isPending && !user ? (
              <div className="flex flex-col gap-4">

                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-indigo-400"
                >
                  Sign In
                </Link>

                <Button
                  as={Link}
                  href="/register"
                  className="w-full rounded-xl bg-white text-black hover:bg-gray-200"
                >
                  Get Started
                </Button>
              </div>
            ) : (
              !isPending && (
                <div className="space-y-4">

                  {/* MOBILE USER */}
                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white">
                        {user?.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="bordered"
                    onPress={handleLogout}
                    className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    Logout
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}