RNC API y Cliente Web - Consulta de Contribuyentes
Este proyecto proporciona una API y una interfaz web para consultar información de contribuyentes utilizando su RNC (Registro Nacional del Contribuyente) o nombre.

<img width="1675" alt="Image" src="https://github.com/user-attachments/assets/cee3d991-57c1-402c-9aeb-2909448bf2b0" />



Frontend: https://rnc-2jd52nrj2-ithesks-projects.vercel.app
API Endpoint: https://rnc-2jd52nrj2-ithesks-projects.vercel.app/api/contribuyentes

📋 Características

Búsqueda por RNC o nombre
Resultados en tiempo real
API RESTful
Interfaz responsiva
Indicadores de estado del contribuyente

🔍 Uso de la API
Endpoint de búsqueda
httpCopyGET /api/contribuyentes?q=TERMINO_BUSQUEDA
Parámetros
ParámetroTipoDescripciónqstringTérmino de búsqueda (RNC o nombre)
Ejemplo de respuesta
jsonCopy{
  "results": [
    {
      "ruc": "123456789",
      "nombre": "EMPRESA EJEMPLO",
      "estado": "ACTIVO",
      "tipo": "NORMAL"
    }
  ]
}
Ejemplos de uso
cURL
bashCopycurl "https://rnc-2jd52nrj2-ithesks-projects.vercel.app/api/contribuyentes?q=JUAN"
JavaScript (Fetch)
javascriptCopyconst response = await fetch('https://rnc-2jd52nrj2-ithesks-projects.vercel.app/api/contribuyentes?q=JUAN');
const data = await response.json();
console.log(data.results);
Python (Requests)
pythonCopyimport requests

response = requests.get('https://rnc-2jd52nrj2-ithesks-projects.vercel.app/api/contribuyentes?q=JUAN')
data = response.json()
print(data['results'])
PHP
phpCopy<?php
$response = file_get_contents('https://rnc-2jd52nrj2-ithesks-projects.vercel.app/api/contribuyentes?q=JUAN');
$data = json_decode($response, true);
print_r($data['results']);
🛠️ Instalación local

Clona el repositorio

bashCopygit clone https://github.com/ithesk/rnc.git
cd rnc

Instala las dependencias

bashCopynpm install

Configura las variables de entorno

bashCopycp .env.example .env
# Edita .env con tus credenciales de MongoDB

Inicia el servidor de desarrollo

bashCopynpm run dev
🔧 Configuración de MongoDB

Crea una cuenta en MongoDB Atlas
Crea un nuevo cluster
Configura la variable de entorno MONGODB_URI con tu string de conexión

📦 Estructura del proyecto
Copyrnc/
├── api/
│   └── contribuyentes.js    # API endpoint
├── src/
│   ├── App.jsx             # Componente principal
│   ├── main.jsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── scripts/
│   └── load-data.js       # Script para cargar datos
├── vercel.json            # Configuración de Vercel
└── package.json
💻 Tecnologías utilizadas

React
Vite
MongoDB
Vercel
TailwindCSS
Node.js



Fork el proyecto
Crea tu rama de características (git checkout -b feature/AmazingFeature)
Commit tus cambios (git commit -m 'Add some AmazingFeature')
Push a la rama (git push origin feature/AmazingFeature)
Abre un Pull Request

⚡ API Rate Limits

100 solicitudes por minuto por IP
1000 solicitudes por día por IP

🚨 Estado de los servicios

✅ API: Operativa
✅ Frontend: Operativo
✅ Base de datos: Operativa

📫 Contacto

Proyecto Link: https://github.com/ithesk/rnc
Issue Tracker: https://github.com/ithesk/rnc/issues

🙏 Agradecimientos

DGII por proporcionar los datos
Contribuidores del proyecto
Comunidad de desarrolladores


⌨️ con ❤️ por ithesk
