/** Single source of truth for public contact details (footer, iletişim, CTA, schema). */
export const SITE_CONTACT = {
  brand: "Şah Yapı",
  email: "info@sahyapihirdavat.com",
  /** Visible phone text */
  phoneDisplay: "+90 530 693 17 83",
  /** E.164 for tel: / WhatsApp / schema.org */
  phoneE164: "+905306931783",
  /** Digits only for wa.me */
  phoneDigits: "905306931783",
  /** Exact address string as provided */
  address: "Reşadiye mahallesi mandıracı 3. Sokak no:27/a Çorlu Tekirdağ",
  addressLocality: "Çorlu",
  addressRegion: "Tekirdağ",
  addressCountry: "TR",
  streetAddress: "Reşadiye mahallesi mandıracı 3. Sokak no:27/a",
  /** Approximate street center for embed (Mandıracı 3. Sokak, Reşadiye / Çorlu) */
  mapLat: 41.157082,
  mapLng: 27.802361,
  siteUrl: "https://sahyapihirdavat.com",
} as const;

export const SITE_TEL_HREF = `tel:${SITE_CONTACT.phoneE164}`;
export const SITE_MAILTO_HREF = `mailto:${SITE_CONTACT.email}`;
export const SITE_WHATSAPP_HREF = `https://wa.me/${SITE_CONTACT.phoneDigits}`;

export function siteMapsEmbedSrc() {
  const q = encodeURIComponent(SITE_CONTACT.address);
  return `https://www.google.com/maps?q=${q}&z=17&output=embed`;
}

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_CONTACT.brand,
    url: SITE_CONTACT.siteUrl,
    telephone: SITE_CONTACT.phoneE164,
    email: SITE_CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONTACT.streetAddress,
      addressLocality: SITE_CONTACT.addressLocality,
      addressRegion: SITE_CONTACT.addressRegion,
      addressCountry: SITE_CONTACT.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONTACT.mapLat,
      longitude: SITE_CONTACT.mapLng,
    },
  };
}
