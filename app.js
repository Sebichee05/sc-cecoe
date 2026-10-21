/* =========================================================================
   App Cecoe — Generador de mensajes WhatsApp
   Central de Enlace y Comunicaciones Chuquicamata
   Sin base de datos: toda la lógica vive en este archivo.
   Para agregar operadores, módulos o campos, edita CONFIG.
   ========================================================================= */

const CONFIG = {
  central: "Cecoe Chuquicamata",
  operadores: [
    "Reimundo Ortiz",
    "Rubén Galindo",
    "Francis León",
    "Sebastián Galleguillos Rivera",
  ],
  turnos: ["A", "B", "C", "D"],
  horarios: ["08:00 a 20:00 hrs.", "20:00 a 08:00 hrs."],
  telefonoEmergencias: "327327",

  // Lista de empresas (orden alfabético). Se puede escribir una que no esté.
  empresas: [
    "AGREDUCAM",
    "AGRETRANS EL LOA",
    "ALBIA S.A",
    "ALGORITMOS SPA",
    "ALMAR WATER SERVICES LATAM",
    "ALPHA",
    "ARAMARK",
    "ARAMARK INDUSTRIAL",
    "ARAMARK SERVICIOS MINEROS Y REMOTOS",
    "ATLAS COPCO CHILE SPA",
    "AUTOCLEAN",
    "BESALCO MINERIA S.A",
    "CACCIUTTOLO",
    "CAINSA",
    "CBS INDUSTRIAL",
    "CERRO NEVADO",
    "CESMEC S.A.",
    "CHIER Spa",
    "CIMAP LTDA",
    "COMPAÑÍA DE TRANSPORTE VENTROSA",
    "COMTECSA",
    "CONFIPETROL CHILE SPA",
    "CONSORCIO MOREAU SPA",
    "CONSORCIO RAB INFINITE SPA",
    "CONSORCIO SCHWAGGER INCIMMET",
    "CONSTRUCTORA GARDILCIC LTD",
    "CONTAC INGENIEROS",
    "CSI",
    "CYD INGENIERIA LTDA",
    "CYG SERVICIOS INDUSTRIALES",
    "DERK INGENIERIA Y GEOLOGIA",
    "DISTRIBUIDORA CUMMINS CHILE",
    "ECOLOA SPA",
    "ENAEX SERVICIOS S.A.",
    "ENGIE STREAM",
    "ENKELD",
    "EPIROC SAC",
    "EQUANS INDUSTRIAL SPA",
    "EXPLORACIONES MINERAS ADINAS (EMSA)",
    "FCA TRANSPORTE",
    "FERROCARRIL ANTOFAGASTA-BOLIVIA (FCAB)",
    "FINNING CHILE",
    "FLOW HYDRO CONSULTING GROUP SPA",
    "FOJEDA",
    "FPC INGENIERIA Y CONSTRUCCION SPA",
    "FRACHT GROUP",
    "GALOP LTDA",
    "GEMINIS SPA",
    "GEODATOS",
    "GLOBAL SERVICE",
    "GS3 CONSULTORES",
    "HELLEMA HOLLAND ENGINEERING",
    "HIDROPASCAL INGENIERIA",
    "HIGH SERVICE INGENIERIA & CONSTRUCCION",
    "HRI",
    "HUALPEN",
    "ICL CATODOS",
    "ICV",
    "INGENALSE",
    "INGENIERÍA CIVIL VICENTE S.A.",
    "INSTITUTO NACIONAL DE HIDRAULICA INH",
    "INWASSER SPA",
    "ITT FLUID TECHNOLOGY",
    "JEJ INGENIERIA",
    "JOY GLOBAL",
    "KAIROS MINING",
    "KAL TIRE",
    "KDM INDUSTRIAL",
    "KOMATSU",
    "KONECRANES",
    "KUPFER HERMANOS",
    "LINKES CHILE",
    "LOOP INGENIERIA Y SERVICIOS",
    "MAGNA IV ENGINEERING",
    "MAKEY",
    "METSO CHILE",
    "MINETEC",
    "MISPA",
    "MITTA",
    "MONITORING",
    "MOTOROLA SOLUTIONS",
    "MSMIN",
    "NEW TECH COPPER",
    "NEXXO",
    "PACOLL INGENIERIA",
    "PSINET",
    "PUCARA",
    "R&Q INGENIERIA",
    "REPAIRCO",
    "RFP LOGISTICA",
    "ROBOTIKA",
    "SAIVAM",
    "SALFA MANTENCIONES",
    "SAN JOSE SERVICIOS SUB-CTTO KOMATSU",
    "SANDVIK",
    "SCHWAGER SERVICE",
    "SECHE",
    "SECURITAS CHILE",
    "SERCOING",
    "SERVINA",
    "SERVING CONSULTORES",
    "SGS",
    "SGS MINERAL",
    "SIGDO KOPPERS INGENIERIA Y CONSTRUCCION",
    "SIGMA",
    "SIMPLEX TECNOLOGIA Y SERVICIOS",
    "SK INDUSTRIAL",
    "SKF CHILENA",
    "SMA",
    "SOCIEDAD DE INVERSIONES MITT",
    "SOCOAL",
    "SONDA",
    "SOURCING",
    "STEEL",
    "STN",
    "TECNASIC",
    "TECNOLOGIAS COBRA",
    "TRANSMAC",
    "TRANSMAT",
    "TRANSPORTE CONSORCIO SAN ANTONIO",
    "TRANSPORTE CVU SUB-CTTO ZUBLIN",
    "TRANSPORTE DE Y FE",
    "TRANYMEC",
    "TTM",
    "TUNNING INGENIERIA",
    "UNISOURCE INGENIEROS",
    "VECTOR CHILE",
    "VEOLIA WATER TECHNOLOGIES & SOLUTIONS",
    "VOLCAN NEVADO",
    "WEIR MINERALS CHILE",
    "WORLD SURVEY SERVICES WSS",
    "XTREME MINING",
    "ZUBLIN INTERNACIONAL GMBH",
  ],

  // Módulos de emergencia (todos usan el mismo formato de mensaje)
  emergencias: [
    // resumen: "traslado" -> motivo + botones de etapa | "brigada" -> motivo + despacho de brigada
    { id: "incidente", titulo: "Incidente Operacional", ico: "⚠️", resumen: "traslado" },
    { id: "enfermedad", titulo: "Enfermedad Común", ico: "🩺", resumen: "traslado" },
    { id: "brigada", titulo: "Activación de Brigada", ico: "🚒", resumen: "brigada" },
    { id: "simulacro", titulo: "Simulacro", ico: "🎯", resumen: "brigada" },
    { id: "traslado", titulo: "Traslado por sus medios", ico: "🚑", resumen: "traslado" },
  ],

  // Frase inicial del resumen: "Trabajador llama por <motivo>."
  inicioResumen: "Trabajador llama por",

  // Etapas del traslado. Se pueden marcar varias; las frases se escriben
  // siempre en este orden, después de "Trabajador llama por <motivo>."
  etapasTraslado: [
    { id: "conocimiento", label: "Toma de conocimiento", frase: "" },
    { id: "solicita", label: "Solicita autorización", frase: "Solicita traslado por sus medios." },
    { id: "aprobada", label: "Autorización aprobada", frase: "Servicio médico autoriza traslado por sus medios a Policlínico Chuquicamata." },
    { id: "trasladado", label: "Trabajador trasladado", frase: "Trabajador ya es trasladado por sus medios a Policlínico." },
  ],

  // Frase final para Activación de Brigada y Simulacro
  cierreBrigada: "Se despacha Brigada Divisional al lugar.",

  // Campos del mensaje de emergencia, en el orden en que aparecen
  camposEmergencia: [
    { id: "lugar", label: "Lugar" },
    { id: "empresa", label: "Empresa", lista: "empresas" },
    { id: "gerencia", label: "Gerencia" },
    { id: "activa", label: "Nombre de quien Activa" },
    { id: "cargo", label: "Cargo" },
    { id: "resumen", label: "Resumen", multilinea: true },
  ],
};

