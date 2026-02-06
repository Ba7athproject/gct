import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
    title?: string;
    description?: string;
}

const SITE_TITLE = 'GCT Investigation Suite';
const DEFAULT_DESCRIPTION = 'Plateforme d\'investigation de données sur le Groupe Chimique Tunisien. Données financières, environnementales et gouvernance.';

const ROUTE_TITLES: Record<string, string> = {
    '/finance': 'Synthèse Financière | Finances',
    '/finance/evolution': 'Analyse Temporelle | Finances',
    '/finance/structure': 'Dettes & Garanties | Finances',
    '/finance/sources': 'Cartographie Bailleurs | Finances',
    '/finance/historical': 'Rétrospective Historique | Finances',
    '/finance/report': 'Corpus Documentaire | Finances',
    '/finance/report-md': 'Audit Financier Consolidé 2008-2026 | Finances',
    '/finance/methodology': 'Audit Méthodologique | Finances',
    '/ecology': 'Indicateurs Environnementaux | Écologie',
    '/ecology/report': 'Rapport Environnemental Golfe de Gabès | Écologie',
    '/governance': 'Structure de Décision | Gouvernance'
};

const ROUTE_DESCRIPTIONS: Record<string, string> = {
    '/finance/report-md': 'Analyse technique consolidée des transferts étatiques, garanties souveraines et endettement du Groupe Chimique Tunisien sur la période 2008-2026.',
    '/ecology/report': 'Synthèse des impacts écologiques du complexe chimique de Gabès-Sfax : mer, sols, air et nappes souterraines. Données scientifiques et audits environnementaux.',
};

export default function SEOHead({ title, description }: SEOHeadProps) {
    const location = useLocation();

    const routeTitle = ROUTE_TITLES[location.pathname] || '';
    const routeDescription = ROUTE_DESCRIPTIONS[location.pathname] || description || DEFAULT_DESCRIPTION;
    const pageTitle = title || routeTitle;
    const finalTitle = pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE;

    const GA_ID = 'G-3DFTYVBYJC';
    const siteUrl = 'https://ba7athproject.github.io/gct/';

    return (
        <>
            <title>{finalTitle}</title>
            <meta name="description" content={routeDescription} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={routeDescription} />
            <meta property="og:site_name" content={SITE_TITLE} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={routeDescription} />

            {/* Google Analytics V4 */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `
                }}
            />
        </>
    );
}
