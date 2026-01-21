import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Info Político 2026',
  description: 'Lee nuestros términos y condiciones de uso para Info Político 2026.',
};

export default function TerminosPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Términos y Condiciones de Uso</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-CR')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Aceptación de los Términos</h2>
          <p className="text-gray-700 mb-4">
            Al acceder y utilizar el sitio web Info Político 2026, aceptas estar sujeto a estos términos y 
            condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que 
            no utilices nuestro servicio.
          </p>
          <p className="text-gray-700">
            Estos términos constituyen un acuerdo legal entre tú como usuario y los desarrolladores de 
            Info Político 2026, y reflejan nuestro compromiso con la ética y el profesionalismo en el 
            desarrollo de software.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Descripción del Servicio</h2>
          <p className="text-gray-700 mb-4">
            Info Político 2026 es una plataforma digital diseñada para proporcionar información objetiva 
            y transparente sobre las propuestas electorales y candidatos para las elecciones de Costa Rica 2026.
          </p>
          <p className="text-gray-700 mb-4">Nuestro servicio incluye:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Información sobre propuestas de gobierno</li>
            <li>Datos de candidatos y partidos políticos</li>
            <li>Análisis comparativo de propuestas</li>
            <li>Herramientas educativas para la toma de decisiones informadas</li>
          </ul>
          <p className="text-gray-700">
            Nos comprometemos a mantener la neutralidad política y la objetividad en toda la información presentada.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Uso Apropiado del Servicio</h2>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">3.1 Usos Permitidos</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Consultar información electoral para uso personal y educativo</li>
            <li>Compartir contenido del sitio citando la fuente apropiadamente</li>
            <li>Utilizar las herramientas de comparación y análisis</li>
            <li>Proporcionar retroalimentación constructiva sobre el servicio</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-700">3.2 Usos Prohibidos</h3>
          <p className="text-gray-700 mb-2">Te comprometes a NO utilizar el servicio para:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Difundir información falsa o engañosa</li>
            <li>Realizar actividades que comprometan la seguridad del sitio</li>
            <li>Intentar acceder a áreas restringidas del sistema</li>
            <li>Realizar ingeniería inversa del código o la arquitectura</li>
            <li>Sobrecargar los servidores con solicitudes automatizadas masivas</li>
            <li>Utilizar el contenido para fines comerciales sin autorización</li>
            <li>Promover discurso de odio, discriminación o violencia</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Propiedad Intelectual</h2>
          <p className="text-gray-700 mb-4">
            El diseño, código, estructura y contenido original de Info Político 2026 están protegidos por 
            derechos de autor y otras leyes de propiedad intelectual.
          </p>
          <p className="text-gray-700 mb-4">
            La información política pública es de dominio público, pero nuestra compilación, organización 
            y presentación de la misma constituye trabajo original protegido.
          </p>
          <p className="text-gray-700">
            Respetamos los derechos de propiedad intelectual de terceros y esperamos que los usuarios 
            hagan lo mismo.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Precisión de la Información</h2>
          <p className="text-gray-700 mb-4">
            Nos esforzamos por mantener la información actualizada y precisa, siguiendo los más altos 
            estándares de calidad en el desarrollo de software y la curación de contenido.
          </p>
          <p className="text-gray-700 mb-4">Sin embargo:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>La información puede cambiar y actualizamos el sitio periódicamente</li>
            <li>No garantizamos la exactitud absoluta de toda la información</li>
            <li>Recomendamos verificar información crítica con fuentes oficiales</li>
            <li>No somos responsables por decisiones tomadas basándose únicamente en nuestro contenido</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Privacidad y Datos Personales</h2>
          <p className="text-gray-700 mb-4">
            El tratamiento de tus datos personales se rige por nuestra Política de Privacidad, la cual 
            forma parte integral de estos términos.
          </p>
          <p className="text-gray-700">
            Nos comprometemos a proteger tu privacidad siguiendo las mejores prácticas de la industria 
            y cumpliendo con todas las regulaciones aplicables de protección de datos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Limitación de Responsabilidad</h2>
          <p className="text-gray-700 mb-4">
            Info Político 2026 se proporciona &quot;tal como está&quot; y &quot;según disponibilidad&quot;. En la medida 
            máxima permitida por la ley:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>No garantizamos la disponibilidad ininterrumpida del servicio</li>
            <li>No somos responsables por daños indirectos o consecuentes</li>
            <li>Nuestra responsabilidad se limita al uso directo del servicio</li>
            <li>Los usuarios son responsables de sus propias decisiones electorales</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Neutralidad Política</h2>
          <p className="text-gray-700 mb-4">
            Como desarrolladores comprometidos con la ética profesional, mantenemos estricta neutralidad 
            política en el desarrollo y mantenimiento de esta plataforma.
          </p>
          <p className="text-gray-700">
            Nuestro objetivo es proporcionar herramientas imparciales que empoderen a los ciudadanos 
            para tomar decisiones informadas, sin influir en el resultado electoral.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Modificaciones del Servicio</h2>
          <p className="text-gray-700 mb-4">
            Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del 
            servicio en cualquier momento, siguiendo siempre principios de transparencia y comunicación clara.
          </p>
          <p className="text-gray-700">
            Los cambios significativos serán comunicados con anticipación razonable cuando sea posible.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Cambios a los Términos</h2>
          <p className="text-gray-700 mb-4">
            Podemos actualizar estos términos ocasionalmente para reflejar cambios en el servicio o 
            en las regulaciones aplicables.
          </p>
          <p className="text-gray-700">
            Los cambios sustanciales serán notificados prominentemente en el sitio web y, cuando sea 
            apropiado, solicitaremos tu consentimiento renovado.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">11. Ley Aplicable y Jurisdicción</h2>
          <p className="text-gray-700 mb-4">
            Estos términos se rigen por las leyes de Costa Rica. Cualquier disputa será resuelta 
            en los tribunales competentes de Costa Rica.
          </p>
          <p className="text-gray-700">
            Priorizamos la resolución amigable de conflictos y estamos siempre dispuestos al diálogo 
            constructivo con nuestros usuarios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">12. Contacto y Soporte</h2>
          <p className="text-gray-700 mb-4">
            Para preguntas sobre estos términos, reportar problemas técnicos o proporcionar 
            retroalimentación, puedes contactarnos a través de los medios disponibles en nuestro sitio web.
          </p>
          <p className="text-gray-700">
            Nos comprometemos a responder de manera oportuna y profesional, manteniendo siempre los 
            más altos estándares de servicio al cliente y ética profesional en el desarrollo de software.
          </p>
        </section>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-700 text-sm italic">
            Estos términos reflejan nuestro compromiso con la transparencia, la ética profesional y 
            la excelencia técnica en el desarrollo de herramientas que fortalecen la democracia y 
            el proceso electoral en Costa Rica.
          </p>
        </div>
      </div>
    </div>
  );
}