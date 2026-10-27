import Link from 'next/link'
export default function GlobalNotFound() {
  return (
    <html lang='es'>
      <body>
        <h1>Ruta no encontrada / Page not found</h1>
        <Link href='/'>Inicio</Link> · <Link href='/en'>Home</Link>
      </body>
    </html>
  )
}