const REEMPLAZO = "__reemplazo__";
const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

/* ---------- Utilidades ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const pad = (n) => String(n).padStart(2, "0");
const limpio = (s) => (s || "").trim();
const sinPuntoFinal = (s) => limpio(s).replace(/\.+$/, "");

function guardar(clave, valor) {
  try { localStorage.setItem("cecoe." + clave, JSON.stringify(valor)); } catch (e) {}
}
function leer(clave, porDefecto) {
  try {
    const v = localStorage.getItem("cecoe." + clave);
    return v === null ? porDefecto : JSON.parse(v);
  } catch (e) { return porDefecto; }
}

function hoyISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function horaActual() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function desdeISO(iso) {
  const [a, m, d] = (iso || hoyISO()).split("-").map(Number);
  return new Date(a, m - 1, d);
}
function fechaCorta(iso) {            // 05/08/2026
  const d = desdeISO(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}
function fechaLarga(iso) {            // Sábado 17 de Octubre del 2026
  const d = desdeISO(iso);
  return `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]} del ${d.getFullYear()}`;
}
function esFinDeSemana(iso) {
  const dia = desdeISO(iso).getDay();
  return dia === 0 || dia === 6;
}
function escapeHTML(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
// Muestra *negrita* como en WhatsApp
function formatoWsp(texto) {
  return escapeHTML(texto).replace(/\*([^*\n]+)\*/g, "<b>$1</b>");
}
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 1800);
}

