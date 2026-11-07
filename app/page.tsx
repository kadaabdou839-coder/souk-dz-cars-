export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="bg-white shadow p-4 rounded-xl mb-6">
        <h1 className="text-2xl font-bold text-center">🚗 سوق سيارات دز</h1>
        <p className="text-center text-gray-600">بيع و شراء السيارات في الجزائر</p>
      </header>
      <main className="grid gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg">مرحبا بيك في سوق دز!</h2>
          <p className="mt-2">الموقع راهو يخدم، درك نزيدو السيارات والبحث.</p>
          <div className="mt-4 p-3 bg-green-100 rounded">✅ GitHub تم بنجاح</div>
        </div>
      </main>
    </div>
  )
      }
