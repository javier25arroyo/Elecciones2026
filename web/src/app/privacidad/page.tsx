import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Info Político 2026',
  description: 'Conoce cómo protegemos y tratamos tu información personal en Info Político 2026.',
};

export default function PrivacidadPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Política de Privacidad</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-CR')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Introducción</h2>
          <p className="text-gray-700 mb-4">
            En Info Político 2026, respetamos profundamente tu privacidad y estamos comprometidos con la protección 
            de tus datos personales. Esta política explica cómo recopilamos, utilizamos y protegemos tu información 
            cuando visitas nuestro sitio web.
          </p>
          <p className="text-gray-700">
            Desarrollamos esta plataforma con los más altos estándares éticos y técnicos, priorizando siempre 
            la transparencia y la seguridad de los datos de nuestros usuarios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Información que Recopilamos</h2>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">2.1 Información Automática</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Dirección IP (anonimizada)</li>
            <li>Tipo de navegador y versión</li>
            <li>Páginas visitadas y tiempo de permanencia</li>
            <li>Fecha y hora de acceso</li>
            <li>Dispositivo utilizado (móvil, escritorio, tablet)</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-3 text-gray-700">2.2 Información Voluntaria</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Datos proporcionados en formularios de contacto</li>
            <li>Suscripciones a actualizaciones (si aplicable)</li>
            <li>Comentarios o sugerencias enviadas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Cómo Utilizamos tu Información</h2>
          <p className="text-gray-700 mb-4">Utilizamos la información recopilada únicamente para:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Mejorar la funcionalidad y experiencia de usuario del sitio web</li>
            <li>Analizar tendencias de uso para optimizar el contenido</li>
            <li>Garantizar la seguridad y estabilidad de la plataforma</li>
            <li>Responder a consultas y brindar soporte técnico</li>
            <li>Cumplir con obligaciones legales cuando sea requerido</li>
          </ul>
          <p className="text-gray-700 font-semibold">
            NUNCA vendemos, alquilamos o compartimos tu información personal con terceros con fines comerciales.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Cookies y Tecnologías Similares</h2>
          <p className="text-gray-700 mb-4">
            Utilizamos cookies estrictamente necesarias para el funcionamiento del sitio web. Estas incluyen:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Cookies de sesión para mantener la funcionalidad básica</li>
            <li>Cookies de preferencias para recordar configuraciones del usuario</li>
            <li>Cookies analíticas básicas (anonimizadas) para mejorar el rendimiento</li>
          </ul>
          <p className="text-gray-700">
            Puedes desactivar las cookies en tu navegador, aunque esto podría afectar algunas funcionalidades del sitio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Seguridad de los Datos</h2>
          <p className="text-gray-700 mb-4">
            Implementamos medidas técnicas y organizativas robustas para proteger tu información:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Cifrado SSL/TLS para todas las comunicaciones</li>
            <li>Sistemas de autenticación seguros</li>
            <li>Monitoreo continuo de seguridad</li>
            <li>Actualizaciones regulares de seguridad</li>
            <li>Acceso restringido a datos personales</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Tus Derechos</h2>
          <p className="text-gray-700 mb-4">Como usuario, tienes derecho a:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Acceder a la información que tenemos sobre ti</li>
            <li>Solicitar la corrección de datos incorrectos</li>
            <li>Solicitar la eliminación de tus datos personales</li>
            <li>Oponerte al procesamiento de tus datos</li>
            <li>Solicitar la portabilidad de tus datos</li>
            <li>Revocar el consentimiento en cualquier momento</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Retención de Datos</h2>
          <p className="text-gray-700">
            Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos 
            descritos en esta política, a menos que la ley requiera o permita un período de retención más largo.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Cambios a esta Política</h2>
          <p className="text-gray-700">
            Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre cambios 
            significativos a través del sitio web. Te recomendamos revisar esta política periódicamente.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Contacto</h2>
          <p className="text-gray-700 mb-4">
            Si tienes preguntas sobre esta política de privacidad o sobre el tratamiento de tus datos personales, 
            puedes contactarnos a través de los medios disponibles en nuestro sitio web.
          </p>
          <p className="text-gray-700">
            Nos comprometemos a responder a todas las consultas de manera oportuna y transparente, 
            manteniendo siempre los más altos estándares de profesionalismo y ética en el desarrollo de software.
          </p>
        </section>
      </div>
    </div>
  );
}