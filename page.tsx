"use client";

import { useEffect, useMemo, useState } from "react";

type Category = {
  slug: string;
  label: string;
};

type SpecSection = {
  group: string;
  rows: {
    label: string;
    value: string;
  }[];
};

type OptionItem = {
  title: string;
  subtitle?: string;
  image?: string;
  placeholder?: boolean;
};

type SoftwareItem = {
  title: string;
  descriptionLines: string[];
  image: string;
};

type GalleryItem = {
  image: string;
  title: string;
};

type Product = {
  slug: string;
  category: string;
  title: string;
  categoryLabel: string;
  type: string;
  image: string;
  subtitle: string;
  description: string;
  overview: string;
  features: string[];
  gallery: GalleryItem[];
  specs?: SpecSection[];
  options?: OptionItem[];
  softwareItems?: SoftwareItem[];
};

type ShowcaseCard = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageScale?: string;
  imageTranslate?: string;
};

const navItems = [
  { label: "제품소개", target: "products" },
  { label: "회사소개", target: "footer-cta" },
];

const heroImages = ["/hero/1.jpg", "/hero/2.jpg", "/hero/3.jpg", "/hero/4.jpg"];

const categories: Category[] = [
  { slug: "all", label: "전체" },
  { slug: "sem", label: "주사전자현미경" },
  { slug: "normal-sem", label: "Normal SEM" },
  { slug: "tem", label: "TEM" },
  { slug: "ion-coater", label: "Ion Coater" },
];

const im10Specs: SpecSection[] = [
  {
    group: "Environmental requirements",
    rows: [{ label: "", value: "AC 220V, 50Hz, 1kW, No shock absorbing stage required" }],
  },
  {
    group: "Accelerating voltage",
    rows: [
      {
        label: "",
        value:
          "3kV~20kV Continuously adjustable, 1kV stepping (Optional high-end version, with an acceleration voltage up to 30kV)",
      },
    ],
  },
  {
    group: "Electron gun",
    rows: [
      {
        label: "",
        value:
          "Pre-centered tungsten filament, one-piece condenser lens, no need to manually adjust the objective diaphragm",
      },
    ],
  },
  {
    group: "Magnification",
    rows: [{ label: "", value: "25 ~ 360000x" }],
  },
  {
    group: "Resolution",
    rows: [{ label: "", value: "4nm" }],
  },
  {
    group: "Detector",
    rows: [
      {
        label: "",
        value:
          "Secondary electron detector, Quad-segmented backscattered electron detector, and Integrated energy-dispersive spectrometer",
      },
    ],
  },
  {
    group: "Sample stage",
    rows: [
      {
        label: "",
        value: "Two axes: X: 60mm Y: 55mm, Three-axis and five-axis options are available",
      },
    ],
  },
  {
    group: "Extra-large sample chamber",
    rows: [{ label: "", value: "L185mm × W176mm × H125mm" }],
  },
  {
    group: "vacuum mode",
    rows: [
      {
        label: "",
        value: "High vacuum mode; Low vacuum mode (optional): 1-60Pa automatic control",
      },
    ],
  },
  {
    group: "Imaging mode",
    rows: [
      {
        label: "",
        value:
          "Video mode: 512 x 512 pixels, no need for small window scanning; Quick Sweep mode: 512 x 512 pixels\nSlow scan mode: 2048 x 2048 pixels; Image formats: BMP, TIFF, JPEG, PNG",
      },
    ],
  },
  {
    group: "Navigation function",
    rows: [
      {
        label: "",
        value:
          "Optical camera navigation and an in-chamber camera allow for real-time observation of the conditions inside the sample chamber.",
      },
    ],
  },
  {
    group: "Automatic function",
    rows: [
      {
        label: "",
        value: "Automatic brightness and contrast, automatic focusing, large image stitching",
      },
    ],
  },
  {
    group: "Dimensions",
    rows: [{ label: "", value: "650 × 370 × 642(mm)" }],
  },
  {
    group: "Expansion function",
    rows: [
      {
        label: "",
        value:
          "Compatible with ZEPTOOLS a variety of in-situ measurement sample stage (tensile stage, heating stage, TEC cooling stage and other in-situ test system)",
      },
    ],
  },
];

const defaultOptions: OptionItem[] = [
  {
    title: "MCM-100P",
    subtitle: "Ion spotter coater",
    image: "/products/options/mcm-100p.png",
  },
  {
    title: "EDS(Bruker)",
    image: "/products/options/eds-bruker.png",
  },
  {
    title: "EDS(Oxford)",
    image: "/products/options/eds-oxford.png",
  },
  { title: "Cooling stage", placeholder: true },
  { title: "EBSD", placeholder: true },
  { title: "Raman", placeholder: true },
  { title: "CL", placeholder: true },
  { title: "EBIC", placeholder: true },
];

