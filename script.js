const allLinks = document.querySelectorAll(".tabs a");
const allTabs = document.querySelectorAll(".tab-content");
const tabContentWrapper = document.querySelector(".tab-content-wrapper");
const select = document.querySelector(".tabs-select");

const shiftTabs = (linkId) => {
  allTabs.forEach((tab, i) => {
    if (tab.id.includes(linkId)) {
      allTabs.forEach((tabItem) => {
        const height = tabContentWrapper.clientHeight;
        tabItem.style = `transform: translateY(-${i * height}px);`;
        select.value = linkId;
      });
    }
  });
};

const handleLinkChange = (elem) => {
  const linkId = elem.id;
  const hrefLinkClick = elem.href;

  allLinks.forEach((link, i) => {
    if (link.href == hrefLinkClick) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  shiftTabs(linkId);
};

allLinks.forEach((elem) => {
  elem.addEventListener("click", function () {
    handleLinkChange(elem);
  });
});

//? handle proper selection for initial load
const currentHash = window.location.hash;

let activeLink = document.querySelector(`.tabs a`);

if (currentHash) {
  const visibleHash = document.getElementById(
    `${currentHash.replace("#", "")}`
  );

  if (visibleHash) {
    activeLink = visibleHash;
  }
}

activeLink.classList.toggle("active");

shiftTabs(activeLink.id);

const tabsSelect = document.querySelector(".tabs-select");

tabsSelect.addEventListener("change", function (e) {
  window.location.hash = e.target.value;
  const linkId = e.target.value;
  const elem = document.getElementById(linkId);
  handleLinkChange(elem);
});

// Calculadora científica

let pantalla = document.getElementById("pantalla");

function agregar(valor) {
    let contenido = pantalla.value;

    if (valor === 'Math.PI') {
        pantalla.value += 'π';
    } else {

        // Evitar operadores consecutivos
        if (["+", "-", "*", "/"].includes(valor) && 
            (contenido === "" || ["+", "-", "*", "/"].includes(contenido.slice(-1)))) {
            return;
        }

        // Permitir un solo punto por número
        if (valor === '.') {
            let partes = contenido.split(/[\+\-\*\/]/);
            let ultimaParte = partes[partes.length - 1];
            if (ultimaParte.includes('.')) {
                return; // No agregar otro punto en el mismo número
            }
        }

        pantalla.value += valor;
    }
}

function limpiar() {
    pantalla.value = "";
}

function borrar() {
    pantalla.value = pantalla.value.slice(0, -1);
}

function igual() {
    try {
        let expression = pantalla.value
            .replace(/\^/g, '**')
            .replace(/π/g, 'Math.PI')

        pantalla.value = eval(expression);
    } catch (e) {
        pantalla.value = "Error";
    }
}

// Calculadora de Ahorros

document.getElementById("ahorroForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que la página se recargue

  let ahorroInicial = parseFloat(document.getElementById("ahorroInicial").value);
  let incremento = parseFloat(document.getElementById("incremento").value);
  let semanas = parseInt(document.getElementById("semanas").value);

  // Aplicando la fórmula de la sucesión aritmética: aₙ = a₁ + (n-1) * d
  let totalAhorroUltimaSemana = ahorroInicial + (semanas - 1) * incremento;

  // Construyendo el detalle del cálculo
  let detalleHTML = `
      <h3>Proceso de Cálculo:</h3><br>
      <p><strong>Fórmula:</strong> aₙ = a₁ + (n - 1) * d</p><br>
      <p><strong>Reemplazando valores:</strong></p>
      <p>aₙ = ${ahorroInicial} + (${semanas} - 1) * ${incremento}</p>
      <p>aₙ = ${ahorroInicial} + (${semanas - 1} * ${incremento})</p>
      <p>aₙ = ${totalAhorroUltimaSemana}</p>
  `;

  document.getElementById("resultado").innerText = `Total ahorrado en la semana ${semanas}: $${totalAhorroUltimaSemana.toFixed(2)}`;
  document.getElementById("detalle").innerHTML = detalleHTML;
});

// Interés Simple

// Función para calcular interés simple
document.getElementById("interesSimpleForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar recargar la página

  // Obtener valores del formulario
  const capital = parseFloat(document.getElementById("capitalSimple").value);
  const tasa = parseFloat(document.getElementById("tasaSimple").value) / 100; // Convertir a decimal
  const tiempo = parseFloat(document.getElementById("tiempoSimple").value);

  // Calcular interés simple
  const interes = capital * tasa * tiempo;
  const total = capital + interes;

  // Generar el proceso de cálculo
  const formulaReemplazada = `I = ${capital} \\cdot ${tasa} \\cdot ${tiempo}`;
  const resultadoFormula = `I = ${interes.toFixed(2)}`;

  // Actualizar el contenido de las fórmulas
  document.getElementById("formulaReemplazadaSimple").textContent = `$$${formulaReemplazada}$$`;
  document.getElementById("resultadoFormulaSimple").textContent = `$$${resultadoFormula}$$`;

  // Mostrar el proceso de cálculo eliminando la clase "invisible"
  document.getElementById("procesoTituloSimple").classList.remove("invisible");
  document.getElementById("formulaTituloSimple").classList.remove("invisible");
  document.getElementById("formulaSimple").classList.remove("invisible");
  document.getElementById("reemplazoTituloSimple").classList.remove("invisible");
  document.getElementById("formulaReemplazadaSimple").classList.remove("invisible");
  document.getElementById("resultadoFormulaSimple").classList.remove("invisible");

  // Solicitar a MathJax que renderice las nuevas fórmulas
  MathJax.typeset();
});

// Interés Compuesto

document.getElementById('interesCompuestoForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtener valores del formulario
  const capital = parseFloat(document.getElementById('capital').value);
  const tasa = parseFloat(document.getElementById('tasa').value) / 100; // Convertir a decimal
  const periodos = parseInt(document.getElementById('periodos').value);
  const frecuencia = parseInt(document.getElementById('frecuencia').value);

  // Calcular el monto total usando la fórmula del interés compuesto
  const montoTotal = capital * Math.pow(1 + (tasa / frecuencia), frecuencia * periodos);

  // Generar el proceso de cálculo
  const formulaReemplazada = `S = ${capital} \\cdot \\left(1 + \\frac{${tasa}}{${frecuencia}}\\right)^{${frecuencia} \\cdot ${periodos}}`;
  const resultadoFormula = `S = ${montoTotal.toFixed(2)}`;

  // Actualizar el contenido de las fórmulas
  document.getElementById('formulaReemplazada').textContent = `$$${formulaReemplazada}$$`;
  document.getElementById('resultadoFormula').textContent = `$$${resultadoFormula}$$`;

  // Mostrar el proceso de cálculo eliminando la clase "invisible"
  document.getElementById('procesoTitulo').classList.remove('invisible');
  document.getElementById('formulaTitulo').classList.remove('invisible');
  document.getElementById('formula').classList.remove('invisible');
  document.getElementById('reemplazoTitulo').classList.remove('invisible');
  document.getElementById('formulaReemplazada').classList.remove('invisible');
  document.getElementById('resultadoFormula').classList.remove('invisible');

  // Solicitar a MathJax que renderice las nuevas fórmulas
  MathJax.typeset();
});
