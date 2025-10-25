import type { LucideProps } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

// Define a type for our bet objects
export interface Bet {
  id: number;
  title: string;
  participants: string;
  stake: string;
}

// Define props for the DashboardCard component
export interface DashboardCardProps {
  title: string;
  icon: ReactElement<LucideProps>; // Be specific about the icon's props
  children: ReactNode;
}

// Define props for the StatCard component
export interface StatCardProps {
  title: string;
  value: string | number; // Value can be a string or a number
  icon: ReactElement<LucideProps>; // Be specific about the icon's props
}
