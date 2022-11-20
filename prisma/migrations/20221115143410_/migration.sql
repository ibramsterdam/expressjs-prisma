/*
  Warnings:

  - The primary key for the `UsersOnDatapods` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UsersOnDatapods` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsersOnDatapods" (
    "userId" INTEGER NOT NULL,
    "datapodId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "datapodId"),
    CONSTRAINT "UsersOnDatapods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnDatapods_datapodId_fkey" FOREIGN KEY ("datapodId") REFERENCES "Datapod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnDatapods_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UsersOnDatapods" ("datapodId", "permissionId", "userId") SELECT "datapodId", "permissionId", "userId" FROM "UsersOnDatapods";
DROP TABLE "UsersOnDatapods";
ALTER TABLE "new_UsersOnDatapods" RENAME TO "UsersOnDatapods";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
