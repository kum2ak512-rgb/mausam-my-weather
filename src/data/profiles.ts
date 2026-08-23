import {
  Activity,
  Baby,
  Briefcase,
  HeartPulse,
  PartyPopper,
  Sprout,
  Sun,
  Plane,
  type LucideIcon,
} from "lucide-react";

export type ProfileId =
  | "fitness"
  | "health"
  | "travel"
  | "family"
  | "agriculture"
  | "commuter"
  | "beach"
  | "events";

export type PriorityCard = {
  label: string;
  value: string;
  note: string;
  tone: "good" | "warn" | "alert" | "neutral";
};

export type Profile = {
  id: ProfileId;
  label: string;
  icon: LucideIcon;
  insightTitle: string;
  insightValue: string;
  insightNote: string;
  priorities: PriorityCard[];
  alert: string;
};

export const profiles: Profile[] = [
  {
    id: "fitness",
    label: "Fitness",
    icon: Activity,
    insightTitle: "Best time for running",
    insightValue: "6:00 AM – 7:30 AM",
    insightNote: "Cool air, low AQI and no rain in this window.",
    priorities: [
      { label: "AQI", value: "68", note: "Moderate", tone: "warn" },
      { label: "UV Index", value: "3", note: "Low exposure", tone: "good" },
      { label: "Wind", value: "12 km/h", note: "Light breeze", tone: "good" },
      { label: "Rain chance", value: "60%", note: "Evening showers", tone: "alert" },
    ],
    alert: "Rain expected at 5 PM",
  },
  {
    id: "health",
    label: "Health",
    icon: HeartPulse,
    insightTitle: "Safest outdoor window",
    insightValue: "7:00 AM – 9:00 AM",
    insightNote: "Pollen and pollution stay low before traffic peaks.",
    priorities: [
      { label: "AQI", value: "68", note: "Sensitive groups", tone: "warn" },
      { label: "Pollen", value: "Low", note: "Grass pollen", tone: "good" },
      { label: "Humidity", value: "74%", note: "Muggy", tone: "warn" },
      { label: "Heat index", value: "34°", note: "Stay hydrated", tone: "alert" },
    ],
    alert: "High humidity may affect breathing after 4 PM",
  },
  {
    id: "travel",
    label: "Travel",
    icon: Plane,
    insightTitle: "Best departure window",
    insightValue: "9:00 AM – 12:00 PM",
    insightNote: "Clear visibility on highways before afternoon showers.",
    priorities: [
      { label: "Visibility", value: "8 km", note: "Clear", tone: "good" },
      { label: "Rain chance", value: "60%", note: "After 4 PM", tone: "alert" },
      { label: "Wind", value: "12 km/h", note: "Safe to drive", tone: "good" },
      { label: "UV Index", value: "3", note: "Low", tone: "good" },
    ],
    alert: "Wet roads likely on NH-48 after 5 PM",
  },
  {
    id: "family",
    label: "Family",
    icon: Baby,
    insightTitle: "Best park time for kids",
    insightValue: "8:00 AM – 10:00 AM",
    insightNote: "Comfortable temperature and low UV for outdoor play.",
    priorities: [
      { label: "UV Index", value: "3", note: "Low", tone: "good" },
      { label: "AQI", value: "68", note: "Moderate", tone: "warn" },
      { label: "Temp", value: "29°", note: "Pleasant", tone: "good" },
      { label: "Rain chance", value: "60%", note: "Carry umbrella", tone: "alert" },
    ],
    alert: "Rain expected at 5 PM — plan indoor evening",
  },
  {
    id: "agriculture",
    label: "Agriculture",
    icon: Sprout,
    insightTitle: "Best time for spraying",
    insightValue: "6:30 AM – 8:30 AM",
    insightNote: "Low wind now; hold irrigation, rain arrives by evening.",
    priorities: [
      { label: "Rainfall", value: "12 mm", note: "Expected today", tone: "alert" },
      { label: "Soil moisture", value: "Good", note: "No irrigation", tone: "good" },
      { label: "Wind", value: "12 km/h", note: "Spray safe", tone: "good" },
      { label: "Humidity", value: "74%", note: "Fungal risk", tone: "warn" },
    ],
    alert: "Rain expected at 5 PM — delay harvesting",
  },
  {
    id: "commuter",
    label: "Commuter",
    icon: Briefcase,
    insightTitle: "Leave office by",
    insightValue: "4:30 PM",
    insightNote: "Beat the 5 PM downpour and slow traffic on your route.",
    priorities: [
      { label: "Rain chance", value: "60%", note: "5 PM onward", tone: "alert" },
      { label: "Visibility", value: "8 km", note: "Clear", tone: "good" },
      { label: "AQI", value: "68", note: "Moderate", tone: "warn" },
      { label: "Wind", value: "12 km/h", note: "Light", tone: "good" },
    ],
    alert: "Rain expected at 5 PM — commute delays likely",
  },
  {
    id: "beach",
    label: "Beach",
    icon: Sun,
    insightTitle: "Best beach hours",
    insightValue: "7:00 AM – 10:00 AM",
    insightNote: "Calm waves and gentle sun before the midday peak.",
    priorities: [
      { label: "UV Index", value: "3", note: "Low now", tone: "good" },
      { label: "Tide", value: "Low", note: "Until 11 AM", tone: "good" },
      { label: "Wind", value: "12 km/h", note: "Onshore", tone: "good" },
      { label: "Rain chance", value: "60%", note: "Evening", tone: "alert" },
    ],
    alert: "Choppy waters expected after 4 PM",
  },
  {
    id: "events",
    label: "Events",
    icon: PartyPopper,
    insightTitle: "Best slot for outdoor event",
    insightValue: "10:00 AM – 2:00 PM",
    insightNote: "Dry window with light wind; add cover for the evening.",
    priorities: [
      { label: "Rain chance", value: "60%", note: "From 5 PM", tone: "alert" },
      { label: "Wind", value: "12 km/h", note: "Tent safe", tone: "good" },
      { label: "Temp", value: "29°", note: "Comfortable", tone: "good" },
      { label: "Humidity", value: "74%", note: "Muggy", tone: "warn" },
    ],
    alert: "Rain expected at 5 PM — arrange shelter",
  },
];

