/**
 * Script de migration pour migrer les prix de 'price' vers 'priceB2C' et 'priceB2B'
 * 
 * Usage: npx tsx scripts/migrate-prices.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migratePrices() {
  try {
    console.log('🔄 Début de la migration des prix...')

    // Vérifier si la colonne 'price' existe encore
    const products = await prisma.$queryRaw<Array<{ price?: number }>>`
      SELECT price FROM products LIMIT 1
    `.catch(() => [])

    if (products.length > 0 && products[0].price !== undefined) {
      console.log('📊 Colonne "price" trouvée, migration des données...')

      // Migrer les données
      await prisma.$executeRaw`
        UPDATE products 
        SET "priceB2C" = price, 
            "priceB2B" = price * 0.9
        WHERE "priceB2C" IS NULL OR "priceB2B" IS NULL
      `

      console.log('✅ Données migrées avec succès!')
      console.log('   - priceB2C = price (100%)')
      console.log('   - priceB2B = price * 0.9 (90%)')
    } else {
      console.log('⚠️  Colonne "price" non trouvée, utilisation de valeurs par défaut...')
      
      // Définir des valeurs par défaut si price n'existe pas
      await prisma.$executeRaw`
        UPDATE products 
        SET "priceB2C" = 0, 
            "priceB2B" = 0
        WHERE "priceB2C" IS NULL OR "priceB2B" IS NULL
      `
    }

    // Vérifier le résultat
    const count = await prisma.product.count({
      where: {
        priceB2C: { not: null },
        priceB2B: { not: null },
      },
    })

    console.log(`✅ Migration terminée! ${count} produits mis à jour.`)

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

migratePrices()
  .then(() => {
    console.log('🎉 Migration terminée avec succès!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Erreur fatale:', error)
    process.exit(1)
  })

