-- Migration SQL pour ajouter les colonnes priceB2C et priceB2B
-- Ce script migre les données existantes de la colonne 'price' vers les nouvelles colonnes

-- Étape 1: Ajouter les nouvelles colonnes comme nullable temporairement
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS "priceB2C" DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS "priceB2B" DOUBLE PRECISION;

-- Étape 2: Copier les données existantes de 'price' vers les nouvelles colonnes
-- Si la colonne 'price' existe, copier ses valeurs
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'price'
    ) THEN
        -- Copier price vers priceB2C et priceB2B
        -- Vous pouvez ajuster le calcul du prix B2B (ici 90% du prix B2C)
        UPDATE products 
        SET "priceB2C" = price, 
            "priceB2B" = price * 0.9
        WHERE "priceB2C" IS NULL OR "priceB2B" IS NULL;
    ELSE
        -- Si la colonne price n'existe pas, définir des valeurs par défaut
        UPDATE products 
        SET "priceB2C" = 0, 
            "priceB2B" = 0
        WHERE "priceB2C" IS NULL OR "priceB2B" IS NULL;
    END IF;
END $$;

-- Étape 3: Rendre les colonnes obligatoires (non-nullable)
ALTER TABLE products 
ALTER COLUMN "priceB2C" SET NOT NULL,
ALTER COLUMN "priceB2B" SET NOT NULL;

-- Étape 4: Supprimer l'ancienne colonne 'price' si elle existe
-- Décommentez cette ligne après avoir vérifié que les données sont correctes
-- ALTER TABLE products DROP COLUMN IF EXISTS price;

