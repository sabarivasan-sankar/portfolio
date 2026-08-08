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
    <nav className="flex justify-between py-4 px-16 border-b border-b-outline-variant/30 bg-surface/70">
      <div className="font-serif4 font-bold text-2xl text-primary">
        Sabarivasan Sankar
      </div>
      <div className="flex gap-8 items-center">
        {links.map((link) => (
          <div className="font-inter" href={`#{link.link}`}>{link.name}</div>
        ))}
      </div>
      <div>
        <button className="btn-contained">Resume</button>
      </div>
    </nav>
  );
}

export default Navbar;
