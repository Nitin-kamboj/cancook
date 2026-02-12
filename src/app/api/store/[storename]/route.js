// import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//     const { storename } = await params;

//     const storeMap = {
//         meijier: "milk",
//         kroger: "bread",
//     };

//     const query = storeMap[storename] ?? "rice";

//     const url =
//         `https://world.openfoodfacts.org/cgi/search.pl` +
//         `?search_terms=${encodeURIComponent(query)}` +
//         `&search_simple=1&action=process&json=1&page_size=24`;

//     try {
//         const res = await fetch(url, { cache: "no-store" });

//         if (!res.ok) {
//             return NextResponse.json(
//                 { message: "Upstream error" },
//                 { status: 502 }
//             );
//         }

//         const data = await res.json();

//         const items = (data.products ?? [])
//             .map((p) => ({
//                 id: p.code || p._id || p.id,
//                 name: p.product_name || p.generic_name || "Unknown item",
//                 img: p.image_front_url || p.image_url || null,
//             }))
//             .filter((x) => x.id && x.name);

//         return NextResponse.json(items);
//     } catch (err) {
//         return NextResponse.json(
//             { message: "Server error", error: err?.message || String(err) },
//             { status: 500 }
//         );
//     }
// }
