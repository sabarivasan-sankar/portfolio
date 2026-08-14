const SectionHeading = ({ index, label, title, align = "left" }) => (
  <div className={`section-heading-wrap ${align === "center" ? "text-center mx-auto" : ""}`}>
    <div
      className={`section-label font-jet text-sm text-secondary tracking-widest uppercase pb-3 flex items-center gap-2 ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >

      <span className="text-outline">{index}</span>
      <span>{label}</span>
    </div>
    <h2 className="section-title font-serif4 font-bold text-4xl md:text-5xl tracking-tight text-on-surface leading-tight">
      {title}
    </h2>
  </div>
);

export default SectionHeading;
