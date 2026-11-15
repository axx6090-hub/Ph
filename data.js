/* ===== كل محتوى المتجر هنا — عدّل هذا الملف فقط ===== */
const STORE = {
  name: "متجرك",
  logoText: "MS",              // أو ضع مسار صورة في logoImage
  logoImage: "",               // مثال: "images/logo.png"
  currency: "IQD",
  whatsapp: "9647700000000",   // رقمك بصيغة دولية بدون +
  email: "info@example.com",
  address: "العراق، بغداد",
  freeShippingAt: 60000,
  announcements: [
    "عروض خاصة لفترة محدودة",
    "احصل على توصيل مجاني عند وصول طلبك 60 ألف دينار!",
    "اضغط لرؤية المنتجات"
  ],
  menu: [
    { t: "الأكثر مبيعاً", tag: "HOT", href: "#sec-best" },
    { t: "المنتجات الجديدة", tag: "جديد", href: "#sec-perfume" },
    { t: "العروض", tag: "خصومات", href: "#sec-deals" },
    { t: "عروض موسمية 🔥", href: "#sec-season" },
    { t: "جميع المنتجات", href: "#sec-all" },
    { t: "العناية بالبشرة", href: "#sec-routine" },
    { t: "المكياج", href: "#sec-makeup" },
    { t: "العطور", href: "#sec-perfume" },
    { t: "مقالات", href: "#sec-blog" }
  ],
  hero: { title: "عروض الموسم", sub: "خصومات حتى 50%", image: "", href: "#sec-deals" },
  routine: ["مرطب", "واقي شمس", "سيروم", "غسول", "غسول زيتي", "تونر", "عناية بالعين", "اسنس"],
  skinTypes: ["بشرة دهنية", "بشرة جافة", "بشرة مختلطة", "بشرة حساسة"],
  banners: [
    { title: "توصيل لكل المحافظات", sub: "الدفع عند الاستلام", image: "" },
    { title: "منتجات أصلية 100%", sub: "ضمان الجودة", image: "" }
  ],
  posts: [
    { title: "كيف تختارين واقي الشمس المناسب؟", excerpt: "دليل مختصر لاختيار واقي الشمس حسب نوع بشرتك.", image: "" },
    { title: "روتين العناية الصباحي بخمس خطوات", excerpt: "خطوات بسيطة لبشرة نضرة طوال اليوم.", image: "" },
    { title: "الفرق بين السيروم والاسنس", excerpt: "متى تستخدمين كل منهما وبأي ترتيب.", image: "" }
  ],
  social: { instagram: "#", tiktok: "#", facebook: "#" }
};

/* الأقسام الظاهرة في الصفحة الرئيسية بالترتيب */
const SECTIONS = [
  { id: "deals",   title: "عروض الموسم 🎁", link: "شوفي كل العروض", theme: "pink", big: true },
  { id: "season",  title: "عروض موسمية", theme: "blue" },
  { id: "last",    title: "فرصتج الأخيرة", theme: "plain" },
  { id: "best",    title: "الأكثر طلباً ⭐", theme: "cream" },
  { id: "perfume", title: "جديد العطور 🌸", theme: "plain" },
  { id: "makeup",  title: "جديد المكياج", theme: "pink" }
];

/* المنتجات: sec = معرف القسم، img = مسار الصورة (اتركه فارغ لصورة مؤقتة) */
const PRODUCTS = [
  { id: 1,  sec: "deals",   name: "كريم مرطب للبشرة 50مل",        price: 18000, old: 32000, img: "" },
  { id: 2,  sec: "deals",   name: "تونر مقشر لطيف 150مل",          price: 18000, old: 25000, img: "" },
  { id: 3,  sec: "deals",   name: "ثنائي التفتيح والنضارة",         price: 36000, old: 52000, img: "" },
  { id: 4,  sec: "deals",   name: "غسول زيتي بالسنتيلا 200مل",      price: 16250, old: 25000, img: "" },
  { id: 5,  sec: "season",  name: "سيروم نياسيناميد 10% - 30مل",    price: 11500, old: 15000, img: "" },
  { id: 6,  sec: "season",  name: "صبغة شعر لون بني",               price: 7000,  old: 15000, img: "" },
  { id: 7,  sec: "season",  name: "صبغة شعر لون رمادي",             price: 7000,  old: 15000, img: "" },
  { id: 8,  sec: "season",  name: "ماسك ترطيب ليلي 80مل",           price: 14000, old: 20000, img: "" },
  { id: 9,  sec: "last",    name: "كريم سنتيلا مهدئ 50مل",          price: 19000, old: 25000, img: "" },
  { id: 10, sec: "last",    name: "واقي شمس SPF50 خفيف",            price: 17500, old: 22000, img: "" },
  { id: 11, sec: "last",    name: "اسنس مرطب 150مل",                price: 21000, old: 28000, img: "" },
  { id: 12, sec: "best",    name: "كريم مرطب 345 - 50مل",           price: 18000, old: 32000, img: "" },
  { id: 13, sec: "best",    name: "سيروم فيتامين سي 30مل",          price: 22000, old: 30000, img: "" },
  { id: 14, sec: "best",    name: "غسول رغوي للبشرة الدهنية",       price: 12000, old: 16000, img: "" },
  { id: 15, sec: "best",    name: "كريم العين بالريتينول",          price: 20000, old: 27000, img: "" },
  { id: 16, sec: "perfume", name: "عطر زهري ناعم 100مل",            price: 30000, old: 40000, img: "" },
  { id: 17, sec: "perfume", name: "عطر شرقي فاخر 80مل",             price: 45000, old: 55000, img: "" },
  { id: 18, sec: "perfume", name: "معطر جسم بالفانيلا",             price: 9000,  old: 12000, img: "" },
  { id: 19, sec: "makeup",  name: "برايمر للوجه",                   price: 17000, old: 20000, img: "" },
  { id: 20, sec: "makeup",  name: "أحمر شفاه مطفي",                 price: 8000,  old: 10000, img: "" },
  { id: 21, sec: "makeup",  name: "ماسكارا مكثفة",                  price: 11000, old: 14000, img: "" },
  { id: 22, sec: "makeup",  name: "بلاشر كريمي",                    price: 9500,  old: 0,     img: "" }
];
