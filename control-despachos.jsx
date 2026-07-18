import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import {
  LayoutGrid, ClipboardList, PackagePlus, Search, Calendar,
  Truck, RotateCcw, AlertTriangle, ArrowLeftRight, Boxes, Filter, X, Check
} from "lucide-react";

// ---------------------------------------------------------------------------
// Datos base (extraídos de la hoja "Det.Despacho(APLIC)")
// ---------------------------------------------------------------------------
const SEED_DATA = [{"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000400016", "material": "CAJA CT PLANCHA M.EXT 400 X 600 X 95 CMS COOP NEGRA 5 KG", "obs": "", "cantidad": 0}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000400022", "material": "CAJA CT PLANCHA M.EXT 398 X 595 X 100 CMS COOP NEGRA 5 KG", "obs": "Alternativo", "cantidad": 2200}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000800001", "material": "PUNNET RPET H85 18.4 X 11.7 CMS", "obs": "", "cantidad": 22000}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000700001", "material": "BOLSA CAMISA MACROPERFORADA 105 X 65 CMS 0.3% HDPE TRANSP UVA", "obs": "", "cantidad": 2200}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990001400009", "material": "ETIQUETA METAL LOGO TALSA 25 mm x 38 mm", "obs": "", "cantidad": 8800}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990001100001", "material": "GENERADOR PROTEKU PLASTICO CE 35 X 46 CM 7 GRS SO2", "obs": "", "cantidad": 2200}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990001200001", "material": "ABSORPAD MONOLAMINAR 50 GRS. 47 X 36 CMS.", "obs": "", "cantidad": 2200}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000300002", "material": "PARIHUELA MD 4W (7+2)/5 TACOS 120 X 100 X 14.1 CMS UVA", "obs": "", "cantidad": 20}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000200001", "material": "TAPA PALLET CT 120 X 100 CMS KRAFT", "obs": "", "cantidad": 20}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000100001", "material": "TERMOGRAFO ULTRA FIT", "obs": "", "cantidad": 2}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "SPROUTS", "codigo": "990000400003", "material": "CAJA CT PLANCHA M.EXT 40.6 X 60.8 X 133 CMS TALSA 3LB", "obs": "", "cantidad": 1700}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "SPROUTS", "codigo": "990001000004", "material": "CLAMSHELL RPET 2LB X 10 H126 19X11X12.5 CMS GENERICO", "obs": "", "cantidad": 17000}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "SPROUTS", "codigo": "990001400034", "material": "ETIQUETA AUTUMN CRISP TALSA 2LB", "obs": "", "cantidad": 17000}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "SPROUTS", "codigo": "990000300001", "material": "PARIHUELA MD 4W (7+2)/5 TACOS 122 X 102 X 14.4 CMS ", "obs": "", "cantidad": 20}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "SPROUTS", "codigo": "990000200002", "material": "TAPA PALLET CT 122 X 102 CMS KRAFT", "obs": "", "cantidad": 20}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "SPROUTS", "codigo": "990000700001", "material": "BOLSA CAMISA MACROPERFORADA 105 X 65 CMS 0.3% HDPE TRANSP UVA", "obs": "", "cantidad": 1700}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "SPROUTS", "codigo": "990001400009", "material": "ETIQUETA METAL LOGO TALSA 25 mm x 38 mm", "obs": "", "cantidad": 3400}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "SPROUTS", "codigo": "990001100001", "material": "GENERADOR PROTEKU PLASTICO CE 35 X 46 CM 7 GRS SO2", "obs": "", "cantidad": 1700}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "SPROUTS", "codigo": "990001200001", "material": "ABSORPAD MONOLAMINAR 50 GRS. 47 X 36 CMS.", "obs": "", "cantidad": 1700}, {"fecha": "2026-06-01", "tipoConsumo": "DESPACHO", "programa": "SPROUTS", "codigo": "990000100001", "material": "TERMOGRAFO ULTRA FIT", "obs": "", "cantidad": 2}, {"fecha": "2026-06-02", "tipoConsumo": "DESPACHO", "programa": "TUNG SHING", "codigo": "990000400012", "material": "CAJA CT PLANCHA M.EXT 40.6 X 30.5 X 124 CMS TALSA 4.5 KG PREMIUM", "obs": "", "cantidad": 550}, {"fecha": "2026-06-02", "tipoConsumo": "DESPACHO", "programa": "TUNG SHING", "codigo": "990000600003", "material": "BOLSA RACIMO POUCH TALSA AUTUMN CRISP", "obs": "", "cantidad": 2750}, {"fecha": "2026-06-02", "tipoConsumo": "DESPACHO", "programa": "TUNG SHING", "codigo": "990000300005", "material": "PARIHUELA YUGO AEREA 120 X 100", "obs": "", "cantidad": 20}, {"fecha": "2026-06-02", "tipoConsumo": "DESPACHO", "programa": "TUNG SHING", "codigo": "990000200001", "material": "TAPA PALLET CT 120 X 100 CMS KRAFT", "obs": "", "cantidad": 20}, {"fecha": "2026-06-02", "tipoConsumo": "DESPACHO", "programa": "TUNG SHING", "codigo": "990000700002", "material": "BOLSA CAMISA MACROPERFORADA 75 X 55 CMS 0.3% HDPE TRANSP UVA", "obs": "", "cantidad": 550}, {"fecha": "2026-06-02", "tipoConsumo": "DESPACHO", "programa": "TUNG SHING", "codigo": "990001400021", "material": "ETIQUETA CALIDAD PREMIUM", "obs": "", "cantidad": 550}, {"fecha": "2026-06-02", "tipoConsumo": "DESPACHO", "programa": "TUNG SHING", "codigo": "990001400009", "material": "ETIQUETA METAL LOGO TALSA 25 mm x 38 mm", "obs": "", "cantidad": 1100}, {"fecha": "2026-06-02", "tipoConsumo": "DESPACHO", "programa": "TUNG SHING", "codigo": "990001100002", "material": "GENERADOR PROTEKU PLASTICO CE 23 X 33 CM 5 GRS SO2", "obs": "", "cantidad": 275}, {"fecha": "2026-06-02", "tipoConsumo": "DESPACHO", "programa": "TUNG SHING", "codigo": "990001200002", "material": "ABSORPAD MONOLAMINAR 50 GRS. 36 X 27 CMS.", "obs": "", "cantidad": 275}, {"fecha": "2026-06-02", "tipoConsumo": "DESPACHO", "programa": "TUNG SHING", "codigo": "990001500002", "material": "FAJILLON DE CAJA TALSA 4.5 KG", "obs": "", "cantidad": 550}, {"fecha": "2026-06-02", "tipoConsumo": "DESPACHO", "programa": "TUNG SHING", "codigo": "990000100001", "material": "TERMOGRAFO ULTRA FIT", "obs": "", "cantidad": 2}, {"fecha": "2026-06-04", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000400016", "material": "CAJA CT PLANCHA M.EXT 400 X 600 X 95 CMS COOP NEGRA 5 KG", "obs": "", "cantidad": 0}, {"fecha": "2026-06-04", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000400022", "material": "CAJA CT PLANCHA M.EXT 398 X 595 X 100 CMS COOP NEGRA 5 KG", "obs": "Alternativo", "cantidad": 2200}, {"fecha": "2026-06-04", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000800001", "material": "PUNNET RPET H85 18.4 X 11.7 CMS", "obs": "", "cantidad": 22000}, {"fecha": "2026-06-04", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000700001", "material": "BOLSA CAMISA MACROPERFORADA 105 X 65 CMS 0.3% HDPE TRANSP UVA", "obs": "", "cantidad": 2200}, {"fecha": "2026-06-04", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990001400009", "material": "ETIQUETA METAL LOGO TALSA 25 mm x 38 mm", "obs": "", "cantidad": 8800}, {"fecha": "2026-06-04", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990001100001", "material": "GENERADOR PROTEKU PLASTICO CE 35 X 46 CM 7 GRS SO2", "obs": "", "cantidad": 2200}, {"fecha": "2026-06-04", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990001200001", "material": "ABSORPAD MONOLAMINAR 50 GRS. 47 X 36 CMS.", "obs": "", "cantidad": 2200}, {"fecha": "2026-06-04", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000300002", "material": "PARIHUELA MD 4W (7+2)/5 TACOS 120 X 100 X 14.1 CMS UVA", "obs": "", "cantidad": 20}, {"fecha": "2026-06-04", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000200001", "material": "TAPA PALLET CT 120 X 100 CMS KRAFT", "obs": "", "cantidad": 20}, {"fecha": "2026-06-04", "tipoConsumo": "DESPACHO", "programa": "COOP NORWAY", "codigo": "990000100001", "material": "TERMOGRAFO ULTRA FIT", "obs": "", "cantidad": 2}, {"fecha": "2026-06-05", "tipoConsumo": "SALIDA ENTRE ALMACENES", "programa": "COOP NORWAY", "codigo": "990000700001", "material": "BOLSA CAMISA MACROPERFORADA 105 X 65 CMS 0.3% HDPE TRANSP UVA", "obs": "", "cantidad": 10000}, {"fecha": "2026-06-06", "tipoConsumo": "POR MERMA", "programa": "COOP NORWAY", "codigo": "990001400009", "material": "ETIQUETA METAL LOGO TALSA 25 mm x 38 mm", "obs": "", "cantidad": 500}, {"fecha": "2026-06-07", "tipoConsumo": "DEVOLUCIÓN", "programa": "COOP NORWAY", "codigo": "990001200001", "material": "ABSORPAD MONOLAMINAR 50 GRS. 47 X 36 CMS.", "obs": "", "cantidad": 1000}].map((d, i) => ({ ...d, id: `seed-${i}` }));

