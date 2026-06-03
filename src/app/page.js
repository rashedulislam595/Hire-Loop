import Banner from "@/components/Banner";
import FeaturesSection from "@/components/FeaturesSection";
import JobCard from "@/components/JobCard";
import JobStatsSection from "@/components/JobStatusSection";
import NextRoleSection from "@/components/NextRoleSection";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <div>
      <Banner/>
      <JobStatsSection/>
      <JobCard/>
      <FeaturesSection/>
      <PricingSection/>
      <NextRoleSection/>
    </div>
  );
}
