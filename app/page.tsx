"use client"
import { useState, useEffect } from "react"

type Car = {
  id: number
  title: string
  price: string
  wilaya: string
  brand: string
  year: number
  km: number
  fuel: string
  images: string[]
  phone: string
  desc: string
  createdAt: string
}

export default function Home() {
  const wilayas = ["16","31","25","09","23","19","15","06","35","13"]
  const brands = ["الكل","Renault","Toyota","Peugeot","Dacia","Hyundai","Kia","Volkswagen"]
  const fuels = ["Essence","Diesel","GPL"]

  const baseImages: any = {
    Renault: ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600","https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600","https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600","https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600"],
    Toyota: ["https://images.unsplash.com/photo-1551830820-330a71b99659?w=600","https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600","https://images.unsplash.com/photo-1603386329225-868f9b1ee6c5?w=600","https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600"],
    Peugeot: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600","https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600","https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600","https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600"],
    Dacia: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600","https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600","https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600","https://images.unsplash.com/photo-1551830820-330a71b99659?w=600"],
  }

  const make10Images = (brand: string) => {
    const base = baseImages[brand] || baseImages.Renault
    const result = []
    for(let i=0;i<10;i++) result.push(base[i % base.length])
    return result
  }

  const defaultCars: Car[] = [
    { id:1, title:"Clio 4 2019 GT", price:"1850000", wilaya:"16", brand:"Renault", year:2019, km:78000, fuel:"Essence", images: make10Images("Renault"), phone:"0550123456", desc:"Clio 4 نظيفة بزاف، ماشية قليل", createdAt: new Date().toISOString() },
    { id:2, title:"Hilux Double Cabine", price:"4200000", wilaya:"25", brand:"Toyota", year:2021, km:45000, fuel:"Diesel", images: make10Images("Toyota"), phone:"0550123457", desc:"Hilux 4x4 دوبل كابين", createdAt: new Date().toISOString() },
    { id:3, title:"208 GT Line", price:"2650000", wilaya:"31", brand:"Peugeot", year:2022, km:22000, fuel:"Essence", images: make10Images("Peugeot"), phone:"0550123458", desc:"208 جديدة كيما خرجت من لاميزو", createdAt: new Date().toISOString() },
    { id:4, title:"Duster 4x4 2020", price:"2100000", wilaya:"09", brand:"Dacia", year:2020, km:65000, fuel:"Diesel", images: make10Images("Dacia"), phone:"0550123459", desc:"Duster 4x4", createdAt: new Date().toISOString() },
    { id:5, title:"Tucson 2021", price:"3800000", wilaya:"23", brand:"Hyundai", year:2021, km:30000, fuel:"Diesel", images: make10Images("Toyota"), phone:"0550123460", desc:"Tucson 2021 ماشية 30 ألف", createdAt: new Date().toISOString() },
    { id:6, title:"Golf 8 2022", price:"5200000", wilaya:"16", brand:"Volkswagen", year:2022, km:15000, fuel:"Essence", images: make10Images("Peugeot"), phone:"0550123461", desc:"Golf 8 جديدة", createdAt: new Date().toISOString() },
  ]

  const [cars, setCars] = useState<Car[]>(defaultCars)
  const [brandFilter, setBrandFilter] = useState("الكل")
  const [wilayaFilter, setWilayaFilter] = useState("الكل")
  const [search, setSearch] = useState("")
  const [view, setView] = useState<Car | null>(null)
  const [imgIndex, setImgIndex] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title:"", price:"", wilaya:"16", brand:"Renault", year:"2019", km:"", fuel:"Essence", phone:"", desc:"", images:[""] })
  const [formImgs, setFormImgs] = useState<string[]>([""])

  useEffect(() => {
    const saved = localStorage.getItem("souk_final")
    if(saved) try { setCars(JSON.parse(saved)) } catch {}
  }, [])

  const save = (updated: Car[]) => {
    setCars(updated)
    localStorage.setItem("souk_final", JSON.stringify(updated))
  }

  const filtered = cars.filter(c => 
    (brandFilter==="الكل" || c.brand===brandFilter) &&
    (wilayaFilter==="الكل" || c.wilaya===wilayaFilter) &&
    (search==="" || c.title.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase()))
  )

  const publish = () => {
    if(!form.title.trim()) return alert("اكتب اسم السيارة")
    if(!form.price) return alert("اكتب السعر")
    if(!/^0[567]\d{8}$/.test(form.phone)) return alert("رقم الهاتف خاطئ! مثال 0550123456")
    const validImgs = formImgs.filter(i=>i.trim().length>5)
    const newCar: Car = {
      id: Date.now(),
      title: form.title.trim(),
      price: form.price,
      wilaya: form.wilaya,
      brand: form.brand,
      year: parseInt(form.year) || 2020,
      km: parseInt(form.km) || 0,
      fuel: form.fuel,
      images: validImgs.length>=1 ? validImgs.slice(0,10) : make10Images(form.brand),
      phone: form.phone,
      desc: form.desc,
      createdAt: new Date().toISOString()
    }
    save([newCar, ...cars])
    setShowAdd(false)
    setFormImgs([""])
    setForm({ title:"", price:"", wilaya:"16", brand:"Renault", year:"2019", km:"", fuel:"Essence", phone:"", desc:"", images:[""] })
    alert("تم النشر ✅")
  }

  const addImgField = () => {
    if(formImgs.length>=10) return alert("أقصى 10 صور")
    setFormImgs([...formImgs, ""])
  }

  return (
    <div dir="rtl" style={{background:'#f0f2f5', minHeight:'100vh', fontFamily:'system-ui'}}>
      <div style={{background:'#00b050', padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:20}}>
        <div style={{color:'white', fontWeight:'900', fontSize:'18px'}}>Souk DZ Cars 🇩🇿</div>
        <div style={{background:'white', color:'#00b050', padding:'5px 10px', borderRadius:'15px', fontSize:'11px', fontWeight:'bold'}}>{filtered.length} سيارة</div>
      </div>

      <div style={{padding:'10px', paddingBottom:'80px'}}>
        <div style={{background:'white', borderRadius:'20px', padding:'10px 14px', display:'flex', alignItems:'center'}}>
          <span>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث Hilux, Clio..." style={{border:'none', outline:'none', width:'100%', marginRight:'8px', fontSize:'13px', background:'transparent'}} />
        </div>

        <div style={{display:'flex', gap:'8px', overflowX:'auto', marginTop:'10px', paddingBottom:'2px'}}>
          {brands.map(b=>(
            <div key={b} onClick={()=>setBrandFilter(b)} style={{background: brandFilter===b ? '#00b050':'white', color: brandFilter===b ? 'white':'black', padding:'7px 14px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold', cursor:'pointer', border:'1px solid #ddd', whiteSpace:'nowrap'}}>{b}</div>
          ))}
        </div>

        <div style={{display:'flex', gap:'8px', overflowX:'auto', marginTop:'8px'}}>
          <div onClick={()=>setWilayaFilter("الكل")} style={{background: wilayaFilter==="الكل" ? '#222':'white', color: wilayaFilter==="الكل" ? 'white':'black', padding:'6px 12px', borderRadius:'15px', fontSize:'11px', cursor:'pointer', border:'1px solid #ddd', whiteSpace:'nowrap'}}>الكل</div>
          {wilayas.map(w=>(
            <div key={w} onClick={()=>setWilayaFilter(w)} style={{background: wilayaFilter===w ? '#222':'white', color: wilayaFilter===w ? 'white':'black', padding:'6px 12px', borderRadius:'15px', fontSize:'11px', cursor:'pointer', border:'1px solid #ddd'}}>{w}</div>
          ))}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'12px'}}>
          {filtered.map(c=>(
            <div key={c.id} onClick={()=>{setView(c); setImgIndex(0)}} style={{background:'white', borderRadius:'12px', overflow:'hidden', cursor:'pointer', boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
              <div style={{position:'relative'}}>
                <img src={c.images[0]} alt={c.title} style={{width:'100%', height:'130px', objectFit:'cover'}} />
                <div style={{position:'absolute', top:'6px', right:'6px', background:'rgba(0,0,0,0.75)', color:'white', padding:'3px 7px', borderRadius:'10px', fontSize:'10px', fontWeight:'bold'}}>📷 {c.images.length}</div>
                <div style={{position:'absolute', bottom:'6px', left:'6px', background:'#00b050', color:'white', padding:'3px 8px', borderRadius:'10px', fontSize:'11px', fontWeight:'bold'}}>{c.wilaya}</div>
              </div>
              <div style={{padding:'8px', textAlign:'center'}}>
                <div style={{color:'#00b050', fontWeight:'900', fontSize:'14px'}}>{parseInt(c.price).toLocaleString('fr-DZ')} DA</div>
                <div style={{fontSize:'12px', fontWeight:'700'}}>{c.brand} {c.title}</div>
                <div style={{fontSize:'10px', color:'#888'}}>{c.year} • {c.km.toLocaleString('fr-DZ')} كم • {c.fuel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {view && (
        <div dir="rtl" style={{position:'fixed', inset:0, background:'white', zIndex:100, overflowY:'auto'}}>
          <div style={{position:'relative', background:'black'}}>
            <img src={view.images[imgIndex]} alt={view.title} style={{width:'100%', height:'380px', objectFit:'contain'}} />
            <div onClick={()=>setView(null)} style={{position:'absolute', top:'12px', right:'12px', background:'white', width:'36px', height:'36px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontWeight:'bold'}}>✕</div>
            <div style={{position:'absolute', top:'50%', left:'10px', right:'10px', display:'flex', justifyContent:'space-between'}}>
              <div onClick={()=>setImgIndex((imgIndex-1+view.images.length)%view.images.length)} style={{background:'rgba(255,255,255,0.9)', width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'20px'}}>‹</div>
              <div onClick={()=>setImgIndex((imgIndex+1)%view.images.length)} style={{background:'rgba(255,255,255,0.9)', width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'20px'}}>›</div>
            </div>
            <div style={{position:'absolute', bottom:'10px', left:'50%', transform:'translateX(-50%)', background:'rgba(0,0,0,0.75)', color:'white', padding:'5px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'}}>{imgIndex+1} / {view.images.length}</div>
          </div>

          <div style={{display:'flex', gap:'6px', overflowX:'auto', padding:'10px', background:'#f9f9f9'}}>
            {view.images.map((img,i)=>(
              <img key={i} src={img} onClick={()=>setImgIndex(i)} style={{width:'65px', height:'65px', objectFit:'cover', borderRadius:'8px', border: i===imgIndex ? '3px solid #00b050':'2px solid #ddd', cursor:'pointer', flexShrink:0}} alt="" />
            ))}
          </div>

          <div style={{padding:'15px'}}>
            <div style={{color:'#00b050', fontWeight:'900', fontSize:'24px'}}>{parseInt(view.price).toLocaleString('fr-DZ')} DA</div>
            <div style={{fontWeight:'bold', fontSize:'18px', marginTop:'4px'}}>{view.brand} {view.title}</div>
            <div style={{fontSize:'13px', color:'#555', marginTop:'8px', lineHeight:'1.7'}}>
              📍 ولاية {view.wilaya}<br/>
              📅 {view.year} • 🛣️ {view.km.toLocaleString('fr-DZ')} كم • ⛽ {view.fuel}
            </div>
            <div style={{background:'#f0f2f5', padding:'12px', borderRadius:'10px', marginTop:'12px', fontSize:'13px', whiteSpace:'pre-wrap'}}>{view.desc}</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'14px'}}>
              <a href={`tel:${view.phone}`} style={{background:'#00b050', color:'white', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold', textDecoration:'none'}}>📞 {view.phone}</a>
              <a href={`https://wa.me/213${view.phone.substring(1)}`} target="_blank" style={{background:'#25D366', color:'white', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold', textDecoration:'none'}}>WhatsApp</a>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div dir="rtl" style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'15px'}}>
          <div style={{background:'white', borderRadius:'16px', padding:'18px', width:'100%', maxWidth:'400px', maxHeight:'92vh', overflowY:'auto'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}>
              <div style={{fontWeight:'bold', fontSize:'16px'}}>بيع سيارتك 🚗</div>
              <div onClick={()=>setShowAdd(false)} style={{cursor:'pointer', fontSize:'18px'}}>✕</div>
            </div>

            <div style={{display:'flex', gap:'6px', overflowX:'auto', marginBottom:'10px'}}>
              {brands.slice(1).map(b=>(
                <div key={b} onClick={()=>setForm({...form, brand:b})} style={{background: form.brand===b ? '#00b050':'#eee', color: form.brand===b ? 'white':'black', padding:'6px 10px', borderRadius:'15px', fontSize:'11px', cursor:'pointer', whiteSpace:'nowrap'}}>{b}</div>
              ))}
            </div>

            <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="مثلا: Clio 4 GT Line" style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd', marginBottom:'8px', fontSize:'13px'}} />
            
            <div style={{display:'flex', gap:'8px', marginBottom:'8px'}}>
              <input value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="السعر" type="number" style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd', fontSize:'13px'}} />
              <input value={form.year} onChange={e=>setForm({...form, year:e.target.value})} placeholder="السنة" type="number" style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd', fontSize:'13px'}} />
            </div>

            <div style={{display:'flex', gap:'8px', marginBottom:'8px'}}>
              <select value={form.wilaya} onChange={e=>setForm({...form, wilaya:e.target.value})} style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}}>{wilayas.map(w=><option key={w} value={w}>{w}</option>)}</select>
              <select value={form.fuel} onChange={e=>setForm({...form, fuel:e.target.value})} style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}}>{fuels.map(f=><option key={f} value={f}>{f}</option>)}</select>
            </div>

            <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
              <input value={form.km} onChange={e=>setForm({...form, km:e.target.value})} placeholder="كم" type="number" style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd', fontSize:'13px'}} />
              <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="0550123456" style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd', fontSize:'13px'}} />
            </div>

            <div style={{marginBottom:'8px'}}>
              <div style={{fontSize:'12px', fontWeight:'bold', marginBottom:'6px'}}>صور السيارة (حتى 10 صور) 📷</div>
              {formImgs.map((img, i)=>(
                <input key={i} value={img} onChange={e=>{const arr=[...formImgs]; arr[i]=e.target.value; setFormImgs(arr)}} placeholder={`رابط الصورة ${i+1}`} style={{width:'100%', padding:'10px', borderRadius:'8px', border:'1px solid #ddd', marginBottom:'6px', fontSize:'12px'}} />
              ))}
              {formImgs.length<10 && <div onClick={addImgField} style={{background:'#eee', padding:'8px', borderRadius:'8px', textAlign:'center', cursor:'pointer', fontSize:'12px'}}>+ أضف صورة</div>}
              <div style={{fontSize:'10px', color:'#888', marginTop:'4px'}}>إذا ما عندكش روابط، نخليو صور افتراضية للمركة</div>
            </div>

            <textarea value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} placeholder="وصف السيارة..." style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd', marginBottom:'12px', fontSize:'13px', minHeight:'60px'}} />
            
            <div onClick={publish} style={{background:'#00b050', color:'white', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold', cursor:'pointer', fontSize:'15px'}}>نشر الآن مع {formImgs.filter(i=>i.trim()).length || 10} صور ✅</div>
          </div>
        </div>
      )}

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'white', borderTop:'1px solid #eee', display:'flex', justifyContent:'space-around', padding:'8px 0 6px 0', zIndex:30}}>
        <div style={{textAlign:'center', color:'#00b050'}}><div style={{fontSize:'20px'}}>🏠</div><div style={{fontSize:'10px', fontWeight:'bold'}}>الرئيسية</div></div>
        <div onClick={()=>setShowAdd(true)} style={{textAlign:'center', cursor:'pointer'}}><div style={{border:'2px solid #00b050', borderRadius:'12px', width:'48px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', color:'#00b050', fontSize:'22px', margin:'0 auto'}}>+</div><div style={{fontSize:'11px', color:'#00b050', fontWeight:'bold'}}>نشر</div></div>
        <div style={{textAlign:'center', color:'#888'}}><div style={{fontSize:'20px'}}>👤</div><div style={{fontSize:'10px'}}>حسابي</div></div>
      </div>
    </div>
  )
}