const defaultSoftwareItems: SoftwareItem[] = [
  {
    title: "획기적으로 개선된 인터페이스",
    descriptionLines: [
      "새롭게 적용된 신규 UI로 더욱 간편하게 촬영 환경을 설정해보세요.",
      "최적의 접근성으로 기존 소프트웨어 대비 60% 더 빠른 결과물을 확인할 수 있습니다.",
      "· 더욱 큰 화면, 사용자 친화적 인터페이스 제공",
    ],
    image: "/products/software-main-1.jpg",
  },
  {
    title: "더욱 정교해진 제어 환경",
    descriptionLines: [
      "주요 촬영 조건과 장비 상태를 한 화면에서 빠르게 확인할 수 있습니다.",
      "작업 흐름을 단순화하여 분석 시간은 줄이고 운용 효율은 높였습니다.",
      "· 직관적인 제어 구성, 빠른 조건 전환 지원",
    ],
    image: "/products/software-main-2.jpg",
  },
  {
    title: "빠르고 직관적인 분석 워크플로우",
    descriptionLines: [
      "이미지 획득부터 확인, 분석까지 이어지는 과정을 더욱 자연스럽게 구성했습니다.",
      "초보 사용자도 쉽게 적응할 수 있도록 화면 구성을 단순하고 명확하게 개선했습니다.",
      "· 사용자 중심 설계, 빠른 분석 프로세스 제공",
    ],
    image: "/products/software-main-3.jpg",
  },
];

const defaultGallery: GalleryItem[] = [
  { image: "/products/results/result-1.jpg", title: "Industrial Testing" },
  { image: "/products/results/result-2.jpg", title: "Industrial Testing" },
  { image: "/products/results/result-3.jpg", title: "Biological Sample Testing" },
  { image: "/products/results/result-4.jpg", title: "Metallographic Inspection" },
  { image: "/products/results/result-5.jpg", title: "Biological Sample Testing" },
  { image: "/products/results/result-6.jpg", title: "Metallographic Inspection" },
  { image: "/products/results/result-7.jpg", title: "Surface Morphology" },
  { image: "/products/results/result-8.jpg", title: "Particle Analysis" },
  { image: "/products/results/result-9.jpg", title: "Microstructure Check" },
  { image: "/products/results/result-10.jpg", title: "Coating Effect Sample" },
];

function makeProduct(config: {
  slug: string;
  category: string;
  title: string;
  categoryLabel: string;
  type: string;
  image: string;
  subtitle: string;
  description: string;
  overview: string;
  features: string[];
  useSpecs?: boolean;
  useOptions?: boolean;
  useSoftware?: boolean;
  useGallery?: boolean;
}): Product {
  return {
    slug: config.slug,
    category: config.category,
    title: config.title,
    categoryLabel: config.categoryLabel,
    type: config.type,
    image: config.image,
    subtitle: config.subtitle,
    description: config.description,
    overview: config.overview,
    features: config.features,
    gallery: config.useGallery === false ? [] : defaultGallery,
    specs: config.useSpecs === false ? undefined : im10Specs,
    options: config.useOptions === false ? undefined : defaultOptions,
    softwareItems: config.useSoftware === false ? undefined : defaultSoftwareItems,
  };
}

const semProducts: Product[] = [
  makeProduct({
    slug: "sem-01",
    category: "sem",
    title: "SEM-01",
    categoryLabel: "주사전자현미경",
    type: "SEM",
    image: "/products/im-10.png",
    subtitle: "TABLETOP SEM",
    description: "탁상형 주사전자현미경 기본 모델",
    overview: "컴팩트한 설계와 안정적인 관찰 성능을 제공하는 주사전자현미경입니다.",
    features: ["컴팩트 설치", "쉬운 조작", "빠른 관찰", "교육·연구 활용"],
  }),
  makeProduct({
    slug: "sem-02",
    category: "sem",
    title: "SEM-02",
    categoryLabel: "주사전자현미경",
    type: "SEM",
    image: "/products/im-10.png",
    subtitle: "ADVANCED SEM",
    description: "확장 기능이 강화된 주사전자현미경 모델",
    overview: "분석 옵션과 사용자 편의성을 강화한 주사전자현미경 모델입니다.",
    features: ["확장성 강화", "고속 관찰", "쉬운 세팅", "연구 활용"],
  }),
  makeProduct({
    slug: "sem-03",
    category: "sem",
    title: "SEM-03",
    categoryLabel: "주사전자현미경",
    type: "SEM",
    image: "/products/im-10.png",
    subtitle: "HIGH PERFORMANCE SEM",
    description: "고성능 분석용 주사전자현미경 모델",
    overview: "정밀 관찰과 고해상도 분석에 적합한 고성능 주사전자현미경입니다.",
    features: ["고해상도", "정밀 분석", "안정적 운용", "산업·연구용"],
  }),
];

