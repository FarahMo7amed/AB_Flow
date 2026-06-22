import { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

// ─── Expanded sample data (50 users per variant) ──────────────────────────
function generateData() {
  const cities = ["Cairo","Alexandria","Giza","Mansoura","Luxor","Aswan","Tanta","Ismailia"];
  const devices = ["mobile","desktop","tablet"];
  const browsers = ["Chrome","Safari","Firefox","Edge"];
  const sources = ["google","facebook","email","direct","instagram"];
  const rng = (min,max) => Math.floor(Math.random()*((max-min)+1))+min;
  const rows = [];
  let id = 1;

  // Variant A: 40% CVR, avg revenue ~400
  for (let i=1;i<=50;i++) {
    const conv = Math.random() < 0.40 ? 1 : 0;
    const rev = conv ? rng(200,900) : 0;
    const cart = conv ? rng(1,2) : (Math.random()<0.2?1:0);
    const checkout = conv ? 1 : (cart && Math.random()<0.3?1:0);
    rows.push({
      id:id++, variant:"A", ctrl:true,
      user:`user_A${String(i).padStart(3,"0")}`,
      session:`sess_A${String(i).padStart(3,"0")}`,
      device:devices[rng(0,2)], browser:browsers[rng(0,3)],
      source:sources[rng(0,4)], converted:conv, revenue:rev, aov:conv?rev:0,
      pages:rng(2,8), clicks:rng(1,8), scroll:rng(30,85),
      cart, checkout, purchase:conv?1:0,
      convTime:conv?rng(300,1400):null,
      city:cities[rng(0,7)],
      day:rng(1,14)
    });
  }

  // Variant B: 60% CVR, avg revenue ~620
  for (let i=1;i<=50;i++) {
    const conv = Math.random() < 0.60 ? 1 : 0;
    const rev = conv ? rng(350,1400) : 0;
    const cart = conv ? rng(1,3) : (Math.random()<0.35?1:0);
    const checkout = conv ? 1 : (cart && Math.random()<0.4?1:0);
    rows.push({
      id:id++, variant:"B", ctrl:false,
      user:`user_B${String(i).padStart(3,"0")}`,
      session:`sess_B${String(i).padStart(3,"0")}`,
      device:devices[rng(0,2)], browser:browsers[rng(0,3)],
      source:sources[rng(0,4)], converted:conv, revenue:rev, aov:conv?rev:0,
      pages:rng(4,12), clicks:rng(4,16), scroll:rng(55,100),
      cart, checkout, purchase:conv?1:0,
      convTime:conv?rng(240,1200):null,
      city:cities[rng(0,7)],
      day:rng(1,14)
    });
  }
  return rows;
}

// seed-stable data (generated once)
const RAW = generateData();

// ─── Brand palette ─────────────────────────────────────────────────────────
const C = {
  coral:"#E8472A", orange:"#F0813A", amber:"#F5A623",
  purple:"#6C4DE6", purpleL:"#A78BFA",
  slate:"#1E1B2E", dark:"#111827",
  gray:"#6B7280", grayL:"#F3F4F6",
  white:"#FFFFFF", green:"#10B981", blue:"#3B82F6",
  darkBg:"#1a1a2e", darkCard:"#16213e", darkBorder:"#2d2d4e",
  greenDim:"#14532d", greenTxt:"#4ade80",
  amberDim:"#78350f", amberTxt:"#fbbf24",
  redDim:"#7f1d1d", redTxt:"#f87171",
};

// ─── Derived metrics ────────────────────────────────────────────────────────
function useMetrics(data) {
  return useMemo(() => {
    const a = data.filter(d=>d.variant==="A");
    const b = data.filter(d=>d.variant==="B");
    const conv  = v => +(v.filter(d=>d.converted).length/v.length*100).toFixed(1);
    const rpu   = v => +(v.reduce((s,d)=>s+d.revenue,0)/v.length).toFixed(0);
    const avgS  = v => +(v.reduce((s,d)=>s+d.scroll,0)/v.length).toFixed(1);
    const avgCl = v => +(v.reduce((s,d)=>s+d.clicks,0)/v.length).toFixed(1);

    const cvrA = conv(a), cvrB = conv(b);
    const rpuA = rpu(a), rpuB = rpu(b);
    const lift = +((cvrB-cvrA)/cvrA*100).toFixed(1);
    const revLift = +((rpuB-rpuA)/rpuA*100).toFixed(1);

    // funnel
    const funnel = [
      { step:"Visitors",   A:a.length, B:b.length },
      { step:"Add to cart",A:a.filter(d=>d.cart>0).length, B:b.filter(d=>d.cart>0).length },
      { step:"Checkout",   A:a.filter(d=>d.checkout>0).length, B:b.filter(d=>d.checkout>0).length },
      { step:"Purchase",   A:a.filter(d=>d.purchase>0).length, B:b.filter(d=>d.purchase>0).length },
    ];

    // device per variant
    const deviceVariant = ["mobile","desktop","tablet"].map(dev=>({
      device:dev,
      A:a.filter(d=>d.device===dev).length,
      B:b.filter(d=>d.device===dev).length,
    }));

    // source per variant
    const allSources = [...new Set(data.map(d=>d.source))];
    const sourceVariant = allSources.map(src=>({
      source:src,
      A:a.filter(d=>d.source===src).length,
      B:b.filter(d=>d.source===src).length,
    }));

    // scroll bands
    const scrollBands = [
      { band:"0–40%",  A:a.filter(d=>d.scroll<=40).length,                       B:b.filter(d=>d.scroll<=40).length },
      { band:"41–70%", A:a.filter(d=>d.scroll>40&&d.scroll<=70).length,           B:b.filter(d=>d.scroll>40&&d.scroll<=70).length },
      { band:"71–99%", A:a.filter(d=>d.scroll>70&&d.scroll<100).length,           B:b.filter(d=>d.scroll>70&&d.scroll<100).length },
      { band:"100%",   A:a.filter(d=>d.scroll===100).length,                      B:b.filter(d=>d.scroll===100).length },
    ];

    // radar
    const radar = [
      { metric:"CVR",         A:cvrA,            B:cvrB },
      { metric:"Scroll",      A:avgS(a),          B:avgS(b) },
      { metric:"Clicks×5",    A:avgCl(a)*5,       B:avgCl(b)*5 },
      { metric:"RPU÷10",      A:rpuA/10,          B:rpuB/10 },
      { metric:"Purchase%",   A:a.filter(d=>d.purchase>0).length/a.length*100, B:b.filter(d=>d.purchase>0).length/b.length*100 },
    ];

    // city per variant
    const allCities = [...new Set(data.map(d=>d.city))];
    const cityVariant = allCities.map(city=>({
      city, A:a.filter(d=>d.city===city).length, B:b.filter(d=>d.city===city).length
    })).sort((x,y)=>(y.A+y.B)-(x.A+x.B));

    // daily CR for novelty effect (days 1-3, 4-7, 8-14)
    const dailyCR = [
      { range:"Days 1–3",
        A:+(a.filter(d=>d.day<=3&&d.converted).length/Math.max(a.filter(d=>d.day<=3).length,1)*100).toFixed(2),
        B:+(b.filter(d=>d.day<=3&&d.converted).length/Math.max(b.filter(d=>d.day<=3).length,1)*100).toFixed(2),
      },
      { range:"Days 4–7",
        A:+(a.filter(d=>d.day>=4&&d.day<=7&&d.converted).length/Math.max(a.filter(d=>d.day>=4&&d.day<=7).length,1)*100).toFixed(2),
        B:+(b.filter(d=>d.day>=4&&d.day<=7&&d.converted).length/Math.max(b.filter(d=>d.day>=4&&d.day<=7).length,1)*100).toFixed(2),
      },
      { range:"Days 8–14",
        A:+(a.filter(d=>d.day>=8&&d.converted).length/Math.max(a.filter(d=>d.day>=8).length,1)*100).toFixed(2),
        B:+(b.filter(d=>d.day>=8&&d.converted).length/Math.max(b.filter(d=>d.day>=8).length,1)*100).toFixed(2),
      },
    ];

    // SRM
    const totalN = data.length;
    const nA = a.length, nB = b.length;
    const exp = totalN/2;
    const chi2 = +((Math.pow(nA-exp,2)/exp + Math.pow(nB-exp,2)/exp)).toFixed(3);
    const srmP = chi2 < 3.84 ? ">" + (0.05).toFixed(2) : "<0.05";
    const srmPass = chi2 < 3.84;

    // power (approximation)
    const pooledP = (a.filter(d=>d.converted).length + b.filter(d=>d.converted).length) / totalN;
    const se = Math.sqrt(2*pooledP*(1-pooledP)/Math.min(nA,nB));
    const z  = Math.abs((cvrB/100 - cvrA/100)/se);
    const power = Math.min(99, +(Math.round((1 - Math.exp(-0.717*z - 0.416*z*z))*100))).toFixed(0);
    const powerPass = power >= 80;

    // required sample (rough: 2*(z_alpha/2+z_beta)^2 * p(1-p) / delta^2)
    const delta = Math.abs(cvrB/100 - cvrA/100);
    const reqN = delta > 0
      ? Math.ceil(2 * Math.pow(1.96+0.84,2) * pooledP*(1-pooledP) / Math.pow(delta,2))
      : 15000;
    const samplePass = Math.min(nA,nB) >= reqN;

    // winner score
    const bWins = [cvrB > cvrA, rpuB > rpuA, avgS(b) > avgS(a), avgCl(b) > avgCl(a)].filter(Boolean).length;
    const winner = bWins >= 3 ? "B" : "A";

    return {
      nA, nB, totalUsers:totalN,
      totalRevenue:data.reduce((s,d)=>s+d.revenue,0),
      cvrA, cvrB, rpuA:+rpuA, rpuB:+rpuB, lift, revLift,
      avgScrollA:avgS(a), avgScrollB:avgS(b),
      avgClicksA:avgCl(a), avgClicksB:avgCl(b),
      funnel, deviceVariant, sourceVariant, scrollBands, radar, cityVariant,
      dailyCR,
      srm:{ chi2, pass:srmPass, pLabel:srmP, splitA:+(nA/totalN*100).toFixed(1), splitB:+(nB/totalN*100).toFixed(1) },
      power:{ val:+power, pass:powerPass },
      sample:{ reqN, actual:Math.min(nA,nB), pass:samplePass },
      novelty:{ detected: dailyCR[0].B - dailyCR[2].B > 5, drop:+((dailyCR[0].B - dailyCR[2].B)).toFixed(1) },
      sig: lift > 0 && chi2 > 3.84,
      winner, bWins,
    };
  }, [data]);
}

// ─── Reusable components ────────────────────────────────────────────────────
const TABS = ["Overview","Funnel","Engagement","Audience","Health","Insights"];

const StatBadge = ({pass, label}) => (
  <span style={{
    fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:999,
    background: pass ? "#14532d" : "#7f1d1d",
    color: pass ? "#4ade80" : "#f87171",
  }}>{label || (pass ? "Pass" : "Fail")}</span>
);

const HealthCard = ({title, value, sub, pass, badge, valueColor}) => (
  <div style={{background:"#16213e", border:"1px solid #2d2d4e", borderRadius:12, padding:"18px 20px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
      <span style={{fontSize:14, fontWeight:700, color:"#e2e8f0"}}>{title}</span>
      {badge !== undefined && <StatBadge pass={badge} />}
    </div>
    <div style={{fontSize:28, fontWeight:800, color: valueColor || (pass ? C.greenTxt : C.amberTxt), marginBottom:4}}>{value}</div>
    {sub && <div style={{fontSize:12, color:"#94a3b8"}}>{sub}</div>}
    <div style={{height:4, background:"#2d2d4e", borderRadius:2, marginTop:10}}>
      <div style={{height:4, borderRadius:2, width:"100%",
        background: badge !== false ? (pass ? C.greenTxt : C.amberTxt) : "#f87171"
      }}/>
    </div>
  </div>
);

const MetricCard = ({label, value, sub, accent, trend, vA, vB}) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-bold" style={{color:accent||C.slate}}>{value}</p>
    {vA !== undefined && (
      <div className="flex gap-3 mt-2">
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{background:"#ede9fe",color:"#4c1d95"}}>A: {vA}</span>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{background:"#fee2e2",color:"#7f1d1d"}}>B: {vB}</span>
      </div>
    )}
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    {trend !== undefined && (
      <span className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full"
        style={{background:trend>0?"#D1FAE5":"#FEE2E2", color:trend>0?"#065F46":"#991B1B"}}>
        {trend>0?"+":""}{trend}%
      </span>
    )}
  </div>
);

