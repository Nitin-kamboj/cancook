"use client";
import { useState, useEffect, useMemo } from "react";
import { ChefHat, Pizza, Star } from "lucide-react";

export default function Store() {
  const [storeItems, setStoreItems] = useState([]);
  const [store, setStore] = useState("meijier");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Produce",
    "Meats",
    "Bakery",
    "Dairy",
    "Pantry Staples",
  ];

  // const SampleItems = [
  //   {
  //     id: "1",
  //     name: "Bananas",
  //     img: "https://images.unsplash.com/photo-1574226516831-e1dff420e43e",
  //     category: "Produce",
  //     stock_quantity: 120.5,
  //     unit: "lb",
  //   },
  //   {
  //     id: "2",
  //     name: "Apples",
  //     img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  //     category: "Produce",
  //     stock_quantity: 40,
  //     unit: "lb",
  //   },
  //   {
  //     id: "3",
  //     name: "Chicken Breast",
  //     img: "https://images.unsplash.com/photo-1604908177522-040bfbd1b3c6",
  //     category: "Meats",
  //     stock_quantity: 12,
  //     unit: "lb",
  //   },
  //   {
  //     id: "4",
  //     name: "Ground Beef",
  //     img: "https://images.unsplash.com/photo-1588167056547-c183313da47c",
  //     category: "Meats",
  //     stock_quantity: 0,
  //     unit: "lb",
  //   },
  //   {
  //     id: "5",
  //     name: "Milk (1 Gallon)",
  //     img: "https://images.unsplash.com/photo-1582719478181-2f64c2f7b34d",
  //     category: "Dairy",
  //     stock_quantity: 18,
  //     unit: "gal",
  //   },
  //   {
  //     id: "6",
  //     name: "Cheddar Cheese",
  //     img: "https://images.unsplash.com/photo-1617191518000-3f5f3b59b1e6",
  //     category: "Dairy",
  //     stock_quantity: 25,
  //     unit: "lb",
  //   },
  //   {
  //     id: "7",
  //     name: "Whole Wheat Bread",
  //     img: "https://images.unsplash.com/photo-1608198093002-de4f5b61b92f",
  //     category: "Bakery",
  //     stock_quantity: 30,
  //     unit: "pcs",
  //   },
  //   {
  //     id: "8",
  //     name: "Croissants",
  //     img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5",
  //     category: "Bakery",
  //     stock_quantity: 6,
  //     unit: "pcs",
  //   },
  //   {
  //     id: "9",
  //     name: "Olive Oil",
  //     img: "https://images.unsplash.com/photo-1604908554168-4a4b92f3d6e3",
  //     category: "Pantry Staples",
  //     stock_quantity: 14,
  //     unit: "L",
  //   },
  //   {
  //     id: "10",
  //     name: "Pasta",
  //     img: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83",
  //     category: "Pantry Staples",
  //     stock_quantity: 50,
  //     unit: "pcs",
  //   },
  // ];

  async function fetchStoreItems(storename) {
    setLoading(true);
    setStore(storename);
    try {
      const response = await fetch(`/api/store/${storename}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Server responded with an error");
      const data = await response.json();
      setStoreItems(data);
    } catch (error) {
      console.error("Fetch Error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  function setCategory(type) {
    setSelectedCategory(type);
  }

  function increaseQuantity(itemId) {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) + 1,
    }));
  }
  function decreaseQuantity(itemId) {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) - 1),
    }));
  }

  async function addToPantry(itemId) {
    try {
      const response = await fetch("/api/addToPantry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: itemId,
          store,
          quantity: quantity[itemId] || 1,
        }),
      });
    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
  }
  useEffect(() => {
    fetchStoreItems(store);
    // setStoreItems(SampleItems);
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return storeItems;
    return storeItems.filter((item) => item.category === selectedCategory);
  }, [storeItems, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* HEADER */}

      {/* PAGE WRAP */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* TITLE ROW */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
              Welcome to the Store
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Browse grocery items available at selected stores and add them to
              your pantry.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 shadow-sm">
            <ChefHat className="text-orange-600" size={18} />
            <span className="text-sm font-semibold text-zinc-800">
              <select
                disabled={loading}
                name="store"
                id=""
                value={store}
                onChange={(e) => fetchStoreItems(e.target.value)}
              >
                <option value="meijier">Meijier</option>
                <option value="kroger">Kroger</option>
              </select>
            </span>
          </div>
        </div>

        {/* Category */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((type) => {
            const active = selectedCategory === type;
            return (
              <button
                key={type}
                onClick={() => setCategory(type)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-semibold transition border shadow-sm",
                  active
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-40 text-center shadow-md">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
              <ChefHat className="text-orange-600" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-900">
              Loading items…
            </h2>
            <p className="mt-1 text-sm text-zinc-600">Fetching from {store}.</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-40 text-center shadow-md">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
              <ChefHat className="text-orange-600" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-900">
              No Items Found!
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Please try another store.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* IMAGE / ICON */}
                <div className="relative mb-4 overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50">
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.23]"
                    />
                  ) : (
                    <div className="flex h-44 items-center justify-center bg-gradient-to-br from-orange-100 to-amber-50">
                      <Pizza size={44} className="text-orange-600" />
                    </div>
                  )}
                </div>

                {/* TEXT */}
                <h3 className="line-clamp-1 text-lg font-bold text-zinc-900">
                  {item.name}
                </h3>
                {/* available */}
                <p className="mt-1 text-xs text-zinc-500">
                  Sold by{" "}
                  <span className="font-medium">{item.unit ?? "unit"}</span> ·{" "}
                  {Number(item.stock_quantity ?? 0) > 0 ? (
                    <span className="font-semibold text-emerald-700">
                      In stock
                    </span>
                  ) : (
                    <span className="font-semibold text-red-600">
                      Out of stock
                    </span>
                  )}
                </p>
                {/* Quantity */}
                <div className="mt-3 flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-lg font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-100 active:scale-95"
                  >
                    −
                  </button>

                  <span className="text-sm font-semibold text-zinc-900">
                    {quantity[item.id] || 1}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-lg font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-100 active:scale-95"
                  >
                    +
                  </button>
                </div>
                {/* ACTIONS */}
                <div className="mt-5 flex items-center gap-3">
                  <button
                    disabled={loading}
                    onClick={() => addToPantry(item.id)}
                    className="inline-flex flex-1 items-center justify-center rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
                  >
                    Add To Pantry
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
