"use client";

import { useState } from "react";

export default function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [quantity, setQuantity] = useState(0);

  function addTitle(e) {
    const title = e.target.title;
    setTitle(title);
  }

  function addDetails(e) {
    const ingredient = e.target.ingredient;
    const quantity = e.target.quantity;
    setIngredients(ingredient);
    setQuantity(quantity);
  }
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header Section */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-100 pb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">
            Create Recipe
          </h1>
          <p className="mt-2 text-zinc-500">
            Share your culinary masterpiece with the community.
          </p>
        </div>

        {/* Visibility Toggle Simulation */}
        <div className="flex w-fit items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 p-1 shadow-inner">
          <button className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-zinc-900 shadow-sm">
            Public
          </button>
          <button className="rounded-full px-4 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-700">
            Private
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Recipe Title
            </label>
            <input
              onChange={addTitle}
              name="title"
              type="text"
              placeholder="e.g. Grandma's Famous Spicy Pasta"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none ring-zinc-500 transition focus:ring-2 focus:bg-white"
            />
          </div>

          {/* Ingredients Section */}
          <form
            onSubmit={addDetails}
            className="rounded-2xl border border-zinc-200 p-6 space-y-4"
          >
            <h2 className="text-lg font-bold text-zinc-800">Ingredients</h2>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-[2]">
                <label className="block text-xs font-semibold text-zinc-500 mb-1">
                  Ingredient Name
                </label>
                <input
                  name="ingredient"
                  type="text"
                  placeholder="Flour"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 outline-none focus:border-zinc-400"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-zinc-500 mb-1">
                  Quantity
                </label>
                <input
                  name="quantity"
                  type="text"
                  placeholder="500g"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 outline-none focus:border-zinc-400"
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700 text-left"
            >
              + Add another ingredient
            </button>
          </form>
          {/* {ingredients.map((i)=>(
            <div>
              p
            </div>
          ))} */}
        </div>

        {/* Right Column: Image Upload */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
            Cover Image
          </label>
          <div className="group relative flex aspect-square flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50 transition hover:border-zinc-400 hover:bg-zinc-100">
            <div className="flex flex-col items-center justify-center pb-6 pt-5 text-center px-4">
              <svg
                className="mb-3 h-10 w-10 text-zinc-400 group-hover:text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-sm font-medium text-zinc-600">
                Click to upload photo
              </p>
            </div>
            <input
              type="file"
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-12 flex justify-end gap-3 border-t border-zinc-100 pt-8">
        <button className="rounded-xl bg-zinc-900 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-zinc-200 transition hover:bg-zinc-800 active:scale-95">
          Publish Recipe
        </button>
      </div>
    </div>
  );
}
