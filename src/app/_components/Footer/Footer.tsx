import { FooterProps } from '@models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { NewsletterForm } from '../NewsletterForm'

const Footer: React.FC<FooterProps> = ({
  socialLinks = [],
  copyrightText = '© 2024 All rights reserved.',
}) => {
  return (
    <footer className='bg-primary text-gray-300 py-12'>
      <div className='container mx-auto px-4'>
        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className='flex justify-end gap-6 mb-8'>
            {socialLinks.map((link, index) =>
              link.url ? (
                <Link
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  key={index}
                >
                  <FontAwesomeIcon icon={link.icon} className='text-2xl' />
                </Link>
              ) : (
                ''
              )
            )}
          </div>
        )}

        <NewsletterForm />

        {/* Bottom Bar */}
        <div className='border-t border-white pt-8'>
          <p className='text-center text-white text-md'>{copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
