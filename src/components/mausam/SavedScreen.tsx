import { useState } from "react";
import { MapPin, Search, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { savedLocations } from "@/data/profiles";
import { weatherIcon, type WeatherIconName } from "./icons";
import { ScreenHeader } from "./ScreenHeader";

export function SavedScreen({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const list = savedLocations.filter((l) =>
    `${l.name} ${l.region}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <ScreenHeader title="Saved places" subtitle="Tap a place to make it your current location" />

      <main className="flex flex-col gap-3 px-5 pt-2">
        <label className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search saved places"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>

        {list.map((l) => {
          const Icon = weatherIcon[l.icon as WeatherIconName];
          const active = l.id === activeId;
          return (
            <button
              key={l.id}
              onClick={() => onSelect(l.id)}
              className={cn(
                "card-soft flex items-center gap-3 p-4 text-left transition-colors",
                active && "border-primary/40 bg-sky-soft/50",
              )}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sky-soft text-sky">
                <MapPin className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{l.name}</p>
                <p className="truncate text-xs text-muted-foreground">{l.region}</p>
              </div>
              <Icon className="size-5 shrink-0 text-sky" strokeWidth={1.8} />
              <span className="text-lg font-semibold text-foreground">{l.temp}°</span>
              {active && <Star className="size-4 shrink-0 fill-primary text-primary" />}
            </button>
          );
        })}

        {list.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">No places match “{query}”.</p>
        )}
      </main>
    </>
  );
}
