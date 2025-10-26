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
  icon: ReactElement<LucideProps>;
  children: ReactNode;
}

// Define props for the StatCard component
export interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactElement<LucideProps>;
}

// Define props for the ProfileStatCard component
export interface ProfileStatCardProps {
  title: string;
  value: string | number;
  icon: ReactElement<LucideProps>;
}

// Define props for the SettingsCard component
export interface SettingsCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

// Define props for the SettingsInput component
export interface SettingsInputProps {
  label: string;
  id: string;
  type: string;
  defaultValue: string;
  icon: ReactElement<LucideProps>;
  autoComplete?: string;
}
