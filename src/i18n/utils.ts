import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}

export function getLocalizedPath(path: string, lang: keyof typeof ui) {
    const pathSegments = path.split('/').filter(Boolean);

    // Check if the first segment is a locale and remove it if so
    if (pathSegments.length > 0 && pathSegments[0] in ui) {
        pathSegments.shift();
    }

    const cleanPath = pathSegments.join('/');

    // If target is default language, return path without prefix
    if (lang === defaultLang) {
        return `/${cleanPath}`;
    }

    // For other languages, add prefix
    // Ensure we handles root path correctly allowing for optional trailing slash behavior
    return `/${lang}/${cleanPath}`;
}

export function getAlternateLanguage(currentLang: keyof typeof ui): keyof typeof ui {
    return currentLang === 'en' ? 'zh' : 'en';
}

export function getAlternatePath(currentPath: string, currentLang: keyof typeof ui): string {
    const alternateLang = getAlternateLanguage(currentLang);

    // Remove current language prefix if exists
    let cleanPath = currentPath;
    if (currentLang !== defaultLang && currentPath.startsWith(`/${currentLang}`)) {
        cleanPath = currentPath.slice(`/${currentLang}`.length) || '/';
    }

    return getLocalizedPath(cleanPath, alternateLang);
}
