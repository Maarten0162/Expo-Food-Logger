
// import { LogScreen } from "./LogScreen";
// import { AddScreen } from "./AddScreen";
// import { SearchScreen } from "./SearchScreen";
// import { ProfileScreen } from "./ProfileScreen";
import { DiaryScreen } from "./diary";
import { HomeScreen } from "./home";
import { ProfileScreen } from "./profile";
import { ScannerScreen } from "./scanner";
import { SearchScreen } from "./search";
import { ScreenKey } from "./types";

const screens: Record<ScreenKey, React.ReactNode> = {
  home: <HomeScreen />,
  log: <DiaryScreen />,
  add: <ScannerScreen />,
  search: <SearchScreen />,
  profile: <ProfileScreen />,
};

type Props = {
  activeTab: ScreenKey;
};

export const ScreenRenderer = ({ activeTab }: Props) => {
  return screens[activeTab];
};
