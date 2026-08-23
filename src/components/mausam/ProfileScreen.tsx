import { useState } from "react";
import { Bell, Check, ChevronRight, MapPin, Moon, Pencil, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { profiles, type Profile, type ProfileId } from "@/data/profiles";
import { ScreenHeader } from "./ScreenHeader";

export function ProfileScreen({
  profile,
  onSelectProfile,
  userName,
  onChangeName,
  placeLabel,
  onChangeLocation,
}: {
  profile: Profile;
  onSelectProfile: (id: ProfileId) => void;
  userName: string;
  onChangeName: (name: string) => void;
  placeLabel: string;
  onChangeLocation: () => void;
}) {
  const [pushAlerts, setPushAlerts] = useState(true);
  const [dailyBrief, setDailyBrief] = useState(true);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(userName);

  const save = () => {
    const next = draft.trim();
    if (next) onChangeName(next);
    else setDraft(userName);
    setEditing(false);
  };

  return (
    <>
      <ScreenHeader title="Profile" subtitle="Personalize what Mausam shows you first" />

      <main className="flex flex-col gap-4 px-5 pt-2">
        <section className="card-soft flex items-center gap-3 p-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sky-soft text-sky">
            <User className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            {editing ? (
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={save}
                onKeyDown={(e) => {
                  if (e.key === "Enter") save();
                  if (e.key === "Escape") {
                    setDraft(userName);
                    setEditing(false);
                  }
                }}
                aria-label="Your name"
                className="w-full rounded-lg border border-border bg-background px-2 py-1 text-sm font-bold text-foreground outline-none focus:border-primary"
              />
            ) : (
              <p className="truncate text-sm font-bold text-foreground">{userName}</p>
            )}
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{placeLabel}</span>
            </p>
          </div>
          {editing ? (
            <button
              onClick={save}
              className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => {
                setDraft(userName);
                setEditing(true);
              }}
              aria-label="Edit name"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-accent"
            >
              <Pencil className="size-4" />
            </button>
          )}
        </section>

        <button
          onClick={onChangeLocation}
          className="card-soft flex items-center gap-3 p-4 text-left transition-colors hover:bg-secondary"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sky-soft text-sky">
            <MapPin className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">Change location</p>
            <p className="truncate text-xs text-muted-foreground">{placeLabel}</p>
          </div>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </button>

        <section>
          <h3 className="mb-2 text-sm font-bold text-foreground">Active profile</h3>
          <div className="grid grid-cols-2 gap-2">
            {profiles.map((p) => {
              const Icon = p.icon;
              const active = p.id === profile.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectProfile(p.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-2xl border p-3 text-left text-sm font-semibold transition-colors",
                    active
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-secondary",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{p.label}</span>
                  {active && <Check className="ml-auto size-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </section>

        <section className="card-soft divide-y divide-border">
          <Toggle
            icon={Bell}
            label="Push alerts"
            note="Severe weather and IMD advisories"
            value={pushAlerts}
            onChange={setPushAlerts}
          />
          <Toggle
            icon={Moon}
            label="Daily morning brief"
            note={`Sent at 6:30 AM for ${profile.label}`}
            value={dailyBrief}
            onChange={setDailyBrief}
          />
        </section>
      </main>
    </>
  );
}

function Toggle({
  icon: Icon,
  label,
  note,
  value,
  onChange,
}: {
  icon: typeof Bell;
  label: string;
  note: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sky-soft text-sky">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>
      <button
        role="switch"
        aria-checked={value}
        aria-label={label}
        onClick={() => onChange(!value)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          value ? "bg-primary" : "bg-border",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-card transition-all",
            value ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}
