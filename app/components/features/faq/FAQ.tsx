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
            icon: 'clock',
            question: 'What are your business hours?',
            answer: 'Our customer service team is available Monday through Friday from 9:00 AM to 8:00 PM EST, and weekends from 10:00 AM to 6:00 PM EST. During holidays, hours may vary and will be posted on our website.',
        },
        {
            id: 'item-2',
            icon: 'credit-card',
            question: 'Comment fonctionnent les paiements par abonnement ?',
            answer: 'Subscription payments are automatically charged to your default payment method on the same day each month or year, depending on your billing cycle. You can update your payment information and view billing history in your account dashboard.',
        },
        {
            id: 'item-3',
            icon: 'truck',
            question: 'Peut-on accélérer la livraison ?',
            answer: 'Yes, we offer several expedited shipping options at checkout. Next-day and 2-day shipping are available for most U.S. addresses if orders are placed before 2:00 PM EST. International expedited shipping options vary by destination.',
        },
        {
            id: 'item-4',
            icon: 'globe',
            question: 'Faut-il s\'adresser à la SAV ?',
            answer: 'We offer multilingual support in English, Spanish, French, German, and Japanese. Our support team can assist customers in these languages via email, chat, and phone during standard business hours for each respective region.',
        },
        {
            id: 'item-5',
            icon: 'package',
            question: 'How do I track my order?',
            answer: 'Une fois votre commande expédiée, vous recevrez un email de confirmation avec un numéro de suivi. Vous pouvez utiliser ce numéro sur notre site web ou sur le site de la transporteur pour suivre votre colis. Vous pouvez également voir l\'état de votre commande et les informations de suivi dans votre tableau de bord de compte sous "Historique des commandes".',
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
                                Vous ne trouvez pas ce que vous cherchez ? Contactez notre{' '}
                                <Link
                                    href="#"
                                    className="text-primary font-medium hover:underline">
                                    équipe de support client
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