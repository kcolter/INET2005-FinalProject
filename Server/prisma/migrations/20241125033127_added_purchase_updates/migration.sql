-- CreateTable
CREATE TABLE "Purchase" (
    "purchase_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_id" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "credit_card" INTEGER NOT NULL,
    "credit_expire" TEXT NOT NULL,
    "credit_cvv" INTEGER NOT NULL,
    "invoice_amt" DECIMAL NOT NULL,
    "invoice_tax" DECIMAL NOT NULL,
    "invoice_total" DECIMAL NOT NULL,
    "order_date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PurchaseItem" (
    "purchase_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("purchase_id", "product_id")
);
