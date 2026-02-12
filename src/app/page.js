"use client";
import { useGlobal } from "./globalContext";
import Headers from "./header";
export default function Home() {
  const { publicRecipies } = useGlobal();
  return (
    <div className="text-4xl font-bold text-center">
      {/* <Headers /> */}
    </div>
  );
}
