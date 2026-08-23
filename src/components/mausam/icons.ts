import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react";

export const weatherIcon = {
  sun: Sun,
  cloud: Cloud,
  "cloud-sun": CloudSun,
  rain: CloudRain,
} as const;

export type WeatherIconName = keyof typeof weatherIcon;
