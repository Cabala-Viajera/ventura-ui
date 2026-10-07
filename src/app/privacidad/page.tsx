import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/app/_utils/constants'

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: 'Aviso de privacidad de Cábala Viajera.',
  alternates: { canonical: `${SITE_URL}/privacidad` },
  // Keep indexing disabled until the notice is ready for publication.
  robots: { index: false, follow: true },
}

const contactEmail = 'admin@cabalaviajera.com'
const lastUpdated = '6 de octubre de 2026'
const privacyUrl = `${SITE_URL}/privacidad`
const linkStyle =
  'rounded-sm underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'

function ContactEmail() {
  return (
    <a href={`mailto:${contactEmail}`} className={linkStyle}>
      {contactEmail}
    </a>
  )
}

const sections = [
  {
    id: 'responsable',
    title: 'Responsable de los datos personales',
    content: (
      <>
        <p>
          <strong>Claudio A. Moreno</strong>, responsable de{' '}
          <strong>Cábala Viajera</strong>, es responsable del tratamiento de los
          datos personales recopilados a través de{' '}
          <a href={SITE_URL} className={linkStyle}>
            {SITE_URL}
          </a>
          .
        </p>
        <p>
          Para cualquier asunto relacionado con privacidad y protección de datos
          puedes comunicarte mediante:
        </p>
        <p>
          <strong>Correo electrónico:</strong> <ContactEmail />
        </p>
      </>
    ),
  },
  {
    id: 'datos-personales',
    title: 'Datos personales que recopilamos',
    content: (
      <>
        <p>
          Cuando decides suscribirte voluntariamente a nuestro newsletter
          recopilamos:
        </p>
        <ul className='list-disc space-y-2 pl-6'>
          <li>Tu dirección de correo electrónico.</li>
        </ul>
        <p>
          No solicitamos datos personales sensibles para utilizar el sitio ni
          para suscribirte al newsletter.
        </p>
      </>
    ),
  },
  {
    id: 'finalidades',
    title: '¿Para qué utilizamos tu correo electrónico?',
    content: (
      <>
        <p>Utilizamos tu correo exclusivamente para:</p>
        <ul className='list-disc space-y-2 pl-6'>
          <li>Administrar tu suscripción al newsletter.</li>
          <li>Enviarte nuevos artículos y publicaciones del blog.</li>
          <li>
            Compartir recomendaciones, novedades y contenido relacionado con
            viajes.
          </li>
        </ul>
        <p>No vendemos ni comercializamos tu información personal.</p>
      </>
    ),
  },
  {
    id: 'resend',
    title: 'Envío del newsletter mediante Resend',
    content: (
      <>
        <p>
          Para gestionar y enviar nuestros correos utilizamos{' '}
          <strong>Resend</strong>, un servicio proporcionado por Plus Five Five,
          Inc.
        </p>
        <p>
          Al suscribirte, tu dirección de correo electrónico y determinada
          información relacionada con el envío y recepción de los mensajes puede
          ser procesada por Resend con la finalidad de permitir la entrega y
          gestión del newsletter.
        </p>
        <p>
          Resend puede procesar información como la dirección de correo
          electrónico, metadatos de los mensajes y datos técnicos necesarios
          para prestar su servicio.
        </p>
        <p>
          La información procesada por Resend puede almacenarse en
          infraestructura ubicada fuera de México, incluyendo los Estados
          Unidos.
        </p>
        <p>
          Puedes consultar la política de privacidad de Resend en su sitio web
          oficial.
        </p>
      </>
    ),
  },
  {
    id: 'estadisticas',
    title: 'Estadísticas del sitio mediante Vercel Web Analytics',
    content: (
      <>
        <p>
          Utilizamos <strong>Vercel Web Analytics</strong> para obtener
          estadísticas generales sobre el uso del blog, tales como páginas
          visitadas, fuentes de tráfico, país aproximado, navegador, sistema
          operativo y otra información técnica.
        </p>
        <p>
          Estas estadísticas nos ayudan a entender qué contenidos resultan más
          útiles y a mejorar el sitio.
        </p>
        <p>
          Vercel Web Analytics está diseñado para realizar mediciones
          respetuosas con la privacidad y no utiliza cookies tradicionales para
          identificar individualmente a los visitantes ni realizar seguimiento
          entre diferentes sitios web.
        </p>
        <p>
          Los datos estadísticos obtenidos mediante esta herramienta no se
          utilizan para crear perfiles publicitarios personalizados.
        </p>
      </>
    ),
  },
  {
    id: 'cancelacion',
    title: 'Cancelación de la suscripción',
    content: (
      <>
        <p>
          Puedes dejar de recibir el newsletter en cualquier momento utilizando
          el enlace de cancelación de suscripción incluido en nuestros correos.
        </p>
        <p>
          También puedes solicitar la eliminación de tu dirección de correo
          electrónico enviando un mensaje a:
        </p>
        <p>
          <ContactEmail />
        </p>
      </>
    ),
  },
  {
    id: 'solicitudes',
    title: 'Derechos sobre tus datos personales',
    content: (
      <>
        <p>
          Puedes solicitar el acceso, rectificación o cancelación de tus datos
          personales, así como oponerte a su tratamiento cuando corresponda.
        </p>
        <p>Para ejercer estos derechos puedes comunicarte mediante:</p>
        <p>
          <ContactEmail />
        </p>
        <p>
          En el caso de una suscripción al newsletter, podremos solicitarte
          información suficiente para identificar la dirección de correo
          electrónico correspondiente a tu solicitud.
        </p>
      </>
    ),
  },
  {
    id: 'conservacion',
    title: 'Conservación de los datos',
    content: (
      <>
        <p>
          Mantendremos tu dirección de correo electrónico mientras permanezcas
          suscrito al newsletter o durante el tiempo razonablemente necesario
          para cumplir con nuestras obligaciones relacionadas con el servicio.
        </p>
        <p>
          Si cancelas tu suscripción o solicitas la eliminación de tus datos,
          dejaremos de utilizarlos para enviarte el newsletter, salvo cuando sea
          necesario conservar cierta información para cumplir con alguna
          obligación legal aplicable.
        </p>
      </>
    ),
  },
  {
    id: 'actualizaciones',
    title: 'Cambios al Aviso de Privacidad',
    content: (
      <>
        <p>
          Este Aviso de Privacidad puede actualizarse ocasionalmente para
          reflejar cambios en el funcionamiento del sitio, los servicios
          utilizados o la normativa aplicable.
        </p>
        <p>La versión vigente estará disponible permanentemente en:</p>
        <p>
          <a href={privacyUrl} className={`${linkStyle} break-words`}>
            {privacyUrl}
          </a>
        </p>
        <p>
          <strong>Fecha de última actualización:</strong>{' '}
          <time dateTime='2026-10-06'>{lastUpdated}</time>
        </p>
      </>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <main className='mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-20'>
      <Link
        href='/'
        className='inline-flex min-h-11 items-center rounded-sm text-sm underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'
      >
        ← Volver al inicio
      </Link>

      <header className='mt-6 border-b border-foreground/15 pb-8 sm:pb-12'>
        <p className='text-sm font-bold tracking-widest text-primary uppercase'>
          Cábala Viajera
        </p>
        <h1 className='mt-4 text-4xl font-bold tracking-tight sm:text-5xl'>
          Aviso de privacidad
        </h1>
        <p className='mt-5 max-w-2xl text-base leading-8 text-foreground/75'>
          Información sobre el tratamiento de datos personales en nuestro sitio.
        </p>
        <p className='mt-6 max-w-2xl rounded-xl border border-secondary bg-secondary/15 p-4 text-sm leading-7'>
          <strong>Última actualización:</strong>{' '}
          <time dateTime='2026-10-06'>{lastUpdated}</time>
          <br />
          En Cábala Viajera respetamos tu privacidad y procuramos recopilar
          únicamente la información necesaria para ofrecerte nuestros contenidos
          y servicios.
        </p>
      </header>

      <div className='mt-10 grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16'>
        <nav aria-label='Contenido del aviso de privacidad'>
          <p className='mb-4 text-sm font-bold'>En esta página</p>
          <ol className='space-y-2'>
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className='flex min-h-11 items-start gap-3 rounded-sm py-2 text-sm leading-6 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'
                >
                  <span aria-hidden='true' className='font-bold text-primary'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className='space-y-10'>
          {sections.map(section => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className='scroll-mt-8 border-b border-foreground/10 pb-10 last:border-b-0'
            >
              <h2
                id={`${section.id}-heading`}
                className='text-xl font-bold sm:text-2xl'
              >
                {section.title}
              </h2>
              <div className='mt-4 space-y-4 text-base leading-8 text-foreground/75'>
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
