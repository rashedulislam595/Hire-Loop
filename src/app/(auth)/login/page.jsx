"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, Button } from "@heroui/react";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiGithub,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const formValue = Object.fromEntries(formData.entries());

      const email = formValue.email?.toString();
      const password = formValue.password?.toString();

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (data) {
        toast.success("Sign in successful!", {
          theme: "dark",
          position: "top-center",
        });

        router.push(redirectTo);
      } else {
        toast.error(error?.message || "Login failed", {
          theme: "dark",
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        theme: "dark",
        position: "top-center",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden border border-[#1E1E26] bg-[#0D0D12]">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between p-14 bg-linear-to-br from-[#12121A] to-[#0B0B10] border-r border-[#1E1E26]">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-violet-500"></div>
              <h2 className="text-lg font-semibold">JobStack</h2>
            </div>

            <h1 className="text-5xl font-semibold leading-tight mb-6">
              Welcome back
              <br />
              to your career hub
            </h1>

            <p className="text-gray-400 text-lg leading-8 max-w-md">
              Discover better opportunities, track applications,
              and grow your career with smart job insights.
            </p>

            <Image
              src="/images/job.jpg"
              alt="job"
              width={300}
              height={300}
              className="w-full my-5 rounded-md"
            />
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <p>Trusted by 10k+ professionals</p>

            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-violet-500 border-2 border-black" />
              <div className="w-10 h-10 rounded-full bg-pink-500 border-2 border-black" />
              <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-black" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <Card className="w-full bg-transparent shadow-none border-none">
            <CardContent className="p-0">

              {/* MOBILE LOGO */}
              <div className="flex lg:hidden items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                <h2 className="text-lg font-semibold">JobStack</h2>
              </div>

              {/* HEADING */}
              <div className="mb-10">
                <h2 className="text-4xl font-semibold mb-3">
                  Sign In
                </h2>
                <p className="text-gray-400">
                  Enter your credentials to continue
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSignIn} className="space-y-5">

                {/* EMAIL */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Email
                  </label>

                  <div className="h-14 rounded-2xl bg-[#111116] border border-[#22222B] px-4 flex items-center gap-3">
                    <FiMail className="text-gray-500" size={18} />

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Password
                  </label>

                  <div className="h-14 rounded-2xl bg-[#111116] border border-[#22222B] px-4 flex items-center gap-3">
                    <FiLock className="text-gray-500" size={18} />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-white transition"
                    >
                      {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                    </button>
                  </div>
                </div>

                {/* OPTIONS */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                    <input type="checkbox" className="accent-violet-500" />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm text-violet-400 hover:text-violet-300"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* SUBMIT */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-white text-black font-medium text-base"
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign In <FiArrowRight size={18} />
                    </div>
                  )}
                </Button>

                {/* DIVIDER */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#22222B]" />
                  </div>

                  <div className="relative flex justify-center">
                    <span className="bg-[#0D0D12] px-4 text-sm text-gray-500">
                      OR CONTINUE WITH
                    </span>
                  </div>
                </div>

                {/* SOCIAL */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="bordered"
                    className="h-14 rounded-2xl border-[#22222B] bg-[#111116] text-white w-full"
                  >
                    <FaGoogle size={18} />
                    Google
                  </Button>

                  <Button
                    variant="bordered"
                    className="h-14 rounded-2xl border-[#22222B] bg-[#111116] text-white w-full"
                  >
                    <FiGithub size={18} />
                    GitHub
                  </Button>
                </div>

                {/* FOOTER */}
                <p className="text-center text-gray-400 text-sm pt-3">
                  Don’t have an account?{" "}
                  <Link
                    href={`/register?redirect=${redirectTo}`}
                    className="text-violet-400 hover:text-violet-300"
                  >
                    Create account
                  </Link>
                </p>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}