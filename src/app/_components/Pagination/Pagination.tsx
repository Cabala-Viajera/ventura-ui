import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  query?: string
}

const SIBLINGS = 2

const getPageHref = (basePath: string, page: number, query?: string) => {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (page > 1) params.set('page', String(page))
  const search = params.toString()
  return search ? `${basePath}?${search}` : basePath
}

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const start = Math.max(1, currentPage - SIBLINGS)
  const end = Math.min(totalPages, currentPage + SIBLINGS)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const linkClass =
  'inline-flex min-w-11 min-h-11 items-center justify-center px-3 py-2 rounded-lg text-center text-sm sm:text-base font-bold text-primary border border-primary hover:opacity-80 transition-opacity'

const Pagination = ({
  currentPage,
  totalPages,
  basePath,
  query,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav
      aria-label='Paginación'
      className='flex flex-wrap items-center justify-center gap-2 mt-8 sm:mt-10'
    >
      {currentPage > 1 && (
        <Link
          href={getPageHref(basePath, currentPage - 1, query)}
          className={linkClass}
          aria-label='Página anterior'
          rel='prev'
        >
          Anterior
        </Link>
      )}
      {getVisiblePages(currentPage, totalPages).map(page =>
        page === currentPage ? (
          <span
            key={page}
            aria-current='page'
            className='inline-flex min-w-11 min-h-11 items-center justify-center px-3 py-2 rounded-lg text-center text-sm sm:text-base font-bold text-white bg-primary border border-primary'
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={getPageHref(basePath, page, query)}
            className={linkClass}
            aria-label={`Página ${page}`}
          >
            {page}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link
          href={getPageHref(basePath, currentPage + 1, query)}
          className={linkClass}
          aria-label='Página siguiente'
          rel='next'
        >
          Siguiente
        </Link>
      )}
    </nav>
  )
}

export default Pagination
