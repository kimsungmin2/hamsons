import skid from "@/assets/categories/loader-category.png";
import excavator from "@/assets/categories/excavator-category.png";
import loader from "@/assets/categories/wheel-loader-category.png";
import attachmentImg from "@/assets/categories/attachment-category.png";
import hero from "@/assets/hero-excavator.jpg";
import s590Main from "@/assets/products/S590-main.png";
import s70Main from "@/assets/products/S70-main.png";
import s76Main from "@/assets/products/S76-main.png";
import s86Main from "@/assets/products/S86-main.png";
import s450Main from "@/assets/products/S450-main.png";
import s510Main from "@/assets/products/S510-main.png";
import s650Main from "@/assets/products/S650-main.png";
import t76Main from "@/assets/products/T76-main.png";
import t86Main from "@/assets/products/T86-main.png";
import e17zMain from "@/assets/products/E17z-main.png";
import e20zMain from "@/assets/products/E20z-main.png";
import e26Main from "@/assets/products/E26-main.png";
import e35zMain from "@/assets/products/E35z-main.png";
import s590A from "@/assets/products/S590-A.jpg";
import s590B from "@/assets/products/S590-B.jpg";
import s590C from "@/assets/products/S590-C.jpg";
import s590D from "@/assets/products/S590-D.jpg";
import s650A from "@/assets/products/S650-A.png";
import s650B from "@/assets/products/S650-B.png";
import s650C from "@/assets/products/S650-C.png";
import s650D from "@/assets/products/S650-D.png";
import s650E from "@/assets/products/S650-E.png";

// 모델별 메인 이미지 (개별 모델 전용 이미지가 있을 때 등록)
const MODEL_IMAGES: Record<string, string> = {
  S70: s70Main,
  S100: s70Main,
  S76: s76Main,
  S86: s86Main,
  S450: s450Main,
  S510: s510Main,
  S590: s590Main,
  S650: s650Main,
  T76: t76Main,
  T86: t86Main,
  E17z: e17zMain,
  E20z: e20zMain,
  E26: e26Main,
  E35z: e35zMain,
};

export type ProductCategory =
  "skid-loader" | "mini-excavator" | "compact-wheel-loader" | "attachment" | "parts";

export const PRODUCT_CATEGORIES: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "skid-loader", label: "스키드로더" },
  { id: "mini-excavator", label: "미니 굴착기" },
  { id: "compact-wheel-loader", label: "컴팩트 휠 로더" },
  { id: "attachment", label: "어태치먼트" },
  { id: "parts", label: "부품" },
];

export type Product = {
  id: string;
  name: string;
  code: string;
  tag: string;
  category: ProductCategory;
  shortDesc: string;
  description: string;
  hero: string;
  thumb: string;
  gallery: string[];
  specs: { label: string; value: string }[];
  features: { title: string; desc: string }[];
  useCases: string[];
  price: string;
  priceNote: string;
};

export const products: Product[] = [];

// ─────────────────────────────────────────────────────────────
// 밥캣 라인업 (스키드·트랙 로더, 미니 굴착기, 컴팩트 휠로더)
// 데이터 구조는 기존과 동일하며, 모델별로 손쉽게 사양/이미지를 갱신할 수 있습니다.
// ─────────────────────────────────────────────────────────────
type BobcatSeed = {
  code: string;
  category: ProductCategory;
  tag: string;
  shortDesc: string;
  description: string;
  specs: { label: string; value: string }[];
  gallery?: string[];
};

const CATEGORY_LABEL: Record<ProductCategory, string> = {
  "skid-loader": "스키드로더",
  "mini-excavator": "굴착기",
  "compact-wheel-loader": "컴팩트 휠로더",
  attachment: "어태치먼트",
  parts: "부품",
};

const CATEGORY_IMAGE: Record<ProductCategory, string> = {
  "skid-loader": skid,
  "mini-excavator": excavator,
  "compact-wheel-loader": loader,
  attachment: attachmentImg,
  parts: attachmentImg,
};

const DEFAULT_FEATURES = [
  {
    title: "신뢰성 높은 엔진",
    desc: "안정적인 출력과 우수한 연비로 장시간 작업에도 가동률을 유지합니다.",
  },
  {
    title: "정밀 유압 컨트롤",
    desc: "전자 비례 제어로 미세 작업과 헤비듀티 작업 모두 정확하게 수행합니다.",
  },
  {
    title: "쾌적한 캐빈 환경",
    desc: "넓은 시야와 저진동·저소음 설계로 운전자의 피로를 줄여줍니다.",
  },
  {
    title: "다양한 어태치먼트 호환",
    desc: "퀵 커플러 표준을 지원하여 현장 상황에 맞춰 빠르게 전환 가능합니다.",
  },
];

