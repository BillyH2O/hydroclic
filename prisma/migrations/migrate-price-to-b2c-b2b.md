# Migration : Ajout des prix B2C et B2B

## Étapes de migration

1. **Générer le client Prisma** après modification du schéma :
```bash
npx prisma generate
```

2. **Créer et appliquer la migration** :
```bash
npx prisma migrate dev --name add_price_b2c_b2b
```

3. **Mettre à jour les données existantes** :
Si vous avez des produits existants avec l'ancien champ `price`, vous devrez créer un script de migration pour copier `price` vers `priceB2C` et `priceB2B`.

Exemple de script SQL (à adapter selon vos besoins) :
```sql
-- Copier le prix existant vers les deux nouveaux champs
UPDATE products 
SET "priceB2C" = price, 
    "priceB2B" = price * 0.9  -- Exemple : prix B2B à 90% du prix B2C
WHERE "priceB2C" IS NULL OR "priceB2B" IS NULL;
```

4. **Supprimer l'ancien champ `price`** (optionnel, après vérification) :
```sql
ALTER TABLE products DROP COLUMN price;
```

## Notes

- Le champ `price` dans le schéma a été remplacé par `priceB2C` et `priceB2B`
- Les produits existants doivent être migrés manuellement
- Le prix B2B peut être différent du prix B2C selon votre stratégie tarifaire

