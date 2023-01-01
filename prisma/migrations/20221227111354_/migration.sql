-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "zip" TEXT,
    "city" TEXT,
    "state" TEXT,
    "profilePicture" TEXT
);

-- CreateTable
CREATE TABLE "Role" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Datapod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "backgroundPhoto" TEXT
);

-- CreateTable
CREATE TABLE "UserOnDatapodwithRole" (
    "userId" INTEGER NOT NULL,
    "datapodId" INTEGER NOT NULL,
    "role_name" TEXT NOT NULL,
    "roleExpireDate" DATETIME,

    PRIMARY KEY ("userId", "datapodId"),
    CONSTRAINT "UserOnDatapodwithRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserOnDatapodwithRole_datapodId_fkey" FOREIGN KEY ("datapodId") REFERENCES "Datapod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserOnDatapodwithRole_role_name_fkey" FOREIGN KEY ("role_name") REFERENCES "Role" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "storageService" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "datapodId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Item_datapodId_fkey" FOREIGN KEY ("datapodId") REFERENCES "Datapod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
