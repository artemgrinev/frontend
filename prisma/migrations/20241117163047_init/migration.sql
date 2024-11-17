-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "prepTimeMinutes" INTEGER,
    "cookTimeMinutes" INTEGER,
    "preliminaryPreparation" TEXT,
    "servings" INTEGER,
    "difficulty" TEXT,
    "cuisine" TEXT,
    "caloriesPerServing" INTEGER,
    "image" TEXT,
    "rating" DOUBLE PRECISION,
    "reviewCount" INTEGER,
    "viewCount" INTEGER,
    "datePublished" TIMESTAMP(3),

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" TEXT,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instruction" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "recipeId" INTEGER NOT NULL,
    "stepNumber" INTEGER NOT NULL,

    CONSTRAINT "Instruction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "shopName" TEXT,
    "url" TEXT,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountPercentage" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "amount" TEXT,
    "minimumOrderQuantity" DOUBLE PRECISION,
    "thumbnail" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeTag" (
    "recipeId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "RecipeTag_pkey" PRIMARY KEY ("recipeId","tagId")
);

-- CreateTable
CREATE TABLE "RecipeProduct" (
    "recipeId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "RecipeProduct_pkey" PRIMARY KEY ("recipeId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeTag" ADD CONSTRAINT "RecipeTag_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeTag" ADD CONSTRAINT "RecipeTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeProduct" ADD CONSTRAINT "RecipeProduct_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeProduct" ADD CONSTRAINT "RecipeProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