export const currentWeather = {
  location: "Connaught Place, New Delhi",
  temperature: 29,
  condition: "Partly cloudy",
  feelsLike: 32,
  humidity: 74,
  wind: "12 km/h",
};

export const hourly = [
  { time: "Now", temp: 29, icon: "cloud-sun" },
  { time: "1 PM", temp: 31, icon: "sun" },
  { time: "2 PM", temp: 32, icon: "sun" },
  { time: "3 PM", temp: 31, icon: "cloud-sun" },
  { time: "4 PM", temp: 30, icon: "cloud" },
  { time: "5 PM", temp: 27, icon: "rain" },
] as const;

export const daily = [
  { day: "Today", date: "23 Aug", hi: 32, lo: 26, icon: "cloud-sun", rain: 60, condition: "Showers by evening" },
  { day: "Mon", date: "24 Aug", hi: 31, lo: 25, icon: "rain", rain: 80, condition: "Rain most of the day" },
  { day: "Tue", date: "25 Aug", hi: 33, lo: 26, icon: "cloud-sun", rain: 30, condition: "Partly cloudy" },
  { day: "Wed", date: "26 Aug", hi: 34, lo: 27, icon: "sun", rain: 10, condition: "Sunny and humid" },
  { day: "Thu", date: "27 Aug", hi: 33, lo: 27, icon: "cloud", rain: 25, condition: "Cloudy spells" },
  { day: "Fri", date: "28 Aug", hi: 30, lo: 25, icon: "rain", rain: 70, condition: "Thundershowers" },
  { day: "Sat", date: "29 Aug", hi: 31, lo: 25, icon: "cloud-sun", rain: 40, condition: "Brief showers" },
] as const;

export type AlertItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  severity: "alert" | "warn" | "good";
};

export const alerts: AlertItem[] = [
  {
    id: "rain",
    title: "Moderate rain warning",
    body: "IMD expects 10–15 mm rainfall between 5 PM and 8 PM across central Delhi.",
    time: "Today · 5:00 PM",
    severity: "alert",
  },
  {
    id: "aqi",
    title: "AQI rising after 6 PM",
    body: "Air quality may reach 110 (poor) near traffic corridors. Sensitive groups stay indoors.",
    time: "Today · 6:00 PM",
    severity: "warn",
  },
  {
    id: "heat",
    title: "High humidity advisory",
    body: "Humidity above 80% tomorrow morning. Heat index may feel like 36°.",
    time: "Tomorrow · 9:00 AM",
    severity: "warn",
  },
  {
    id: "clear",
    title: "Clear morning window",
    body: "No rain expected between 6 AM and 10 AM — good for outdoor activity.",
    time: "Tomorrow · 6:00 AM",
    severity: "good",
  },
];

export const savedLocations = [
  { id: "cp", name: "Connaught Place", region: "New Delhi", temp: 29, condition: "Partly cloudy", icon: "cloud-sun" },
  { id: "ggn", name: "Gurugram", region: "Haryana", temp: 30, condition: "Humid", icon: "sun" },
  { id: "noida", name: "Noida Sector 62", region: "Uttar Pradesh", temp: 28, condition: "Light rain", icon: "rain" },
  { id: "jaipur", name: "Jaipur", region: "Rajasthan", temp: 34, condition: "Sunny", icon: "sun" },
  { id: "shimla", name: "Shimla", region: "Himachal Pradesh", temp: 19, condition: "Cloudy", icon: "cloud" },
] as const;