const USE_CASES_BY_CATEGORY: Record<ProductCategory, string[]> = {
  "skid-loader": ["조경·토공", "철거·정리", "농업·축산", "물류 야드"],
  "mini-excavator": ["조경 공사", "주택 기초", "상하수 보수", "도심 인프라"],
  "compact-wheel-loader": ["자재 야적장", "농업 현장", "제설 작업", "경량 토공"],
  attachment: ["다목적 작업"],
  parts: ["유지보수"],
};

function bobcat(seed: BobcatSeed): Product {
  const categoryImg = CATEGORY_IMAGE[seed.category];
  const modelImg = MODEL_IMAGES[seed.code];
  const heroImg = modelImg ?? categoryImg;
  const thumbImg = modelImg ?? categoryImg;
  return {
    id: seed.code.toLowerCase(),
    code: seed.code,
    name: `밥캣 ${seed.code}`,
    category: seed.category,
    tag: seed.tag,
    shortDesc: seed.shortDesc,
    description: seed.description,
    hero: heroImg,
    thumb: thumbImg,
    gallery: seed.gallery ?? [heroImg, categoryImg, categoryImg],
    specs: seed.specs,
    features: DEFAULT_FEATURES,
    useCases: USE_CASES_BY_CATEGORY[seed.category],
    price: "가격 문의",
    priceNote:
      "부가세 별도. 옵션·운송비·등록비 미포함이며, 환율 및 사양에 따라 변동될 수 있습니다.",
  };
}

