
// import { LogScreen } from "./LogScreen";
// import { AddScreen } from "./AddScreen";
// import { SearchScreen } from "./SearchScreen";
// import { ProfileScreen } from "./ProfileScreen";
import { FoodFlowProvider } from "@/app/FoodFlowProvider";
import { DiaryScreen } from "./diary";
import { FoodDetailScreen } from "./foodDetail";
import { HomeScreen } from "./home";
import { ProfileScreen } from "./profile";
import { ScannerScreen } from "./scanner";
import { SearchScreen } from "./search";
import { ScreenKey } from "./types";

const screens: Record<ScreenKey, React.ReactNode> = {
  home: <HomeScreen />,
  log: <DiaryScreen />,
  add: (
    <FoodFlowProvider>
      <ScannerScreen />
    </FoodFlowProvider>
  ),
  search: <SearchScreen />,
  profile: <ProfileScreen />,
  detail: (
    <FoodFlowProvider>
      <FoodDetailScreen />
    </FoodFlowProvider>
  ),
  scanner: undefined
};


type Props = {
  activeTab: ScreenKey;
};

export const ScreenRenderer = ({ activeTab }: Props) => {
  return screens[activeTab];
};
