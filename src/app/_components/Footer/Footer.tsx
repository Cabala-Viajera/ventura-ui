'use client'

import React from 'react'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  sections?: FooterSection[]
  socialLinks?: FooterLink[]
  copyrightText?: string
}

const Footer: React.FC<FooterProps> = ({
  sections = [],
  socialLinks = [],
  copyrightText = '© 2024 All rights reserved.',
}) => {
  return (
    <footer className='bg-primary text-gray-300 py-12'>
      <div className='container mx-auto px-4'>
        {/* Footer Sections */}
        {sections.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className='text-white font-semibold mb-4'>
                  {section.title}
                </h3>
                <ul className='space-y-2'>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className='hover:text-white transition-colors duration-200'
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className='flex justify-center gap-6 mb-8'>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-white transition-colors duration-200'
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Bottom Bar */}
        <div className='border-t border-white pt-8'>
          <p className='text-center text-white text-md'>{copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
