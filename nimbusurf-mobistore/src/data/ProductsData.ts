// src/data/ProductsData.ts
import type { Product } from "../types/product";

export const ProductsData: Product[] = [
  // ── Electronics ──────────────────────────────────────────
  { id: "e1", name: "Wireless Noise-Cancelling Headphones", brand_name: "SoundMax", price: 149.99, offer: "20% OFF", img: "product_e1", type: "electronics", description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life." },
  { id: "e2", name: "Smart Fitness Watch Pro", brand_name: "PulseTech", price: 249.99, offer: "15% OFF", img: "product_e2", type: "electronics", description: "Track heart rate, sleep, and 50+ workouts with GPS and AMOLED display." },
  { id: "e3", name: "Portable Bluetooth Speaker", brand_name: "SoundMax", price: 79.99, offer: "25% OFF", img: "product_e3", type: "electronics", description: "Waterproof speaker with 360° sound and 12-hour playtime." },
  { id: "e4", name: "USB-C Fast Charging Cable 2m", brand_name: "ChargeUp", price: 14.99, offer: "40% OFF", img: "product_e4", type: "electronics", description: "Braided nylon cable with 100W PD fast charging support." },
  // ── Apparel & Fashion ────────────────────────────────────
  { id: "a1", name: "Classic Leather Jacket", brand_name: "UrbanEdge", price: 89.99, offer: "30% OFF", img: "product_a1", type: "apparel", description: "Genuine leather biker jacket with quilted lining and zippered pockets." },
  { id: "a2", name: "Floral Print Summer Dress", brand_name: "Bloom & Co", price: 34.99, offer: "35% OFF", img: "product_a2", type: "apparel", description: "Lightweight cotton dress with a flattering A-line silhouette." },
  { id: "a3", name: "Running Sneakers AirFlex", brand_name: "StridePro", price: 64.99, offer: "20% OFF", img: "product_a3", type: "apparel", description: "Breathable mesh upper with responsive cushioning for daily runs." },
  { id: "a4", name: "Oversized Cotton T-Shirt", brand_name: "BasicThread", price: 19.99, offer: "10% OFF", img: "product_a4", type: "apparel", description: "100% organic cotton, relaxed fit, available in 8 colours." },
  { id: "a5", name: "Slim Fit Denim Jeans", brand_name: "UrbanEdge", price: 49.99, offer: "25% OFF", img: "product_a5", type: "apparel", description: "Stretch denim with a modern slim taper and five-pocket styling." },
  { id: "a6", name: "Minimalist Leather Watch", brand_name: "TimeCraft", price: 129.99, offer: "15% OFF", img: "product_a6", type: "apparel", description: "Japanese quartz movement with genuine Italian leather strap." },
  // ── Home & Living ────────────────────────────────────────
  { id: "h1", name: "Scandinavian Lounge Chair", brand_name: "NordicNest", price: 299.99, offer: "20% OFF", img: "product_h1", type: "home-living", description: "Solid oak frame with premium wool blend upholstery." },
  { id: "h2", name: "Ceramic Dinner Set (16-Piece)", brand_name: "ArtisanHome", price: 59.99, offer: "30% OFF", img: "product_h2", type: "home-living", description: "Hand-glazed stoneware set, dishwasher and microwave safe." },
  { id: "h3", name: "Warm LED Desk Lamp", brand_name: "LumiSpace", price: 34.99, offer: "10% OFF", img: "product_h3", type: "home-living", description: "Adjustable colour temperature with touch dimming and USB port." },
  { id: "h4", name: "Egyptian Cotton Bed Sheet Set", brand_name: "DreamWeave", price: 79.99, offer: "25% OFF", img: "product_h4", type: "home-living", description: "400 thread count, includes fitted sheet, flat sheet, and 2 pillowcases." },
  // ── Health & Beauty ──────────────────────────────────────
  { id: "b1", name: "Vitamin C Brightening Serum", brand_name: "GlowLab", price: 24.99, offer: "20% OFF", img: "product_b1", type: "health-beauty", description: "15% pure vitamin C with hyaluronic acid for radiant skin." },
  { id: "b2", name: "Matte Lipstick Collection (Set of 6)", brand_name: "VelvetKiss", price: 29.99, offer: "35% OFF", img: "product_b2", type: "health-beauty", description: "Long-wear matte formula in six trending shades." },
  { id: "b3", name: "Argan Oil Hair Repair Mask", brand_name: "SilkRoots", price: 18.99, offer: "15% OFF", img: "product_b3", type: "health-beauty", description: "Deep conditioning treatment with cold-pressed Moroccan argan oil." },
  { id: "b4", name: "Stainless Steel Water Bottle 1L", brand_name: "HydroLife", price: 24.99, offer: "10% OFF", img: "product_b4", type: "health-beauty", description: "Double-wall vacuum insulated, keeps drinks cold 24h or hot 12h." },
  // ── Sports & Outdoors ────────────────────────────────────
  { id: "s1", name: "Non-Slip Yoga Mat 6mm", brand_name: "ZenFlex", price: 29.99, offer: "20% OFF", img: "product_s1", type: "sports-outdoors", description: "Eco-friendly TPE material with alignment lines and carry strap." },
  { id: "s2", name: "4-Season Camping Tent (2-Person)", brand_name: "TrailBlazer", price: 149.99, offer: "25% OFF", img: "product_s2", type: "sports-outdoors", description: "Waterproof ripstop nylon with aluminium poles and mesh ventilation." },
  { id: "s3", name: "Adjustable Dumbbell Set 20kg", brand_name: "IronCore", price: 89.99, offer: "15% OFF", img: "product_s3", type: "sports-outdoors", description: "Quick-lock weight plates with anti-roll design, pair included." },
  { id: "s4", name: "Moisture-Wicking Running Tee", brand_name: "StridePro", price: 24.99, offer: "30% OFF", img: "product_s4", type: "sports-outdoors", description: "Lightweight polyester blend with reflective details for night runs." },
  // ── Deals & Clearance ────────────────────────────────────
  { id: "d1", name: "Wireless Earbuds (Refurbished)", brand_name: "SoundMax", price: 39.99, offer: "60% OFF", img: "product_d1", type: "deals", description: "Certified refurbished with 6-month warranty. True wireless stereo." },
  { id: "d2", name: "Canvas Backpack — Last Stock", brand_name: "UrbanEdge", price: 49.99, offer: "50% OFF", img: "product_d2", type: "deals", description: "Durable waxed canvas with padded laptop sleeve. While stocks last." },
  { id: "d3", name: "Scented Candle Gift Box (Set of 4)", brand_name: "ArtisanHome", price: 19.99, offer: "45% OFF", img: "product_d3", type: "deals", description: "Soy wax candles in lavender, vanilla, sandalwood, and citrus." },
  { id: "d4", name: "Yoga Accessories Bundle", brand_name: "ZenFlex", price: 59.99, offer: "40% OFF", img: "product_d4", type: "deals", description: "Includes mat, blocks, strap, and carry bag. Perfect starter kit." },
];