/* ---------- Operador (compartido) ---------- */
function operadorActual() {
  const sel = $("#selOperador").value;
  if (!sel) return { nombre: "(Seleccione operador)", reemplazo: false };
  if (sel === REEMPLAZO) {
    return { nombre: limpio($("#txtReemplazo").value) || "(nombre reemplazo)", reemplazo: true };
  }
  return { nombre: sel, reemplazo: false };
}

function firma(cargo) {
  const op = operadorActual();
  return [
    "*Atte.*",
    `*${op.nombre}*`,
    `*${cargo}${op.reemplazo ? " (R)" : ""}*`,
    `*${CONFIG.central}*`,
  ].join("\n");
}

function initOperador() {
  const sel = $("#selOperador");
  sel.innerHTML =
    `<option value="" disabled hidden>Seleccione operador</option>` +
    CONFIG.operadores.map((n) => `<option value="${escapeHTML(n)}">${escapeHTML(n)}</option>`).join("") +
    `<option value="${REEMPLAZO}">Reemplazo…</option>`;
  const guardado = leer("operador", "");
  if (guardado && [...sel.options].some((o) => o.value === guardado)) sel.value = guardado;
  else sel.selectedIndex = 0;   // muestra "Seleccione operador"
  $("#txtReemplazo").value = leer("reemplazo", "");

  const sync = () => {
    $("#boxReemplazo").hidden = sel.value !== REEMPLAZO;
    guardar("operador", sel.value);
    guardar("reemplazo", $("#txtReemplazo").value);
    actualizar();
  };
  sel.addEventListener("change", sync);
  $("#txtReemplazo").addEventListener("input", sync);
  $("#boxReemplazo").hidden = sel.value !== REEMPLAZO;
}

/* ---------- Estado de la vista ---------- */
let vistaActual = null;   // { generar: () => string, limpiar: () => void }

function actualizar() {
  if (!vistaActual) return;
  $("#preview").innerHTML = formatoWsp(vistaActual.generar());
}

/* ---------- Menú principal ---------- */
function vistaMenu() {
  vistaActual = null;
  $("#tituloVista").textContent = "App Cecoe";
  $("#btnVolver").hidden = true;
  $("#panelSalida").hidden = true;

  const mods = [
    `<button class="modulo destacado" data-ir="inicio"><span class="ico">🕗</span><b>Inicio de Turno</b></button>`,
    ...CONFIG.emergencias.map(
      (m) => `<button class="modulo" data-ir="${m.id}"><span class="ico">${m.ico}</span><b>${m.titulo}</b></button>`
    ),
  ];
  $("#app").innerHTML = `<div class="grid">${mods.join("")}</div>`;
  $("#app").querySelectorAll("[data-ir]").forEach((b) =>
    b.addEventListener("click", () => (location.hash = b.dataset.ir))
  );
}

