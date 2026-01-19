# Política de Seguridad / Security Policy

## 🔒 Versiones Compatibles / Supported Versions

Actualmente damos soporte de seguridad a las siguientes versiones del proyecto:

| Versión | Soporte         |
| ------- | --------------- |
| main    | ✅ Soportada    |
| otras   | ❌ Sin soporte  |

We currently provide security support for the following project versions:

| Version | Supported       |
| ------- | --------------- |
| main    | ✅ Supported    |
| others  | ❌ Not supported|

---

## 🚨 Reportar una Vulnerabilidad / Reporting a Vulnerability

### Español

La seguridad de **Info Politic 2026** es una prioridad. Si descubres una vulnerabilidad de seguridad, te agradeceríamos que nos lo informes de manera responsable.

### Cómo Reportar

**Por favor NO abras un issue público** si encuentras una vulnerabilidad de seguridad. En su lugar:

1. **Envía un correo electrónico a**: [javier25arojas@gmail.com](mailto:javier25arojas@gmail.com)
2. **Incluye en tu reporte**:
   - Descripción detallada de la vulnerabilidad
   - Pasos para reproducir el problema
   - Versiones afectadas
   - Impacto potencial
   - Sugerencias de solución (si las tienes)

### Qué Esperar

- **Confirmación inicial**: Recibirás una confirmación de tu reporte dentro de **48 horas**
- **Evaluación**: Evaluaremos la vulnerabilidad y su impacto dentro de **5 días hábiles**
- **Actualizaciones**: Te mantendremos informado sobre el progreso
- **Resolución**: Trabajaremos para publicar un parche lo antes posible
- **Crédito**: Si lo deseas, te daremos crédito en el changelog por tu contribución responsable

---

### English

The security of **Info Politic 2026** is a priority. If you discover a security vulnerability, we appreciate you informing us responsibly.

### How to Report

**Please DO NOT open a public issue** if you find a security vulnerability. Instead:

1. **Send an email to**: [javier25arojas@gmail.com](mailto:javier25arojas@gmail.com)
2. **Include in your report**:
   - Detailed description of the vulnerability
   - Steps to reproduce the issue
   - Affected versions
   - Potential impact
   - Fix suggestions (if you have any)

### What to Expect

- **Initial confirmation**: You will receive confirmation of your report within **48 hours**
- **Assessment**: We will evaluate the vulnerability and its impact within **5 business days**
- **Updates**: We will keep you informed about the progress
- **Resolution**: We will work to publish a patch as soon as possible
- **Credit**: If desired, we will credit you in the changelog for your responsible disclosure

---

## 🛡️ Mejores Prácticas de Seguridad / Security Best Practices

### Para Desarrolladores / For Developers

- ✅ Mantén las dependencias actualizadas regularmente
- ✅ Revisa los paquetes npm antes de instalarlos
- ✅ No commits credenciales o secrets en el código
- ✅ Utiliza variables de entorno para información sensible
- ✅ Ejecuta `pnpm audit` regularmente para detectar vulnerabilidades
- ✅ Revisa los PRs cuidadosamente antes de hacer merge

### Para Usuarios / For Users

- ✅ Mantén tu navegador actualizado
- ✅ Reporta comportamientos sospechosos
- ✅ No compartas información personal sensible en issues públicos
- ✅ Verifica que estás accediendo al sitio correcto

---

## 🔐 Seguridad de la Aplicación / Application Security

Este proyecto implementa las siguientes medidas de seguridad:

- **Next.js 16**: Framework con características de seguridad integradas
- **TypeScript**: Type safety para prevenir errores comunes
- **Static Site Generation**: Reduce superficie de ataque al no tener backend
- **GitHub Pages**: Hosting seguro con HTTPS
- **Dependencias Auditadas**: Revisión regular de vulnerabilidades con `pnpm audit`
- **No almacenamiento de datos sensibles**: La aplicación no recopila ni almacena datos personales

This project implements the following security measures:

- **Next.js 16**: Framework with built-in security features
- **TypeScript**: Type safety to prevent common errors
- **Static Site Generation**: Reduces attack surface by not having a backend
- **GitHub Pages**: Secure hosting with HTTPS
- **Audited Dependencies**: Regular vulnerability review with `pnpm audit`
- **No sensitive data storage**: The application does not collect or store personal data

---

## 📞 Contacto / Contact

Para preguntas sobre seguridad que no sean vulnerabilidades críticas:

- **Email**: [javier25arojas@gmail.com](mailto:javier25arojas@gmail.com)
- **GitHub Issues**: Para discusiones generales de seguridad (no vulnerabilidades)

For security questions that are not critical vulnerabilities:

- **Email**: [javier25arojas@gmail.com](mailto:javier25arojas@gmail.com)
- **GitHub Issues**: For general security discussions (not vulnerabilities)

---

## 🙏 Agradecimientos / Acknowledgments

Agradecemos a todos los investigadores de seguridad y colaboradores que ayudan a mantener este proyecto seguro.

We thank all security researchers and contributors who help keep this project secure.

---

<div align="center">

**Desarrollado con ❤️ para Costa Rica 🇨🇷**

*Si encuentras algún problema de seguridad, por favor repórtalo responsablemente.*

</div>