const BOBCAT_SEEDS: BobcatSeed[] = [
  // 스키드 스티어 로더 (S 시리즈)
  {
    code: "S70",
    category: "skid-loader",
    tag: "Sub-Compact",
    shortDesc: "초소형 차체로 협소 공간 작업에 최적화된 서브컴팩트 스키드 로더.",
    description:
      "S70은 좁은 통로와 실내 작업에 적합한 서브컴팩트 스키드 스티어 로더로, 정밀한 컨트롤과 다양한 어태치먼트 호환성을 제공합니다.",
    specs: [
      { label: "정격적재용량", value: "362 kg" },
      { label: "엔진출력", value: "23.4 ps" },
      { label: "차폭", value: "901 mm" },
      { label: "운전중량", value: "1,312 kg" },
    ],
  },
  {
    code: "S100",
    category: "skid-loader",
    tag: "Compact",
    shortDesc: "협소 현장과 농업 작업에 적합한 컴팩트 스키드 로더.",
    description:
      "S100은 컴팩트한 차체에 균형 잡힌 출력을 갖춰 협소 현장과 경량 토공, 농업 작업에 두루 활용 가능합니다.",
    specs: [
      { label: "정격적재용량", value: "457 kg" },
      { label: "엔진출력", value: "24.7 ps" },
      { label: "차폭", value: "1,167 mm" },
      { label: "운전중량", value: "1,860 kg" },
    ],
  },
  {
    code: "S450",
    category: "skid-loader",
    tag: "Compact",
    shortDesc: "균형 잡힌 출력과 정밀 컨트롤의 베스트셀러 컴팩트 스키드 로더.",
    description:
      "S450은 작은 차폭과 강한 견인력을 동시에 갖춘 컴팩트 스키드 로더로, 조경·철거·정리 작업에서 높은 생산성을 보여줍니다.",
    specs: [
      { label: "정격적재용량", value: "654 kg" },
      { label: "엔진출력", value: "49.6 ps" },
      { label: "차폭", value: "1,488 mm" },
      { label: "운전중량", value: "2,520 kg" },
    ],
  },
  {
    code: "S510",
    category: "skid-loader",
    tag: "Compact",
    shortDesc: "균형 잡힌 출력과 컴팩트 차체를 갖춘 다목적 스키드 스티어 로더.",
    description:
      "S510은 컴팩트한 차체에 우수한 견인력과 안정적인 유압 성능을 결합해 다양한 현장에서 폭넓게 활용 가능한 스키드 스티어 로더입니다.",
    specs: [
      { label: "정격적재용량", value: "851 kg" },
      { label: "엔진출력", value: "55.7 ps" },
      { label: "차폭", value: "1,656 mm" },
      { label: "운전중량", value: "2,890 kg" },
    ],
  },
  {
    code: "S590",
    category: "skid-loader",
    tag: "Mid-Frame",
    shortDesc: "수직 리프트 패스로 적재 안정성을 강화한 미드프레임 스키드 로더.",
    description:
      "S590은 수직 리프트 패스와 강력한 유압 출력으로 적재·운반 작업의 효율을 극대화한 미드프레임 스키드 로더입니다.",
    specs: [
      { label: "정격적재용량", value: "953 kg" },
      { label: "엔진출력", value: "69.0 ps" },
      { label: "차폭", value: "1,656 mm" },
      { label: "운전중량", value: "3,010 kg" },
    ],
    gallery: [s590A, s590B, s590C, s590D],
  },
  {
    code: "S650",
    category: "skid-loader",
    tag: "Mid-Frame",
    shortDesc: "고출력과 넉넉한 정격하중을 갖춘 다목적 미드프레임 스키드 로더.",
    description:
      "S650은 고출력 엔진과 우수한 유압 성능으로 대형 야적장, 토공, 건설 현장에서 폭넓게 활용되는 미드프레임 스키드 로더입니다.",
    specs: [
      { label: "정격적재용량", value: "1,295 kg (기본웨이트 장착시)" },
      { label: "엔진출력", value: "75 ps" },
      { label: "차폭", value: "1,740 mm" },
      { label: "운전중량", value: "3,820 kg" },
    ],
    gallery: [s650A, s650B, s650C, s650D, s650E],
  },
  {
    code: "S76",
    category: "skid-loader",
    tag: "R-Series",
    shortDesc: "R-시리즈 신형 캐빈과 인라인 엔진을 적용한 차세대 스키드 로더.",
    description:
      "S76은 인라인 엔진 레이아웃과 R-시리즈 캐빈으로 정비성과 시야성을 동시에 강화한 차세대 스키드 스티어 로더입니다.",
    specs: [
      { label: "정격적재용량", value: "1,338 kg" },
      { label: "엔진출력", value: "75.2 ps" },
      { label: "차폭", value: "1,740 mm" },
      { label: "운전중량", value: "3,910 kg" },
    ],
  },
  {
    code: "S86",
    category: "skid-loader",
    tag: "R-Series",
    shortDesc: "R-시리즈 라인업의 플래그십 스키드 스티어 로더.",
    description:
      "S86은 R-시리즈의 플래그십 모델로, 강화된 유압 시스템과 고출력 엔진을 통해 가장 까다로운 현장에서도 안정적인 성능을 제공합니다.",
    specs: [
      { label: "정격적재용량", value: "1,542 kg" },
      { label: "엔진출력", value: "106.4 ps" },
      { label: "차폭", value: "1,760 mm" },
      { label: "운전중량", value: "4,650 kg" },
    ],
  },
  {
    code: "T76",
    category: "skid-loader",
    tag: "Track Loader",
    shortDesc: "고무 트랙으로 험지 견인력을 강화한 컴팩트 트랙 로더.",
    description:
      "T76은 고무 트랙 시스템을 통해 진흙·모래 등 험지에서도 우수한 견인력과 부유성을 제공하는 컴팩트 트랙 로더입니다.",
    specs: [
      { label: "정격적재용량", value: "1,814 kg" },
      { label: "엔진출력", value: "75.2 ps" },
      { label: "차폭", value: "1,981 mm" },
      { label: "운전중량", value: "4,830 kg" },
    ],
  },
  {
    code: "T86",
    category: "skid-loader",
    tag: "Track Loader",
    shortDesc: "R-시리즈 플래그십 컴팩트 트랙 로더.",
    description:
      "T86은 고출력 엔진과 강화된 언더캐리지로 헤비듀티 트랙 작업에 최적화된 R-시리즈 플래그십 트랙 로더입니다.",
    specs: [
      { label: "정격적재용량", value: "2,397 kg" },
      { label: "엔진출력", value: "106.4 ps" },
      { label: "차폭", value: "1,981 mm" },
      { label: "운전중량", value: "5,910 kg" },
    ],
  },
  // 미니 굴착기 (E 시리즈)
  {
    code: "E17z",
    category: "mini-excavator",
    tag: "Zero Tail",
    shortDesc: "제로 테일 스윙의 1.7톤급 컴팩트 미니 굴착기.",
    description:
      "E17z는 제로 테일 스윙 설계로 좁은 현장에서도 안전하게 작업할 수 있는 1.7톤급 컴팩트 미니 굴착기입니다.",
    specs: [
      { label: "운전중량", value: "1,690 kg" },
      { label: "엔진출력", value: "13.9 ps" },
      { label: "최대 굴삭 깊이", value: "2,450 mm" },
      { label: "차폭", value: "980~1,360 mm" },
    ],
  },
  {
    code: "E20z",
    category: "mini-excavator",
    tag: "Zero Tail",
    shortDesc: "도심·조경 현장에 최적화된 2톤급 제로 테일 미니 굴착기.",
    description:
      "E20z는 컴팩트한 차체와 제로 테일 스윙을 갖춘 2톤급 미니 굴착기로, 조경과 도심 인프라 현장에서 폭넓게 사용됩니다.",
    specs: [
      { label: "운전중량", value: "1,900 kg (+90 kg) / 캐빈 장착시" },
      { label: "엔진출력", value: "13.8 ps" },
      { label: "최대 굴삭 깊이", value: "2,620 mm" },
      { label: "차폭", value: "980~1,360 mm" },
    ],
  },
  {
    code: "E26",
    category: "mini-excavator",
    tag: "Conventional",
    shortDesc: "안정적인 무게중심과 우수한 굴삭력을 갖춘 2.6톤급 미니 굴착기.",
    description:
      "E26은 컨벤셔널 테일 디자인을 적용해 안정적인 무게중심과 강한 굴삭력을 제공하는 2.6톤급 미니 굴착기입니다.",
    specs: [
      { label: "운전중량", value: "2,995 kg" },
      { label: "엔진출력", value: "23.4 ps" },
      { label: "최대 굴삭 깊이", value: "3,066 mm" },
      { label: "차폭", value: "1,550 mm" },
    ],
  },
  {
    code: "E35z",
    category: "mini-excavator",
    tag: "Zero Tail",
    shortDesc: "3.5톤급 제로 테일 스윙 미니 굴착기.",
    description:
      "E35z는 3.5톤급 제로 테일 스윙 미니 굴착기로, 협소한 공간에서의 안전한 회전과 강력한 굴삭 성능을 동시에 제공합니다.",
    specs: [
      { label: "운전중량", value: "3,680 kg (+110 kg) / 캐빈 장착시" },
      { label: "엔진출력", value: "24.7 ps" },
      { label: "최대 굴삭 깊이", value: "3,265 mm" },
      { label: "차폭", value: "1,750 mm" },
    ],
  },
  // 컴팩트 휠로더 (L 시리즈)
  {
    code: "L85",
    category: "compact-wheel-loader",
    tag: "Compact Wheel Loader",
    shortDesc: "다목적 작업에 최적화된 컴팩트 휠로더.",
    description:
      "L85는 강력한 견인력과 우수한 기동성을 갖춘 컴팩트 휠로더로, 자재 운반·적재·제설 등 다양한 작업에 활용 가능합니다.",
    specs: [
      { label: "정격적재용량", value: "1,901 kg" },
      { label: "운전중량", value: "4,997 kg" },
      { label: "버킷 용량", value: "0.85㎥" },
      { label: "엔진출력", value: "69 ps" },
      { label: "최고상승높이", value: "4,065 mm" },
      { label: "회전반경", value: "4,280 mm" },
    ],
  },
];

