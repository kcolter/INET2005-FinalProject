//researched from https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
//and tweaked to be more in-line with https://www.youtube.com/watch?v=2LwTUIqjbPo

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            name: 'Thin Brick',
            description: 'Bricks that are thin',
            cost: 19.99,
            image_filename: 'pic1.jpg',
        },
        {
            name: 'Brick Hammer',
            description: 'A hammer with which to drive and pry bricks',
            cost: 15.99,
            image_filename: 'pic2.jpg',
        },
        {
            name: 'Mortar Trowel',
            description: 'Trowel used to apply mortar to stonework',
            cost: 24.99,
            image_filename: 'pic3.jpg',
        },
        {
            name: 'Mortar',
            description: 'Mortar, to be used in brickwork and repair',
            cost: 29.99,
            image_filename: 'pic4.jpg',
        },
        {
            name: 'Fire Brick',
            description: 'Bricks designed to endure extreme heat',
            cost: 15.99,
            image_filename: 'pic5.jpg',
        },
        {
            name: 'Concrete Brick',
            description: 'Bricks made from concrete',
            cost: 11.99,
            image_filename: 'pic6.jpg',
        },
        {
            name: 'Engineering Brick',
            description: 'Bricks designed to support heavy stress',
            cost: 29.99,
            image_filename: 'pic7.jpg',
        },
        {
            name: 'Lime Brick',
            description: 'Bricks made from limestone',
            cost: 19.99,
            image_filename: 'pic8.jpg',
        },
        {
            name: 'Mud Brick',
            description: 'Bricks that are made of dried mud.',
            cost: 9.99,
            image_filename: 'pic9.jpg',
        },
        {
            name: 'Clay Brick',
            description: 'Bricks that are made of clay',
            cost: 13.99,
            image_filename: 'pic10.jpg',
        }
    ];

    for(var product of products){
        await prisma.Product.create({
            data: product
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
