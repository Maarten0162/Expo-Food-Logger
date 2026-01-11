import { ReactNode } from "react";

export type NavItemType = {
  id: string;
  icon: ReactNode;
  onPress: () => void;
  active?: boolean;
};
