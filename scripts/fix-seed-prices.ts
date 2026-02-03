import * as fs from 'fs'
import * as path from 'path'

const seedPath = path.join(process.cwd(), 'prisma', 'seed.ts')
let content = fs.readFileSync(seedPath, 'utf-8')

// Remplacer toutes les lignes priceB2C: X, par priceB2C: X, suivi de priceB2B: X * 0.9,
content = content.replace(
  /(      priceB2C: )([\d.]+)(,)/g,
  (match, prefix, price, suffix) => {
    const priceNum = parseFloat(price)
    const priceB2B = (priceNum * 0.9).toFixed(4).replace(/\.?0+$/, '')
    return `${prefix}${price}${suffix}\n      priceB2B: ${priceB2B}, // 90% du prix B2C`
  }
)

fs.writeFileSync(seedPath, content, 'utf-8')
console.log('✅ Seed file updated!')