/* ---------- Módulo de emergencia (genérico) ---------- */
function vistaEmergencia(mod) {
  $("#tituloVista").textContent = mod.titulo;
  const campos = CONFIG.camposEmergencia.map((c) => {
    if (c.id === "resumen" && mod.resumen) return bloqueResumen(mod);
    const ctrl = c.multilinea
      ? `<textarea id="f_${c.id}" placeholder="${c.label}"></textarea>`
      : `<input id="f_${c.id}" type="text" placeholder="${c.lista ? "Buscar o escribir " + c.label.toLowerCase() : c.label}" autocomplete="off"${c.lista ? ` list="dl_${c.lista}"` : ""}>`;
    return `<label for="f_${c.id}">${c.label}</label>${ctrl}`;
  }).join("");

  $("#app").innerHTML = `
    <section class="card">
      ${campos}
    </section>`;

  $("#app").addEventListener("input", actualizar);
  $("#app").querySelectorAll(".chip").forEach((b) =>
    b.addEventListener("click", () => {
      b.classList.toggle("activo");
      actualizar();
    })
  );

  vistaActual = {
    generar() {
      const v = (id) => (id === "resumen" && mod.resumen ? construirResumen(mod) : limpio($("#f_" + id).value));
      const lineas = [
        "*Información de interés*",
        "*Tipo de emergencia*",
        `*${mod.titulo}*`,
        "",
        `*Fecha*: ${fechaCorta(hoyISO())}`,
      ];
      CONFIG.camposEmergencia.forEach((c) => lineas.push("", `*${c.label}*: ${v(c.id)}`));
      lineas.push("", firma("Operador de turno"));
      return lineas.join("\n");
    },
    limpiar() {
      $("#app").querySelectorAll("input:not([type=date]), textarea").forEach((i) => (i.value = ""));
      $("#app").querySelectorAll(".chip").forEach((x, i) => x.classList.toggle("activo", i === 0));
    },
  };
}

/* ---------- Resumen asistido ---------- */
function bloqueResumen(mod) {
  const chips = mod.resumen === "traslado"
    ? `<label>Etapa (puedes marcar varias)</label>
       <div class="chips">${CONFIG.etapasTraslado.map((e, i) =>
         `<button type="button" class="chip${i === 0 ? " activo" : ""}" data-etapa="${e.id}">${e.label}</button>`).join("")}</div>`
    : `<p class="hint">Al final se agrega: "${CONFIG.cierreBrigada}"</p>`;
  return `
    <label for="f_motivo">Motivo de llamada</label>
    <input id="f_motivo" type="text" autocomplete="off"
      placeholder="${mod.resumen === "brigada" ? "Ej: amago de incendio en correa transportadora" : "Ej: dolor abdominal"}">
    <p class="hint">Se escribe solo: "${CONFIG.inicioResumen} …"</p>
    ${chips}
    <label for="f_detalle">Detalle adicional (opcional)</label>
    <textarea id="f_detalle" placeholder="Solo si hace falta agregar algo más"></textarea>`;
}

// "Amago de incendio" -> "amago de incendio" (respeta siglas como "CTT")
function minusculaInicial(t) {
  return /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]/.test(t) ? t[0].toLowerCase() + t.slice(1) : t;
}
function conPunto(t) {
  t = limpio(t);
  if (!t) return t;
  t = t[0].toUpperCase() + t.slice(1);
  return /[.!?]$/.test(t) ? t : t + ".";
}

function construirResumen(mod) {
  const motivo = minusculaInicial(sinPuntoFinal($("#f_motivo").value));
  const detalle = conPunto($("#f_detalle").value);
  const partes = [];

  if (mod.resumen === "traslado") {
    // El motivo de llamada siempre va al inicio
    if (motivo) partes.push(`${CONFIG.inicioResumen} ${motivo}.`);
    const marcadas = [...$("#app").querySelectorAll(".chip.activo")].map((b) => b.dataset.etapa);
    CONFIG.etapasTraslado
      .filter((e) => marcadas.includes(e.id) && e.frase)
      .forEach((e) => partes.push(e.frase));
    if (detalle) partes.push(detalle);
  } else {
    if (!motivo) return detalle;
    partes.push(`${CONFIG.inicioResumen} ${motivo}.`);
    if (detalle) partes.push(detalle);
    partes.push(CONFIG.cierreBrigada);
  }
  return partes.join(" ");
}

