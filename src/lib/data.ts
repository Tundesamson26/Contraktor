import { Artisan, AnalyticsData } from "@/types";

export const REAL_NAMES = [
  "James Wilson", "Sarah Thompson", "Michael Chen", "Emily Rodriguez", "David Miller",
  "Jessica Taylor", "Christopher Anderson", "Ashley Thomas", "Matthew Moore", "Amanda Jackson",
  "Joshua Martin", "Jennifer Lee", "Daniel Garcia", "Brittany Martinez", "Andrew Davis",
  "Megan Hernandez", "Joseph Lopez", "Stephanie Gonzalez", "Christian Wilson", "Nicole Anderson",
  "Ryan Taylor", "Kayla Moore", "Jonathan Jackson", "Lauren Martin", "Robert Lee",
  "Samantha Thompson", "William Rodriguez", "Victoria Miller", "Kevin Chen", "Rachel Davis",
  "Thomas Hernandez", "Madison Lopez", "Steven Gonzalez", "Abigail Thomas", "Brian Ashley",
  "Elizabeth Martinez", "George Wilson", "Grace Anderson", "Edward Moore", "Olivia Taylor"
];

export const TRADES = ["Plumber", "Electrician", "Carpenter", "Painter", "HVAC Technician", "Mason", "Roofer", "Landscaper"];
export const LOCATIONS = ["New York", "London", "San Francisco", "Berlin", "Paris", "Tokyo", "Sydney", "Toronto"];

export const AVATAR_IDS = [
  "1472099645785-5658abf4ff4e", // Male
  "1438761681033-6461ffad8d80", // Female
  "1500648767791-00dcc994a43e", // Male
  "1494790108377-be9c29b29330", // Female
  "1507003211169-0a1dd7228f2d", // Male
  "1544005313-94ddf0286df2", // Female
  "1531427186611-ecfd6d936c79", // Male
  "1517841905240-472988babdf9", // Female
  "1539578896899-ce1516487f73", // Male
  "1534528741775-53994a69daeb", // Female
  "1506794778242-92ff52b5cd76", // Male
  "1531746020798-e6953c6e8e04"  // Female
];

export const MOCK_ARTISANS: Artisan[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `artisan-${i + 1}`,
  name: REAL_NAMES[i],
  trade: TRADES[i % TRADES.length],
  rating: 3.5 + (i % 15) / 10,
  location: LOCATIONS[i % LOCATIONS.length],
  availability: i % 4 !== 0,
  avatar: `https://images.unsplash.com/photo-${AVATAR_IDS[i % AVATAR_IDS.length]}?auto=format&fit=facearea&facepad=2&w=300&h=300&q=80`,
  bio: `${REAL_NAMES[i]} is a highly skilled ${TRADES[i % TRADES.length]} with extensive experience in residential and commercial projects.`,
  portfolio: [
    `https://images.unsplash.com/photo-${[
      "1581094794329-c8112a89af12", "1513694203232-719a280e022f", "1621905251189-08b45d6a269e",
      "1504384308090-c894fdcc538d", "1484154218962-a197022b5858", "1513694203232-719a280e022f"
    ][i % 6]}?auto=format&fit=crop&w=800&q=80`,
    `https://picsum.photos/seed/artisan-${i}-2/800/600`,
    `https://picsum.photos/seed/artisan-${i}-3/800/600`
  ]
}));

export const MOCK_ANALYTICS: AnalyticsData[] = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
        date: d.toLocaleDateString('en-US', { weekday: 'short' }),
        count: Math.floor(Math.random() * 20) + 5
    };
});
