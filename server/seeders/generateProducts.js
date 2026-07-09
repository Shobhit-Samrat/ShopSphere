const fs = require("fs");
const path = require("path");

// ======================================
// Helper Functions (Step 2)
// ======================================

const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const pick = (array) =>
    array[Math.floor(Math.random() * array.length)];

const createPrice = (min, max) =>
    random(min, max);

const createDiscount = () =>
    random(5, 35);

const createRating = () =>
    Number((Math.random() * 2 + 3).toFixed(1));

const createReviews = () =>
    random(5, 500);

const createStock = () =>
    random(10, 150);

// ======================================
// Category Data (Step 3)
// ======================================

const categories = {

    Mobiles: {
        brands: [
            "Apple",
            "Samsung",
            "OnePlus",
            "Google",
            "Nothing",
            "Xiaomi",
            "Realme",
            "Motorola"
        ],
        names: [
            "Pro Max",
            "Ultra",
            "Plus",
            "Lite",
            "Neo"
        ],
        price: [15000, 150000]
    },

    Laptops: {
        brands: [
            "Dell",
            "HP",
            "Lenovo",
            "Apple",
            "ASUS",
            "MSI",
            "Acer"
        ],
        names: [
            "Pro",
            "Air",
            "Gaming",
            "Book",
            "X"
        ],
        price: [35000, 220000]
    },

    Watches: {
        brands: [
            "Titan",
            "Apple",
            "Samsung",
            "Casio",
            "Fossil"
        ],
        names: [
            "Classic",
            "Ultra",
            "Series",
            "Sport"
        ],
        price: [2000, 65000]
    },

    Shoes: {
        brands: [
            "Nike",
            "Adidas",
            "Puma",
            "Reebok",
            "New Balance"
        ],
        names: [
            "Air",
            "Runner",
            "Sport",
            "Max"
        ],
        price: [1500, 12000]
    },

    Fashion: {
        brands: [
            "Levi's",
            "Zara",
            "H&M",
            "Allen Solly"
        ],
        names: [
            "T-Shirt",
            "Jeans",
            "Jacket",
            "Hoodie"
        ],
        price: [500, 6000]
    },

    Electronics: {
        brands: [
            "Sony",
            "JBL",
            "Boat",
            "Samsung",
            "LG"
        ],
        names: [
            "Speaker",
            "Headphones",
            "Earbuds",
            "Monitor"
        ],
        price: [1000, 50000]
    },

    Bags: {
        brands: [
            "Skybags",
            "Wildcraft",
            "American Tourister"
        ],
        names: [
            "Backpack",
            "Travel Bag",
            "Laptop Bag"
        ],
        price: [1000, 7000]
    },

    Home: {
        brands: [
            "Prestige",
            "Philips",
            "Milton",
            "Cello"
        ],
        names: [
            "Mixer",
            "Bottle",
            "Cookware",
            "Chair"
        ],
        price: [300, 15000]
    },

    Gaming: {
        brands: [
            "Sony",
            "Microsoft",
            "Logitech",
            "Razer"
        ],
        names: [
            "Keyboard",
            "Mouse",
            "Controller",
            "Headset"
        ],
        price: [1000, 60000]
    },

    Books: {
        brands: [
            "Penguin",
            "Harper",
            "Pearson"
        ],
        names: [
            "Programming",
            "Java",
            "AI",
            "Business"
        ],
        price: [200, 2000]
    }

};

// ======================================
// Number of Products Per Category
// ======================================

const productCount = {

    Mobiles: 30,
    Laptops: 25,
    Electronics: 40,
    Watches: 25,
    Shoes: 35,
    Fashion: 35,
    Bags: 20,
    Home: 20,
    Gaming: 15,
    Books: 10

};

// ======================================
// Images for Each Category
// ======================================

const categoryImages = {

    Mobiles: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505",
        "https://images.unsplash.com/photo-1605236453806-6ff36851218e"
    ],

    Laptops: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
    ],

    Watches: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        "https://images.unsplash.com/photo-1547996160-81dfa63595aa",
        "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56",
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d"
    ],

    Shoes: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
        "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
    ],

    Fashion: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
    ],

    Electronics: [
        "https://images.unsplash.com/photo-1583394838336-acd977736f90",
        "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03"
    ],

    Bags: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"
    ],

    Home: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    ],

    Gaming: [
        "https://images.unsplash.com/photo-1605901309584-818e25960a8f",
        "https://images.unsplash.com/photo-1542751371-adc38448a05e",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f"
    ],

    Books: [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
        "https://images.unsplash.com/photo-1526243741027-444d633d7365",
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353"
    ]

};

// ======================================
// Generate Products
// ======================================

const products = [];

Object.keys(productCount).forEach((category) => {

    const data = categories[category];

    for (let i = 1; i <= productCount[category]; i++) {

        const brand = pick(data.brands);

        const model = pick(data.names);

        const price = createPrice(
            data.price[0],
            data.price[1]
        );

        const discount = createDiscount();

        products.push({

            name: `${brand} ${model} ${i}`,

            description:
                `Premium ${category} from ${brand}. High quality, durable, stylish and backed by warranty.`,

            price,

            originalPrice:
                Math.round(price * 1.2),

            discount,

            category,

            brand,

            stock: createStock(),

            images: categoryImages[category],

            colors: [
                "Black",
                "White",
                "Blue"
            ],

            sizes:
                category === "Shoes" ||
                category === "Fashion"
                    ? ["S", "M", "L", "XL"]
                    : [],

            material: "Premium",

            weight: `${random(200,3000)} g`,

            warranty: "1 Year",

            seller: "ShopSphere",

            delivery: "3-5 Days",

            freeShipping: true,

            featured:
                Math.random() > 0.85,

            bestSeller:
                Math.random() > 0.90,

            newArrival:
                Math.random() > 0.70,

            rating: createRating(),

            numReviews:
                createReviews(),

            reviews: []

        });

    }

});

// ======================================
// Write products.js File
// ======================================

const output = `module.exports = ${JSON.stringify(products, null, 4)};`;

const outputPath = path.join(
    __dirname,
    "products.js"
);

fs.writeFileSync(outputPath, output);

console.log(
    `✅ ${products.length} products generated successfully!`
);