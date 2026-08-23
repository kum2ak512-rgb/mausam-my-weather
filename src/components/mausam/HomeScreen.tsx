import {
  ChevronRight,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  Sparkles,
  Thermometer,
  User,
  Wind,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  currentWeather,
  hourly,
  profiles,
  type PriorityCard,
  type Profile,
  type ProfileId,
} from "@/data/profiles";
import { weatherIcon, type WeatherIconName } from "./icons";

const toneClass: Record<PriorityCard["tone"], string> = {
  good: "text-good",
  warn: "text-warn",
  alert: "text-alert",
  neutral: "text-foreground",
};

export function HomeScreen({
  profile,
  place,
  onSelectProfile,
  onOpenProfile,
  onOpenAlerts,
  onOpenForecast,
  onChangeLocation,
}: {
  profile: Profile;
  place: { name: string; region: string; temp: number; condition: string };
  onSelectProfile: (id: ProfileId) => void;
  onOpenProfile: () => void;
  onOpenAlerts: () => void;
  onOpenForecast: () => void;
  onChangeLocation: () => void;
}) {
  return (
    <>
      {/* Top bar */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 pb-3 pt-6">
        <div className="min-w-0">
          <p className="text-lg font-extrabold tracking-[0.18em] text-primary">MAUSAM</p>
          <button
            onClick={onChangeLocation}
            className="mt-0.5 flex min-w-0 items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate text-xs">
              {place.name}, {place.region}
            </span>
            <ChevronRight className="size-3.5 shrink-0" />
          </button>
        </div>
        <button
          aria-label="Open profile"
          onClick={onOpenProfile}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-accent"
        >
          <User className="size-5" />
        </button>
      </header>

      {/* Profile selector */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-2">
        {profiles.map((p) => {
          const Icon = p.icon;
          const active = p.id === profile.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectProfile(p.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors",
                active
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary",
              )}
            >
              <Icon className="size-3.5" />
              {p.label}
            </button>
          );
        })}
      </div>

      <main className="flex flex-col gap-4 px-5 pt-3">
        {/* Current weather */}
        <section className="hero-sky rounded-3xl p-5 text-primary-foreground">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-6xl font-light leading-none">{place.temp}°</p>
              <p className="mt-2 text-sm font-medium opacity-90">{place.condition}</p>
              <p className="text-xs opacity-75">Feels like {currentWeather.feelsLike}°</p>
            </div>
            <CloudSun className="size-16 opacity-90" strokeWidth={1.4} />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-primary-foreground/20 pt-4 text-xs">
            <Metric icon={Droplets} label="Humidity" value={`${currentWeather.humidity}%`} />
            <Metric icon={Wind} label="Wind" value={currentWeather.wind} />
            <Metric icon={Thermometer} label="Feels" value={`${currentWeather.feelsLike}°`} />
          </div>
        </section>

        {/* Personalized AI insight */}
        <section className="ai-panel rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <p className="text-[11px] font-bold uppercase tracking-wider">
              AI insight · {profile.label}
            </p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{profile.insightTitle}</p>
          <p className="text-xl font-bold text-foreground">{profile.insightValue}</p>
          <p className="mt-1 text-xs text-muted-foreground">{profile.insightNote}</p>
        </section>

        {/* Priority cards */}
        <section>
          <h2 className="mb-2 text-sm font-bold text-foreground">Your priorities</h2>
          <div className="grid grid-cols-2 gap-3">
            {profile.priorities.map((card) => (
              <div key={card.label} className="card-soft p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {card.label}
                </p>
                <p className={cn("mt-1.5 text-2xl font-bold", toneClass[card.tone])}>
                  {card.value}
                </p>
                <p className="text-xs text-muted-foreground">{card.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Alert */}
        <button
          onClick={onOpenAlerts}
          className="flex items-center gap-3 rounded-2xl border border-alert/30 bg-alert/8 p-4 text-left transition-colors hover:bg-alert/12"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-alert/15 text-alert">
            <CloudRain className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">{profile.alert}</p>
            <p className="text-xs text-muted-foreground">Weather alert · IMD advisory</p>
          </div>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </button>

        {/* Hourly forecast */}
        <section className="card-soft p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">Hourly forecast</h2>
            <button
              onClick={onOpenForecast}
              className="flex items-center gap-0.5 text-xs font-semibold text-primary hover:underline"
            >
              7 days
              <ChevronRight className="size-3.5" />
            </button>
          </div>
          <div className="no-scrollbar flex justify-between gap-2 overflow-x-auto">
            {hourly.map((h) => {
              const Icon = weatherIcon[h.icon as WeatherIconName];
              return (
                <div
                  key={h.time}
                  className="flex min-w-[52px] flex-col items-center gap-2 rounded-xl bg-sky-soft/60 py-3"
                >
                  <span className="text-[11px] font-medium text-muted-foreground">{h.time}</span>
                  <Icon className="size-5 text-sky" strokeWidth={1.8} />
                  <span className="text-sm font-semibold text-foreground">{h.temp}°</span>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Wind;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1 opacity-75">
        <Icon className="size-3.5" />
        {label}
      </span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}