const PROGRAMAS = ["COOP NORWAY", "SPROUTS", "TUNG SHING"];
const TIPOS = ["DESPACHO", "SALIDA ENTRE ALMACENES", "POR MERMA", "DEVOLUCIÓN"];

const TIPO_META = {
  "DESPACHO": { color: "#C4622D", icon: Truck },
  "SALIDA ENTRE ALMACENES": { color: "#3A6B63", icon: ArrowLeftRight },
  "POR MERMA": { color: "#B0492E", icon: AlertTriangle },
  "DEVOLUCIÓN": { color: "#8A8567", icon: RotateCcw },
};

const PROG_COLORS = { "COOP NORWAY": "#C4622D", "SPROUTS": "#3A6B63", "TUNG SHING": "#8A8567" };

const STORAGE_KEY = "despachos:registros-extra";

function fmtFecha(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  const meses = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
  return `${d} ${meses[parseInt(m,10)-1]} ${y}`;
}

function fmtNum(n) {
  return new Intl.NumberFormat("es-PE").format(n);
}

// ---------------------------------------------------------------------------
export default function App() {
  const [view, setView] = useState("dashboard");
  const [extraRecords, setExtraRecords] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // filtros
  const [fPrograma, setFPrograma] = useState("TODOS");
  const [fTipo, setFTipo] = useState("TODOS");
  const [fSearch, setFSearch] = useState("");

  const [toast, setToast] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) {
          setExtraRecords(JSON.parse(res.value));
        }
      } catch (e) {
        // no hay registros guardados todavía
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const allData = useMemo(() => [...SEED_DATA, ...extraRecords], [extraRecords]);

  async function persist(records) {
    setExtraRecords(records);
    try {
      const result = await window.storage.set(STORAGE_KEY, JSON.stringify(records), false);
      if (!result) setSaveError(true);
    } catch (e) {
      setSaveError(true);
    }
  }

  function addRecord(record) {
    const next = [...extraRecords, { ...record, id: `r-${Date.now()}` }];
    persist(next);
    setToast("Registro agregado al detalle de despacho");
    setTimeout(() => setToast(""), 2600);
  }

  const filtered = useMemo(() => {
    return allData.filter((r) => {
      if (fPrograma !== "TODOS" && r.programa !== fPrograma) return false;
      if (fTipo !== "TODOS" && r.tipoConsumo !== fTipo) return false;
      if (fSearch.trim()) {
        const q = fSearch.trim().toLowerCase();
        if (!r.material.toLowerCase().includes(q) && !r.codigo.includes(q)) return false;
      }
      return true;
    });
  }, [allData, fPrograma, fTipo, fSearch]);

  // KPIs
  const kpis = useMemo(() => {
    const totalCantidad = allData.reduce((a, r) => a + (Number(r.cantidad) || 0), 0);
    const despachos = allData.filter((r) => r.tipoConsumo === "DESPACHO").length;
    const mermas = allData.filter((r) => r.tipoConsumo === "POR MERMA")
      .reduce((a, r) => a + (Number(r.cantidad) || 0), 0);
    const programasActivos = new Set(allData.map((r) => r.programa)).size;
    return { totalCantidad, despachos, mermas, programasActivos, totalRegistros: allData.length };
  }, [allData]);

  const chartPrograma = useMemo(() => {
    return PROGRAMAS.map((p) => ({
      programa: p,
      cantidad: allData.filter((r) => r.programa === p).reduce((a, r) => a + (Number(r.cantidad) || 0), 0),
    }));
  }, [allData]);

  const chartTipo = useMemo(() => {
    return TIPOS.map((t) => ({
      name: t,
      value: allData.filter((r) => r.tipoConsumo === t).reduce((a, r) => a + (Number(r.cantidad) || 0), 0),
    })).filter((d) => d.value > 0);
  }, [allData]);

  const topMateriales = useMemo(() => {
    const map = {};
    allData.forEach((r) => {
      map[r.material] = (map[r.material] || 0) + (Number(r.cantidad) || 0);
    });
    return Object.entries(map)
      .map(([material, cantidad]) => ({ material, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 6);
  }, [allData]);

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #C4622D33; }
        .nav-item:hover { background: #2A3A36 !important; }
        .row-hover:hover { background: #F4F1E8 !important; }
        input:focus, select:focus, textarea:focus { outline: 2px solid #C4622D; outline-offset: 1px; }
      `}</style>

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <div style={styles.brandMark}>TS</div>
          <div>
            <div style={styles.brandTitle}>CONTROL DE</div>
            <div style={styles.brandTitleAccent}>DESPACHOS</div>
          </div>
        </div>

        <nav style={{ marginTop: 36 }}>
          <NavItem icon={LayoutGrid} label="Panel" active={view === "dashboard"} onClick={() => setView("dashboard")} />
          <NavItem icon={ClipboardList} label="Detalle de despacho" active={view === "detalle"} onClick={() => setView("detalle")} />
          <NavItem icon={PackagePlus} label="Nuevo registro" active={view === "nuevo"} onClick={() => setView("nuevo")} />
        </nav>

        <div style={styles.sidebarFoot}>
          <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "#8FA39C" }}>HOJA DE ORIGEN</div>
          <div style={{ fontSize: 12, color: "#D8D2C2", marginTop: 4, lineHeight: 1.4 }}>
            Det.Despacho(APLIC)<br/>Catálogos de Artes y Materiales
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {view === "dashboard" && (
          <Dashboard kpis={kpis} chartPrograma={chartPrograma} chartTipo={chartTipo} topMateriales={topMateriales} />
        )}
        {view === "detalle" && (
          <Detalle
            filtered={filtered}
            fPrograma={fPrograma} setFPrograma={setFPrograma}
            fTipo={fTipo} setFTipo={setFTipo}
            fSearch={fSearch} setFSearch={setFSearch}
          />
        )}
        {view === "nuevo" && <NuevoRegistro onAdd={addRecord} />}
      </main>

      {toast && (
        <div style={styles.toast}>
          <Check size={16} color="#F4F1E8" />
          {toast}
        </div>
      )}
      {saveError && (
        <div style={{ ...styles.toast, background: "#8A3B2E" }}>
          <X size={16} color="#F4F1E8" />
          No se pudo guardar el registro. Se mantiene solo en esta sesión.
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <div
      className="nav-item"
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 20px", cursor: "pointer",
        borderLeft: active ? "3px solid #C4622D" : "3px solid transparent",
        background: active ? "#2A3A36" : "transparent",
        color: active ? "#F4F1E8" : "#B7C4BE",
        transition: "background 0.15s",
      }}
    >
      <Icon size={18} strokeWidth={2} />
      <span style={{ fontSize: 13.5, fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500, letterSpacing: "0.02em" }}>
        {label}
      </span>
    </div>
  );
}

function Ticket({ icon: Icon, label, value, color, sub }) {
  return (
    <div style={styles.ticket}>
      <div style={styles.ticketNotchTop} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={styles.ticketLabel}>{label}</div>
          <div style={styles.ticketValue}>{value}</div>
          {sub && <div style={styles.ticketSub}>{sub}</div>}
        </div>
        <div style={{ ...styles.ticketIcon, background: `${color}1A`, color }}>
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>
      <div style={styles.ticketNotchBottom} />
    </div>
  );
}

function Dashboard({ kpis, chartPrograma, chartTipo, topMateriales }) {
  return (
    <div>
      <PageHeader
        eyebrow="RESUMEN GENERAL"
        title="Panel de control"
        subtitle="Consumo de materiales de empaque por programa de exportación"
      />

      <div style={styles.kpiGrid}>
        <Ticket icon={Boxes} label="Unidades movidas" value={fmtNum(kpis.totalCantidad)} color="#C4622D" sub="Todos los tipos de consumo" />
        <Ticket icon={Truck} label="Despachos registrados" value={kpis.despachos} color="#3A6B63" sub="Tipo: DESPACHO" />
        <Ticket icon={AlertTriangle} label="Unidades por merma" value={fmtNum(kpis.mermas)} color="#B0492E" sub="Pérdida operativa" />
        <Ticket icon={Filter} label="Programas activos" value={kpis.programasActivos} color="#8A8567" sub={`${kpis.totalRegistros} registros en total`} />
      </div>

      <div style={styles.chartsRow}>
        <div style={styles.panel}>
          <div style={styles.panelTitle}>CANTIDAD DESPACHADA POR PROGRAMA</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartPrograma} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4DFD0" vertical={false} />
              <XAxis dataKey="programa" tick={{ fontSize: 11, fill: "#5B564A", fontFamily: "IBM Plex Sans" }} axisLine={{ stroke: "#D8D2C2" }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5B564A", fontFamily: "IBM Plex Sans" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontFamily: "IBM Plex Sans", fontSize: 12, border: "1px solid #D8D2C2", borderRadius: 4 }}
                formatter={(v) => fmtNum(v)}
              />
              <Bar dataKey="cantidad" radius={[3, 3, 0, 0]}>
                {chartPrograma.map((entry, i) => (
                  <Cell key={i} fill={PROG_COLORS[entry.programa]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.panel}>
          <div style={styles.panelTitle}>DISTRIBUCIÓN POR TIPO DE CONSUMO</div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={chartTipo} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {chartTipo.map((entry, i) => (
                  <Cell key={i} fill={TIPO_META[entry.name]?.color || "#8A8567"} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => fmtNum(v)} contentStyle={{ fontFamily: "IBM Plex Sans", fontSize: 12, border: "1px solid #D8D2C2", borderRadius: 4 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={styles.legendWrap}>
            {chartTipo.map((t) => (
              <div key={t.name} style={styles.legendItem}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: TIPO_META[t.name]?.color, display: "inline-block" }} />
                {t.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.panel}>
        <div style={styles.panelTitle}>MATERIALES CON MAYOR MOVIMIENTO</div>
        <div style={{ marginTop: 12 }}>
          {topMateriales.map((m, i) => {
            const max = topMateriales[0].cantidad || 1;
            return (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontFamily: "IBM Plex Sans", color: "#3A362C", marginBottom: 4 }}>
                  <span style={{ maxWidth: "78%" }}>{m.material}</span>
                  <span style={{ fontFamily: "IBM Plex Mono", color: "#8A8567" }}>{fmtNum(m.cantidad)}</span>
                </div>
                <div style={{ height: 6, background: "#EDE8DA", borderRadius: 3 }}>
                  <div style={{ height: 6, width: `${(m.cantidad / max) * 100}%`, background: "#C4622D", borderRadius: 3 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Detalle({ filtered, fPrograma, setFPrograma, fTipo, setFTipo, fSearch, setFSearch }) {
  return (
    <div>
      <PageHeader
        eyebrow="REGISTRO"
        title="Detalle de despacho"
        subtitle="Bitácora completa de movimientos de materiales de empaque"
      />

      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <Search size={15} color="#8A8567" />
          <input
            placeholder="Buscar por material o código..."
            value={fSearch}
            onChange={(e) => setFSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <select value={fPrograma} onChange={(e) => setFPrograma(e.target.value)} style={styles.select}>
          <option value="TODOS">Todos los programas</option>
          {PROGRAMAS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={fTipo} onChange={(e) => setFTipo(e.target.value)} style={styles.select}>
          <option value="TODOS">Todos los tipos</option>
          {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div style={styles.panel}>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>FECHA</th>
                <th style={styles.th}>TIPO</th>
                <th style={styles.th}>PROGRAMA</th>
                <th style={styles.th}>CÓDIGO</th>
                <th style={styles.th}>MATERIAL</th>
                <th style={styles.th}>OBS.</th>
                <th style={{ ...styles.th, textAlign: "right" }}>CANTIDAD</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ ...styles.td, textAlign: "center", color: "#8A8567", padding: "28px 0" }}>
                  Sin resultados para estos filtros.
                </td></tr>
              )}
              {filtered.map((r) => {
                const meta = TIPO_META[r.tipoConsumo] || {};
                const Icon = meta.icon || Truck;
                return (
                  <tr key={r.id} className="row-hover">
                    <td style={styles.td}>{fmtFecha(r.fecha)}</td>
                    <td style={styles.td}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color: meta.color, fontWeight: 600 }}>
                        <Icon size={13} /> {r.tipoConsumo}
                      </span>
                    </td>
                    <td style={styles.td}>{r.programa}</td>
                    <td style={{ ...styles.td, fontFamily: "IBM Plex Mono", fontSize: 12 }}>{r.codigo}</td>
                    <td style={{ ...styles.td, maxWidth: 320 }}>{r.material}</td>
                    <td style={styles.td}>{r.obs || "—"}</td>
                    <td style={{ ...styles.td, textAlign: "right", fontFamily: "IBM Plex Mono" }}>{fmtNum(r.cantidad)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={styles.tableFoot}>{filtered.length} registro(s)</div>
      </div>
    </div>
  );
}

function NuevoRegistro({ onAdd }) {
  const [form, setForm] = useState({
    fecha: new Date().toISOString().slice(0, 10),
    tipoConsumo: "DESPACHO",
    programa: "COOP NORWAY",
    codigo: "",
    material: "",
    obs: "",
    cantidad: "",
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.codigo.trim() || !form.material.trim() || form.cantidad === "") {
      setError("Completa código, material y cantidad.");
      return;
    }
    onAdd({ ...form, cantidad: Number(form.cantidad) || 0 });
    setForm((f) => ({ ...f, codigo: "", material: "", obs: "", cantidad: "" }));
    setError("");
  }

  return (
    <div>
      <PageHeader
        eyebrow="CAPTURA"
        title="Nuevo registro"
        subtitle="Agrega un movimiento a la bitácora de despacho"
      />

      <form onSubmit={submit} style={{ ...styles.panel, maxWidth: 640 }}>
        <div style={styles.formGrid}>
          <Field label="Fecha">
            <input type="date" value={form.fecha} onChange={(e) => update("fecha", e.target.value)} style={styles.input} />
          </Field>
          <Field label="Tipo de consumo">
            <select value={form.tipoConsumo} onChange={(e) => update("tipoConsumo", e.target.value)} style={styles.input}>
              {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Programa">
            <select value={form.programa} onChange={(e) => update("programa", e.target.value)} style={styles.input}>
              {PROGRAMAS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Código">
            <input value={form.codigo} onChange={(e) => update("codigo", e.target.value)} placeholder="990000400016" style={{ ...styles.input, fontFamily: "IBM Plex Mono" }} />
          </Field>
          <Field label="Material" full>
            <input value={form.material} onChange={(e) => update("material", e.target.value)} placeholder="Descripción del material" style={styles.input} />
          </Field>
          <Field label="Observación">
            <input value={form.obs} onChange={(e) => update("obs", e.target.value)} placeholder="Opcional" style={styles.input} />
          </Field>
          <Field label="Cantidad">
            <input type="number" value={form.cantidad} onChange={(e) => update("cantidad", e.target.value)} placeholder="0" style={styles.input} />
          </Field>
        </div>

        {error && <div style={{ color: "#B0492E", fontSize: 12.5, marginTop: 12, fontFamily: "IBM Plex Sans" }}>{error}</div>}

        <button type="submit" style={styles.submitBtn}>
          <PackagePlus size={16} /> Guardar registro
        </button>
      </form>
    </div>
  );
}

function Field({ label, children, full }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <label style={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={styles.eyebrow}>{eyebrow}</div>
      <h1 style={styles.pageTitle}>{title}</h1>
      <div style={styles.pageSubtitle}>{subtitle}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#EFEBDD",
    fontFamily: "'IBM Plex Sans', sans-serif",
    color: "#2B281F",
  },
  sidebar: {
    width: 240,
    background: "#20302B",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    paddingTop: 28,
  },
  brand: { display: "flex", alignItems: "center", gap: 12, padding: "0 20px" },
  brandMark: {
    width: 38, height: 38, borderRadius: 6, background: "#C4622D",
    color: "#20302B", display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 15,
  },
  brandTitle: { fontFamily: "'Oswald', sans-serif", fontSize: 12.5, color: "#B7C4BE", letterSpacing: "0.08em" },
  brandTitleAccent: { fontFamily: "'Oswald', sans-serif", fontSize: 15, color: "#F4F1E8", letterSpacing: "0.06em", fontWeight: 600 },
  sidebarFoot: { marginTop: "auto", padding: "20px", borderTop: "1px solid #33453F" },

  main: { flex: 1, padding: "36px 44px", maxWidth: 1180 },

  eyebrow: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.12em", color: "#C4622D", fontWeight: 500 },
  pageTitle: { fontFamily: "'Oswald', sans-serif", fontSize: 30, fontWeight: 600, margin: "4px 0 6px", color: "#20302B" },
  pageSubtitle: { fontSize: 13.5, color: "#6B6656" },

  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 },
  ticket: {
    position: "relative", background: "#FBF9F2", border: "1px solid #E0DAC7",
    borderRadius: 8, padding: "18px 18px 16px",
  },
  ticketNotchTop: {
    position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
    width: 14, height: 8, background: "#EFEBDD", borderRadius: "0 0 8px 8px",
  },
  ticketNotchBottom: {
    position: "absolute", bottom: -1, left: "50%", transform: "translateX(-50%)",
    width: 14, height: 8, background: "#EFEBDD", borderRadius: "8px 8px 0 0",
  },
  ticketLabel: { fontSize: 11.5, color: "#8A8567", letterSpacing: "0.03em", marginBottom: 6 },
  ticketValue: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 24, fontWeight: 500, color: "#20302B" },
  ticketSub: { fontSize: 11, color: "#A39F8E", marginTop: 4 },
  ticketIcon: { width: 38, height: 38, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" },

  chartsRow: { display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16, marginBottom: 20 },
  panel: { background: "#FBF9F2", border: "1px solid #E0DAC7", borderRadius: 8, padding: 20 },
  panelTitle: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "#6B6656", marginBottom: 8 },

  legendWrap: { display: "flex", flexWrap: "wrap", gap: 14, marginTop: 8, justifyContent: "center" },
  legendItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#5B564A" },

  filterBar: { display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" },
  searchBox: {
    display: "flex", alignItems: "center", gap: 8, background: "#FBF9F2",
    border: "1px solid #E0DAC7", borderRadius: 6, padding: "9px 14px", flex: 1, minWidth: 220,
  },
  searchInput: { border: "none", background: "transparent", fontSize: 13, flex: 1, fontFamily: "'IBM Plex Sans', sans-serif", color: "#2B281F" },
  select: {
    border: "1px solid #E0DAC7", background: "#FBF9F2", borderRadius: 6,
    padding: "9px 12px", fontSize: 13, color: "#2B281F", fontFamily: "'IBM Plex Sans', sans-serif",
  },

  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    textAlign: "left", fontSize: 10.5, letterSpacing: "0.06em", color: "#8A8567",
    borderBottom: "1px solid #E0DAC7", padding: "0 10px 10px", fontFamily: "'IBM Plex Mono', monospace",
  },
  td: { padding: "11px 10px", borderBottom: "1px solid #EFEBDD", fontSize: 12.8, color: "#3A362C", verticalAlign: "top" },
  tableFoot: { marginTop: 10, fontSize: 11.5, color: "#A39F8E" },

  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  fieldLabel: { display: "block", fontSize: 11.5, color: "#6B6656", marginBottom: 6, letterSpacing: "0.02em" },
  input: {
    width: "100%", border: "1px solid #E0DAC7", borderRadius: 6, padding: "9px 12px",
    fontSize: 13, background: "#F4F1E8", color: "#2B281F", fontFamily: "'IBM Plex Sans', sans-serif",
  },
  submitBtn: {
    marginTop: 20, background: "#C4622D", color: "#FBF9F2", border: "none",
    borderRadius: 6, padding: "11px 22px", fontSize: 13.5, fontWeight: 600,
    display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
    fontFamily: "'IBM Plex Sans', sans-serif",
  },

  toast: {
    position: "fixed", bottom: 24, right: 24, background: "#20302B",
    color: "#F4F1E8", padding: "12px 18px", borderRadius: 8, fontSize: 13,
    display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  },
};
