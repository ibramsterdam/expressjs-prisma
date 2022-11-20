-- CreateTable
CREATE TABLE "Permission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Datapod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UsersOnDatapods" (
    "userId" INTEGER NOT NULL,
    "datapodId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "datapodId"),
    CONSTRAINT "UsersOnDatapods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnDatapods_datapodId_fkey" FOREIGN KEY ("datapodId") REFERENCES "Datapod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnDatapods_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
