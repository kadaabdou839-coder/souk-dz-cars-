"use client"
import { useEffect, useState } from "react"

export default function Home() {
  const [cars, setCars] = useState<any[]>([])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-center text-blue-600">🚗 سوق سيارات دز</h1>
        <p className="text-center text-gray-600 mt-1">منصة بيع وشراء السيارات في الجزائر</p>
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow mt-4 text-center">
          <h2 className="font-bold text-xl">مرحبا بيكم في سوق دز!</h2>
          <p className="mt-2 text-gray-600">الموقع راه يخدم درك ✅</p>
          <p className="mt-2">قريبا نزيدو السيارات والبحث</p>
          <div className="mt-4 p-3 bg-green-100 rounded">
            ✅ تم إصلاح الموقع بنجاح!
          </div>
        </div>

        <div className="grid gap-4 mt-6">
          {cars.length === 0 ? (
            <p className="text-center text-gray-500">لا توجد سيارات حاليا - سيتم إضافتها قريبا</p>
          ) : (
            cars.map((c: any) => (
              <div key={c.id} className="border p-3 rounded bg-white">
                <div className="font-bold">{c.title}</div>
                <div className="text-green-600">{c.price} دج</div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
          }