/* ---------- Inicio de turno ---------- */
function vistaInicioTurno() {
  $("#tituloVista").textContent = "Inicio de Turno";
  const horaNow = new Date().getHours();
  const horarioSugerido = horaNow >= 6 && horaNow < 18 ? CONFIG.horarios[0] : CONFIG.horarios[1];
  const datos = leer("inicio", {});

  $("#app").innerHTML = `
    <section class="card">
      <div class="fila">
        <div>
          <label for="i_turno">Turno</label>
          <select id="i_turno">${CONFIG.turnos.map((t) => `<option>${t}</option>`).join("")}</select>
        </div>
        <div>
          <label for="i_horario">Horario</label>
          <select id="i_horario">${CONFIG.horarios.map((h) => `<option>${h}</option>`).join("")}</select>
        </div>
      </div>
    </section>

    <section class="card">
      <p class="seccion-titulo">Activaciones al ${CONFIG.telefonoEmergencias}</p>
      <p class="hint">Si no agregas ninguna, el mensaje dirá "Sin activación al ${CONFIG.telefonoEmergencias} por emergencias".</p>
      <div id="listaActivaciones"></div>
      <button class="btn-add" id="addActivacion">+ Agregar activación</button>
    </section>

    <section class="card">
      <p class="seccion-titulo">Personal de turno</p>
      <label for="i_medico">Médico de turno</label>
      <input id="i_medico" type="text" placeholder="Dr. Nombre Apellido" autocomplete="off">
      <label for="i_paramedico">Paramédico de turno</label>
      <input id="i_paramedico" type="text" placeholder="Sr. Nombre Apellido" autocomplete="off">
      <label for="i_enfermero">Enfermero de turno (opcional)</label>
      <input id="i_enfermero" type="text" placeholder="Si se deja vacío, no aparece" autocomplete="off">
      <p class="hint">El operador en turno se toma de la lista de arriba.</p>
    </section>

    <section class="card">
      <label class="check"><input type="checkbox" id="i_gssoOn"> G.S.S.O de turno fin de semana</label>
      <p class="hint" id="gssoHint"></p>
      <div id="boxGsso">
        <div id="listaGsso"></div>
        <button class="btn-add" id="addGsso">+ Agregar encargado</button>
      </div>
    </section>`;

  // Restaurar datos que se repiten de un turno a otro
  $("#i_turno").value = datos.turno || "A";
  $("#i_horario").value = horarioSugerido;
  $("#i_medico").value = datos.medico || "";
  $("#i_paramedico").value = datos.paramedico || "";
  $("#i_enfermero").value = datos.enfermero || "";

  /* Activaciones */
  const listaAct = $("#listaActivaciones");
  function agregarActivacion(a = {}) {
    const div = document.createElement("div");
    div.className = "item activacion";
    div.innerHTML = `
      <button class="quitar" aria-label="Quitar activación">&times;</button>
      <div class="fila">
        <div><label>Hora</label><input type="time" class="a_hora" value="${a.hora || horaActual()}"></div>
        <div><label>Sector (opcional)</label><input type="text" class="a_sector" placeholder="Fundición" autocomplete="off"></div>
      </div>
      <label>Tipo de emergencia</label>
      <input type="text" class="a_tipo" placeholder="Escolta médica" autocomplete="off">
      <div class="fila">
        <div><label>Empresa</label><input type="text" class="a_empresa" placeholder="Buscar empresa" autocomplete="off" list="dl_empresas"></div>
        <div><label>Gerencia</label><input type="text" class="a_gerencia" placeholder="Fundición" autocomplete="off"></div>
      </div>`;
    div.querySelector(".quitar").addEventListener("click", () => { div.remove(); actualizar(); });
    listaAct.appendChild(div);
    div.querySelector(".a_tipo").focus();
    actualizar();
  }
  $("#addActivacion").addEventListener("click", () => agregarActivacion());

  /* GSSO */
  const listaGsso = $("#listaGsso");
  function agregarGsso(nombre = "") {
    const div = document.createElement("div");
    div.className = "item-simple";
    div.innerHTML = `
      <input type="text" class="g_nombre" placeholder="Srta./Sr. Nombre Apellido" autocomplete="off">
      <button class="quitar" aria-label="Quitar encargado">&times;</button>`;
    div.querySelector(".g_nombre").value = nombre;
    div.querySelector(".quitar").addEventListener("click", () => { div.remove(); actualizar(); persistir(); });
    listaGsso.appendChild(div);
    actualizar();
  }
  $("#addGsso").addEventListener("click", () => agregarGsso());
  (datos.gsso && datos.gsso.length ? datos.gsso : [""]).forEach(agregarGsso);

  function syncGsso(auto) {
    const finde = esFinDeSemana(hoyISO());
    if (auto) $("#i_gssoOn").checked = finde;
    $("#boxGsso").hidden = !$("#i_gssoOn").checked;
    $("#gssoHint").textContent = finde
      ? "Es fin de semana: se incluye en el mensaje."
      : "Día de semana: se omite (puedes activarlo manualmente).";
  }
  syncGsso(true);
  $("#i_gssoOn").addEventListener("change", () => { syncGsso(false); actualizar(); });

  function persistir() {
    guardar("inicio", {
      turno: $("#i_turno").value,
      medico: $("#i_medico").value,
      paramedico: $("#i_paramedico").value,
      enfermero: $("#i_enfermero").value,
      gsso: [...listaGsso.querySelectorAll(".g_nombre")].map((i) => i.value),
    });
  }
  $("#app").addEventListener("input", () => { persistir(); actualizar(); });
  $("#app").addEventListener("change", () => { persistir(); actualizar(); });

  vistaActual = {
    generar() {
      const v = (id) => limpio($("#" + id).value);
      const op = operadorActual();

      const activaciones = [...listaAct.querySelectorAll(".activacion")].map((d) => {
        const q = (c) => sinPuntoFinal(d.querySelector(c).value);
        let linea = `-${q(".a_hora")} ${q(".a_tipo")}`;
        if (q(".a_sector")) linea += ` sector ${q(".a_sector")}`;
        if (q(".a_empresa")) linea += ` Empresa ${q(".a_empresa")}`;
        if (q(".a_gerencia")) linea += ` Gerencia ${q(".a_gerencia")}`;
        return linea.replace(/\s+/g, " ").trim() + ".";
      });

      const l = [
        `*${fechaLarga(hoyISO())}*`,
        `Turno ${v("i_turno")} de ${v("i_horario")}`,
        "",
        "Se recibe turno con las novedades mencionadas por el turno.",
      ];
      if (activaciones.length) {
        l.push(`Activaciones al ${CONFIG.telefonoEmergencias} por emergencias:`, ...activaciones);
      } else {
        l.push(`Sin activación al ${CONFIG.telefonoEmergencias} por emergencias`);
      }
      l.push("", "*Médico de turno*", v("i_medico"));
      l.push("", "*Paramédico de turno*", v("i_paramedico"));
      if (v("i_enfermero")) l.push("", "*Enfermero de turno*", v("i_enfermero"));
      l.push("", "*Operador en turno*", op.nombre + (op.reemplazo ? " (R)" : ""));

      if ($("#i_gssoOn").checked) {
        const gsso = [...listaGsso.querySelectorAll(".g_nombre")].map((i) => limpio(i.value)).filter(Boolean);
        if (gsso.length) l.push("", "*G.S.S.O de turno fin de semana*", ...gsso);
      }
      l.push("", firma("Operador en turno"));
      return l.join("\n");
    },
    limpiar() {
      listaAct.innerHTML = "";
      syncGsso(true);
    },
  };
}

