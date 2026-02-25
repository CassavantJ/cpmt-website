import { LuFactory, LuPackageCheck, LuBot, LuWrench, LuCpu, LuBanknote } from "react-icons/lu";

const iconMap = {
  "machine-sales": LuFactory,
  "turnkey-solutions": LuPackageCheck,
  "automation": LuBot,
  "service-and-parts": LuWrench,
  "engineering": LuCpu,
  "financing": LuBanknote,
};

const ServiceIcon = ({ slug, size = 20 }) => {
  const Icon = iconMap[slug];
  if (!Icon) return null;
  return <Icon size={size} />;
};

export default ServiceIcon;
