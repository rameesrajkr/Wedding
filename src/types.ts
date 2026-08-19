export interface RSVPData {
  id?: string;
  name: string;
  email: string;
  attending: "yes" | "no";
  guests: number;
  dietary: string;
  message: string;
  createdAt?: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export interface TimelineEvent {
  time: string;
  title: string;
  location: string;
  description: string;
  iconName: "ring" | "church" | "champagne" | "music" | "cake";
}
