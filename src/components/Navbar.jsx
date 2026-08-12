const links = [
  {
    name: "Home",
    link: "home",
  },
  {
    name: "Experience",
    link: "experience",
  },
  {
    name: "Skills",
    link: "skills",
  },
  {
    name: "Projects",
    link: "projects",
  },
];

function Navbar() {
  return (
    <header className="flex justify-between py-4 px-16 border-b border-b-outline-variant/30 bg-surface/70">
      <div className="font-serif4 font-bold text-2xl text-primary">
        Sabarivasan Sankar
      </div>
      <div className="gap-8 items-center hidden md:flex">
        {links.map((link) => (
          <div className="font-inter" key={link.id} href={`#{link.link}`}>
            {link.name}
          </div>
        ))}
      </div>
      <button className="btn-contained h-fit">Resume</button>
    </header>
  );
}

export default Navbar;