const normalSemProducts: Product[] = [
  makeProduct({
    slug: "im-18",
    category: "normal-sem",
    title: "IM-18",
    categoryLabel: "Normal SEM",
    type: "SEM",
    image: "/products/im-18.png",
    subtitle: "STANDARD SEM",
    description: "범용 분석과 안정적인 관찰을 위한 일반형 SEM 장비",
    overview:
      "연구와 산업 현장에서 폭넓게 활용할 수 있도록 해상도와 운용 안정성을 강화한 일반형 SEM 장비입니다.",
    features: ["고정밀 분석", "안정적인 운용", "다양한 시편 대응", "산업·연구용"],
  }),
];

const temProducts: Product[] = Array.from({ length: 20 }, (_, i) =>
  makeProduct({
    slug: `tem-${String(i + 1).padStart(2, "0")}`,
    category: "tem",
    title: `TEM-${String(i + 1).padStart(2, "0")}`,
    categoryLabel: "TEM",
    type: "TEM",
    image: "/products/im-20.png",
    subtitle: "TRANSMISSION ELECTRON MICROSCOPE",
    description: `투과전자현미경 기반의 고해상도 분석 장비 ${i + 1}`,
    overview: `나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 ${i + 1}번 모델입니다.`,
    features: ["고해상도 분석", "나노 구조 관찰", "정밀 데이터 확보", "연구용 최적화"],
    useOptions: false,
    useSoftware: false,
    useGallery: false,
  })
);

const ionCoaterProducts: Product[] = [
  makeProduct({
    slug: "ion-coater-a",
    category: "ion-coater",
    title: "Ion Coater A",
    categoryLabel: "Ion Coater",
    type: "COATER",
    image: "/products/ion-coater.png",
    subtitle: "ION COATING SOLUTION",
    description: "시편 표면 코팅과 전처리를 위한 이온 코터 장비",
    overview:
      "전자현미경 관찰 전 시편 표면을 안정적으로 코팅하여 더 좋은 분석 품질을 확보할 수 있는 장비입니다.",
    features: ["균일 코팅", "전처리 품질 향상", "간편한 운용", "다양한 시편 대응"],
    useOptions: false,
    useSoftware: false,
    useGallery: true,
  }),
];

const products: Product[] = [
  ...semProducts,
  ...normalSemProducts,
  ...temProducts,
  ...ionCoaterProducts,
];

function scrollToSection(id: string) {
  if (typeof window === "undefined") return;
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setQueryParams(params: Record<string, string | null>) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  });

  window.history.pushState({}, "", url.toString());
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function goToCategory(category: string) {
  setQueryParams({ category, product: null });
}

function goToProduct(slug: string, category?: string) {
  setQueryParams({ category: category ?? null, product: slug });
}

function clearAllViews() {
  setQueryParams({ category: null, product: null });
}

function clearProductViewToCategory(category: string) {
  setQueryParams({ category, product: null });
}

function useRouteState() {
  const [state, setState] = useState<{ category: string | null; product: string | null }>({
    category: null,
    product: null,
  });

  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      setState({
        category: params.get("category"),
        product: params.get("product"),
      });
    };

    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return state;
}

function TopNav({ dark = true }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseBg = dark ? "bg-[#08111b]/70" : "bg-white/90";
  const scrolledBg = dark ? "bg-[#08111b]/88" : "bg-white/95";
  const textColor = dark ? "text-white/80 hover:text-white" : "text-[#222] hover:text-[#1457b5]";
  const borderColor = dark ? "border-white/10" : "border-black/10";

  return (
    <header
      className={[
        "fixed left-1/2 top-0 z-50 flex w-full max-w-[1920px] -translate-x-1/2 items-center justify-between border-b px-8 lg:px-14",
        "transition-all duration-300 backdrop-blur-md",
        borderColor,
        scrolled ? `${scrolledBg} py-4 shadow-[0_8px_30px_rgba(0,0,0,0.16)]` : `${baseBg} py-5`,
      ].join(" ")}
    >
      <button onClick={clearAllViews} aria-label="홈으로 이동" className="transition hover:opacity-90">
        <img src="/logo.png" alt="ETS Logo" className="h-9 w-auto object-contain lg:h-11" />
      </button>

      <nav className="hidden items-center gap-10 lg:flex">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              if (item.target === "products") {
                clearAllViews();
                setTimeout(() => scrollToSection(item.target), 80);
              } else {
                scrollToSection(item.target);
              }
            }}
            className={`group relative text-[13px] font-semibold transition ${textColor}`}
          >
            {item.label}
            <span className="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#1457b5] transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </nav>

      <button className="flex h-10 w-10 items-center justify-center lg:hidden" aria-label="메뉴">
        <span className={dark ? "text-2xl text-white" : "text-2xl text-[#222]"}>≡</span>
      </button>
    </header>
  );
}

