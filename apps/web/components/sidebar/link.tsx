import Link from 'next/link';

export interface SidebarLinkProps {
  href: string;
  label: string;
  target?: string;
}

const SidebarLink = ({ href, label, target }: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      target={target}
      className="flex items-center gap-2 h-10 px-3 rounded-lg bg-lime-950 hover:bg-lime-900 transition-colors duration-200"
    >
      <span className="text-base font-medium">{label}</span>
    </Link>
  );
};

export default SidebarLink;
