"use client"
import { useState, useEffect } from "react"

type Car = {
  id: number
  title: string
  price: string
  city: string
  wilaya: string
  km: number
  year: number
  brand: string
  fuel: string
  img: string
  createdAt: string
  phone: string
  desc: string
}

export default function Home() {
  const wilayas = ["16 الجزائر", "31 وهران", "25 قسنطينة", "09 البليدة", "23 عنابة", "19 سطيف", "15 تيزي وزو", "06 بجاية"]
  const brands = ["الكل", "Toyota", "Renault", "Peugeot", "Dacia", "Hyundai", "Kia", "Volkswagen"]
  const fuels = ["Essence", "Diesel", "GPL", "Hybride"]

  const defaultCars: Car[] = [
    { id:1, title:"Clio 4 2019", price:"1850000", city:"Alger", wilaya:"16 الجزائر", km:78000, year:2019, brand:"Renault", fuel:"Essence", img:"https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600", createdAt: new Date(Date.now()-2*3600*1000).toISOString(), phone:"0550123456", desc:"Clio 4 نظيفة بزاف" },
    { id:2, title:"Hilux Double Cabine 2021", price:"4200000", city:"Constantine", wilaya:"25 قسنطينة", km:45000, year:2021, brand:"Toyota", fuel:"Diesel", img:"https://images.unsplash.com/photo-1551830820-330a71b99659?w=600", createdAt: new Date(Date.now()-5*3600*1000).toISOString(), phone:"0550123457", desc:"Hilux دوبل كابين 4x4" },
    { id:3, title:"208 GT Line 2022", price:"2650000", city:"Oran", wilaya:"31 وهران", km:22000, year:2022, brand:"Peugeot", fuel:"Essence", img:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600", createdAt: new Date(Date.now()-8*3600*1000).toISOString(), phone:"0550123458", desc:"208 جديدة" },
  ]

  const [cars, setCars] = useState<Car[]>(defaultCars)
  const [brandFilter, setBrandFilter] = useState("الكل")
  const [wilayaFilter, setWilayaFilter] = useState("الكل")
  const [search, setSearch] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [view, setView] = useState<Car | null>(null)
  const [form, setForm] = useState({ title:"", price:"", wilaya:"16 الجزائر", brand:"Renault", year:"2019", km:"", fuel:"Essence", phone:"", desc:"", img:"" })

  useEffect(() => {
    const saved = localStorage.getItem("souk_cars")
    if(saved) {
      try { setCars(JSON.parse(saved)) } catch {}
    }
  }, [])

  const getTimeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const h = Math.floor(diff / 3600000)
    if(h<1) return "الآن"
    if(h<24) return `منذ ${h} س`
    return `منذ ${Math.floor(h/24)} يوم`
  }

  const formatPrice = (p: string) => {
    const n = parseInt(p)
    return isNaN(n) ? p : n.toLocaleString('fr-DZ') + " DA"
  }

  const filtered = cars.filter(c => 
    (brandFilter==="الكل" || c.brand===brandFilter) &&
    (wilayaFilter==="الكل" || c.wilaya===wilayaFilter) &&
    (search==="" || c.title.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase()))
  )

  const publish = () => {
    if(!form.title.trim()) return alert("اكتب اسم السيارة")
    if(!form.price || parseInt(form.price) < 10000) return alert("اكتب سعر صحيح")
    if(!/^0[567]\d{8}$/.test(form.phone)) return alert("رقم الهاتف خاطئ! مثال: 0550123456")
    
    const newCar: Car = {
      id: Date.now(),
      title: form.title.trim(),
      price: form.price,
      city: form.wilaya.split(" ").slice(1).join(" "),
      wilaya: form.wilaya,
      km: parseInt(form.km) || 0,
      year: parseInt(form.year) || 2020,
      brand: form.brand,
      fuel: form.fuel,
      img: form.img.trim() || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600",
      createdAt: new Date().toISOString(),
      phone: form.phone,
      desc: form.desc.trim()
    }
    const updated = [newCar, ...cars]
    setCars(updated)
    localStorage.setItem("souk_cars", JSON.stringify(updated))
    setShowAdd(false)
    setForm({ title:"", price:"", wilaya:"16 الجزائر", brand:"Renault", year:"2019", km:"", fuel:"Essence", phone:"", desc:"", img:"" })
  }

  return (
    <div dir="rtl" style={{background:'#f0f2f5', minHeight:'100vh', fontFamily:'system-ui'}}>
      
      <div style={{background:'#00b050', padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:20}}>
        <div style={{color:'white', fontWeight:'900', fontSize:'18px'}}>Souk DZ Cars 🇩🇿</div>
        <div style={{background:'white', color:'#00b050', padding:'6px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'}}>يوجد {filtered.length} سيارة</div>
      </div>

      <div style={{padding:'10px', paddingBottom:'80px'}}>
        <div style={{background:'white', borderRadius:'20px', padding:'10px 14px', display:'flex', alignItems:'center', boxShadow:'0 1px 2px rgba(0,0,0,0.05)'}}>
          <span>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث Hilux, Clio, Toyota..." style={{border:'none', outline:'none', width:'100%', marginRight:'8px', fontSize:'13px', background:'transparent'}} />
        </div>

        <div style={{display:'flex', gap:'8px', overflowX:'auto', marginTop:'10px', paddingBottom:'2px'}}>
          {brands.map(b=>(
            <div key={b} onClick={()=>setBrandFilter(b)} style={{background: brandFilter===b ? '#00b050':'white', color: brandFilter===b ? 'white':'#333', padding:'7px 14px', borderRadius:'20px', whiteSpace:'nowrap', fontSize:'12px', fontWeight:'bold', cursor:'pointer', border:'1px solid #ddd'}}>{b}</div>
          ))}
        </div>

        <div style={{display:'flex', gap:'8px', overflowX:'auto', marginTop:'8px'}}>
          <div onClick={()=>setWilayaFilter("الكل")} style={{background: wilayaFilter==="الكل" ? '#005a32':'white', color: wilayaFilter==="الكل" ? 'white':'#333', padding:'6px 12px', borderRadius:'15px', whiteSpace:'nowrap', fontSize:'11px', cursor:'pointer', border:'1px solid #ddd'}}>كل الولايات (58)</div>
          {wilayas.map(w=>(
            <div key={w} onClick={()=>setWilayaFilter(w)} style={{background: wilayaFilter===w ? '#005a32':'white', color: wilayaFilter===w ? 'white':'#333', padding:'6px 12px', borderRadius:'15px', whiteSpace:'nowrap', fontSize:'11px', cursor:'pointer', border:'1px solid #ddd'}}>{w}</div>
          ))}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'12px'}}>
          {filtered.map(c=>(
            <div key={c.id} onClick={()=>setView(c)} style={{background:'white', borderRadius:'14px', overflow:'hidden', cursor:'pointer', boxShadow:'0 1px 2px rgba(0,0,0,0.06)'}}>
              <img src={c.img} alt={`${c.brand} ${c.title}`} style={{width:'100%', height:'130px', objectFit:'cover'}} />
              <div style={{padding:'8px', textAlign:'center'}}>
                <div style={{color:'#00b050', fontWeight:'900', fontSize:'15px'}}>{formatPrice(c.price)}</div>
                <div style={{fontSize:'12px', fontWeight:'700', marginTop:'2px'}}>{c.brand} {c.title}</div>
                <div style={{fontSize:'10px', color:'#888', marginTop:'2px'}}>{c.year} • {c.km.toLocaleString('fr-DZ')} كم • {c.fuel}</div>
                <div style={{fontSize:'10px', color:'#888'}}>{c.wilaya} • {getTimeAgo(c.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {view && (
        <div dir="rtl" style={{position:'fixed', inset:0, background:'white', zIndex:100, overflowY:'auto'}}>
          <div style={{position:'relative'}}>
            <img src={view.img} alt={view.title} style={{width:'100%', height:'320px', objectFit:'cover'}} />
            <div onClick={()=>setView(null)} style={{position:'absolute', top:'12px', right:'12px', background:'white', width:'36px', height:'36px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'18px'}}>✕</div>
          </div>
          <div style={{padding:'16px'}}>
            <div style={{color:'#00b050', fontWeight:'900', fontSize:'24px'}}>{formatPrice(view.price)}</div>
            <h1 style={{fontWeight:'bold', fontSize:'18px', marginTop:'4px'}}>{view.brand} {view.title}</h1>
            <div style={{fontSize:'12px', color:'#555', marginTop:'6px', lineHeight:'1.6'}}>
              📍 {view.wilaya}<br/>
              📅 {view.year} • 🛣️ {view.km.toLocaleString('fr-DZ')} كم • ⛽ {view.fuel}<br/>
              🕒 {getTimeAgo(view.createdAt)}
            </div>
            <div style={{background:'#f0f2f5', padding:'12px', borderRadius:'10px', marginTop:'12px', fontSize:'13px', whiteSpace:'pre-wrap'}}>{view.desc || "لا يوجد وصف إضافي"}<br/><br/>📞 {view.phone}</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'14px'}}>
              <a href={`tel:${view.phone}`} style={{background:'#00b050', color:'white', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold', textDecoration:'none'}}>📞 اتصل</a>
              <a href={`https://wa.me/213${view.phone.substring(1)}`} target="_blank" style={{background:'#25D366', color:'white', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold', textDecoration:'none'}}>WhatsApp</a>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div dir="rtl" style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'15px'}}>
          <div style={{background:'white', borderRadius:'16px', padding:'18px', width:'100%', maxWidth:'400px', maxHeight:'90vh', overflowY:'auto'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}>
              <div style={{fontWeight:'bold', fontSize:'16px'}}>بيع سيارتك 🚗</div>
              <div onClick={()=>setShowAdd(false)} style={{cursor:'pointer', fontSize:'18px'}}>✕</div>
            </div>

            <div style={{display:'flex', gap:'6px', overflowX:'auto', marginBottom:'10px'}}>
              {brands.slice(1).map(b=>(
                <div key={b} onClick={()=>setForm({...form, brand:b})} style={{background: form.brand===b ? '#00b050':'#eee', color: form.brand===b ? 'white':'#333', padding:'6px 10px', borderRadius:'15px', fontSize:'11px', cursor:'pointer', whiteSpace:'nowrap'}}>{b}</div>
              ))}
            </div>

            <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="العنوان: Clio 4 2019" style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd', marginBottom:'8px', fontSize:'13px'}} />
            
            <div style={{display:'flex', gap:'8px', marginBottom:'8px'}}>
              <input value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="السعر" type="number" style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd', fontSize:'13px'}} />
              <input value={form.year} onChange={e=>setForm({...form, year:e.target.value})} placeholder="السنة" type="number" style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd', fontSize:'13px'}} />
            </div>

            <div style={{display:'flex', gap:'8px', marginBottom:'8px'}}>
              <select value={form.wilaya} onChange={e=>setForm({...form, wilaya:e.target.value})} style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd', fontSize:'13px'}}>
                {wilayas.map(w=><option key={w} value={w}>{w}</option>)}
              </select>
              <input value={form.km} onChange={e=>setForm({...form, km:e.target.value})} placeholder="كم" type="number" style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd', fontSize:'13px'}} />
            </div>

            <div style={{display:'flex', gap:'8px', marginBottom:'8px'}}>
              <select value={form.fuel} onChange={e=>setForm({...form, fuel:e.target.value})} style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd', fontSize:'13px'}}>
                {fuels.map(f=><option key={f} value={f}>{f}</option>)}
              </select>
              <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="0550123456" style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd', fontSize:'13px'}} />
            </div>

            <input value={form.img} onChange={e=>setForm({...form, img:e.target.value})} placeholder="رابط الصورة (اختياري)" style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd', marginBottom:'8px', fontSize:'13px'}} />
            <textarea value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} placeholder="وصف السيارة..." style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd', marginBottom:'12px', fontSize:'13px', minHeight:'70px'}} />
            
            <div onClick={publish} style={{background:'#00b050', color:'white', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold', cursor:'pointer'}}>نشر الآن ✅</div>
            <div style={{fontSize:'10px', color:'#888', textAlign:'center', marginTop:'8px'}}>سيتم حفظه وسيكون له رابط /annonce/{Date.now()}</div>
          </div>
        </div>
      )}

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'white', borderTop:'1px solid #eee', display:'flex', justifyContent:'space-around', padding:'6px 0 4px 0', zIndex:30}}>
        <div style={{textAlign:'center', color:'#00b050'}}><div style={{fontSize:'20px'}}>🏠</div><div style={{fontSize:'10px', fontWeight:'bold'}}>الرئيسية</div></div>
        <div style={{textAlign:'center', color:'#888'}}><div style={{fontSize:'20px'}}>☰</div><div style={{fontSize:'10px'}}>فئات</div></div>
        <div onClick={()=>setShowAdd(true)} style={{textAlign:'center', cursor:'pointer'}}><div style={{border:'2px solid #00b050', borderRadius:'12px', width:'44px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', color:'#00b050', fontSize:'22px', margin:'0 auto'}}>+</div><div style={{fontSize:'11px', color:'#00b050', fontWeight:'bold'}}>نشر</div></div>
        <div style={{textAlign:'center', color:'#888'}}><div style={{fontSize:'20px'}}>💬</div><div style={{fontSize:'10px'}}>رسائل</div></div>
        <div style={{textAlign:'center', color:'#888'}}><div style={{fontSize:'20px'}}>👤</div><div style={{fontSize:'10px'}}>حسابي</div></div>
      </div>

    </div>
  )
}