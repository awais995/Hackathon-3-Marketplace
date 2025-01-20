import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Validate the ID
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const query = `
      *[_type == "products" && _id == $id][0] {
        _id,
        name,
        image,
        imageslist,
        price,
        description,
        "imageUrl": image.asset->url,
        category,
        discountPercent,
        isNew,
        colors,
        sizes
      }
    `;

    const product = await client.fetch(query, { id });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Add caching headers for better performance
    const headers = {
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    };

    return NextResponse.json(product, { headers });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}