/* ---------- Router (por #hash, así funciona el botón atrás del celular) ---------- */
function router() {
  const id = location.hash.replace("#", "");
  const mod = CONFIG.emergencias.find((m) => m.id === id);
  if (id !== "inicio" && !mod) return vistaMenu();

  // Reemplazar #app para limpiar listeners de la vista anterior
  const nuevo = document.createElement("main");
  nuevo.id = "app";
  $("#app").replaceWith(nuevo);
  vistaActual = null;

  $("#btnVolver").hidden = false;
  $("#panelSalida").hidden = false;
  if (id === "inicio") vistaInicioTurno();
  else vistaEmergencia(mod);
  actualizar();
  window.scrollTo(0, 0);
}

/* ---------- Acciones ---------- */
async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto);
  } catch (e) {
    const ta = document.createElement("textarea");
    ta.value = texto;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  toast("Mensaje copiado");
}

function initAcciones() {
  $("#btnVolver").addEventListener("click", () => (location.hash = ""));
  $("#btnCopiar").addEventListener("click", () => vistaActual && copiar(vistaActual.generar()));
  $("#btnWsp").addEventListener("click", () => {
    if (!vistaActual) return;
    window.open("https://wa.me/?text=" + encodeURIComponent(vistaActual.generar()), "_blank");
  });
  $("#btnLimpiar").addEventListener("click", () => {
    if (!vistaActual) return;
    vistaActual.limpiar();
    actualizar();
    toast("Formulario limpio");
  });
}

/* ---------- Listas de sugerencias (empresas, etc.) ---------- */
// Crea un <datalist> por cada lista de CONFIG: el campo muestra sugerencias
// mientras se escribe, y también acepta texto libre.
function initListas() {
  ["empresas"].forEach((nombre) => {
    const dl = document.createElement("datalist");
    dl.id = "dl_" + nombre;
    dl.innerHTML = CONFIG[nombre].map((v) => `<option value="${escapeHTML(v)}"></option>`).join("");
    document.body.appendChild(dl);
  });
}

/* ---------- Arranque ---------- */
initListas();
initOperador();
initAcciones();
window.addEventListener("hashchange", router);
router();

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
