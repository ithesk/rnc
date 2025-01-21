# Consulta RNC - DGII República Dominicana

<div align="center">
  <img width="1675" alt="Image" src="https://github.com/user-attachments/assets/cee3d991-57c1-402c-9aeb-2909448bf2b0" />
</div>

API y cliente web para consultar el Registro Nacional del Contribuyente (RNC) de la Dirección General de Impuestos Internos (DGII) de la República Dominicana.

##  vivo 🚀

* **Interfaz Web:** [https://rnc-2jd52nrj2-ithesks-projects.vercel.app](https://rnc-2jd52nrj2-ithesks-projects.vercel.app)
* **Endpoint API:** `https://rnc-2jd52nrj2-ithesks-projects.vercel.app/api/contribuyentes`

## Características 📋

* Consulta de contribuyentes por RNC o razón social
* Verificación de estado del contribuyente
* API REST pública y gratuita
* Interfaz web responsive
* Resultados en tiempo real
* Sin límite de consultas
* Datos oficiales de la DGII

## Uso de la API 🔍

### Endpoint de consulta

```http
GET /api/contribuyentes?q=TERMINO_BUSQUEDA
```

### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `q` | `string` | RNC o nombre del contribuyente |

### Ejemplo de respuesta

```json
{
  "results": [
    {
      "ruc": "123456789",
      "nombre": "EMPRESA EJEMPLO SRL",
      "estado": "ACTIVO",
      "tipo": "NORMAL"
    }
  ]
}
```

### Ejemplos de implementación

#### JavaScript/Node.js
```javascript
const response = await fetch('https://rnc-2jd52nrj2-ithesks-projects.vercel.app/api/contribuyentes?q=BANCO');
const data = await response.json();
console.log(data.results);
```

#### PHP
```php
<?php
$response = file_get_contents('https://rnc-2jd52nrj2-ithesks-projects.vercel.app/api/contribuyentes?q=BANCO');
$data = json_decode($response, true);
print_r($data['results']);
```

#### Python
```python
import requests

response = requests.get('https://rnc-2jd52nrj2-ithesks-projects.vercel.app/api/contribuyentes?q=BANCO')
data = response.json()
print(data['results'])
```

## Instalación local 🛠️

1. Clona el repositorio
```bash
git clone https://github.com/ithesk/rnc.git
cd rnc
```

2. Instala dependencias
```bash
npm install
```

3. Configura MongoDB
```bash
cp .env.example .env
# Añade tu URI de MongoDB en .env
```

4. Inicia el servidor
```bash
npm run dev
```

## Tecnologías utilizadas 💻

* React + Vite
* MongoDB Atlas
* Node.js
* Vercel
* TailwindCSS

## Estado del servicio 🚨

* ✅ API: Operativa
* ✅ Base de datos: Actualizada
* ✅ Frontend: Operativo

## Uso libre y gratuito ⚖️

Este proyecto es de uso libre y gratuito. Puedes:
* Usar la API en tus aplicaciones
* Modificar el código
* Distribuir el código
* Uso comercial permitido

Sin necesidad de atribución ni permisos adicionales.

## Contribuir 🤝

Las contribuciones son bienvenidas. Puedes:
1. Hacer fork del proyecto
2. Crear una rama para tu funcionalidad (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push (`git push origin feature/NuevaFuncionalidad`)
5. Abrir un Pull Request

## Contacto y soporte 📫

* GitHub: [@ithesk](https://github.com/ithesk)
* Proyecto: [https://github.com/ithesk/rnc](https://github.com/ithesk/rnc)
* Reportar problemas: [https://github.com/ithesk/rnc/issues](https://github.com/ithesk/rnc/issues)

## Agradecimientos 🙏

* [DGII República Dominicana](https://dgii.gov.do/) por proporcionar los datos
* Comunidad de desarrolladores de República Dominicana

---

Hecho con ❤️ en República Dominicana por [ithesk](https://github.com/ithesk)
