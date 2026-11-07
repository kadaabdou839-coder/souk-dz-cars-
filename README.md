# Souk DZ Cars - Next.js (SSR/ISR)

1. `cp .env.example .env.local` وضعوا الدومين الحقيقي في NEXT_PUBLIC_SITE_URL
2. `npm install && npm run dev`
3. عدّلوا `lib/listings.ts` ليقرأ من قاعدة بياناتكم (الدوال الثلاث فقط)
4. بعد النشر: ارفعوا `https://دومينكم/sitemap.xml` في Search Console، وافحصوا `/cars/<id>` بـ "Inspect URL"

الصفحات تُولَّد على الخادم (HTML كامل لـ Googlebot) وتُخزَّن ISR كل 10 دقائق.
