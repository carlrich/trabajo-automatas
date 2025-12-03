document.getElementById('btn-run').addEventListener('click', verificarCadena);
document.getElementById('btn-clear').addEventListener('click', limpiarCampos);

function verificarCadena() {
  let cadena = document.getElementById('cadena').value.trim();
  const resultado = document.getElementById('resultado');

  if (cadena === '') {
    cadena = 'ε';
  }

  const { aceptada, recorrido } = reconocerCadena(cadena);

  document.getElementById("recorrido-cadena").innerHTML = recorrido.join("") + `<br><strong>Cadena ${ aceptada ? "aceptada" : "rechazada" }:</strong> ${ cadena }`;

  if (aceptada) {
    Swal.fire({
      icon: 'success',
      title: 'Cadena Aceptada',
      text: `La cadena "${ cadena === 'ε' ? 'vacia (ε)' : cadena }" es valida.`,
    });
    resultado.innerHTML = `
      <div class="mensaje aceptada" id="mensaje">
        <i class="fa-solid fa-info-circle"></i>
        <span>Cadena Aceptada</span>
      </div>
    `;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Cadena Rechazada',
      text: `La cadena "${ cadena === 'ε' ? 'vacia (ε)' : cadena }" no cumple con el autómata.`,
    });
    resultado.innerHTML = `
      <div class="mensaje rechazada" id="mensaje">
        <i class="fa-solid fa-info-circle"></i>
        <span>Cadena Rechazada</span>
      </div>
    `;
  }
}

function limpiarCampos() {
  document.getElementById('cadena').value = '';
  document.getElementById('resultado').innerHTML = '';
  document.getElementById('recorrido-cadena').innerHTML = 'Escriba una cadena';
}

function reconocerCadena(cadena) {
  let estado = "q0";
  const recorrido = [];

  for (let caracter of cadena) {
    let estadoAnterior = estado;
    let estadoNuevo = "";

    switch (estado) {
      case 'q0':
        if (caracter === 'ε') estadoNuevo = 'q0'; // Acepta cadena Basia
        else if (caracter === '1') estadoNuevo = 'q1';
        else if (caracter === '2') estadoNuevo = 'q2';
        else if (caracter === '3') estadoNuevo = 'q0';
        else estadoNuevo = 'qØ';
        break;

      case 'q1':
        if (caracter === '1') estadoNuevo = 'q2';
        else if (caracter === '2') estadoNuevo = 'q0';
        else if (caracter === '3') estadoNuevo = 'q1';
        else estadoNuevo = 'qØ';
        break;

      case 'q2':
        if (caracter === '1') estadoNuevo = 'q0';
        else if (caracter === '2') estadoNuevo = 'q1';
        else if (caracter === '3') estadoNuevo = 'q2';
        else estadoNuevo = 'qØ';
        break;
      
      case 'qØ':
        estadoNuevo = 'qØ';
        break;
    }

    estado = estadoNuevo;

    recorrido.push(`
      <math>
        <mrow>
          <mi>δ</mi>
          <mo>(</mo>
          <msub><mi>${estadoAnterior.slice(0, -1)}</mi><mn>${estadoAnterior.slice(1)}</mn></msub>
          <mo>,</mo>
          <mi>${caracter}</mi>
          <mo>)</mo>
          <mo>=</mo>
          <msub><mi>${estadoNuevo.slice(0, -1)}</mi><mn>${estadoNuevo.slice(1)}</mn></msub>
        </mrow>
      </math>
      <br>
    `);
  }

  const aceptada = estado === "q0";

  return { aceptada, recorrido };
}