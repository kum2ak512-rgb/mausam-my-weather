import { useState } from "react";
import { Droplets } from "lucide-react";

import { cn } from "@/lib/utils";
import { currentWeather, daily, hourly, type Profile } from "@/data/profiles";
import { weatherIcon, type WeatherIconName } from "./icons";
import { ScreenHeader } from "./ScreenHeader";

export function ForecastScreen({ profile }: { profile: Profile }) {
  const [openDay, setOpenDay] = useState<string | null>("Today");

  return (
    <>
      <ScreenHeader title="Forecast" subtitle={`${currentWeather.location} · 7 days`} />

      <main className="flex flex-col gap-4 px-5 pt-2">
        <section className="card-soft p-4">
          <h3 className="mb-3 text-sm font-bold text-foreground">Next hours</h3>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {hourly.map((h) => {
              const Icon = weatherIcon[h.icon as WeatherIconName];
              return (
                <div
                  key={h.time}
                  className="flex min-w-[56px] flex-col items-center gap-2 rounded-xl bg-sky-soft/60 py-3"
                >
                  <span className="text-[11px] font-medium text-muted-foreground">{h.time}</span>
                  <Icon className="size-5 text-sky" strokeWidth={1.8} />
                  <span className="text-sm font-semibold text-foreground">{h.temp}°</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="card-soft divide-y divide-border overflow-hidden">
          {daily.map((d) => {
            const Icon = weatherIcon[d.icon as WeatherIconName];
            const open = openDay === d.day;
            return (
              <div key={d.day}>
                <button
                  onClick={() => setOpenDay(open ? null : d.day)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/60"
                >
                  <div className="w-16 shrink-0">
                    <p className="text-sm font-semibold text-foreground">{d.day}</p>
                    <p className="text-[11px] text-muted-foreground">{d.date}</p>
                  </div>
                  <Icon className="size-5 shrink-0 text-sky" strokeWidth={1.8} />
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Droplets className="size-3.5" />
                    {d.rain}%
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{d.hi}°</span>
                    <span className="text-sm text-muted-foreground">{d.lo}°</span>
                  </div>
                </button>
                {open && (
                  <div className="bg-sky-soft/40 px-4 pb-4 pt-1">
                    <p className="text-xs text-muted-foreground">{d.condition}</p>
                    <p className="mt-2 text-xs font-semibold text-foreground">
                      {profile.label} tip
                    </p>
                    <p className="text-xs text-muted-foreground">{profile.insightNote}</p>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          d.rain >= 60 ? "bg-alert" : d.rain >= 30 ? "bg-warn" : "bg-good",
                        )}
                        style={{ width: `${d.rain}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Rain probability {d.rain}%
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
