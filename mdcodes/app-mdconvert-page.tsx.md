Dosya Yolu: app\mdconvert\page.tsx

```tsx
"use client";

import { useState } from "react";
import { convertFilesToMd } from "./actions";

export default function MdConvertPage() {
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    setIsLoading(true);
    setStatus("Dosyalar taranıyor ve dönüştürülüyor...");

    try {
      // Server action'ı çağır
      const result = await convertFilesToMd();
      setStatus(result.message);
    } catch  {
      setStatus("İşlem sırasında beklenmedik bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Codebase to MD</h1>
      <p className="text-gray-500 mb-8 text-center">
        Proje dosyalarınızı LLM modellerine yedirmek için `.md` formatına çevirir.
      </p>

      <button
        onClick={handleConvert}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "İşleniyor..." : "mdconvert"}
      </button>

      {status && (
        <div className={`mt-8 p-4 rounded w-full text-center border ${
          status.includes("Hata") || status.includes("beklenmedik")
            ? "bg-red-50 border-red-200 text-red-700"
            : "bg-green-50 border-green-200 text-green-700"
        }`}>
          {status}
        </div>
      )}
    </div>
  );
}

```