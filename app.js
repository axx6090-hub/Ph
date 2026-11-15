(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = n => n.toLocaleString("en-US").replace(/,/g, ".") + " " + STORE.currency;
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  let cart = load("cart", {});   // { id: qty }
  let wish = load("wish", []);

  /* صورة مؤقتة عند عدم وجود صورة للمنتج */
  const placeholder = id => {
    const hues = [350, 20, 200, 280, 160, 40];
    const h = hues[id % hues.length];
    return `<svg class="ph" viewBox="0 0 200 200"><rect width="200" height="200" fill="hsl(${h} 30% 12%)"/><rect y="150" width="200" height="50" fill="hsl(${h} 60% 30%)"/><rect x="82" y="60" width="36" height="92" rx="6" fill="hsl(${h} 40% 88%)"/><rect x="90" y="44" width="20" height="18" rx="3" fill="hsl(${h} 30% 65%)"/></svg>`;
  };
  const pic = p => p.img ? `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">` : placeholder(p.id);

  const card = p => {
    const off = p.old > p.price ? Math.round((1 - p.price / p.old) * 100) : 0;
    return `<article class="card">
      <div class="card__img">${pic(p)}
        ${off ? `<span class="badge">-${off}%</span>` : ""}
        <button class="wish ${wish.includes(p.id) ? "on" : ""}" data-wish="${p.id}" aria-label="مفضلة"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.500-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.500-7 10-7 10z"/></svg></button>
      </div>
      <h3 class="card__name">${esc(p.name)}</h3>
      <div class="price">${money(p.price)}${off ? `<s>${money(p.old)}</s>` : ""}</div>
      <button class="btn" data-add="${p.id}">أضف إلى السلة</button>
    </article>`;
  };

  const section = s => {
    const items = PRODUCTS.filter(p => p.sec === s.id);
    if (!items.length) return "";
    return `<section class="sec sec--${s.theme} ${s.big ? "sec--big" : ""}" id="sec-${s.id}">
      <div class="sec__head"><h2>${esc(s.title)}</h2><a class="pill" href="#sec-all">${esc(s.link || "عرض الكل")}</a></div>
      <div class="rail">${items.map(card).join("")}</div>
    </section>`;
  };

  const emojis = ["🧴", "☀️", "💧", "🫧", "🌿", "✨", "👁️", "🌸"];
  const bg = img => img ? ` style="background-image:url('${esc(img)}')"` : "";

  function render() {
    document.title = STORE.name + " | عناية بالبشرة";
    const ann = STORE.announcements.map(a => `<span>${esc(a)}</span>`).join("");
    $("#marquee").innerHTML = ann.repeat(6);
    $("#logo").innerHTML = STORE.logoImage
      ? `<img src="${esc(STORE.logoImage)}" alt="${esc(STORE.name)}">`
      : `<span>${esc(STORE.logoText)}</span><small>${esc(STORE.name)}</small>`;
    const link = m => `<a href="${esc(m.href)}">${esc(m.t)}${m.tag ? `<span class="tag">${esc(m.tag)}</span>` : ""}</a>`;
    $("#navDesktop").innerHTML = STORE.menu.slice(0, 6).map(link).join("");
    $("#menuList").innerHTML = STORE.menu.map(m => `<li>${link(m)}</li>`).join("");
    $("#waFloat").href = "https://wa.me/" + STORE.whatsapp;

    const [s1, s2, s3, s4, ...rest] = SECTIONS;
    $("#main").innerHTML = `
      <a class="hero" href="${esc(STORE.hero.href)}"${bg(STORE.hero.image)}><h1>${esc(STORE.hero.title)}</h1><p>${esc(STORE.hero.sub)}</p></a>
      ${[s1, s2, s3, s4].filter(Boolean).map(section).join("")}
      <section class="sec" id="sec-routine"><div class="sec__head"><h2>اختاري روتينج</h2></div>
        <div class="cats">${STORE.routine.map((c, i) => `<a class="cat" href="#sec-all"><i>${emojis[i % emojis.length]}</i>${esc(c)}</a>`).join("")}</div></section>
      <div class="banners">${STORE.banners.map(b => `<div class="banner"${bg(b.image)}><b>${esc(b.title)}</b>${esc(b.sub)}</div>`).join("")}</div>
      ${rest.map(section).join("")}
      <section class="sec"><div class="sec__head"><h2>تسوقي حسب نوع بشرتج</h2></div>
        <div class="chips">${STORE.skinTypes.map(t => `<a href="#sec-all">${esc(t)}</a>`).join("")}</div></section>
      <section class="sec sec--plain" id="sec-all"><div class="sec__head"><h2>جميع المنتجات</h2></div>
        <div class="rail">${PRODUCTS.map(card).join("")}</div></section>
      <section class="sec" id="sec-blog"><div class="sec__head"><h2>مقالات</h2><p>اقرأ أهم المقالات لمعرفة الحلول المناسبة لبشرتك</p></div>
        <div class="posts">${STORE.posts.map(p => `<article class="post"><div class="post__img"${bg(p.image)}></div><div><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></div></article>`).join("")}</div></section>`;

    $("#footer").innerHTML = `<div class="footer__grid">
      <div><h4>${esc(STORE.name)}</h4><ul><li>${esc(STORE.address)}</li><li dir="ltr" style="text-align:right">+${esc(STORE.whatsapp)}</li><li>${esc(STORE.email)}</li></ul></div>
      <div><h4>روابط سريعة</h4><ul>${STORE.menu.slice(0, 5).map(m => `<li>${link(m)}</li>`).join("")}</ul></div>
      <div><h4>تابعينا</h4><ul><li><a href="${esc(STORE.social.instagram)}">Instagram</a></li><li><a href="${esc(STORE.social.tiktok)}">TikTok</a></li><li><a href="${esc(STORE.social.facebook)}">Facebook</a></li></ul></div>
      <div><h4>النشرة البريدية</h4><p style="margin-bottom:10px">اشتركي ليصلك كل جديد وعروض حصرية</p>
        <form class="news" id="news"><input type="email" required placeholder="بريدك الإلكتروني"><button class="btn btn--primary">اشتراك</button></form></div>
    </div><p class="copy">© ${new Date().getFullYear()} ${esc(STORE.name)} — جميع الحقوق محفوظة</p>`;
    $("#news").onsubmit = e => { e.preventDefault(); e.target.reset(); toast("تم الاشتراك ✓"); };
  }

  /* السلة */
  function renderCart() {
    const rows = Object.entries(cart).map(([id, q]) => [PRODUCTS.find(p => p.id == id), q]).filter(([p]) => p);
    const total = rows.reduce((t, [p, q]) => t + p.price * q, 0);
    const count = rows.reduce((t, [, q]) => t + q, 0);
    $$("[data-cart-count]").forEach(e => e.textContent = count);
    $$("[data-wish-count]").forEach(e => e.textContent = wish.length);
    $("#cartItems").innerHTML = rows.length ? rows.map(([p, q]) => `<div class="ci">
        <div class="card__img">${pic(p)}</div>
        <div><p>${esc(p.name)}</p><div class="price">${money(p.price)}</div>
          <div class="qty"><button data-q="${p.id}" data-d="-1">−</button><span>${q}</span><button data-q="${p.id}" data-d="1">+</button></div></div>
        <button class="ci__rm" data-rm="${p.id}" aria-label="حذف">✕</button></div>`).join("")
      : `<p class="cart-empty">سلتك فارغة</p>`;
    $("#cartTotal").textContent = money(total);
    const left = STORE.freeShippingAt - total;
    $("#shipText").textContent = left > 0 ? `باقي ${money(left)} للحصول على توصيل مجاني` : "🎉 حصلتِ على توصيل مجاني!";
    $("#shipFill").style.width = Math.min(100, total / STORE.freeShippingAt * 100) + "%";
    save("cart", cart);
    return { rows, total };
  }

  const open = id => { $(id).classList.add("on"); $("#overlay").classList.add("on"); };
  const closeAll = () => $$(".drawer,.overlay").forEach(e => e.classList.remove("on"));
  let tt; const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 1800); };

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-add],[data-wish],[data-q],[data-rm],[data-close],.menu-list a");
    if (!t) return;
    if (t.dataset.add) { cart[t.dataset.add] = (cart[t.dataset.add] || 0) + 1; renderCart(); toast("تمت الإضافة إلى السلة ✓"); }
    else if (t.dataset.wish) { const id = +t.dataset.wish; wish = wish.includes(id) ? wish.filter(x => x !== id) : [...wish, id]; save("wish", wish);
      $$(`[data-wish="${id}"]`).forEach(b => b.classList.toggle("on", wish.includes(id))); renderCart(); }
    else if (t.dataset.q) { const id = t.dataset.q; cart[id] += +t.dataset.d; if (cart[id] < 1) delete cart[id]; renderCart(); }
    else if (t.dataset.rm) { delete cart[t.dataset.rm]; renderCart(); }
    else closeAll();
  });

  $("#menuBtn").onclick = () => open("#menuDrawer");
  $("#cartBtn").onclick = () => open("#cartDrawer");
  $("#tbCart").onclick = e => { e.preventDefault(); open("#cartDrawer"); };
  $("#tbWish").onclick = e => { e.preventDefault(); toast(wish.length ? `لديك ${wish.length} منتج في المفضلة` : "قائمة المفضلة فارغة"); };
  $("#tbAccount").onclick = e => { e.preventDefault(); toast("قريباً"); };
  $("#overlay").onclick = closeAll;
  $("#searchBtn").onclick = () => { const s = $("#search"); s.hidden = !s.hidden; if (!s.hidden) $("#searchInput").focus(); };
  $("#searchInput").oninput = e => {
    const q = e.target.value.trim();
    $("#searchResults").innerHTML = q ? PRODUCTS.filter(p => p.name.includes(q)).slice(0, 8)
      .map(p => `<a href="#sec-${p.sec}"><span>${esc(p.name)}</span><b class="price">${money(p.price)}</b></a>`).join("") || `<p class="cart-empty">لا توجد نتائج</p>` : "";
  };

  /* إتمام الطلب: يفتح واتساب برسالة الطلب */
  $("#checkoutBtn").onclick = () => {
    const { rows, total } = renderCart();
    if (!rows.length) return toast("سلتك فارغة");
    const msg = ["طلب جديد:", ...rows.map(([p, q]) => `• ${p.name} × ${q} = ${money(p.price * q)}`), `المجموع: ${money(total)}`].join("\n");
    window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  render();
  renderCart();
})();
