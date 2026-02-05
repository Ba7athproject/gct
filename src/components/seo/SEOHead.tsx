import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
    title?: string;
    description?: string;
}

const SITE_TITLE = 'GCT Data Reports';
const DEFAULT_DESCRIPTION = 'Analyse financière détaillée du Groupe Chimique Tunisien (2020-2026). Données ouvertes et visualisations interactives.';

const ROUTE_TITLES: Record<string, string> = {
    '/': 'Dashboard - Synthèse Financière',
    '/evolution': 'Évolution - Analyse Temporelle',
    '/structure': 'Structure - Dettes & Garanties',
    '/sources': 'Sources - Bailleurs de Fonds',
    '/historical': 'Historique - Rétrospective',
    '/report': 'Rapport Complet',
    '/methodology': 'Méthodologie & Sources'
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
