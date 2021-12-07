// ** Icons Import
import { Circle, MapPin } from "react-feather";

export default [
  {
    id: "location-management",
    title: "Location Mgnt",
    icon: <MapPin />,
    children: [
      {
        id: "locations",
        title: "Locations",
        icon: <Circle />,
        navLink: "/dashboard/locations",
      },
      {
        id: "sub-locations",
        title: "Sub Locations",
        icon: <Circle />,
        navLink: "/dashboard/sub-locations",
      },
    ],
  },
];