function PillButton({
  children,
  light = false,
  onClick,
}: {
  children: React.ReactNode;
  light?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex h-[44px] min-w-[150px] items-center justify-center rounded-full px-6 text-[13px] font-semibold transition duration-300",
        light
          ? "bg-white text-[#1457b5] hover:-translate-y-0.5 hover:bg-[#f3f7ff]"
          : "border border-white/30 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/18",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function GridCard({
  title,
  subtitle,
  description,
  image,
  imageScale = "scale-[1]",
  imageTranslate = "translate-x-0",
  heightClass,
  onClick,
}: {
  title: string;
  subtitle?: string;
  description: React.ReactNode;
  image: string;
  imageScale?: string;
  imageTranslate?: string;
  heightClass: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[6px] ${heightClass} cursor-pointer border border-[#e5e7eb] bg-white`}
    >
      <div className="absolute inset-0 flex items-center justify-end bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_58%,#f8fafc_100%)] pr-6 lg:pr-10">
        <img
          src={image}
          alt={title}
          className={["max-h-[90%] max-w-[65%] object-contain", imageScale, imageTranslate].join(" ")}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-8 pt-10 text-[#111] lg:px-10 lg:pb-10">
        {subtitle ? (
          <div className="mb-3 text-[11px] font-medium tracking-[0.12em] text-[#666]">{subtitle}</div>
        ) : null}

        <h3 className="text-[28px] font-extrabold leading-none lg:text-[36px]">{title}</h3>
        <div className="mt-4 max-w-[360px] text-[14px] leading-7 text-[#555]">{description}</div>

        <button className="mt-6 inline-flex h-[40px] w-[120px] items-center justify-center rounded-full border border-[#1457b5] text-[13px] text-[#1457b5] transition hover:bg-[#1457b5] hover:text-white">
          바로 가기
        </button>
      </div>
    </div>
  );
}

function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transform: "scale(1)",
    transformOrigin: "center",
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center",
    });
  };

  return (
    <div
      className="relative overflow-hidden rounded-[18px] border border-[#e5e7eb] bg-white"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <img
        src={src}
        alt={alt}
        className="h-[420px] w-full object-contain transition duration-200 ease-out"
        style={zoomStyle}
      />
    </div>
  );
}

