/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Bookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Hotel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_room_id_fkey";

-- DropForeignKey
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_hotel_id_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_hotel_id_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Admin_id_seq";

-- AlterTable
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_pkey",
ALTER COLUMN "booking_id" DROP DEFAULT,
ALTER COLUMN "booking_id" SET DATA TYPE TEXT,
ALTER COLUMN "customer_id" SET DATA TYPE TEXT,
ALTER COLUMN "room_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Bookings_pkey" PRIMARY KEY ("booking_id");
DROP SEQUENCE "Bookings_booking_id_seq";

-- AlterTable
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_pkey",
ALTER COLUMN "customer_id" DROP DEFAULT,
ALTER COLUMN "customer_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Customers_pkey" PRIMARY KEY ("customer_id");
DROP SEQUENCE "Customers_customer_id_seq";

-- AlterTable
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_pkey",
ALTER COLUMN "hotel_id" DROP DEFAULT,
ALTER COLUMN "hotel_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Hotel_pkey" PRIMARY KEY ("hotel_id");
DROP SEQUENCE "Hotel_hotel_id_seq";

-- AlterTable
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_pkey",
ALTER COLUMN "review_id" DROP DEFAULT,
ALTER COLUMN "review_id" SET DATA TYPE TEXT,
ALTER COLUMN "hotel_id" SET DATA TYPE TEXT,
ALTER COLUMN "customer_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reviews_pkey" PRIMARY KEY ("review_id");
DROP SEQUENCE "Reviews_review_id_seq";

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
ALTER COLUMN "room_id" DROP DEFAULT,
ALTER COLUMN "room_id" SET DATA TYPE TEXT,
ALTER COLUMN "hotel_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("room_id");
DROP SEQUENCE "Room_room_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");
DROP SEQUENCE "User_user_id_seq";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotel"("hotel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotel"("hotel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
