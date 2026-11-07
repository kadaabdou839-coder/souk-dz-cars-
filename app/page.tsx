"use client"
import { useEffect, useState } from "react"

export default function Home(){
  const [cars,setCars]=useState<any[]>([])
  return(
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-center text-blue-600">🚗 سوق سيارات دز</h1>
        <p className="text-center text-gray-600 mt-1">بيع وشراء السيارات في الجزائر</p>
      </header>
      <main className="p-4 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded shadow text-center mt-4">
          <h2 className="font-bold text-xl">مرحبا بيكم!</h2>
          <p className="mt-2">الموقع راه يخدم ✅</p>
          <div className="mt-4 p-3 bg-green-100 rounded">✅ تم اصلاح الموقع!</div>
        </div>
      </main>
    </div>
  )
}
