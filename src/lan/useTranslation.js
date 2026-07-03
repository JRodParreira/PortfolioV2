import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

export function useTranslation() {
  const { language } = useLanguage();

  return translations[language];
}