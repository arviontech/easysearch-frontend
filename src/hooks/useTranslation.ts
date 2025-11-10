import { useAppSelector } from "@/lib/redux/hooks";
import { translations } from "@/locales";
import type { TranslationKeys } from "@/locales";

/**
 * Custom hook to access translations based on the current language
 * Uses Redux state to get the current language
 *
 * @example
 * const t = useTranslation();
 * return <h1>{t.hero.title}</h1>;
 */
export function useTranslation(): TranslationKeys {
  const language = useAppSelector((state) => state.ui.language);
  return translations[language];
}
