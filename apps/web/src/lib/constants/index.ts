export const APP_NAME = "SaaS Starter";

export const ROLES = ["OWNER", "ADMIN", "MEMBER"] as const;

export const INVITATION_STATUSES = ["PENDING", "ACCEPTED", "EXPIRED", "CANCELLED"] as const;

export const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Kolkata",
  "Australia/Sydney",
  "Pacific/Auckland",
] as const;

export const LOCALES = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "zh", label: "Chinese" },
] as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const WORKSPACE = {
  MAX_MEMBERS_FREE_TIER: 5,
  SLUG_MAX_LENGTH: 63,
  INVITATION_EXPIRY_DAYS: 7,
} as const;
