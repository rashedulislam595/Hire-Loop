"use client";
import { Card, CardContent, Button,
} from "@heroui/react";
import { FiArrowRight, FiPlus, FiBarChart2, FiZap, FiAward,
} from "react-icons/fi";

const plans = [
  {
    id: 1,
    name: "Starter",
    price: "$0",
    icon: <FiAward size={16} />,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    active: false,
  },
  {
    id: 2,
    name: "Growth",
    price: "$17",
    icon: <FiBarChart2 size={16} />,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    active: true,
  },
  {
    id: 3,
    name: "Premium",
    price: "$99",
    icon: <FiZap size={16} />,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    active: false,
  },
];

export default function PricingSection() {
  return (
    <section className="bg-black text-white py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>

            <p className="uppercase tracking-[3px] text-[11px] text-gray-400">
              Pricing
            </p>

            <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            Pay for the leverage,
            <br />
            not the listings
          </h1>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-14">
          <div className="bg-[#17171C] border border-[#24242C] rounded-full p-1 flex items-center gap-1">
            <button className="bg-white text-black text-sm px-5 py-2 rounded-full font-medium">
              Monthly
            </button>

            <button className="text-gray-400 text-sm px-4 py-2 rounded-full hover:text-white transition">
              Yearly
            </button>

            <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
              25%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`rounded-3xl border shadow-none bg-[#0F0F13] ${plan.active
                  ? "border-[#30303A] bg-linear-to-b from-[#18181F] to-[#0F0F13]"
                  : "border-[#202028]"
                }`}
            >
              <CardContent className="p-7">
                {/* Top */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#17171D] border border-[#26262F] flex items-center justify-center text-violet-300">
                      {plan.icon}
                    </div>

                    <h3 className="text-2xl font-medium">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="flex items-start">
                    <span className="text-5xl font-semibold leading-none">
                      {plan.price}
                    </span>

                    <span className="text-sm text-gray-400 mt-2 ml-1">
                      /month
                    </span>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-sm font-medium mb-6 text-gray-200">
                  Start building your insights hub:
                </p>

                {/* Features */}
                <div className="space-y-4 mb-10">
                  {plan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm text-gray-400"
                    >
                      <div className="w-5 h-5 rounded-md bg-[#1C1C22] border border-[#2B2B33] flex items-center justify-center">
                        <FiPlus size={11} />
                      </div>

                      <p>{feature}</p>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Button
                  className={`w-full h-14 rounded-2xl font-medium ${plan.active
                      ? "bg-white text-black"
                      : "bg-[#1B1B21] text-white"
                    }`}
                >
                  <div className="flex items-center justify-between w-full px-1">
                    <span>Choose This Plan</span>

                    <FiArrowRight size={16} />
                  </div>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}