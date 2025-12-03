# 💻 Proyecto Final: Teoría de la Computación

![Estado del Proyecto](https://img.shields.io/badge/Estado-Finalizado-success)
![Curso](https://img.shields.io/badge/Curso-Teoría_de_la_Computación-blue)
![Universidad](https://img.shields.io/badge/Universidad-[Nombre_de_tu_U]-orange)

> Implementación y visualización de Autómatas Finitos utilizando tecnologías web modernas y librerías de gráficos vectoriales.

---

## 📖 Descripción

Este proyecto fue desarrollado como trabajo final para el curso de **Teoría de la Computación**. El objetivo principal es demostrar el funcionamiento de autómatas (AFD/AFN) mediante una interfaz web interactiva.

La aplicación permite visualizar grafos de estados de forma dinámica y resolver ejercicios específicos propuestos en la cátedra, ofreciendo una experiencia visual intuitiva gracias al uso de **D3.js** para el renderizado de los autómatas y **SweetAlert2** para la interacción con el usuario.

## 🚀 Tecnologías Utilizadas

El proyecto está construido con estándares modernos de desarrollo web, sin dependencias pesadas de frameworks, asegurando un rendimiento óptimo.

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **Estructura semántica**.
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) **Estilos y diseño responsivo**.
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **Lógica de los autómatas**.
* ![D3.js](https://img.shields.io/badge/D3.js-F9A03C?style=flat&logo=d3.js&logoColor=white) **Visualización de grafos y nodos**.
* ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-8E44AD?style=flat&logo=popup&logoColor=white) **Alertas modales estéticas**.
* **Particles.js**: Efectos visuales de fondo.

## 📂 Estructura del Proyecto

La organización de directorios sigue una arquitectura modular para facilitar el mantenimiento:

```text
├── assets/
│   ├── css/
│   │   ├── dashboard-automatas.css  # Estilos del panel principal
│   │   ├── particulas.css           # Estilos para el fondo animado
│   │   └── styles.css               # Estilos globales
│   ├── img/                         # Recursos gráficos (Logos, iconos)
│   └── js/
│       ├── config-particulas.js     # Configuración de Particles.js
│       ├── dashboard-automatas.js   # Lógica general del dashboard
│       ├── ejercicio-1.js           # Lógica específica del Autómata 1
│       ├── ejercicio-2.js           # Lógica específica del Autómata 2
│       └── particles.min.js         # Librería de partículas
├── views/
│   ├── ejercicio-1.html             # Vista del primer ejercicio
│   └── ejercicio-2.html             # Vista del segundo ejercicio
├── index.html                       # Página de aterrizaje (Landing Page)
└── README.md                        # Documentación
------------------------------------------------------------------------
text```

## 🧠 **Características Principales**

✔ Simulación paso a paso de cadenas\
✔ Representación visual de estados y transiciones\
✔ Colores dinámicos para marcar estados activos\
✔ Registro completo del recorrido de la cadena (δ(q, símbolo))\
✔ Validación y mensajes claros con SweetAlert\
✔ Interfaz moderna y responsiva\
✔ Soporte para múltiples ejercicios del proyecto final

------------------------------------------------------------------------

## 📘 **Ejercicios Implementados**

### **1️⃣ Ejercicio 1 --- Validación de Correo Electrónico**

-   Procesa cadenas deterministas.\
-   Muestra transición por transición.\
-   Indica aceptación o rechazo.

### **2️⃣ Ejercicio 2 --- Valida números multilos de 3**

-   Manejo de múltiples transiciones posibles.\
-   Despliegue del recorrido completo.\
-   Visualización en grafo usando D3.js.

------------------------------------------------------------------------

## ▶️ **Cómo Ejecutarlo**

1.  Clonar el repositorio:

    ``` bash
    git clone https://github.com/usuario/tu-repo.git
    ```

2.  Abrir el proyecto en tu editor (VS Code recomendado).\

3.  Abrir **index.html** desde el navegador (o usar Live Server).

No requiere instalación adicional.

------------------------------------------------------------------------

## 👥 **Autores**

-   **Carlos Richard Torres Almonacid**\
-   **Josafat Paredes Ganto**

------------------------------------------------------------------------

## 📄 **Licencia**

Este proyecto está bajo la licencia **MIT**, lo que permite su uso
académico y modificación libre.
