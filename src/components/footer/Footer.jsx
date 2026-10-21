function Footer() {
  const links = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "API Documentation", href: "#" },
    { label: "Support", href: "#" },
  ];

  return (
    <footer className="flex w-full flex-col gap-6 bg-slate-100 px-6 py-10 text-xs font-bold tracking-wider text-slate-500 uppercase sm:flex-row sm:items-center sm:justify-between sm:px-12">
      <p className="">&copy; 2026 Shortlink. The Digital Architect.</p>

      {links.length > 0 && (
        <ul className="flex flex-col  gap-y-3 sm:flex-row sm:gap-x-6 sm:justify-end">
          {links.map((link) => (
            <li key={link.label}>
              <a
                className="transition-colors hover:text-slate-800 focus:outline-none focus:underline"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </footer>
  );
}

export default Footer;
