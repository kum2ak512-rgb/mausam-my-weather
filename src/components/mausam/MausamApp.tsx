import { useState } from "react";
import { Bell, Bookmark, CloudSun, Home, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { profiles, savedLocations, type Profile, type ProfileId } from "@/data/profiles";
import { HomeScreen } from "./HomeScreen";
import { ForecastScreen } from "./ForecastScreen";
import { AlertsScreen } from "./AlertsScreen";
import { SavedScreen } from "./SavedScreen";
import { ProfileScreen } from "./ProfileScreen";

export type TabId = "home" | "forecast" | "alerts" | "saved" | "profile";

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "forecast", label: "Forecast", icon: CloudSun },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "profile", label: "Profile", icon: User },
];

export function MausamApp() {
  const [tab, setTab] = useState<TabId>("home");
  const [activeId, setActiveId] = useState<ProfileId>("fitness");
  const [locationId, setLocationId] = useState<string>("cp");
  const [userName, setUserName] = useState("Akash Kumar");
  const profile: Profile = profiles.find((p) => p.id === activeId) ?? profiles[0]!;
  const place = savedLocations.find((l) => l.id === locationId) ?? savedLocations[0]!;

  const selectLocation = (id: string) => {
    setLocationId(id);
    setTab("home");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col pb-24">
      {tab === "home" && (
        <HomeScreen
          profile={profile}
          place={place}
          onSelectProfile={setActiveId}
          onOpenProfile={() => setTab("profile")}
          onOpenAlerts={() => setTab("alerts")}
          onOpenForecast={() => setTab("forecast")}
          onChangeLocation={() => setTab("saved")}
        />
      )}
      {tab === "forecast" && <ForecastScreen profile={profile} placeName={place.name} />}
      {tab === "alerts" && <AlertsScreen profile={profile} />}
      {tab === "saved" && <SavedScreen activeId={locationId} onSelect={selectLocation} />}
      {tab === "profile" && (
        <ProfileScreen
          profile={profile}
          onSelectProfile={setActiveId}
          userName={userName}
          onChangeName={setUserName}
          placeLabel={`${place.name}, ${place.region}`}
          onChangeLocation={() => setTab("saved")}
        />
      )}

      <nav className="fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-md items-center justify-between border-t border-border bg-card px-4 py-2">
        {tabs.map((item) => {
          const Icon = item.icon;
          const active = item.id === tab;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[10px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
