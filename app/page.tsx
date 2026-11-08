"use client"
import { useState } from "react"

export default function Home(){
  const cars = [
    {price:"1 850 000 DA", title:"Peugeot 308 2019 • 78 000 km", city:"Alger • Il y a 2h"},
    {price:"1 450 000 DA", title:"Dacia Sandero 2020 • 65 000 km", city:"Oran • Il y a 5h"},
    {price:"2 500 000 DA", title:"Toyota Corolla 2021 • 42 000 km", city:"Constantine • Il y a 1j"},
    {price:"1 600 000 DA", title:"Renault Clio 2019 • 90 000 km", city:"Alger • Il y a 1j"},
    {price:"3 200 000 DA", title:"Hyundai Tucson 2022 • 30 000 km", city:"Blida • Il y a 2j"},
    {price:"1 100 000 DA", title:"Kia Picanto 2018 • 95 000 km", city:"Annaba • Il y a 3h"},
  ]
  return(
    <div style={{minHeight:'100vh', background:'#fff', fontFamily:'system-ui'}}>
      <div style={{background:'#16a34a', color:'white', padding:'12px 15px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:10}}>
        <h1 style={{fontWeight:'900', fontSize:'20px'}}>🇩🇿 Souk DZ Cars</h1>
        <div style={{display:'flex', gap:'15px', fontSize:'20px'}}>🔍 ❤️</div>
      </div>

      <div style={{padding:'12px'}}>
        <input placeholder="🔍 Rechercher une voiture, marque..." style={{width:'100%', padding:'14px', borderRadius:'12px', background:'#f3f4f6', border:'none', outline:'none'}} />
        
        <div style={{display:'flex', gap:'8px', marginTop:'12px', overflowX:'auto'}}>
          {['Tout','🚗 Voitures','🏍️ Motos','⚙️ Pièces Auto','🚚 Utilitaires'].map((c,i)=>(
            <span key={i} style={{background:i===0?'#16a34a':'#f3f4f6', color:i===0?'white':'black', padding:'8px 14px', borderRadius:'20px', whiteSpace:'nowrap', fontSize:'13px', fontWeight:'600'}}>{c}</span>
          ))}
        </div>

        <div style={{marginTop:'15px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{fontWeight:'700', fontSize:'15px'}}>Résultats • 24 annonces</h2>
          <span style={{background:'#dcfce7', color:'#16a34a', padding:'4px 8px', borderRadius:'8px', fontSize:'12px'}}>يوجد 6 إعلانات حاليا</span>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'12px', paddingBottom:'80px'}}>
          {cars.map((car,i)=>(
            <div key={i} style={{border:'1px solid #e5e7eb', borderRadius:'14px', overflow:'hidden', background:'white'}}>
              <div style={{background:'#f8fafc', height:'130px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'40px'}}>🚗</div>
              <div style={{padding:'10px'}}>
                <p style={{color:'#16a34a', fontWeight:'900', fontSize:'16px'}}>{car.price}</p>
                <p style={{fontSize:'12px', fontWeight:'600', marginTop:'4px', lineHeight:'1.2'}}>{car.title}</p>
                <p style={{fontSize:'11px', color:'#6b7280', marginTop:'4px'}}>📍 {car.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'white', borderTop:'1px solid #e5e7eb', display:'flex', justifyContent:'space-around', padding:'8px 0'}}>
        <div style={{textAlign:'center', color:'#16a34a'}}><div style={{fontSize:'22px'}}>🏠</div><div style={{fontSize:'11px', fontWeight:'700'}}>Accueil</div></div>
        <div style={{textAlign:'center', color:'#9ca3af'}}><div style={{fontSize:'22px'}}>☰</div><div style={{fontSize:'11px'}}>Catégories</div></div>
        <div style={{textAlign:'center', color:'#16a34a'}}><div style={{fontSize:'22px', border:'2px solid #16a34a', borderRadius:'8px', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto'}}>+</div><div style={{fontSize:'11px'}}>Publier</div></div>
        <div style={{textAlign:'center', color:'#9ca3af'}}><div style={{fontSize:'22px'}}>💬</div><div style={{fontSize:'11px'}}>Messages</div></div>
        <div style={{textAlign:'center', color:'#9ca3af'}}><div style={{fontSize:'22px'}}>👤</div><div style={{fontSize:'11px'}}>Profil</div></div>
      </div>
    </div>
  )
}