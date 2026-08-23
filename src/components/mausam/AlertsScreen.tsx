import { useState } from "react";
import { AlertTriangle, Check, CheckCircle2, CloudRain } from "lucide-react";

import { cn } from "@/lib/utils";
import { alerts, type AlertItem, type Profile } from "@/data/profiles";
import { ScreenHeader } from "./ScreenHeader";

const styles: Record<AlertItem["severity"], { ring: string; text: string; bg: string; icon: typeof CloudRain }> = {
  alert: { ring: "border-alert/30", text: "text-alert", bg: "bg-alert/10", icon: CloudRain },
  warn: { ring: "border-warn/30", text: "text-warn", bg: "bg-warn/10", icon: AlertTriangle },
  good: { ring: "border-good/30", text: "text-good", bg: "bg-good/10", icon: CheckCircle2 },
};

export function AlertsScreen({ profile }: { profile: Profile }) {
  const [read, setRead] = useState<string[]>([]);
  const items: AlertItem[] = [
    {
      id: "profile-alert",
      title: profile.alert,
      body: `Personalized for your ${profile.label} profile.`,
      time: "Today",
      severity: "alert",
    },
    ...alerts,
  ];

  return (
    <>
      <ScreenHeader
        title="Alerts"
        subtitle={`${items.length - read.length} active · IMD advisories`}
      />

      <main className="flex flex-col gap-3 px-5 pt-2">
        {items.map((a) => {
          const s = styles[a.severity];
          const Icon = s.icon;
          const isRead = read.includes(a.id);
          return (
            <article
              key={a.id}
              className={cn(
                "flex gap-3 rounded-2xl border p-4 transition-opacity",
                s.ring,
                s.bg,
                isRead && "opacity-55",
              )}
            >
              <span
                className={cn("grid size-9 shrink-0 place-items-center rounded-full bg-card", s.text)}
              >
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{a.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.body}</p>
                <p className="mt-2 text-[11px] font-medium text-muted-foreground">{a.time}</p>
              </div>
              <button
                aria-label={isRead ? "Mark as unread" : "Mark as read"}
                onClick={() =>
                  setRead((r) => (r.includes(a.id) ? r.filter((x) => x !== a.id) : [...r, a.id]))
                }
                className={cn(
                  "grid size-7 shrink-0 place-items-center self-start rounded-full border transition-colors",
                  isRead
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-secondary",
                )}
              >
                <Check className="size-4" />
              </button>
            </article>
          );
        })}
      </main>
    </>
  );
}
