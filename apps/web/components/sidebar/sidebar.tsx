import Image from 'next/image';
// Components
import SidebarLink, { SidebarLinkProps } from './link';

const SIDEBAR_LINKS: SidebarLinkProps[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/upload',
    label: 'Upload',
  },
  {
    href: '/notes',
    label: 'Notes',
  },
];

const USEFUL_LINKS: SidebarLinkProps[] = [
  {
    href: 'https://github.com/DiegoRSM03/lime',
    label: 'Github Repo',
    target: '_blank',
  },
];

const Sidebar = () => {
  return (
    <aside className="w-72 h-screen bg-linear-to-b from-gray-950 to-gray-900 text-white shrink-0 border-r border-gray-800 py-10 px-6">
      <div className="flex flex-col h-full justify-between">
        <div className="w-full">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="aspect-square rounded-full"
            />
            <span className="text-2xl font-bold">Lime</span>
          </div>
          <ul className="mt-10 space-y-2">
            {SIDEBAR_LINKS.map((link) => (
              <li key={link.href}>
                <SidebarLink key={link.href} {...link} />
              </li>
            ))}
          </ul>
        </div>

        <ul className="space-y-2">
          {USEFUL_LINKS.map((link) => (
            <li key={link.href}>
              <SidebarLink key={link.href} {...link} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
