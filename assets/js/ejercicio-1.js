document.getElementById('btn-run').addEventListener('click', verificarCadena);
document.getElementById('btn-clear').addEventListener('click', limpiarCampos);

function verificarCadena() {
  const cadena = document.getElementById('cadena').value.trim();
  const resultado = document.getElementById('resultado');

  if (cadena === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Cadena vacía',
      text: 'Por favor, ingrese una cadena para verificar.',
    });
    return;
  }

  const { aceptada, recorrido, listaEstados } = reconocerCadena(cadena);

  document.getElementById("recorrido-cadena").innerHTML = recorrido.join("") + `<br><strong>Cadena ${aceptada ? "aceptada" : "rechazada"}:</strong> ${cadena}`;

  iluminarRecorrido(listaEstados);

  if (aceptada) {
    Swal.fire({
      icon: 'success',
      title: 'Cadena Aceptada',
      text: `La cadena "${cadena}" es un correo válido.`,
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
      text: `La cadena "${cadena}" no cumple con el formato de correo.`,
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
  limpiarGrafo();
}

function reconocerCadena(cadena) {
  let estado = "q0";
  const recorrido = [];
  const listaEstados = ["q0"];

  for (let caracter of cadena) {
    let estadoAnterior = estado;
    let estadoNuevo = "";

    switch (estado) {
      case 'q0':
        if (/[a-zA-Z]/.test(caracter) || /[0-9]/.test(caracter) || caracter === '_') estadoNuevo = 'q1';
        else estadoNuevo = 'qØ';
        break;

      case 'q1':
        if (/[a-zA-Z]/.test(caracter) || /[0-9]/.test(caracter) || caracter === '_') estadoNuevo = 'q1'; // Bucle
        else if (caracter === '.') estadoNuevo = 'q2';
        else if (caracter === '-') estadoNuevo = 'q2';
        else if (caracter === '@') estadoNuevo = 'q3';
        else estadoNuevo = 'qØ';
        break;

      case 'q2':
        if (/[a-zA-Z]/.test(caracter) || /[0-9]/.test(caracter) || caracter === '_') estadoNuevo = 'q1';
        else if (caracter === '.' || caracter === '-') estadoNuevo = 'q2';
        else estadoNuevo = 'qØ';
        break;

      case 'q3':
        if (/[a-zA-Z]/.test(caracter) || /[0-9]/.test(caracter)) estadoNuevo = 'q6';
        else estadoNuevo = 'qØ';
        break;

      case 'q6':
        if (/[a-zA-Z]/.test(caracter) || /[0-9]/.test(caracter)) estadoNuevo = 'q6';
        else if (caracter === '.') estadoNuevo = 'q4';
        else if (caracter === '-') estadoNuevo = 'q7';
        else estadoNuevo = 'qØ';
        break;

      case 'q7':
        if (/[a-zA-Z]/.test(caracter) || /[0-9]/.test(caracter)) estadoNuevo = 'q6';
        else if (caracter === '.') estadoNuevo = 'q4'; 
        else if (caracter === '-') estadoNuevo = 'q7'; 
        else estadoNuevo = 'qØ';
        break;

      case 'q4':
        if (/[a-zA-Z]/.test(caracter) || /[0-9]/.test(caracter)) estadoNuevo = 'q5';
        else estadoNuevo = 'qØ';
        break;

      case 'q5':
        if (/[a-zA-Z]/.test(caracter) || /[0-9]/.test(caracter)) estadoNuevo = 'q5';
        else if (caracter === '.') estadoNuevo = 'q4';
        else if (caracter === '-') estadoNuevo = 'q8';
        else estadoNuevo = 'qØ';
        break;
        
      case 'q8':
        if (/[a-zA-Z]/.test(caracter) || /[0-9]/.test(caracter)) estadoNuevo = 'q5';
        else if (caracter === '.') estadoNuevo = 'q4';
        else if (caracter === '-') estadoNuevo = 'q8';
        else estadoNuevo = 'qØ';
        break;

      case 'qØ':
        estadoNuevo = 'qØ';
        break;
    }

    estado = estadoNuevo;
    
    listaEstados.push(estadoNuevo);

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

  const aceptada = estado === "q5";

  return { aceptada, recorrido, listaEstados };
}