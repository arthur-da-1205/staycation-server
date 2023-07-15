-- CreateTable
CREATE TABLE "Hotel" (
    "hotel_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "price_range" TEXT NOT NULL,
    "amenities" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("hotel_id")
);

-- CreateTable
CREATE TABLE "Room" (
    "room_id" SERIAL NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "room_number" TEXT NOT NULL,
    "room_type" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "price_per_night" DOUBLE PRECISION NOT NULL,
    "availability" BOOLEAN NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "customer_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_id_card" TEXT NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "booking_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,
    "check_in_date" TIMESTAMP(3) NOT NULL,
    "check_out_date" TIMESTAMP(3) NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "review_id" SERIAL NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_user_id_key" ON "Customers"("user_id");

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
