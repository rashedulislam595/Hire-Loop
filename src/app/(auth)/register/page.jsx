"use client";

import { useState } from "react";
import { Card, CardContent, Button, Label, RadioGroup, Radio } from "@heroui/react";
import { FiUser, FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff, FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { redirect, useRouter, useSearchParams } from "next/navigation";

// import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true)
    const { data, error } = await authClient.signUp.email({
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.role.value,
    });
    // console.log("response",{data,error})
    if (data) {
      toast.success("signUp Successful!", { theme: "dark", position: "top-center" })
      router.push(redirectTo);
    } else {
      toast.error(error.message, { theme: "dark", position: "top-center" })
    }
  };

  const handleGoogleLogin = async () => {
    // await authClient.signIn.social({
    //   provider: "google",
    //   callbackURL: "/dashboard",
    // });
  };

  const handleGithubLogin = async () => {
    // await authClient.signIn.social({
    //   provider: "github",
    //   callbackURL: "/dashboard",
    // });
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[32px] border border-[#1E1E26] bg-[#0D0D12]">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between p-14 bg-linear-to-br from-[#12121A] to-[#0B0B10] border-r border-[#1E1E26]">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-violet-500" />
              <h2 className="text-lg font-semibold tracking-wide">
                JobStack
              </h2>
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-4">
              Build your
              <br />
              future career
            </h1>

            <p className="text-gray-400 text-lg leading-8 max-w-md">
              Join thousands of professionals discovering smarter
              opportunities and building stronger careers.
            </p>

            <Image
              src="/images/job.jpg"
              alt="Career"
              width={700}
              height={500}
              className="w-full h-[400] object-cover mt-12 rounded-2xl"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Join 10k+ active members
            </p>

            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-violet-500 border-2 border-black" />
              <div className="w-10 h-10 rounded-full bg-pink-500 border-2 border-black" />
              <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-black" />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <Card className="w-full bg-transparent shadow-none border-none">
            <CardContent className="p-0">

              {/* Mobile Logo */}
              <div className="flex lg:hidden items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                <h2 className="text-lg font-semibold tracking-wide">
                  JobStack
                </h2>
              </div>

              <div className="mb-10">
                <h2 className="text-4xl font-bold mb-3">
                  Create Account
                </h2>

                <p className="text-gray-400">
                  Register and start your career journey
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Full Name
                  </label>

                  <div className="h-14 rounded-2xl bg-[#111116] border border-[#22222B] px-4 flex items-center gap-3">
                    <FiUser size={18} className="text-gray-500" />

                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Email
                  </label>

                  <div className="h-14 rounded-2xl bg-[#111116] border border-[#22222B] px-4 flex items-center gap-3">
                    <FiMail size={18} className="text-gray-500" />

                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Password
                  </label>

                  <div className="h-14 rounded-2xl bg-[#111116] border border-[#22222B] px-4 flex items-center gap-3">
                    <FiLock size={18} className="text-gray-500" />

                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Minimum 8 characters"
                      className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="text-gray-500 hover:text-white"
                    >
                      {showPassword ? (
                        <FiEye size={20} />
                      ) : (
                        <FiEyeOff size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Role */}
                <div className="flex flex-col gap-4">
                  <Label>Your Role</Label>
                  <RadioGroup defaultValue="seeker" name="role" orientation="horizontal">
                    <Radio value="seeker">
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                      <Radio.Content>
                        <Label>Job Seeker</Label>
                      </Radio.Content>
                    </Radio>
                    <Radio value="recruiter">
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                      <Radio.Content>
                        <Label>Recruiter</Label>
                      </Radio.Content>
                    </Radio>
                  </RadioGroup>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 text-sm text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 accent-violet-500"
                  />

                  <span>
                    I agree to the{" "}
                    <span className="text-violet-400">
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-violet-400">
                      Privacy Policy
                    </span>
                  </span>
                </label>

                {/* Submit */}
                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full h-14 rounded-2xl bg-white text-black font-semibold"
                >
                  {!loading && (
                    <div className="flex items-center gap-2">
                      Create Account
                      <FiArrowRight size={18} />
                    </div>
                  )}
                </Button>

                {/* Divider */}
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

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="bordered"
                    onClick={handleGoogleLogin}
                    className="h-14 rounded-2xl border-[#22222B] bg-[#111116] text-white w-full"
                  >
                    <FaGoogle size={18} />
                    Google
                  </Button>

                  <Button
                    type="button"
                    variant="bordered"
                    onClick={handleGithubLogin}
                    className="h-14 rounded-2xl border-[#22222B] bg-[#111116] text-white w-full"
                  >
                    <FiGithub size={18} />
                    GitHub
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-400 pt-2">
                  Already have an account?{" "}
                  <Link
                    href={`/login?redirect=${redirectTo}`}
                    className="text-violet-400 hover:text-violet-300 font-medium"
                  >
                    Sign In
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