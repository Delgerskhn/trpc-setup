-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "emailVerified" DATETIME,
    "passwordDigest" TEXT,
    "phoneNumber" INTEGER,
    "phoneNumberVerified" DATETIME,
    "register" TEXT NOT NULL DEFAULT '',
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "picture" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "firstName", "id", "lastName", "passwordDigest", "phoneNumber", "phoneNumberVerified", "picture", "register", "updatedAt") SELECT "createdAt", "email", "emailVerified", "firstName", "id", "lastName", "passwordDigest", "phoneNumber", "phoneNumberVerified", "picture", "register", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
