import { PricingContent } from '@boldmind-tech/ui';

export const metadata = {
    title: 'Pricing - AmeboGist',
    description: 'Pricing plans for AmeboGist',
};

export default function PricingPage() {
    return (
        <main className="flex-1 flex flex-col min-h-screen pt-20">
            <PricingContent productSlug="amebogist" />
        </main>
    );
}
