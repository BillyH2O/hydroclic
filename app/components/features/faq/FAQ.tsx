'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'layout-grid',
            question: 'Quels types de produits proposez-vous ?',
            answer:
                'Nous proposons une large gamme de produits en plomberie, en électricité, en climatisation, en solution de chauffage, en outillage et en sanitaire, adaptés aussi bien aux professionnels qu’aux particuliers.',
        },
        {
            id: 'item-2',
            icon: 'briefcase-business',
            question: 'Travaillez-vous avec les professionnels ?',
            answer:
                'Oui, nous accompagnons régulièrement des artisans et entreprises avec des commandes récurrentes et un suivi personnalisé.',
        },
        {
            id: 'item-3',
            icon: 'shopping-bag',
            question: 'Peut-on commander à distance ?',
            answer:
                'Oui, vous pouvez nous contacter pour préparer votre commande à l’avance et venir la récupérer rapidement en magasin.',
        },
        {
            id: 'item-4',
            icon: 'lightbulb',
            question: 'Proposez-vous des conseils techniques ?',
            answer:
                'Bien sûr, notre équipe est disponible pour vous conseiller et vous orienter vers les produits les plus adaptés à vos besoins.',
        },
        {
            id: 'item-5',
            icon: 'package-search',
            question: 'Quels sont vos délais de disponibilité ?',
            answer:
                'La majorité de nos produits sont disponibles immédiatement. Pour les références spécifiques, nous vous informons rapidement des délais.',
        },
        {
            id: 'item-6',
            icon: 'truck',
            question: 'La livraison est-elle gratuite ?',
            answer:
                'Oui, la livraison est offerte dès 200 € d’achat. En dessous, des frais de livraison s’appliquent.',
        },
    ]

    return (
        <section className="w-full py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Questions fréquentes</h2>
                            <p className="text-muted-foreground mt-4">
                                Vous ne trouvez pas ce que vous cherchez ?{' '}
                                <Link href="/contact" className="text-primary font-medium hover:underline">
                                    Contactez-nous
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-white/65 shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}