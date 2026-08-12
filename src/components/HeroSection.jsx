import { cn } from "../lib/utils";

const HeroSection = () => {
  return (
    <section id="home" className="p-4 flex justify-around items-center-safe flex-wrap gap-6 min-h-[calc(100vh-73px)]">
      <div className="content elative flex flex-col gap-8 ">
        <div className="absolute top-0 left-20 w-120 h-120 rounded-full bg-secondary-fixed/10 blur-3xl pointer-events-none -z-10" />
        <div className="name-and-role">
          <div className="font-jet text-sm text-secondary leading-5 tracking-widest pb-3">
            HELLO, WORLD.
          </div>
          <div className="font-serif4 font-bold text-[64px] tracking-tight text-on-surface leading-18">
            Sabarivasan Sankar
          </div>
          <div className="font-serif4 font-bold text-[64px] tracking-tight leading-18">
            Full Stack Developer
          </div>
        </div>
        <div className="font-inter">
          Crafting elegant solutions to complex problems. Specializing in modern 
          web architectures,<br/> scalable backends, and intuitive user experiences.
        </div>
        <div className="flex gap-4">
          <button className="btn-contained py-4 px-8 rounded-sm">
            View Work
          </button>
          <button className="btn-outlined py-4 px-8 rounded-sm">
            Get in Touch
          </button>
        </div>
      </div>
      <div className="code">
        <div className="shadow-secondary-fixed all-shadow">
          <div className="flex bg-inverse-surface border border-outline-variant/20 px-4 py-3 rounded-t-xl justify-between items-center">
            <div className="flex gap-2">
              <div className="bg-error size-3 rounded-xl shrink-0" />
              <div className="bg-surface-tint size-3 rounded-xl" />
              <div className="bg-secondary-fixed size-3 rounded-xl" />
            </div>
            <div className="text-outline font-jet">developer.js</div>
            <div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 9.33333C3.17917 9.33333 2.90451 9.2191 2.67604 8.99063C2.44757 8.76215 2.33333 8.4875 2.33333 8.16667V1.16667C2.33333 0.845833 2.44757 0.571181 2.67604 0.342708C2.90451 0.114236 3.17917 0 3.5 0H8.75C9.07083 0 9.34549 0.114236 9.57396 0.342708C9.80243 0.571181 9.91667 0.845833 9.91667 1.16667V8.16667C9.91667 8.4875 9.80243 8.76215 9.57396 8.99063C9.34549 9.2191 9.07083 9.33333 8.75 9.33333H3.5ZM3.5 8.16667H8.75V1.16667H3.5V8.16667ZM1.16667 11.6667C0.845833 11.6667 0.571181 11.5524 0.342708 11.324C0.114236 11.0955 0 10.8208 0 10.5V2.33333H1.16667V10.5H7.58333V11.6667H1.16667ZM3.5 8.16667V1.16667V8.16667Z"
                  fill="#707974"
                />
              </svg>
            </div>
          </div>
          <div className="bg-[#0F172A] p-6 font-jet rounded-b-xl pr-20">
            <span className="text-tertiary-fixed">const </span>
            <span className="text-secondary-fixed">developer</span>
            <span className="text-surface-variant">{` = {`}</span>
            <br />
            <span className="text-inverse-primary pl-9">name</span>
            <span className="text-surface-variant">: </span>
            <span className="text-on-tertiary-container">
              'Sabarivasan Sankar'
            </span>
            <span className="text-surface-variant">,</span>
            <br />
            <span className="text-inverse-primary pl-9">role</span>
            <span className="text-surface-variant">: </span>
            <span className="text-on-tertiary-container">
              'Full Stack Developer'
            </span>
            <span className="text-surface-variant">,</span>
            <br />
            <span className="text-inverse-primary pl-9">skills</span>
            <span className="text-surface-variant">{": ["}</span>
            <br />
            <span className="text-on-tertiary-container pl-18">
              'Typescript'
            </span>
            <span className="text-surface-variant">,</span>
            <br />
            <span className="text-on-tertiary-container pl-18">'React'</span>
            <span className="text-surface-variant">,</span>
            <br />
            <span className="text-on-tertiary-container pl-18">'Node.js'</span>
            <span className="text-surface-variant">,</span>
            <br />
            <span className="text-on-tertiary-container pl-18">
              'PostgreSQL'
            </span>
            <span className="text-surface-variant">,</span>
            <br />
            <span className="text-surface-variant pl-9">{"],"}</span>
            <br />
            <span className="text-inverse-primary pl-9">passion</span>
            <span className="text-surface-variant">: </span>
            <span className="text-on-tertiary-container">
              'Building scalable systems'
            </span>
            <span className="text-surface-variant">,</span>
            <br />
            <span className="text-inverse-primary pl-9">status</span>
            <span className="text-surface-variant">: </span>
            <span className="text-on-tertiary-container">
              'Open to new challenges'
            </span>
            <span className="text-surface-variant">,</span>
            <br />
            <span className="text-surface-variant">{"};"}</span>
            <br />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
