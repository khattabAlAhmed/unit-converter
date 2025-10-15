# Multilingual Next.js App with next-intl

This Next.js v15 application has been configured with internationalization (i18n) support using `next-intl` with Arabic as the default language and English as a secondary language.

## Features

- ✅ Arabic (ar) as default language
- ✅ English (en) as secondary language
- ✅ RTL (Right-to-Left) support for Arabic
- ✅ Language switcher component
- ✅ Responsive navigation with translations
- ✅ Locale-based routing (`/ar/` and `/en/`)
- ✅ Server-side rendering support

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── layout.tsx     # Locale layout with RTL support
│   │   └── page.tsx       # Home page with translations
│   └── layout.tsx         # Root layout
├── components/
│   ├── LanguageSwitcher.tsx
│   └── Navigation.tsx
├── i18n/
│   ├── routing.ts         # Routing configuration
│   └── request.ts         # Request configuration
├── messages/
│   ├── ar.json           # Arabic translations
│   └── en.json           # English translations
└── middleware.ts         # Next.js middleware for i18n
```

## How to Use

1. **Access the app**: Visit `http://localhost:3000` (defaults to Arabic)
2. **Switch languages**: Use the language switcher in the navigation
3. **Direct access**: 
   - Arabic: `http://localhost:3000/ar`
   - English: `http://localhost:3000/en`

## Key Configuration Files

### Routing Configuration (`src/i18n/routing.ts`)
```typescript
export const routing = defineRouting({
  locales: ['ar', 'en'],
  defaultLocale: 'ar'
});
```

### Middleware (`src/middleware.ts`)
Handles locale detection and routing for all pages.

### Translation Files
- `src/messages/ar.json` - Arabic translations
- `src/messages/en.json` - English translations

## Adding New Translations

1. Add new keys to both `ar.json` and `en.json`
2. Use `useTranslations('SectionName')` in components
3. Access translations with `t('keyName')`

## RTL Support

The app automatically applies RTL direction for Arabic:
```tsx
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000` with full i18n support.
