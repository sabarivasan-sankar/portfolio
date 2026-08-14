const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z"
    />
  </svg>
);

export const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.26ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

export const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
);

export const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
    <path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C9.6 20.6 3.4 14.4 3.4 6.9c0-.6.4-1 1-1H7.8c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2 2Z" />
  </svg>
);

export const MapPinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
    <path d="M12 21.5s7-6.3 7-11.9A7 7 0 0 0 5 9.6c0 5.6 7 11.9 7 11.9Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const MenuIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
    <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const ArrowUpRightIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ExternalLinkIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
    <path d="M9 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
    <path d="M14 4h6v6M10 14 20 4" />
  </svg>
);

export const AwardIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
    <circle cx="12" cy="8.5" r="5.5" />
    <path d="M8.2 13.3 6.5 21l5.5-3 5.5 3-1.7-7.7" />
  </svg>
);