function SpecificationTable({ specs }: { specs: SpecSection[] }) {
  return (
    <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
      <h2 className="text-[34px] font-bold tracking-[-0.03em] text-[#111]">Specification</h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-[24px] border border-[#2f7bc5]">
          <tbody>
            {specs.map((section, idx) => (
              <tr key={`${section.group}-${idx}`}>
                <td className="w-[280px] border-r border-t border-[#7fb2df] bg-[#0f67b2] px-4 py-4 text-[15px] font-semibold text-white first:border-t-0">
                  {section.group}
                </td>
                <td className="whitespace-pre-line border-t border-[#7fb2df] bg-white px-4 py-4 text-[15px] leading-7 text-[#2f5f93] first:border-t-0">
                  {section.rows[0]?.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function OptionsSection({ options }: { options: OptionItem[] }) {
  return (
    <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">OPTIONAL SYSTEM</div>
          <h2 className="mt-2 text-[34px] font-bold tracking-[-0.03em] text-[#111]">Options</h2>
          <p className="mt-3 text-[15px] leading-7 text-[#66707d]">
            장비 확장과 분석 기능 향상을 위한 다양한 옵션 구성을 제공합니다.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {options.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className="group rounded-[20px] border border-[#e6ebf2] bg-[#f8fafc] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1457b5] hover:bg-white hover:shadow-[0_16px_34px_rgba(20,87,181,0.12)]"
          >
            <div className="flex h-[180px] items-center justify-center rounded-[18px] border border-[#edf2f7] bg-white">
              {item.image && !item.placeholder ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-[145px] max-w-[145px] object-contain transition duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-[120px] w-[120px] items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#dbeafe_0%,#eff6ff_100%)] text-center">
                  <div>
                    <div className="text-[28px] font-bold leading-none text-[#1457b5]">+</div>
                    <div className="mt-2 text-[11px] font-semibold tracking-[0.14em] text-[#5f6f85]">
                      OPTION
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5">
              <h3 className="text-[20px] font-bold tracking-[-0.02em] text-[#111]">{item.title}</h3>
              {item.subtitle ? (
                <p className="mt-2 text-[14px] leading-6 text-[#6b7280]">{item.subtitle}</p>
              ) : (
                <p className="mt-2 text-[14px] leading-6 text-[#8a94a6]">Compatible optional module</p>
              )}
            </div>

            <div className="mt-5 h-px w-full bg-[#e5eaf1]" />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[12px] font-medium tracking-[0.08em] text-[#7a8798]">AVAILABLE OPTION</span>
              <span className="text-[18px] text-[#1457b5] transition group-hover:translate-x-1">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SoftwareSection({ items }: { items: SoftwareItem[] }) {
  return (
    <section className="space-y-8">
      {items.map((item, idx) => (
        <section
          key={`${item.title}-${idx}`}
          className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10"
        >
          <div className="max-w-[980px]">
            <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">SOFTWARE</div>
            <h2 className="mt-3 text-[32px] font-bold tracking-[-0.03em] text-[#111] lg:text-[40px]">
              {item.title}
            </h2>

            <div className="mt-5 space-y-2 text-[16px] leading-8 text-[#4b5563]">
              {item.descriptionLines.map((line, lineIdx) => (
                <p key={`${item.title}-line-${lineIdx}`}>{line}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[20px] border border-[#d9e1ea] bg-[#f8fafc]">
            <div className="border-b border-[#e5e7eb] bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f8_100%)] px-5 py-4">
              <div className="text-[14px] font-semibold text-[#334155]">Software Interface Preview</div>
            </div>

            <div className="bg-[#eef2f6] p-4 lg:p-6">
              <div className="overflow-hidden rounded-[14px] border border-[#cfd8e3] bg-[#dfe6ee] shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                <img src={item.image} alt={item.title} className="w-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}

function BeforeAfterSEM({
  afterSrc,
  title,
}: {
  afterSrc: string;
  title: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="group relative overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-black shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
        <img
          src={afterSrc}
          alt={`${title} before`}
          className="h-[300px] w-full object-cover blur-[2px] brightness-[0.7] contrast-[1.2]"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay"
          style={{
            backgroundImage: "url('/noise.png')",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-1 text-[12px] text-white">
          BEFORE (No Coating)
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-black shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
        <img
          src={afterSrc}
          alt={`${title} after`}
          className="h-[300px] w-full object-cover"
        />
        <div className="absolute left-4 top-4 rounded-full bg-[#1457b5] px-4 py-1 text-[12px] text-white">
          AFTER (Ion Coating)
        </div>
      </div>
    </div>
  );
}

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => setIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev + 1) % heroImages.length);

  return (
    <section
      id="home"
      className="relative h-[92vh] min-h-[700px] overflow-hidden cursor-pointer"
      onClick={() => setIsPaused((prev) => !prev)}
    >
      {heroImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`hero-slide-${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
            i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,13,0.62)_0%,rgba(5,10,17,0.36)_30%,rgba(6,12,20,0.18)_60%,rgba(6,12,20,0.10)_100%)]" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="이전 슬라이드"
        className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/25 px-3 py-2 text-xl text-white backdrop-blur transition duration-300 hover:bg-black/45"
      >
        ◀
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="다음 슬라이드"
        className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/25 px-3 py-2 text-xl text-white backdrop-blur transition duration-300 hover:bg-black/45"
      >
        ▶
      </button>

      <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
            aria-label={`슬라이드 ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition duration-300 ${
              i === index ? "bg-white" : "bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="relative z-20 flex h-full items-center justify-center px-6 pt-16 text-center lg:px-10">
        <div className="mx-auto max-w-[980px] text-white">
          <div className="mb-6 text-[12px] font-medium tracking-[0.16em] text-white/78">
            THE BEST 고성능 분석장비 솔루션
          </div>

          <h1 className="text-[38px] font-extrabold leading-[1.25] tracking-[-0.02em] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.62)] lg:text-[68px]">
            전자현미경 및 분석
            <br />
            장비 전문 기업
          </h1>

          <p className="mx-auto mt-6 max-w-[720px] text-[15px] leading-8 text-white/88 lg:text-[17px]">
            정밀관찰, 재료분석, 품질평가를 위한 전자현미경 및 분석장비 솔루션을 제공합니다.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PillButton onClick={() => scrollToSection("products")}>바로 보러가기</PillButton>
            <PillButton light onClick={() => scrollToSection("footer-cta")}>문의하기</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  const mainCategoryCards: ShowcaseCard[] = [
    {
      slug: "sem",
      title: "주사전자현미경",
      subtitle: "SCANNING ELECTRON MICROSCOPE",
      description: "3개의 주사전자현미경 제품 라인업",
      image: "/products/im-10.png",
      imageScale: "scale-[1.05]",
      imageTranslate: "translate-x-[2%]",
    },
    {
      slug: "normal-sem",
      title: "Normal SEM",
      subtitle: "NORMAL SCANNING ELECTRON MICROSCOPE",
      description: "범용 분석과 안정적인 관찰을 위한 일반형 SEM 장비",
      image: "/products/im-18.png",
      imageScale: "scale-[0.98]",
      imageTranslate: "translate-x-[4%]",
    },
    {
      slug: "tem",
      title: "TEM",
      subtitle: "TRANSMISSION ELECTRON MICROSCOPE",
      description: "20개의 TEM 제품 라인업",
      image: "/products/im-20.png",
      imageScale: "scale-[0.94]",
      imageTranslate: "translate-x-[3%]",
    },
    {
      slug: "ion-coater",
      title: "Ion Coater",
      subtitle: "ION COATING SOLUTION",
      description: "시편 표면 코팅과 전처리를 위한 이온 코터 장비",
      image: "/products/ion-coater.png",
      imageScale: "scale-[0.92]",
      imageTranslate: "translate-x-[1%]",
    },
  ];

  return (
    <section id="products" className="bg-[#08111b] px-4 py-14 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 px-2 text-center">
          <div className="text-[11px] font-medium tracking-[0.16em] text-white/50">PRODUCT LINE</div>
          <h2 className="mt-2 text-[28px] font-bold text-white lg:text-[40px]">제품 소개</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mainCategoryCards.map((item) => (
            <GridCard
              key={item.slug}
              title={item.title}
              subtitle={item.subtitle}
              description={<>{item.description}</>}
              image={item.image}
              imageScale={item.imageScale}
              imageTranslate={item.imageTranslate}
              heightClass="min-h-[320px] lg:min-h-[360px]"
              onClick={() => goToCategory(item.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryBanner({ title }: { title: string }) {
  return (
    <section className="relative h-[320px] overflow-hidden">
      <img src="/sub/sub-visual.jpg" alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,18,0.72)_0%,rgba(5,10,18,0.42)_55%,rgba(5,10,18,0.25)_100%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] items-end px-6 pb-12 lg:px-8">
        <div className="w-full">
          <div className="text-[12px] font-semibold tracking-[0.18em] text-white/70">PRODUCT</div>
          <h1 className="mt-4 text-[36px] font-bold tracking-[-0.03em] text-white lg:text-[62px]">{title}</h1>

          <div className="mt-5 flex items-center gap-3 text-[13px] text-white/80">
            <span>홈</span>
            <span>/</span>
            <span>제품소개</span>
            <span>/</span>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductListPage({ selectedCategory }: { selectedCategory: string }) {
  const activeCategory = selectedCategory || "all";
  const filteredProducts =
    activeCategory === "all" ? products : products.filter((item) => item.category === activeCategory);

  const currentCategoryName = categories.find((c) => c.slug === activeCategory)?.label ?? "제품소개";
  const visibleCategories =
    activeCategory === "all" ? categories : categories.filter((category) => category.slug === activeCategory);

  return (
    <main className="min-h-screen bg-[#f4f6f8]">
      <TopNav dark={false} />
      <CategoryBanner title={currentCategoryName} />

      <section className="bg-[linear-gradient(180deg,#f7f8fa_0%,#eef2f6_100%)] px-4 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 rounded-[28px] border border-white/70 bg-white/80 px-8 py-10 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="text-[12px] font-semibold tracking-[0.18em] text-[#1457b5]">PRODUCT CATEGORY</div>
            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-[34px] font-bold tracking-[-0.03em] text-[#111] lg:text-[52px]">
                  {currentCategoryName}
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-[#5b6472]">
                  선택한 카테고리의 제품을 한눈에 확인하실 수 있습니다.
                  <br className="hidden lg:block" />
                  장비별 상세 보기로 이동해 주요 특징과 구성을 확인해보세요.
                </p>
              </div>

              {activeCategory !== "all" && (
                <button
                  onClick={() => goToCategory("all")}
                  className="inline-flex h-[46px] items-center justify-center rounded-full border border-[#1457b5] bg-white px-6 text-[14px] font-semibold text-[#1457b5] transition hover:bg-[#1457b5] hover:text-white"
                >
                  전체 보기
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 rounded-[22px] border border-[#dbe3ec] bg-white p-2 shadow-[0_10px_25px_rgba(15,23,42,0.04)]">
            <div className="flex flex-wrap gap-2">
              {visibleCategories.map((category) => {
                const isActive = category.slug === activeCategory;
                return (
                  <button
                    key={category.slug}
                    onClick={() => goToCategory(category.slug)}
                    className={[
                      "inline-flex h-[46px] min-w-[140px] items-center justify-center rounded-full px-5 text-[14px] font-medium transition",
                      isActive
                        ? "bg-[#1457b5] text-white shadow-[0_10px_22px_rgba(20,87,181,0.22)]"
                        : "bg-[#f7f9fc] text-[#5e6775] hover:bg-[#edf3fb] hover:text-[#1457b5]",
                    ].join(" ")}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="text-[14px] text-[#6a7380]">
              <span className="font-semibold text-[#111]">Total {filteredProducts.length}</span> / 1 page
            </div>

            <button className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#d7dee8] bg-white text-[18px] text-[#95a1b2] transition hover:border-[#1457b5] hover:text-[#1457b5]">
              ⌕
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.slug}
                className="group overflow-hidden rounded-[24px] border border-[#dde5ee] bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1457b5] hover:shadow-[0_20px_45px_rgba(20,87,181,0.14)]"
              >
                <div className="relative flex h-[290px] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fbfcfd_0%,#f2f5f8_100%)] p-8">
                  <div className="absolute inset-x-0 top-0 h-[4px] bg-[#1457b5] opacity-0 transition duration-300 group-hover:opacity-100" />
                  <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                </div>

                <div className="px-6 pb-8 pt-6">
                  <div className="text-[13px] font-semibold tracking-[0.04em] text-[#1457b5]">{product.type}</div>
                  <div className="mt-2 text-[14px] text-[#505a67]">{product.categoryLabel}</div>
                  <div className="mt-3 text-[28px] font-bold leading-tight tracking-[-0.03em] text-[#111]">
                    {product.title}
                  </div>
                  <div className="mt-3 min-h-[44px] text-[14px] leading-6 text-[#66707d]">{product.description}</div>

                  <button
                    onClick={() => goToProduct(product.slug, product.category)}
                    className="mt-7 inline-flex h-[46px] min-w-[170px] items-center justify-between rounded-full border border-[#1457b5] px-5 text-[14px] font-semibold text-[#1457b5] transition-all duration-300 hover:bg-[#1457b5] hover:text-white"
                  >
                    <span>More Detail</span>
                    <span className="ml-6">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
      <SiteFooter />
    </main>
  );
}

function ProductDetailPage({ product }: { product: Product }) {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);

  const selectedGalleryItem =
    selectedGalleryIndex !== null ? product.gallery[selectedGalleryIndex] ?? null : null;

  const closeModal = () => setSelectedGalleryIndex(null);

  const goPrev = () => {
    if (selectedGalleryIndex === null) return;
    setSelectedGalleryIndex(
      selectedGalleryIndex === 0 ? product.gallery.length - 1 : selectedGalleryIndex - 1
    );
  };

  const goNext = () => {
    if (selectedGalleryIndex === null) return;
    setSelectedGalleryIndex(
      selectedGalleryIndex === product.gallery.length - 1 ? 0 : selectedGalleryIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedGalleryIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedGalleryIndex]);

  return (
    <main className="min-h-screen bg-[#f4f4f4]">
      <TopNav dark={false} />
      <CategoryBanner title={product.categoryLabel} />

      <section className="px-4 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1280px] space-y-8">
          <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
            <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">
              {product.categoryLabel}
            </div>
            <h1 className="mt-3 text-[38px] font-bold tracking-[-0.03em] text-[#111] lg:text-[54px]">
              {product.title}
            </h1>
            <div className="mt-2 text-[18px] font-medium text-[#666]">{product.subtitle}</div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <ZoomImage src={product.image} alt={product.title} />

              <div>
                <div className="text-[15px] leading-8 text-[#444]">{product.overview}</div>

                <div className="mt-8">
                  <div className="text-[20px] font-bold text-[#111]">핵심 특징</div>
                  <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#444]">
                    {product.features.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[10px] h-[6px] w-[6px] rounded-full bg-[#1457b5]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="inline-flex h-[44px] items-center justify-center rounded-full bg-[#1457b5] px-6 text-[14px] font-medium text-white transition hover:opacity-90">
                    제품문의
                  </button>
                  {product.category !== "ion-coater" && product.gallery.length > 0 ? (
                    <button
                      onClick={() => scrollToSection("detail-gallery")}
                      className="inline-flex h-[44px] items-center justify-center rounded-full border border-[#1457b5] px-6 text-[14px] font-medium text-[#1457b5] transition hover:bg-[#1457b5] hover:text-white"
                    >
                      장비 상세 보기
                    </button>
                  ) : null}
                  <button
                    onClick={() => clearProductViewToCategory(product.category)}
                    className="inline-flex h-[44px] items-center justify-center rounded-full border border-[#d0d7e2] px-6 text-[14px] font-medium text-[#555] transition hover:border-[#1457b5] hover:text-[#1457b5]"
                  >
                    목록으로 돌아가기
                  </button>
                </div>
              </div>
            </div>
          </section>

          {product.softwareItems && product.softwareItems.length > 0 ? (
            <SoftwareSection items={product.softwareItems} />
          ) : null}

          {product.category === "ion-coater" && product.gallery.length > 0 ? (
            <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
              <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">
                BEFORE / AFTER COMPARISON
              </div>
              <h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-[#111]">
                Ion Coating 전 / 후 비교
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-[#66707d]">
                동일 이미지를 기반으로 코팅 전 느낌과 코팅 후 결과를 직관적으로 비교할 수 있습니다.
              </p>

              <div className="mt-8 space-y-8">
                {product.gallery.slice(0, 10).map((item, idx) => (
                  <BeforeAfterSEM key={`${item.title}-${idx}`} afterSrc={item.image} title={item.title} />
                ))}
              </div>
            </section>
          ) : null}

          {product.specs && product.specs.length > 0 ? (
            <SpecificationTable specs={product.specs} />
          ) : null}

          {product.options && product.options.length > 0 ? (
            <OptionsSection options={product.options} />
          ) : null}

          {product.category !== "ion-coater" && product.gallery.length > 0 ? (
            <section
              id="detail-gallery"
              className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10"
            >
              <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">
                APPLICATION IMAGE
              </div>
              <h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-[#111]">
                장비로 촬영한 이미지
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-[#66707d]">
                실제 장비를 통해 획득한 샘플 이미지를 확인하실 수 있습니다.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {product.gallery.map((item, idx) => (
                  <button
                    key={`${product.slug}-${idx}`}
                    type="button"
                    onClick={() => setSelectedGalleryIndex(idx)}
                    className="group overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-white text-left shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)]"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-[270px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />

                      <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-10">
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="mb-1 text-[11px] font-semibold tracking-[0.16em] text-white/70">
                              ANALYSIS IMAGE
                            </div>
                            <div className="text-[17px] font-semibold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
                              {item.title}
                            </div>
                          </div>

                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition duration-500 group-hover:translate-x-1 group-hover:bg-white/20">
                            →
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>

      <FooterCTA />
      <SiteFooter />

      {selectedGalleryItem ? (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-[1280px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeModal}
              className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20"
              aria-label="닫기"
            >
              ×
            </button>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-2xl text-white backdrop-blur-sm transition hover:bg-black/55"
              aria-label="이전 이미지"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-2xl text-white backdrop-blur-sm transition hover:bg-black/55"
              aria-label="다음 이미지"
            >
              ›
            </button>

            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111827] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.16em] text-white/50">
                    ANALYSIS IMAGE
                  </div>
                  <div className="mt-1 text-[20px] font-semibold text-white">
                    {selectedGalleryItem.title}
                  </div>
                </div>

                <div className="text-[13px] text-white/55">
                  {selectedGalleryIndex! + 1} / {product.gallery.length}
                </div>
              </div>

              <div className="flex items-center justify-center bg-black px-4 py-4 lg:px-8 lg:py-8">
                <img
                  src={selectedGalleryItem.image}
                  alt={selectedGalleryItem.title}
                  className="max-h-[80vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function FooterCTA() {
  return (
    <section id="footer-cta" className="relative overflow-hidden">
      <img
        src="/images/footer-bg.jpg"
        alt="contact background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-12 text-white lg:px-8 lg:py-14">
        <h2 className="text-center text-[24px] font-bold tracking-[-0.03em] lg:text-[36px]">
          정확한 제품과 서비스, 빠른 납기
        </h2>

        <div className="mx-auto mt-5 h-px w-full max-w-[900px] bg-white/30" />

        <div className="mt-10 flex justify-center">
          <div className="flex w-full max-w-[700px] justify-between gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="text-[18px] font-bold lg:text-[20px]">최첨단 SEM 전문</div>
              <p className="mt-4 text-[14px] leading-7 text-white/85">
                산업 전반에 걸쳐 정밀한 분석과
                <br />
                품질 관리를 지원하고 있습니다.
              </p>
              <button className="mt-5 inline-flex h-[40px] min-w-[110px] items-center justify-center rounded-full border border-white/80 px-4 text-[13px] font-medium transition hover:bg-white hover:text-black">
                회사소개
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="text-[18px] font-bold lg:text-[20px]">제품문의</div>
              <p className="mt-4 text-[14px] leading-7 text-white/85">
                빠르고 정확하게
                <br />
                답변해 드립니다.
              </p>
              <button className="mt-5 inline-flex h-[40px] min-w-[110px] items-center justify-center rounded-full border border-white/80 px-4 text-[13px] font-medium transition hover:bg-white hover:text-black">
                제품문의
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-black px-6 py-12 text-white lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1520px]">
        <div className="flex flex-wrap gap-10 border-b border-white/20 pb-10 text-[18px] font-semibold">
          <button className="transition hover:text-[#7fb2ff]">회사소개</button>
          <button className="transition hover:text-[#7fb2ff]">개인정보처리방침</button>
          <button className="transition hover:text-[#7fb2ff]">오시는 길</button>
        </div>

        <div className="pt-10 text-[18px] leading-9 text-white/88">
          <div>
            • <span className="font-bold">ADDR</span> : 경기도 화성시 동탄대로 646-4 1110~2호(메가비즈타워 B동)
          </div>
          <div>
            • <span className="font-bold">TEL</span> : 010-8615-7424,{" "}
            <span className="font-bold">E-MAIL</span> : Danielkim@ets88.co.kr
          </div>
        </div>

        <div className="mt-10 text-[16px] text-white/70">COPYRIGHT © 2020 ETS ALL RIGHTS RESERVED</div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <TopNav />
      <HeroSlider />
      <ProductShowcase />
      <FooterCTA />
      <SiteFooter />
    </main>
  );
}

export default function Page() {
  const { category, product } = useRouteState();

  const selectedProduct = useMemo(() => {
    if (!product) return null;
    return products.find((item) => item.slug === product) ?? null;
  }, [product]);

  if (selectedProduct) {
    return <ProductDetailPage product={selectedProduct} />;
  }

  if (category) {
    return <ProductListPage selectedCategory={category} />;
  }

  return <HomePage />;
}