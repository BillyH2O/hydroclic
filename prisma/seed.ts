import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Nettoyer les données existantes
  await prisma.product.deleteMany()
  console.log('✅ Cleared existing products')

  // Produits sampleProducts (IDs 1-8)
  const sampleProducts = [
    {
      id: '1',
      sku: 'SFRCS45 22',
      name: 'Coude Cuivre à Sertir Ø22',
      slug: 'coude-cuivre-a-sertir-22',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 3.984,
      priceB2B: 3.5856, // 90% du prix B2C
      image: '/produit-1.png',
      imageAlt: 'Coude Cuivre à Sertir Ø22',
      category: 'nouveaute',
      isNew: true,
},

{
      id: '2',
      sku: 'SFRCS45 28',
      name: 'Coude Cuivre à Sertir Ø28',
      slug: 'coude-cuivre-a-sertir-28',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 5.568,
      priceB2B: 5.0112, // 90% du prix B2C
      image: '/produit-2.png',
      imageAlt: 'Coude Cuivre à Sertir Ø28',
      category: 'promotion',
      isPromotion: true,
      discount: 15,
},

{
      id: '3',
      sku: 'SFRCS90 22',
      name: 'COUDE 90 A SERTIR FEMELLE FEMELLE 22',
      slug: 'coude-90-a-sertir-femelle-femelle-22',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.224,
      priceB2B: 3.8016, // 90% du prix B2C
      image: '/produit-3.png',
      imageAlt: 'COUDE 90 A SERTIR FEMELLE FEMELLE 22',
      category: 'destockage',
      isDestockage: true,
      discount: 30,
},

{
      id: '4',
      sku: 'SFRCS90 28',
      name: 'COUDE 90 A SERTIR FEMELLE FEMELLE 28',
      slug: 'coude-90-a-sertir-femelle-femelle-28',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 6.864,
      priceB2B: 6.1776, // 90% du prix B2C
      image: '/produit-4.png',
      imageAlt: 'COUDE 90 A SERTIR FEMELLE FEMELLE 28',
      category: 'catalogue',
      productType: 'hydrodistribution',
},

{
      id: '5',
      sku: 'SFRCS45MF 22',
      name: 'Raccord cuivre à sertir - Courbe 45° Mâle/Femelle Ø22',
      slug: 'raccord-cuivre-a-sertir-courbe-45-male-femelle-22',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 3.828,
      priceB2B: 3.4452, // 90% du prix B2C
      image: '/produit-5.png',
      imageAlt: 'Raccord cuivre à sertir - Courbe 45° Mâle/Femelle Ø22',
      category: 'catalogue',
      productType: 'hydrodistribution',
},

{
      id: '6',
      sku: 'SFRCS45MF 28',
      name: 'Raccord cuivre à sertir - Courbe 45° Mâle/Femelle Ø28',
      slug: 'raccord-cuivre-a-sertir-courbe-45-male-femelle-28',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 5.856,
      priceB2B: 5.2704, // 90% du prix B2C
      image: '/produit-6.png',
      imageAlt: 'Raccord cuivre à sertir - Courbe 45° Mâle/Femelle Ø28',
      category: 'catalogue',
      productType: 'hydrodistribution',
},

{
      id: '7',
      sku: 'SFRCS90MF 22',
      name: 'Raccord cuivre à sertir - Courbe 90° Mâle/Femelle Ø22',
      slug: 'raccord-cuivre-a-sertir-courbe-90-male-femelle-22',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.329,
      priceB2B: 3.8961, // 90% du prix B2C
      image: '/produit-7.png',
      imageAlt: 'Raccord cuivre à sertir - Courbe 90° Mâle/Femelle Ø22',
      category: 'catalogue',
      productType: 'hydrodistribution',
},

{
      id: '8',
      sku: 'SFRCS90MF 28',
      name: 'Raccord cuivre à sertir - Courbe 90° Mâle/Femelle Ø28',
      slug: 'raccord-cuivre-a-sertir-courbe-90-male-femelle-28',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 7.07,
      priceB2B: 6.363, // 90% du prix B2C
      image: '/produit-8.png',
      imageAlt: 'Raccord cuivre à sertir - Courbe 90° Mâle/Femelle Ø28',
      category: 'catalogue',
      productType: 'hydrodistribution',
},

{
      id: '9',
      sku: 'SFMRS 22-18',
      name: 'Manchon réduit cuivre à sertir 22 - 18',
      slug: 'manchon-reduit-cuivre-a-sertir-22-18',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 3.36,
      priceB2B: 3.024, // 90% du prix B2C
      image: '/produit-9.png',
      imageAlt: 'Manchon réduit cuivre à sertir 22 - 18',
      category: 'catalogue',
},

{
      id: '10',
      sku: 'SFRCS 22 3/4',
      name: 'Raccord cuivre à sertir - Manchon Femelle Ø22x3/4',
      slug: 'raccord-cuivre-a-sertir-manchon-femelle-22x3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.008,
      priceB2B: 3.6072, // 90% du prix B2C
      image: '/produit-10.png',
      imageAlt: 'Raccord cuivre à sertir - Manchon Femelle Ø22x3/4',
      category: 'catalogue',
},

{
      id: '11',
      sku: 'SFMFSMV 22X3/4',
      name: 'Mamelon femelle a sertir male a visser 22 -20/27 (3/4)',
      slug: 'mamelon-femelle-a-sertir-male-a-visser-22-20-27-3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 6.336,
      priceB2B: 5.7024, // 90% du prix B2C
      image: '/produit-11.png',
      imageAlt: 'Mamelon femelle a sertir male a visser 22 -20/27 (3/4)',
      category: 'catalogue',
},

{
      id: '12',
      sku: 'SFMFSMV 28X1',
      name: 'Mamelon femelle a sertir male a visser 28 -26/34 (1)',
      slug: 'mamelon-femelle-a-sertir-male-a-visser-28-26-34-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 6.684,
      priceB2B: 6.0156, // 90% du prix B2C
      image: '/produit-12.png',
      imageAlt: 'Mamelon femelle a sertir male a visser 28 -26/34 (1)',
      category: 'catalogue',
},

{
      id: '13',
      sku: 'SFRSELF 22X1',
      name: 'Raccord a sertir Ø 22 écrou libre femelle (1)',
      slug: 'raccord-a-sertir-22-ecrou-libre-femelle-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 9.24,
      priceB2B: 8.316, // 90% du prix B2C
      image: '/produit-13.png',
      imageAlt: 'Raccord a sertir Ø 22 écrou libre femelle (1)',
      category: 'catalogue',
},

{
      id: '14',
      sku: 'SFRSELF 28X1',
      name: 'Raccord a sertir Ø 28 écrou libre femelle (1)',
      slug: 'raccord-a-sertir-28-ecrou-libre-femelle-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 10.056,
      priceB2B: 9.0504, // 90% du prix B2C
      image: '/produit-14.png',
      imageAlt: 'Raccord a sertir Ø 28 écrou libre femelle (1)',
      category: 'catalogue',
},

{
      id: '15',
      sku: 'SFRCS 22',
      name: 'Raccord cuivre à sertir - Manchon Femelle Ø22',
      slug: 'raccord-cuivre-a-sertir-manchon-femelle-22',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 3.168,
      priceB2B: 2.8512, // 90% du prix B2C
      image: '/produit-15.png',
      imageAlt: 'Raccord cuivre à sertir - Manchon Femelle Ø22',
      category: 'catalogue',
},

{
      id: '16',
      sku: 'SFRCS 28',
      name: 'Raccord cuivre à sertir - Manchon Femelle Ø28',
      slug: 'raccord-cuivre-a-sertir-manchon-femelle-28',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.092,
      priceB2B: 3.6828, // 90% du prix B2C
      image: '/produit-16.png',
      imageAlt: 'Raccord cuivre à sertir - Manchon Femelle Ø28',
      category: 'catalogue',
},

{
      id: '17',
      sku: 'MULTI 16/100',
      name: '100M Tube multicouche nu Ø 16',
      slug: '100m-tube-multicouche-nu-16',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 82.8,
      priceB2B: 74.52, // 90% du prix B2C
      image: '/produit-17.png',
      imageAlt: '100M Tube multicouche nu Ø 16',
      category: 'catalogue',
      productType: 'hydrodistribution',
},

{
      id: '18',
      sku: 'MULTI 20/100',
      name: '100M Tube multicouche nu Ø 20',
      slug: '100m-tube-multicouche-nu-20',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 114.0,
      priceB2B: 102.6, // 90% du prix B2C
      image: '/produit-18.png',
      imageAlt: '100M Tube multicouche nu Ø 20',
      category: 'catalogue',
      productType: 'hydrodistribution',
},

{
      id: '19',
      sku: 'MULTI 26/100',
      name: '100M Tube multicouche nu Ø 26',
      slug: '100m-tube-multicouche-nu-26',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 204.0,
      priceB2B: 183.6, // 90% du prix B2C
      image: '/produit-19.png',
      imageAlt: '100M Tube multicouche nu Ø 26',
      category: 'catalogue',
      productType: 'hydrodistribution',
},

{
      id: '20',
      sku: 'Multi 30/32',
      name: 'Tube multicouche  Ø 32 3M',
      slug: 'tube-multicouche-32-3m',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 11.76,
      priceB2B: 10.584, // 90% du prix B2C
      image: '/produit-20.png',
      imageAlt: 'Tube multicouche  Ø 32 3M',
      category: 'catalogue',
},

{
      id: '21',
      sku: 'SFRUM 16',
      name: 'RACCORD UNION MULTICOUCHE À SERTIR Ø 16',
      slug: 'raccord-union-multicouche-a-sertir-16',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 1.5,
      priceB2B: 1.35, // 90% du prix B2C
      image: '/produit-21.png',
      imageAlt: 'RACCORD UNION MULTICOUCHE À SERTIR Ø 16',
      category: 'catalogue',
},

{
      id: '22',
      sku: 'SFRUM 20',
      name: 'RACCORD UNION MULTICOUCHE À SERTIR Ø 20',
      slug: 'raccord-union-multicouche-a-sertir-20',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 1.932,
      priceB2B: 1.7388, // 90% du prix B2C
      image: '/produit-22.png',
      imageAlt: 'RACCORD UNION MULTICOUCHE À SERTIR Ø 20',
      category: 'catalogue',
},

{
      id: '23',
      sku: 'SFRUM 26',
      name: 'RACCORD UNION MULTICOUCHE À SERTIR Ø 26',
      slug: 'raccord-union-multicouche-a-sertir-26',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 3.48,
      priceB2B: 3.132, // 90% du prix B2C
      image: '/produit-23.png',
      imageAlt: 'RACCORD UNION MULTICOUCHE À SERTIR Ø 26',
      category: 'catalogue',
},

{
      id: '24',
      sku: 'SFRUM 32',
      name: 'RACCORD UNION MULTICOUCHE À SERTIR Ø 32',
      slug: 'raccord-union-multicouche-a-sertir-32',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.884,
      priceB2B: 4.3956, // 90% du prix B2C
      image: '/produit-24.png',
      imageAlt: 'RACCORD UNION MULTICOUCHE À SERTIR Ø 32',
      category: 'catalogue',
},

{
      id: '25',
      sku: 'SFCEM 16',
      name: 'Coude Egal multicouche à sertir  Ø 16',
      slug: 'coude-egal-multicouche-a-sertir-16',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 2.028,
      priceB2B: 1.8252, // 90% du prix B2C
      image: '/produit-25.png',
      imageAlt: 'Coude Egal multicouche à sertir  Ø 16',
      category: 'catalogue',
},

{
      id: '26',
      sku: 'SFCEM 20',
      name: 'Coude Egal multicouche à sertir  Ø 20',
      slug: 'coude-egal-multicouche-a-sertir-20',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 2.724,
      priceB2B: 2.4516, // 90% du prix B2C
      image: '/produit-26.png',
      imageAlt: 'Coude Egal multicouche à sertir  Ø 20',
      category: 'catalogue',
},

{
      id: '27',
      sku: 'SFCEM 26',
      name: 'Coude Egal multicouche à sertir  Ø 26',
      slug: 'coude-egal-multicouche-a-sertir-26',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.596,
      priceB2B: 4.1364, // 90% du prix B2C
      image: '/produit-27.png',
      imageAlt: 'Coude Egal multicouche à sertir  Ø 26',
      category: 'catalogue',
},

{
      id: '28',
      sku: 'SFCEM 32',
      name: 'Coude Egal multicouche à sertir  Ø 32',
      slug: 'coude-egal-multicouche-a-sertir-32',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 7.608,
      priceB2B: 6.8472, // 90% du prix B2C
      image: '/produit-28.png',
      imageAlt: 'Coude Egal multicouche à sertir  Ø 32',
      category: 'catalogue',
},

{
      id: '29',
      sku: 'SFTEM 16',
      name: 'Tés Egaux multicouche à sertir Ø 16',
      slug: 'tes-egaux-multicouche-a-sertir-16',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 2.856,
      priceB2B: 2.5704, // 90% du prix B2C
      image: '/produit-29.png',
      imageAlt: 'Tés Egaux multicouche à sertir Ø 16',
      category: 'catalogue',
},

{
      id: '30',
      sku: 'SFTEM 20',
      name: 'Tés Egaux multicouche à sertir Ø 20',
      slug: 'tes-egaux-multicouche-a-sertir-20',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 3.696,
      priceB2B: 3.3264, // 90% du prix B2C
      image: '/produit-30.png',
      imageAlt: 'Tés Egaux multicouche à sertir Ø 20',
      category: 'catalogue',
},

{
      id: '31',
      sku: 'SFTEM 26',
      name: 'Tés Egaux multicouche à sertir Ø 26',
      slug: 'tes-egaux-multicouche-a-sertir-26',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 6.576,
      priceB2B: 5.9184, // 90% du prix B2C
      image: '/produit-31.png',
      imageAlt: 'Tés Egaux multicouche à sertir Ø 26',
      category: 'catalogue',
},

{
      id: '32',
      sku: 'SFTEM 32',
      name: 'Tés Egaux multicouche à sertir Ø 32',
      slug: 'tes-egaux-multicouche-a-sertir-32',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 9.9,
      priceB2B: 8.91, // 90% du prix B2C
      image: '/produit-32.png',
      imageAlt: 'Tés Egaux multicouche à sertir Ø 32',
      category: 'catalogue',
},

{
      id: '33',
      sku: 'SFTEM 16X1/2',
      name: 'ecrou tournant multicouche a sertir 16X1/2',
      slug: 'ecrou-tournant-multicouche-a-sertir-16x1-2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 1.872,
      priceB2B: 1.6848, // 90% du prix B2C
      image: '/produit-33.png',
      imageAlt: 'ecrou tournant multicouche a sertir 16X1/2',
      category: 'catalogue',
},

{
      id: '34',
      sku: 'SFTEM 26X1',
      name: 'ecrou tournant multicouche a sertir 26X1',
      slug: 'ecrou-tournant-multicouche-a-sertir-26x1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 3.912,
      priceB2B: 3.5208, // 90% du prix B2C
      image: '/produit-34.png',
      imageAlt: 'ecrou tournant multicouche a sertir 26X1',
      category: 'catalogue',
},

{
      id: '35',
      sku: 'SFTEM 32X1',
      name: 'ecrou tournant multicouche a sertir 32X1',
      slug: 'ecrou-tournant-multicouche-a-sertir-32x1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.404,
      priceB2B: 3.9636, // 90% du prix B2C
      image: '/produit-35.png',
      imageAlt: 'ecrou tournant multicouche a sertir 32X1',
      category: 'catalogue',
},

{
      id: '36',
      sku: 'SFTEM 32X11/4',
      name: 'ecrou tournant multicouche a sertir  32X11/4',
      slug: 'ecrou-tournant-multicouche-a-sertir-32x11-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 5.52,
      priceB2B: 4.968, // 90% du prix B2C
      image: '/produit-36.png',
      imageAlt: 'ecrou tournant multicouche a sertir  32X11/4',
      category: 'catalogue',
},

{
      id: '37',
      sku: 'SFETM 20X1/2',
      name: 'ecrou tournant multicouche a sertir 20X1/2',
      slug: 'ecrou-tournant-multicouche-a-sertir-20x1-2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 2.22,
      priceB2B: 1.998, // 90% du prix B2C
      image: '/produit-37.png',
      imageAlt: 'ecrou tournant multicouche a sertir 20X1/2',
      category: 'catalogue',
},

{
      id: '38',
      sku: 'SFETM 16X3/4',
      name: 'ecrou tournant multicouche a sertir 16X3/4',
      slug: 'ecrou-tournant-multicouche-a-sertir-16x3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 2.688,
      priceB2B: 2.4192, // 90% du prix B2C
      image: '/produit-38.png',
      imageAlt: 'ecrou tournant multicouche a sertir 16X3/4',
      category: 'catalogue',
},

{
      id: '39',
      sku: 'SFETM 20X3/4',
      name: 'ecrou tournant multicouche a sertir 20X3/4',
      slug: 'ecrou-tournant-multicouche-a-sertir-20x3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 2.82,
      priceB2B: 2.538, // 90% du prix B2C
      image: '/produit-39.png',
      imageAlt: 'ecrou tournant multicouche a sertir 20X3/4',
      category: 'catalogue',
},

{
      id: '40',
      sku: 'SFETM 26X3/4',
      name: 'ecrou tournant multicouche a sertir 26X3/4',
      slug: 'ecrou-tournant-multicouche-a-sertir-26x3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.068,
      priceB2B: 3.6612, // 90% du prix B2C
      image: '/produit-40.png',
      imageAlt: 'ecrou tournant multicouche a sertir 26X3/4',
      category: 'catalogue',
},

{
      id: '41',
      sku: 'SFETM 32X11/4',
      name: 'ecrou tournant multicouche a sertir 32X11/4',
      slug: 'ecrou-tournant-multicouche-a-sertir-sfetm-32x11-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 7.176,
      priceB2B: 6.4584, // 90% du prix B2C
      image: '/produit-41.png',
      imageAlt: 'ecrou tournant multicouche a sertir 32X11/4',
      category: 'catalogue',
},

{
      id: '42',
      sku: 'SFTRM 20-16-20',
      name: 'Té reduit multicouche a sertir 20-16-20',
      slug: 'te-reduit-multicouche-a-sertir-20-16-20',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 3.48,
      priceB2B: 3.132, // 90% du prix B2C
      image: '/produit-42.png',
      imageAlt: 'Té reduit multicouche a sertir 20-16-20',
      category: 'catalogue',
},

{
      id: '43',
      sku: 'SFTRM 26-16 26',
      name: 'Té reduit multicouche a sertir 26-16-26',
      slug: 'te-reduit-multicouche-a-sertir-26-16-26',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 5.064,
      priceB2B: 4.5576, // 90% du prix B2C
      image: '/produit-43.png',
      imageAlt: 'Té reduit multicouche a sertir 26-16-26',
      category: 'catalogue',
},

{
      id: '44',
      sku: 'SFTRM 26-20-26',
      name: 'Té reduit multicouche a sertir 26-20-26',
      slug: 'te-reduit-multicouche-a-sertir-26-20-26',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 5.496,
      priceB2B: 4.9464, // 90% du prix B2C
      image: '/produit-44.png',
      imageAlt: 'Té reduit multicouche a sertir 26-20-26',
      category: 'catalogue',
},

{
      id: '45',
      sku: 'SFCFM 20x3/4',
      name: 'COUDE FEMELLE MULTICOUCHE À SERTIR 20 X 3/4',
      slug: 'coude-femelle-multicouche-a-sertir-20-x-3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 3.936,
      priceB2B: 3.5424, // 90% du prix B2C
      image: '/produit-45.png',
      imageAlt: 'COUDE FEMELLE MULTICOUCHE À SERTIR 20 X 3/4',
      category: 'catalogue',
},

{
      id: '46',
      sku: 'SFCFM 20x1',
      name: 'COUDE FEMELLE MULTICOUCHE À SERTIR 20 X 1',
      slug: 'coude-femelle-multicouche-a-sertir-20-x-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.356,
      priceB2B: 3.9204, // 90% du prix B2C
      image: '/produit-46.png',
      imageAlt: 'COUDE FEMELLE MULTICOUCHE À SERTIR 20 X 1',
      category: 'catalogue',
},

{
      id: '47',
      sku: 'SFCFM 26X1',
      name: 'COUDE FEMELLE MULTICOUCHE À SERTIR 26 X 1',
      slug: 'coude-femelle-multicouche-a-sertir-26-x-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 6.516,
      priceB2B: 5.8644, // 90% du prix B2C
      image: '/produit-47.png',
      imageAlt: 'COUDE FEMELLE MULTICOUCHE À SERTIR 26 X 1',
      category: 'catalogue',
},

{
      id: '48',
      sku: 'SFCFM 32x1',
      name: 'COUDE FEMELLE MULTICOUCHE À SERTIR 32 X 1',
      slug: 'coude-femelle-multicouche-a-sertir-32-x-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 6.492,
      priceB2B: 5.8428, // 90% du prix B2C
      image: '/produit-48.png',
      imageAlt: 'COUDE FEMELLE MULTICOUCHE À SERTIR 32 X 1',
      category: 'catalogue',
},

{
      id: '49',
      sku: 'SFPDMC 16X16',
      name: 'Raccord passerelle droit cuivre multicouche à sertir -  multicouche Ø 16 mm -  cuivre Ø 16 mm',
      slug: 'raccord-passerelle-droit-cuivre-multicouche-a-sertir-multicouche-16-mm-cuivre-16-mm',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 1.296,
      priceB2B: 1.1664, // 90% du prix B2C
      image: '/produit-49.png',
      imageAlt: 'Raccord passerelle droit cuivre multicouche à sertir -  multicouche Ø 16 mm -  cuivre Ø 16 mm',
      category: 'catalogue',
},

{
      id: '50',
      sku: 'SFPCT',
      name: 'Pince coupe tube',
      slug: 'pince-coupe-tube',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 8.82,
      priceB2B: 7.938, // 90% du prix B2C
      image: '/produit-50.png',
      imageAlt: 'Pince coupe tube',
      category: 'catalogue',
      productType: 'outillage',
},

{
      id: '51',
      sku: 'SFC',
      name: 'Calibreur ébavureur Ø16-Ø20-Ø26',
      slug: 'calibreur-ebavureur-16-20-26',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.56,
      priceB2B: 4.104, // 90% du prix B2C
      image: '/produit-51.png',
      imageAlt: 'Calibreur ébavureur Ø16-Ø20-Ø26',
      category: 'catalogue',
      productType: 'outillage',
},

{
      id: '52',
      sku: 'SFMEM 3/4',
      name: 'Mamelons égaux mâles 20 X 27 - (3/4)',
      slug: 'mamelons-egaux-males-20-x-27-3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 1.368,
      priceB2B: 1.2312, // 90% du prix B2C
      image: '/produit-52.png',
      imageAlt: 'Mamelons égaux mâles 20 X 27 - (3/4)',
      category: 'catalogue',
},

{
      id: '53',
      sku: 'SFMEM 1',
      name: 'Mamelons égaux mâles 26 X 34 - (1)',
      slug: 'mamelons-egaux-males-26-x-34-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 2.688,
      priceB2B: 2.4192, // 90% du prix B2C
      image: '/produit-53.png',
      imageAlt: 'Mamelons égaux mâles 26 X 34 - (1)',
      category: 'catalogue',
},

{
      id: '54',
      sku: 'SFVFF 3/4',
      name: 'Vannes à Poignée (FF) 20 X 27 - (3/4)',
      slug: 'vannes-a-poignee-ff-20-x-27-3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 5.76,
      priceB2B: 5.184, // 90% du prix B2C
      image: '/produit-54.png',
      imageAlt: 'Vannes à Poignée (FF) 20 X 27 - (3/4)',
      category: 'catalogue',
      productType: 'sanitaire',
},

{
      id: '55',
      sku: 'SFVFF 1',
      name: 'Vannes à Poignée (FF) 26 X 34 - (1)',
      slug: 'vannes-a-poignee-ff-26-x-34-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 10.188,
      priceB2B: 9.1692, // 90% du prix B2C
      image: '/produit-55.png',
      imageAlt: 'Vannes à Poignée (FF) 26 X 34 - (1)',
      category: 'catalogue',
},

{
      id: '56',
      sku: 'SFVMM 3/4',
      name: 'Vannes à Poignée (MM) 20 X 27 - (3/4)',
      slug: 'vannes-a-poignee-mm-20-x-27-3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 6.312,
      priceB2B: 5.6808, // 90% du prix B2C
      image: '/produit-56.png',
      imageAlt: 'Vannes à Poignée (MM) 20 X 27 - (3/4)',
      category: 'catalogue',
},

{
      id: '57',
      sku: 'SFVMM 1',
      name: 'Vannes à Poignée (MM) 26 X 34 - (1)',
      slug: 'vannes-a-poignee-mm-26-x-34-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 10.14,
      priceB2B: 9.126, // 90% du prix B2C
      image: '/produit-57.png',
      imageAlt: 'Vannes à Poignée (MM) 26 X 34 - (1)',
      category: 'catalogue',
},

{
      id: '58',
      sku: 'SFVMF 3/4',
      name: 'Vannes à Poignée (MF) 20 X 27 - (3/4)',
      slug: 'vannes-a-poignee-mf-20-x-27-3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 5.916,
      priceB2B: 5.3244, // 90% du prix B2C
      image: '/produit-58.png',
      imageAlt: 'Vannes à Poignée (MF) 20 X 27 - (3/4)',
      category: 'catalogue',
},

{
      id: '59',
      sku: 'SFVMF 1',
      name: 'Vannes à Poignée (MF) 26 X 34 - (1)',
      slug: 'vannes-a-poignee-mf-26-x-34-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 9.816,
      priceB2B: 8.8344, // 90% du prix B2C
      image: '/produit-59.png',
      imageAlt: 'Vannes à Poignée (MF) 26 X 34 - (1)',
      category: 'catalogue',
},

{
      id: '60',
      sku: 'SFVPFF 1/2',
      name: 'Vanne a papillon (FF) 15X21 (1/2)',
      slug: 'vanne-a-papillon-ff-15x21-1-2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.464,
      priceB2B: 4.0176, // 90% du prix B2C
      image: '/produit-60.png',
      imageAlt: 'Vanne a papillon (FF) 15X21 (1/2)',
      category: 'catalogue',
},

{
      id: '61',
      sku: 'SFVPFF 3/4',
      name: 'Vanne a papillon (FF) 20X27 (3/4)',
      slug: 'vanne-a-papillon-ff-20x27-3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 6.252,
      priceB2B: 5.6268, // 90% du prix B2C
      image: '/produit-61.png',
      imageAlt: 'Vanne a papillon (FF) 20X27 (3/4)',
      category: 'catalogue',
},

{
      id: '62',
      sku: 'SFVPFF 1',
      name: 'Vanne à papillon (FF) 26X34 (1)',
      slug: 'vanne-a-papillon-ff-26x34-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 10.428,
      priceB2B: 9.3852, // 90% du prix B2C
      image: '/produit-62.png',
      imageAlt: 'Vanne à papillon (FF) 26X34 (1)',
      category: 'catalogue',
},

{
      id: '63',
      sku: 'SFVPMM 1/2',
      name: 'Vanne a papillon MM 15X21 (1/2)',
      slug: 'vanne-a-papillon-mm-15x21-1-2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 5.232,
      priceB2B: 4.7088, // 90% du prix B2C
      image: '/produit-63.png',
      imageAlt: 'Vanne a papillon MM 15X21 (1/2)',
      category: 'catalogue',
},

{
      id: '64',
      sku: 'SFVPMM 3/4',
      name: 'Vanne a papillon (MM) 20X27 (3/4)',
      slug: 'vanne-a-papillon-mm-20x27-3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 6.204,
      priceB2B: 5.5836, // 90% du prix B2C
      image: '/produit-64.png',
      imageAlt: 'Vanne a papillon (MM) 20X27 (3/4)',
      category: 'catalogue',
},

{
      id: '65',
      sku: 'SFVPMM 1',
      name: 'Vanne a papillon MM 26X34 (1)',
      slug: 'vanne-a-papillon-mm-26x34-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 10.08,
      priceB2B: 9.072, // 90% du prix B2C
      image: '/produit-65.png',
      imageAlt: 'Vanne a papillon MM 26X34 (1)',
      category: 'catalogue',
},

{
      id: '66',
      sku: 'SFVPMF 1/2',
      name: 'Vanne à papillon  (MF) 15X21 (1/2)',
      slug: 'vanne-a-papillon-mf-15x21-1-2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 5.232,
      priceB2B: 4.7088, // 90% du prix B2C
      image: '/produit-66.png',
      imageAlt: 'Vanne à papillon  (MF) 15X21 (1/2)',
      category: 'catalogue',
},

{
      id: '67',
      sku: 'SFVPMF 3/4',
      name: 'Vanne a papillon   (MF) 20 X 27 - (3/4)',
      slug: 'vanne-a-papillon-mf-20-x-27-3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 6.312,
      priceB2B: 5.6808, // 90% du prix B2C
      image: '/produit-67.png',
      imageAlt: 'Vanne a papillon   (MF) 20 X 27 - (3/4)',
      category: 'catalogue',
},

{
      id: '68',
      sku: 'SFVPMF 1',
      name: 'Vanne à papillon  (MF) 26X34 (1)',
      slug: 'vanne-a-papillon-mf-26x34-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 10.824,
      priceB2B: 9.7416, // 90% du prix B2C
      image: '/produit-68.png',
      imageAlt: 'Vanne à papillon  (MF) 26X34 (1)',
      category: 'catalogue',
},

{
      id: '69',
      sku: '8064687.0',
      name: 'thermostat NETATMO',
      slug: 'thermostat-netatmo',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 96.0,
      priceB2B: 86.4, // 90% du prix B2C
      image: '/produit-69.png',
      imageAlt: 'thermostat NETATMO',
      category: 'catalogue',
      productType: 'chauffage-climatisation',
},

{
      id: '70',
      sku: '2451.0',
      name: 'reducteur de pression 20/27',
      slug: 'reducteur-de-pression-20-27',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 19.08,
      priceB2B: 17.172, // 90% du prix B2C
      image: '/produit-70.png',
      imageAlt: 'reducteur de pression 20/27',
      category: 'catalogue',
},

{
      id: '71',
      sku: '1969.0',
      name: 'mamelon egal 3/4',
      slug: 'mamelon-egal-3-4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 1.68,
      priceB2B: 1.512, // 90% du prix B2C
      image: '/produit-71.png',
      imageAlt: 'mamelon egal 3/4',
      category: 'catalogue',
},

{
      id: '72',
      sku: '1970.0',
      name: 'mamelon egal 1',
      slug: 'mamelon-egal-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 3.36,
      priceB2B: 3.024, // 90% du prix B2C
      image: '/produit-72.png',
      imageAlt: 'mamelon egal 1',
      category: 'catalogue',
},

{
      id: '73',
      sku: '196900.0',
      name: 'mamelon egal 3/4 ECO',
      slug: 'mamelon-egal-3-4-eco',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 1.368,
      priceB2B: 1.2312, // 90% du prix B2C
      image: '/produit-73.png',
      imageAlt: 'mamelon egal 3/4 ECO',
      category: 'catalogue',
},

{
      id: '74',
      sku: '197000.0',
      name: 'mamelon egal 1 ECO',
      slug: 'mamelon-egal-1-eco',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 2.688,
      priceB2B: 2.4192, // 90% du prix B2C
      image: '/produit-74.png',
      imageAlt: 'mamelon egal 1 ECO',
      category: 'catalogue',
},

{
      id: '75',
      sku: '7757.0',
      name: 'circulateur',
      slug: 'circulateur',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 89.1,
      priceB2B: 80.19, // 90% du prix B2C
      image: '/produit-75.png',
      imageAlt: 'circulateur',
      category: 'catalogue',
      productType: 'chauffage-climatisation',
},

{
      id: '76',
      sku: '99992.0',
      name: 'groupe de sécurité',
      slug: 'groupe-de-securite',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 30.0,
      priceB2B: 27, // 90% du prix B2C
      image: '/produit-76.png',
      imageAlt: 'groupe de sécurité',
      category: 'catalogue',
},

{
      id: '77',
      sku: 'W: 22156',
      name: 'Pot a boue',
      slug: 'pot-a-boue',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 67.2,
      priceB2B: 60.48, // 90% du prix B2C
      image: '/produit-77.png',
      imageAlt: 'Pot a boue',
      category: 'catalogue',
},

{
      id: '78',
      sku: 'CA 2096 3/4',
      name: 'disconneteur',
      slug: 'disconneteur',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 45.0,
      priceB2B: 40.5, // 90% du prix B2C
      image: '/produit-78.png',
      imageAlt: 'disconneteur',
      category: 'catalogue',
},

{
      id: '79',
      sku: '3598781240038.0',
      name: 'Lot de 2 raccords union fonte G1 1/2 - 1F + 1',
      slug: 'lot-de-2-raccords-union-fonte-g1-1-2-1f-1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 4.56,
      priceB2B: 4.104, // 90% du prix B2C
      image: '/produit-79.png',
      imageAlt: 'Lot de 2 raccords union fonte G1 1/2 - 1F + 1',
      category: 'catalogue',
},

{
      id: '80',
      sku: '5060103691913.0',
      name: 'Circulateur SALUS - Diamètre 1 - 1/2 M - MP280A',
      slug: 'circulateur-salus-diametre-1-1-2-m-mp280a',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 102.0,
      priceB2B: 91.8, // 90% du prix B2C
      image: '/produit-80.png',
      imageAlt: 'Circulateur SALUS - Diamètre 1 - 1/2 M - MP280A',
      category: 'catalogue',
      productType: 'chauffage-climatisation',
},

{
      id: '81',
      sku: 'pot a boue',
      name: 'Pot a boue magnétique',
      slug: 'pot-a-boue-magnetique',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 67.2,
      priceB2B: 60.48, // 90% du prix B2C
      image: '/produit-81.png',
      imageAlt: 'Pot a boue magnétique',
      category: 'catalogue',
},

{
      id: '82',
      sku: '8019001012228.0',
      name: 'Watts – Soupape différentielle USVR 20 – 3/4 MF',
      slug: 'watts-soupape-differentielle-usvr-20-3-4-mf',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 38.4,
      priceB2B: 34.56, // 90% du prix B2C
      image: '/produit-82.png',
      imageAlt: 'Watts – Soupape différentielle USVR 20 – 3/4 MF',
      category: 'catalogue',
},

{
      id: '83',
      sku: 'CA 20963/4',
      name: 'Disconnecteur DN20 F/F 3/4 CA2096',
      slug: 'disconnecteur-dn20-f-f-3-4-ca2096',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 44.0,
      priceB2B: 39.6, // 90% du prix B2C
      image: '/produit-83.png',
      imageAlt: 'Disconnecteur DN20 F/F 3/4 CA2096',
      category: 'catalogue',
},

{
      id: '84',
      sku: 'mxv20',
      name: 'Mitigeur thermostatique anticalcaire Flowmix by WTA – Réf. MXV20-3855',
      slug: 'mitigeur-thermostatique-anticalcaire-flowmix-by-wta-ref-mxv20-3855',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      priceB2C: 40.0,
      priceB2B: 36, // 90% du prix B2C
      image: '/produit-84.png',
      imageAlt: 'Mitigeur thermostatique anticalcaire Flowmix by WTA – Réf. MXV20-3855',
      category: 'catalogue',
      productType: 'sanitaire',
},


  ]

  // Insérer tous les produits
  const allProducts = [...sampleProducts]
  
  for (const product of allProducts) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log(`✅ Created ${allProducts.length} products`)
  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



