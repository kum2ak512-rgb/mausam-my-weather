import { createFileRoute } from "@tanstack/react-router";
import { MausamApp } from "@/components/mausam/MausamApp";

const title = "Mausam — Personalized Weather Home by IMD";
const description =
  "Your Mausam homepage, personalized for fitness, travel, farming and more: AI timing insights, AQI, UV, wind, rain alerts and hourly forecast.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <h1 className="sr-only">Mausam personalized weather homepage</h1>
      <MausamApp />
    </div>
  );
}
