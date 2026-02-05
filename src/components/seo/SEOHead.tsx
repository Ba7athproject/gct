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
    '/finance/methodology': 'Audit Méthodologique | Finances',
    '/ecology': 'Indicateurs Environnementaux | Écologie',
    '/governance': 'Structure de Décision | Gouvernance'
};

export default function SEOHead({ title, description = DEFAULT_DESCRIPTION }: SEOHeadProps) {
    const location = useLocation();

    const routeTitle = ROUTE_TITLES[location.pathname] || '';
    const pageTitle = title || routeTitle;
    const finalTitle = pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE;

    const GA_ID = 'G-3DFTYVBYJC';

    return (
        <>
            <title>{finalTitle}</title>
            <meta name="description" content={description} />

            {/* Google Analytics V4 */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}');
                `
            }} />
        </>
    );
}