products.push(...BOBCAT_SEEDS.map(bobcat));

// ─────────────────────────────────────────────────────────────
// 함손 어태치먼트 라인업
// ─────────────────────────────────────────────────────────────
const hamsonSolarForksImg = attachmentImg;
products.push({
  id: "hamson-solar-forks",
  code: "HS-SF",
  name: "함손 태양광 유압식 지게발",
  category: "attachment",
  tag: "유압식 지게발",
  shortDesc: "강인한 설계로 좁은 현장에서 무거운 중량물을 운송하기 위해 설계된 지게발.",
  description:
    "함손 태양광 유압식 지게발은 강인한 프레임 설계로 좁은 현장에서도 무거운 중량물을 안전하고 효율적으로 운송할 수 있도록 제작된 어태치먼트입니다. 태양광 패널·자재 운반 등 다양한 현장에서 활용 가능합니다.",
  hero: hamsonSolarForksImg,
  thumb: hamsonSolarForksImg,
  gallery: [hamsonSolarForksImg, hamsonSolarForksImg, hamsonSolarForksImg],
  specs: [
    { label: "카테고리", value: "어태치먼트" },
    { label: "호환 장비", value: "T76, T86" },
    { label: "구동 방식", value: "유압식" },
    { label: "용도", value: "중량물 운송" },
  ],
  features: [
    {
      title: "강인한 프레임 설계",
      desc: "헤비듀티 구조로 무거운 중량물도 안전하게 지지하고 운반합니다.",
    },
    {
      title: "협소 현장 최적화",
      desc: "좁은 작업 공간에서도 효율적인 운송이 가능하도록 설계되었습니다.",
    },
    {
      title: "유압식 정밀 제어",
      desc: "유압 시스템으로 미세한 적재·하역 작업까지 정확하게 컨트롤합니다.",
    },
    {
      title: "T76 · T86 호환",
      desc: "밥캣 T76, T86 트랙 로더와의 호환을 통해 다양한 현장에 즉시 투입됩니다.",
    },
  ],
  useCases: ["태양광 패널 운송", "자재 운반", "협소 현장 작업", "중량물 적재"],
  price: "가격 문의",
  priceNote: "부가세 별도. 옵션·운송비·등록비 미포함이며, 사양에 따라 변동될 수 있습니다.",
});

export { CATEGORY_LABEL };

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getRelated = (id: string, n = 3) => products.filter((p) => p.id !== id).slice(0, n);
