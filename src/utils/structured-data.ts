import { COMPANY_INFO } from "@/constants/company";

export const generateOrganizationJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": COMPANY_INFO.name,
    "description": COMPANY_INFO.description,
    "url": process.env.NEXT_PUBLIC_APP_URL || COMPANY_INFO.domain,
    "logo": `${process.env.NEXT_PUBLIC_APP_URL || COMPANY_INFO.domain}/icons/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-PREVENUE",
      "contactType": "customer service",
      "email": process.env.NEXT_PUBLIC_CONTACT_EMAIL || COMPANY_INFO.email.hello
    },
    "sameAs": [
      COMPANY_INFO.twitter.replace('@', 'https://twitter.com/'),
      COMPANY_INFO.linkedin
    ],
    "foundingDate": "2025-07",
    "founders": [
      {
        "@type": "Person",
        "name": `${COMPANY_INFO.name} Founding Team`
      }
    ],
    "industry": "Healthcare Technology",
    "numberOfEmployees": "10-50"
  }
}

export const generateSoftwareApplicationJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": COMPANY_INFO.name,
    "description": COMPANY_INFO.shortDescription,
    "url": process.env.NEXT_PUBLIC_APP_URL || COMPANY_INFO.domain,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "Custom Pricing",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150",
      "bestRating": "5"
    },
    "featureList": [
      "AI-powered no-show prediction",
      "Intelligent appointment overbooking",
      "Automated reminder systems",
      "Revenue protection analytics",
      "Practice management integration"
    ]
  }
}

export const generateServiceJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "No-Show Prevention Platform",
    "description": "AI-powered service that predicts and prevents appointment no-shows for healthcare practices, salons, and service businesses",
    "provider": {
      "@type": "Organization",
      "name": COMPANY_INFO.name
    },
    "areaServed": "United States",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${COMPANY_INFO.name} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI No-Show Prediction"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Intelligent Appointment Overbooking"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Automated Reminder Management"
          }
        }
      ]
    }
  }
}