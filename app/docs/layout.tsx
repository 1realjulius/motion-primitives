'use client';
import { ScrollArea } from '@/components/website/scroll-area';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { TableOfContents } from '@/components/website/table-of-contents';
import LaunchBanner from '@/components/website/launch-banner';
import { Header } from '@/components/website/header';

type NavigationItem = {
  name: string;
  href: string;
  isNew?: boolean;
  isUpdated?: boolean;
};

type NavigationGroup = {
  name: string;
  children: NavigationItem[];
};

const NAVIGATION: NavigationGroup[] = [
  {
    name: 'Getting started',
    children: [
      {
        name: 'Introduction',
        href: '/docs',
      },
      {
        name: 'Installation',
        href: '/docs/installation',
      },
    ],
  },
  {
    name: 'Core Components',
    children: [
      {
        name: 'Accordion',
        href: '/docs/accordion',
      },
      {
        name: 'Animated Background',
        href: '/docs/animated-background',
      },
      {
        name: 'Animated Group',
        href: '/docs/animated-group',
      },
      {
        name: 'Animated Number',
        href: '/docs/animated-number',
      },
      {
        name: 'Border Trail',
        href: '/docs/border-trail',
      },
      {
        name: 'Carousel',
        href: '/docs/carousel',
      },
      {
        name: 'Cursor',
        href: '/docs/cursor',
      },
      {
        name: 'Dialog',
        href: '/docs/dialog',
      },
      {
        name: 'Disclosure',
        href: '/docs/disclosure',
      },
      {
        name: 'In View',
        href: '/docs/in-view',
      },
      {
        name: 'Infinite Slider',
        href: '/docs/infinite-slider',
      },
      {
        name: 'Transition Panel',
        href: '/docs/transition-panel',
      },
    ],
  },
  {
    name: 'Text',
    children: [
      {
        name: 'Text Effect',
        href: '/docs/text-effect',
      },
      {
        name: 'Text Loop',
        href: '/docs/text-loop',
        isNew: true,
      },
      {
        name: 'Text Morph',
        href: '/docs/text-morph',
      },
      {
        name: 'Text Scramble',
        href: '/docs/text-scramble',
        isNew: true,
      },
      {
        name: 'Text Shimmer',
        href: '/docs/text-shimmer',
        isNew: true,
      },
    ],
  },
  {
    name: 'Extras Components',
    children: [
      {
        name: 'Dock',
        href: '/docs/dock',
      },
      {
        name: 'Image Comparison',
        href: '/docs/image-comparison',
        isNew: true,
      },
      {
        name: 'Toolbar Dynamic',
        href: '/docs/toolbar-dynamic',
      },
      {
        name: 'Toolbar Expandable',
        href: '/docs/toolbar-expandable',
      },
      {
        name: 'Popover',
        href: '/docs/popover',
      },
      {
        name: 'Scroll Progress',
        href: '/docs/scroll-progress',
      },
      {
        name: 'Spotlight',
        href: '/docs/spotlight',
        isNew: true,
      },
      {
        name: 'Spinning Text',
        href: '/docs/spinning-text',
      },
    ],
  },
];

function NavigationDesktop() {
  const pathname = usePathname();
  const activeRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      });
    }
  }, [pathname]);

  return (
    <aside className='sticky top-14 hidden h-[calc(100dvh-theme(spacing.16))] w-[220px] shrink-0 pt-8 md:block lg:pt-12'>
      <ScrollArea className='h-full w-full'>
        <nav>
          <ul role='list' className='h-full'>
            {NAVIGATION.map((item, index) => {
              return (
                <li className='mb-6' key={`${item.name}-${index}`}>
                  <div className='text-sm/6 font-[450] text-zinc-950 dark:text-white'>
                    {item.name}
                  </div>
                  <ul
                    role='list'
                    className='mt-4 space-y-3.5 border-l border-zinc-200 dark:border-zinc-800'
                  >
                    {item.children.map((child) => {
                      const isActive = pathname === child.href;

                      return (
                        <li key={child.href} ref={isActive ? activeRef : null}>
                          <Link
                            className={cn(
                              'relative inline-flex items-center space-x-1 pl-4 text-sm font-normal text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white',
                              isActive &&
                                'text-zinc-950 before:absolute before:inset-y-0 before:left-[-1.5px] before:w-[2px] before:rounded-full before:bg-zinc-950 dark:text-white dark:before:bg-white'
                            )}
                            href={child.href}
                          >
                            <span>{child.name}</span>
                            {child?.isNew && (
                              <span className='whitespace-nowrap rounded-lg bg-emerald-100 px-2 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-50'>
                                New
                              </span>
                            )}
                            {child?.isUpdated && (
                              <span className='whitespace-nowrap rounded-lg bg-amber-100 px-2 text-[10px] font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-50'>
                                Updated
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
      </ScrollArea>
    </aside>
  );
}

function NavigationMobile() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedHref, setSelectedHref] = React.useState(pathname);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const href = e.target.value;
    setSelectedHref(href);
    router.push(href);
  };

  return (
    <div className='block w-full pt-8 md:hidden'>
      <select
        className='block w-full appearance-none rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white'
        value={selectedHref}
        onChange={handleChange}
      >
        {NAVIGATION.map((item) => {
          return (
            <optgroup label={item.name} key={item.name}>
              {item.children.map((child) => (
                <option key={child.href} value={child.href}>
                  {child.name}
                </option>
              ))}
            </optgroup>
          );
        })}
      </select>
    </div>
  );
}

export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LaunchBanner />
      <Header />
      <div className='px-6 lg:px-8'>
        <div className='mx-auto md:max-w-7xl'>
          <div className='mx-auto flex w-full flex-col items-start md:flex-row md:space-x-12'>
            <NavigationDesktop />
            <NavigationMobile />
            <main className='prose prose-zinc min-w-0 max-w-full flex-1 pb-16 pt-8 dark:prose-invert prose-h1:scroll-m-20 prose-h1:text-2xl prose-h1:font-semibold prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:font-medium prose-h3:scroll-m-20 prose-h3:text-base prose-h3:font-medium prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20 prose-strong:font-medium prose-table:block prose-table:overflow-y-auto lg:pt-12 xl:max-w-2xl'>
              {children}
            </main>
            <aside className='sticky top-14 hidden h-[calc(100dvh-theme(spacing.16))] w-[220px] shrink-0 pt-8 lg:pt-12 xl:block'>
              <ScrollArea className='h-full w-full'>
                <TableOfContents />
              </ScrollArea>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
