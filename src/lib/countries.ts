export type Country = {
  /** ISO 3166-1 alpha-2 code */
  code: string;
  /** Dial code without "+" */
  dial: string;
  flag: string;
  name: string;
};

/** Dialing codes offered in the picker. Pakistan is the default (quiz target). */
export const COUNTRIES: Country[] = [
  { code: 'PK', dial: '92', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'AE', dial: '971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: 'SA', dial: '966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: 'IN', dial: '91', flag: '🇮🇳', name: 'India' },
  { code: 'BD', dial: '880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: 'NP', dial: '977', flag: '🇳🇵', name: 'Nepal' },
  { code: 'LK', dial: '94', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: 'CN', dial: '86', flag: '🇨🇳', name: 'China' },
  { code: 'TR', dial: '90', flag: '🇹🇷', name: 'Turkey' },
  { code: 'GB', dial: '44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'US', dial: '1', flag: '🇺🇸', name: 'United States' },
  { code: 'CA', dial: '1', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', dial: '61', flag: '🇦🇺', name: 'Australia' },
  { code: 'DE', dial: '49', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', dial: '33', flag: '🇫🇷', name: 'France' },
  { code: 'IT', dial: '39', flag: '🇮🇹', name: 'Italy' },
  { code: 'ES', dial: '34', flag: '🇪🇸', name: 'Spain' },
  { code: 'NL', dial: '31', flag: '🇳🇱', name: 'Netherlands' },
  { code: 'SE', dial: '46', flag: '🇸🇪', name: 'Sweden' },
  { code: 'RU', dial: '7', flag: '🇷🇺', name: 'Russia' },
  { code: 'MY', dial: '60', flag: '🇲🇾', name: 'Malaysia' },
  { code: 'SG', dial: '65', flag: '🇸🇬', name: 'Singapore' },
  { code: 'ID', dial: '62', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'NG', dial: '234', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'EG', dial: '20', flag: '🇪🇬', name: 'Egypt' },
  { code: 'ZA', dial: '27', flag: '🇿🇦', name: 'South Africa' },
  { code: 'KE', dial: '254', flag: '🇰🇪', name: 'Kenya' },
  { code: 'BR', dial: '55', flag: '🇧🇷', name: 'Brazil' },
  { code: 'JP', dial: '81', flag: '🇯🇵', name: 'Japan' },
  { code: 'KR', dial: '82', flag: '🇰🇷', name: 'South Korea' },
];

export const DEFAULT_COUNTRY: Country = COUNTRIES[0];

export function toE164(dial: string, digits: string): string {
  return `+${dial}${digits.replace(/\D/g, '')}`;
}

/** Loose sanity check: a national number usually has 7–15 digits. */
export function isValidNationalNumber(digits: string): boolean {
  const clean = digits.replace(/\D/g, '');
  return clean.length >= 7 && clean.length <= 15;
}

/** Light visual grouping, e.g. 3001234567 → 300 1234567. */
export function formatNational(digits: string): string {
  const clean = digits.replace(/\D/g, '');
  if (clean.length <= 3) return clean;
  return `${clean.slice(0, 3)} ${clean.slice(3)}`;
}
