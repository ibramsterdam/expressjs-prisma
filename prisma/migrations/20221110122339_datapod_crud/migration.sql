/*
  Warnings:

  - You are about to drop the column `user_id` on the `Datapod` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Datapod` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Datapod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Datapod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Datapod" ("created_at", "description", "id", "title", "updated_at") SELECT "created_at", "description", "id", "title", "updated_at" FROM "Datapod";
DROP TABLE "Datapod";
ALTER TABLE "new_Datapod" RENAME TO "Datapod";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
