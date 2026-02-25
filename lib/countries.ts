export interface Country {
  code: string;    // ISO 3166-1 alpha-2
  nameHe: string;  // Hebrew name
  nameEn: string;  // English name
}

/**
 * Country list covering Israel + common countries for Hebrew book buyers.
 * Sorted alphabetically by English name (Israel placed first as default).
 */
export const COUNTRIES: Country[] = [
  { code: 'IL', nameHe: 'ישראל', nameEn: 'Israel' },
  { code: 'AR', nameHe: 'ארגנטינה', nameEn: 'Argentina' },
  { code: 'AU', nameHe: 'אוסטרליה', nameEn: 'Australia' },
  { code: 'AT', nameHe: 'אוסטריה', nameEn: 'Austria' },
  { code: 'BE', nameHe: 'בלגיה', nameEn: 'Belgium' },
  { code: 'BR', nameHe: 'ברזיל', nameEn: 'Brazil' },
  { code: 'BG', nameHe: 'בולגריה', nameEn: 'Bulgaria' },
  { code: 'CA', nameHe: 'קנדה', nameEn: 'Canada' },
  { code: 'CL', nameHe: 'צ׳ילה', nameEn: 'Chile' },
  { code: 'CN', nameHe: 'סין', nameEn: 'China' },
  { code: 'CO', nameHe: 'קולומביה', nameEn: 'Colombia' },
  { code: 'HR', nameHe: 'קרואטיה', nameEn: 'Croatia' },
  { code: 'CZ', nameHe: 'צ׳כיה', nameEn: 'Czech Republic' },
  { code: 'DK', nameHe: 'דנמרק', nameEn: 'Denmark' },
  { code: 'FI', nameHe: 'פינלנד', nameEn: 'Finland' },
  { code: 'FR', nameHe: 'צרפת', nameEn: 'France' },
  { code: 'DE', nameHe: 'גרמניה', nameEn: 'Germany' },
  { code: 'GR', nameHe: 'יוון', nameEn: 'Greece' },
  { code: 'HU', nameHe: 'הונגריה', nameEn: 'Hungary' },
  { code: 'IN', nameHe: 'הודו', nameEn: 'India' },
  { code: 'IE', nameHe: 'אירלנד', nameEn: 'Ireland' },
  { code: 'IT', nameHe: 'איטליה', nameEn: 'Italy' },
  { code: 'JP', nameHe: 'יפן', nameEn: 'Japan' },
  { code: 'MX', nameHe: 'מקסיקו', nameEn: 'Mexico' },
  { code: 'NL', nameHe: 'הולנד', nameEn: 'Netherlands' },
  { code: 'NZ', nameHe: 'ניו זילנד', nameEn: 'New Zealand' },
  { code: 'NO', nameHe: 'נורבגיה', nameEn: 'Norway' },
  { code: 'PA', nameHe: 'פנמה', nameEn: 'Panama' },
  { code: 'PE', nameHe: 'פרו', nameEn: 'Peru' },
  { code: 'PL', nameHe: 'פולין', nameEn: 'Poland' },
  { code: 'PT', nameHe: 'פורטוגל', nameEn: 'Portugal' },
  { code: 'RO', nameHe: 'רומניה', nameEn: 'Romania' },
  { code: 'RU', nameHe: 'רוסיה', nameEn: 'Russia' },
  { code: 'ZA', nameHe: 'דרום אפריקה', nameEn: 'South Africa' },
  { code: 'KR', nameHe: 'דרום קוריאה', nameEn: 'South Korea' },
  { code: 'ES', nameHe: 'ספרד', nameEn: 'Spain' },
  { code: 'SE', nameHe: 'שוודיה', nameEn: 'Sweden' },
  { code: 'CH', nameHe: 'שווייץ', nameEn: 'Switzerland' },
  { code: 'TH', nameHe: 'תאילנד', nameEn: 'Thailand' },
  { code: 'TR', nameHe: 'טורקיה', nameEn: 'Turkey' },
  { code: 'UA', nameHe: 'אוקראינה', nameEn: 'Ukraine' },
  { code: 'AE', nameHe: 'איחוד האמירויות', nameEn: 'United Arab Emirates' },
  { code: 'GB', nameHe: 'בריטניה', nameEn: 'United Kingdom' },
  { code: 'US', nameHe: 'ארצות הברית', nameEn: 'United States' },
  { code: 'UY', nameHe: 'אורוגוואי', nameEn: 'Uruguay' },
];

export const DEFAULT_COUNTRY_CODE = 'IL';

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}
