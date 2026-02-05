import { useEffect } from 'react';
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

    useEffect(() => {
        const routeTitle = ROUTE_TITLES[location.pathname] || '';
        const pageTitle = title || routeTitle;

        document.title = pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE;

        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);

    }, [location, title, description]);

    return null;
}
