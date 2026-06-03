import React from 'react';
import { Card } from "@heroui/react";

/**
 * Individual Stat Card Component
 * Uses Hero UI v3 Dot Notation anatomy and semantic structures
 */
export const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <Card 
      className="bg-[#121212] border border-[#232323] text-white p-5 flex flex-col gap-4 items-start" 
      variant="transparent"
    >
      {/* Icon Section */}
      {Icon && (
        <div className="p-2 bg-[#232323] rounded-lg text-[#aeaeae] flex items-center justify-center">
          <Icon size={16} />
        </div>
      )}
      
      {/* Content Section using Hero UI anatomy */}
      <Card.Content className="p-0 flex flex-col gap-1 w-full">
        <span className="text-xs text-[#aeaeae] font-medium tracking-wide">
          {title}
        </span>
        <span className="text-2xl font-bold tracking-tight text-white">
          {value}
        </span>
      </Card.Content>
    </Card>
  );
};

/**
 * Main Grid Wrapper Component
 * Expects an array of data passed via the `data` prop
 */
export default function StatCardsGroup({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic p-4">
        No statistics available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {data.map((item, index) => (
        <StatCard
          key={item.id || index}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
}