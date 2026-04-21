import { icons } from "@/utils/icons";

export const tabs: AppTab[] = [
  { name: "index", title: "Home", icon: icons.home },
  { name: "subscriptions", title: "Subscriptions", icon: icons.wallet },
  { name: "insights", title: "Insights", icon: icons.activity },
  { name: "settings", title: "Settings", icon: icons.setting },
];

const Fonts = {
  figtree: {
    regular: "Figtree-Regular",
    medium: "Figtree-Medium",
    semibold: "Figtree-SemiBold",
    bold: "Figtree-Bold",
  },

  inter: {
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    bold: "Inter-Bold",
  },

  lato: {
    regular: "Lato-Regular",
    bold: "Lato-Bold",
  },

  poppins: {
    regular: "Poppins-Regular",
    medium: "Poppins-Medium",
    bold: "Poppins-Bold",
  },

  roboto: {
    regular: "Roboto-Regular",
    medium: "Roboto-Medium",
    bold: "Roboto-Bold",
  },
};

export default Fonts;