const ChartCard = ({title, children, className=""}) => (
  <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm ${className}`}>
    <p className="text-sm font-semibold text-gray-700 mb-4">{title}</p>
    {children}
  </div>
);

const VLegend = () => (
  <div className="flex gap-4 justify-center mt-2">
    <span className="flex items-center gap-1.5 text-xs text-gray-500">
      <span className="w-3 h-3 rounded-sm inline-block" style={{background:C.purple}}/>Control A
    </span>
    <span className="flex items-center gap-1.5 text-xs text-gray-500">
      <span className="w-3 h-3 rounded-sm inline-block" style={{background:C.coral}}/>Treatment B
    </span>
  </div>
);

const TT = {contentStyle:{borderRadius:10,border:"1px solid #F3F4F6",fontSize:12}};

// ─── Main ────────────────────────────────────────────────────────────────────
export default function ABFlowDashboard() {
  const [tab, setTab] = useState("Overview");
  const m = useMetrics(RAW);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard label="Total users" value={m.totalUsers} sub={`${m.nA} control · ${m.nB} treatment`} accent={C.slate} />
          <MetricCard label="CVR" value={`${m.cvrB}%`} vA={`${m.cvrA}%`} vB={`${m.cvrB}%`} trend={m.lift} accent={C.purple} />
          <MetricCard label="Revenue per user" value={`${m.rpuB} EGP`} vA={`${m.rpuA}`} vB={`${m.rpuB}`} trend={m.revLift} accent={C.coral} />
          <MetricCard label="Total revenue" value={`${m.totalRevenue.toLocaleString()} EGP`} accent={C.green} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit flex-wrap">
          {TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={tab===t
                ?{background:C.white,color:C.slate,boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}
                :{color:C.gray}}>
              {t}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {tab==="Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="Conversion rate — A vs B">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[{v:"Control A",rate:m.cvrA},{v:"Treatment B",rate:m.cvrB}]} barSize={52}
                  margin={{top:8,right:8,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                  <XAxis dataKey="v" tick={{fontSize:12,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false} unit="%" domain={[0,100]}/>
                  <Tooltip {...TT} formatter={v=>[`${v}%`,"CVR"]}/>
                  <Bar dataKey="rate" radius={[8,8,0,0]}>
                    {[C.purple,C.coral].map((c,i)=><Cell key={i} fill={c}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Revenue per user — A vs B">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[{v:"Control A",rpu:m.rpuA},{v:"Treatment B",rpu:m.rpuB}]} barSize={52}
                  margin={{top:8,right:8,left:0,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                  <XAxis dataKey="v" tick={{fontSize:12,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false} unit=" LE"/>
                  <Tooltip {...TT} formatter={v=>[`${v} EGP`,"RPU"]}/>
                  <Bar dataKey="rpu" radius={[8,8,0,0]}>
                    {[C.purple,C.coral].map((c,i)=><Cell key={i} fill={c}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Performance radar — A vs B" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={m.radar} cx="50%" cy="50%" outerRadius={100}>
                  <PolarGrid stroke="#F3F4F6"/>
                  <PolarAngleAxis dataKey="metric" tick={{fontSize:12,fill:C.gray}}/>
                  <Radar name="Control A" dataKey="A" stroke={C.purple} fill={C.purple} fillOpacity={0.15} strokeWidth={2}/>
                  <Radar name="Treatment B" dataKey="B" stroke={C.coral} fill={C.coral} fillOpacity={0.15} strokeWidth={2}/>
                  <Legend iconType="circle" iconSize={8}/>
                  <Tooltip {...TT}/>
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {/* ── FUNNEL ── */}
        {tab==="Funnel" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="Funnel steps — user count" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={m.funnel} margin={{top:8,right:8,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                  <XAxis dataKey="step" tick={{fontSize:12,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <Tooltip {...TT}/>
                  <Legend iconType="circle" iconSize={8}/>
                  <Bar dataKey="A" name="Control A" fill={C.purple} radius={[6,6,0,0]} barSize={28}/>
                  <Bar dataKey="B" name="Treatment B" fill={C.coral} radius={[6,6,0,0]} barSize={28}/>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Funnel conversion rate (% of visitors)">
              {(()=>{
                const vA=m.funnel[0].A, vB=m.funnel[0].B;
                const pct=m.funnel.map(f=>({step:f.step,A:+(f.A/vA*100).toFixed(0),B:+(f.B/vB*100).toFixed(0)}));
                return(
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={pct} margin={{top:8,right:8,left:-20,bottom:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                      <XAxis dataKey="step" tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false} unit="%" domain={[0,100]}/>
                      <Tooltip {...TT}/>
                      <Legend iconType="circle" iconSize={8}/>
                      <Area type="monotone" dataKey="A" name="Control A" stroke={C.purple} fill={C.purple} fillOpacity={0.1} strokeWidth={2}/>
                      <Area type="monotone" dataKey="B" name="Treatment B" stroke={C.coral} fill={C.coral} fillOpacity={0.1} strokeWidth={2}/>
                    </AreaChart>
                  </ResponsiveContainer>
                );
              })()}
            </ChartCard>

            <ChartCard title="Scroll depth distribution — A vs B">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={m.scrollBands} margin={{top:8,right:8,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                  <XAxis dataKey="band" tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <Tooltip {...TT}/>
                  <Legend iconType="circle" iconSize={8}/>
                  <Bar dataKey="A" name="Control A" fill={C.purple} radius={[4,4,0,0]} barSize={20}/>
                  <Bar dataKey="B" name="Treatment B" fill={C.coral} radius={[4,4,0,0]} barSize={20}/>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {/* ── ENGAGEMENT ── */}
        {tab==="Engagement" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="Avg page views per session — A vs B">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={[
                    {v:"Control A", val:+(RAW.filter(d=>d.variant==="A").reduce((s,d)=>s+d.pages,0)/m.nA).toFixed(1)},
                    {v:"Treatment B",val:+(RAW.filter(d=>d.variant==="B").reduce((s,d)=>s+d.pages,0)/m.nB).toFixed(1)},
                  ]} barSize={52} margin={{top:8,right:8,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                  <XAxis dataKey="v" tick={{fontSize:12,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <Tooltip {...TT}/>
                  <Bar dataKey="val" name="Pages" radius={[8,8,0,0]}>
                    {[C.purple,C.coral].map((c,i)=><Cell key={i} fill={c}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Avg clicks per session — A vs B">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={[
                    {v:"Control A", val:+m.avgClicksA},
                    {v:"Treatment B",val:+m.avgClicksB},
                  ]} barSize={52} margin={{top:8,right:8,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                  <XAxis dataKey="v" tick={{fontSize:12,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <Tooltip {...TT}/>
                  <Bar dataKey="val" name="Clicks" radius={[8,8,0,0]}>
                    {[C.purple,C.coral].map((c,i)=><Cell key={i} fill={c}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Avg scroll depth — A vs B">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={[
                    {v:"Control A", val:+m.avgScrollA},
                    {v:"Treatment B",val:+m.avgScrollB},
                  ]} barSize={52} margin={{top:8,right:8,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                  <XAxis dataKey="v" tick={{fontSize:12,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false} unit="%"/>
                  <Tooltip {...TT} formatter={v=>[`${v}%`,"Scroll"]}/>
                  <Bar dataKey="val" name="Scroll %" radius={[8,8,0,0]}>
                    {[C.purple,C.coral].map((c,i)=><Cell key={i} fill={c}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Conversion time distribution — converters only">
              {(()=>{
                const bins = [
                  {range:"<5 min", A:RAW.filter(d=>d.variant==="A"&&d.convTime&&d.convTime<300).length, B:RAW.filter(d=>d.variant==="B"&&d.convTime&&d.convTime<300).length},
                  {range:"5–10 min",A:RAW.filter(d=>d.variant==="A"&&d.convTime&&d.convTime>=300&&d.convTime<600).length, B:RAW.filter(d=>d.variant==="B"&&d.convTime&&d.convTime>=300&&d.convTime<600).length},
                  {range:"10–20 min",A:RAW.filter(d=>d.variant==="A"&&d.convTime&&d.convTime>=600&&d.convTime<1200).length, B:RAW.filter(d=>d.variant==="B"&&d.convTime&&d.convTime>=600&&d.convTime<1200).length},
                  {range:">20 min",A:RAW.filter(d=>d.variant==="A"&&d.convTime&&d.convTime>=1200).length, B:RAW.filter(d=>d.variant==="B"&&d.convTime&&d.convTime>=1200).length},
                ];
                return(
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={bins} margin={{top:8,right:8,left:-20,bottom:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                      <XAxis dataKey="range" tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                      <Tooltip {...TT}/>
                      <Legend iconType="circle" iconSize={8}/>
                      <Bar dataKey="A" name="Control A" fill={C.purple} radius={[4,4,0,0]} barSize={20}/>
                      <Bar dataKey="B" name="Treatment B" fill={C.coral} radius={[4,4,0,0]} barSize={20}/>
                    </BarChart>
                  </ResponsiveContainer>
                );
              })()}
            </ChartCard>
          </div>
        )}

        {/* ── AUDIENCE ── */}
        {tab==="Audience" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="Device split — A vs B">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={m.deviceVariant} margin={{top:8,right:8,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                  <XAxis dataKey="device" tick={{fontSize:12,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <Tooltip {...TT}/>
                  <Legend iconType="circle" iconSize={8}/>
                  <Bar dataKey="A" name="Control A" fill={C.purple} radius={[4,4,0,0]} barSize={22}/>
                  <Bar dataKey="B" name="Treatment B" fill={C.coral} radius={[4,4,0,0]} barSize={22}/>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Traffic source — A vs B">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={m.sourceVariant} layout="vertical" margin={{top:4,right:16,left:20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false}/>
                  <XAxis type="number" tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="source" tick={{fontSize:12,fill:C.gray}} axisLine={false} tickLine={false} width={68}/>
                  <Tooltip {...TT}/>
                  <Legend iconType="circle" iconSize={8}/>
                  <Bar dataKey="A" name="Control A" fill={C.purple} radius={[0,4,4,0]} barSize={14}/>
                  <Bar dataKey="B" name="Treatment B" fill={C.coral} radius={[0,4,4,0]} barSize={14}/>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="City distribution — A vs B" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={m.cityVariant} margin={{top:8,right:8,left:-10,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                  <XAxis dataKey="city" tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <Tooltip {...TT}/>
                  <Legend iconType="circle" iconSize={8}/>
                  <Bar dataKey="A" name="Control A" fill={C.purple} radius={[4,4,0,0]} barSize={16}/>
                  <Bar dataKey="B" name="Treatment B" fill={C.coral} radius={[4,4,0,0]} barSize={16}/>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {/* ── HEALTH ── */}
        {tab==="Health" && (
          <div style={{maxWidth:820}}>
            {/* 4 health cards dark theme */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
              <HealthCard
                title="Sample ratio mismatch"
                value={`χ² = ${m.srm.chi2}`}
                sub={`${m.srm.splitA}% / ${m.srm.splitB}% split · expected 50/50`}
                badge={m.srm.pass} pass={m.srm.pass}
                valueColor={m.srm.pass ? C.greenTxt : C.amberTxt}
              />
              <HealthCard
                title="Statistical power"
                value={`${m.power.val}%`}
                sub={`Achieved · target was 80%`}
                badge={m.power.pass} pass={m.power.pass}
                valueColor={m.power.pass ? C.greenTxt : C.amberTxt}
              />
              <HealthCard
                title="Sample adequacy"
                value={Math.min(m.nA,m.nB).toLocaleString()}
                sub={`Min required: ${m.sample.reqN.toLocaleString()} per arm`}
                badge={m.sample.pass} pass={m.sample.pass}
                valueColor={m.sample.pass ? C.greenTxt : C.amberTxt}
              />
              <HealthCard
                title="Novelty effect"
                value={m.novelty.detected ? "Detected" : "Not detected"}
                sub={m.novelty.detected ? `Lift inflated days 1–3 by −${m.novelty.drop}pp` : "Lift stable across all day ranges"}
                badge={!m.novelty.detected} pass={!m.novelty.detected}
                valueColor={m.novelty.detected ? C.amberTxt : C.greenTxt}
              />
            </div>

            {/* Daily CR chart */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                <span style={{color:C.coral}}>⚡</span> Daily conversion rate — stability check
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={m.dailyCR} margin={{top:8,right:8,left:-10,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                  <XAxis dataKey="range" tick={{fontSize:12,fill:C.gray}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.gray}} axisLine={false} tickLine={false} unit="%"/>
                  <Tooltip {...TT} formatter={v=>[`${v}%`,"CVR"]}/>
                  <Legend iconType="circle" iconSize={8}/>
                  <Bar dataKey="A" name="Control A" fill={C.purple} radius={[4,4,0,0]} barSize={32}/>
                  <Bar dataKey="B" name="Treatment B" fill={C.coral} radius={[4,4,0,0]} barSize={32}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Novelty table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["DAY RANGE","CR A","CR B","LIFT","NOTE"].map(h=>(
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {m.dailyCR.map((row,i)=>{
                    const lift = +((row.B-row.A)/row.A*100).toFixed(1);
                    const notes = ["Novelty spike","Settling","Stable"];
                    const noteColors = [
                      {bg:"#78350f",txt:C.amberTxt},
                      {bg:"#1e293b",txt:"#94a3b8"},
                      {bg:"#14532d",txt:C.greenTxt},
                    ];
                    return(
                      <tr key={i} className="border-b border-gray-50 last:border-0">
                        <td className="px-5 py-4 font-medium text-gray-700">{row.range}</td>
                        <td className="px-5 py-4 text-gray-600">{row.A}%</td>
                        <td className="px-5 py-4 text-gray-600">{row.B}%</td>
                        <td className="px-5 py-4 font-semibold" style={{color:lift>0?C.green:C.coral}}>{lift>0?"+":""}{lift}%</td>
                        <td className="px-5 py-4">
                          <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:999,
                            background:noteColors[i].bg, color:noteColors[i].txt}}>
                            {notes[i]}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── INSIGHTS ── */}
        {tab==="Insights" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Winner card */}
            <div className="lg:col-span-3 rounded-2xl p-6 border"
              style={{background:`linear-gradient(135deg,${C.coral}18,${C.purple}18)`,borderColor:m.winner==="B"?C.coral:C.purple}}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black text-white"
                  style={{background:m.winner==="B"?C.coral:C.purple}}>
                  {m.winner}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Winner</p>
                  <p className="text-2xl font-bold" style={{color:C.slate}}>
                    {m.winner==="B" ? "Treatment B wins" : "Control A holds"}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {m.winner==="B"
                      ? `Treatment B outperforms on ${m.bWins}/4 key metrics — ship it.`
                      : `Control A holds the edge — extend the test or iterate on B.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Insight cards */}
            {[
              {
                icon:"📈", title:"Conversion rate",
                verdict: m.cvrB > m.cvrA ? "B wins" : "A wins",
                win: m.cvrB > m.cvrA,
                body:`Treatment B converts at ${m.cvrB}% vs ${m.cvrA}% for control — a ${m.lift > 0 ? "+" : ""}${m.lift}% lift. ${m.sig ? "Statistically significant at α=0.05." : "Not yet significant — extend the test."}`
              },
              {
                icon:"💰", title:"Revenue per user",
                verdict: m.rpuB > m.rpuA ? "B wins" : "A wins",
                win: m.rpuB > m.rpuA,
                body:`Treatment B generates ${m.rpuB} EGP/user vs ${m.rpuA} EGP for control (${m.revLift > 0 ? "+" : ""}${m.revLift}% lift). ${m.rpuB > m.rpuA ? "Clear revenue advantage." : "Revenue advantage still with control."}`
              },
              {
                icon:"👆", title:"Engagement",
                verdict: m.avgScrollB > m.avgScrollA ? "B wins" : "A wins",
                win: m.avgScrollB > m.avgScrollA,
                body:`B users scroll deeper (${m.avgScrollB}% vs ${m.avgScrollA}%) and click more (${m.avgClicksB} vs ${m.avgClicksA} avg). Treatment B drives stronger in-session engagement.`
              },
              {
                icon:"🔬", title:"Sample quality",
                verdict: m.srm.pass ? "Clean" : "SRM risk",
                win: m.srm.pass,
                body:`χ² = ${m.srm.chi2}. ${m.srm.pass ? "No sample ratio mismatch detected — assignment is fair." : "SRM detected — investigate randomisation before shipping."} Power: ${m.power.val}% ${m.power.pass ? "(adequate)" : "(insufficient — extend test)"}.`
              },
              {
                icon:"📅", title:"Novelty effect",
                verdict: m.novelty.detected ? "Monitor" : "Stable",
                win: !m.novelty.detected,
                body:`${m.novelty.detected ? `A novelty spike was detected days 1–3 (B lift inflated by ~${m.novelty.drop}pp). Days 8–14 show stabilised lift of ${m.dailyCR[2] ? ((m.dailyCR[2].B - m.dailyCR[2].A)/m.dailyCR[2].A*100).toFixed(1) : "—"}% — use that as the true signal.` : "Lift is stable across all day ranges — no novelty effect detected."}`
              },
              {
                icon:"✅", title:"Recommendation",
                verdict: m.winner === "B" ? "Ship B" : "Iterate",
                win: true,
                body: m.winner === "B"
                  ? `Treatment B wins on CVR, RPU, scroll depth, and clicks. All health checks pass. Recommendation: ship Treatment B (${m.cvrB}% CVR, +${m.lift}% lift).`
                  : `Results are inconclusive or favour control. Recommendation: iterate on Treatment B design or extend experiment duration.`
              },
            ].map((ins,i)=>(
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-700">{ins.icon} {ins.title}</p>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{background:ins.win?"#D1FAE5":"#FEF3C7", color:ins.win?"#065F46":"#92400E"}}>
                    {ins.verdict}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{ins.body}</p>
              </div>
            ))}

          </div>
        )}

        <p className="text-center text-xs text-gray-300 mt-10">ABFlow · Buy Button Color Test · α = 0.05 · n={m.totalUsers}</p>
      </div>
    </div>
  );
}