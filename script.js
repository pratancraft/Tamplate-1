
const products = [
  {
    name: "Essential Tee",
    cat: "Fashion",
    price: 149000,
    desc: "Kaos minimal dengan bahan nyaman untuk penggunaan sehari-hari.",
    tag: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Everyday Sneakers",
    cat: "Fashion",
    price: 499000,
    desc: "Sneakers modern dengan desain ringan dan versatile.",
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Daily Bottle",
    cat: "Lifestyle",
    price: 129000,
    desc: "Botol minum reusable untuk aktivitas harian.",
    tag: "",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Smart Watch S1",
    cat: "Tech",
    price: 699000,
    desc: "Smart watch minimal dengan fitur aktivitas harian.",
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Canvas Bag",
    cat: "Accessories",
    price: 249000,
    desc: "Tas canvas dengan desain clean untuk aktivitas sehari-hari.",
    tag: "",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Wireless Buds",
    cat: "Tech",
    price: 349000,
    desc: "Earbuds compact dengan pengalaman audio yang praktis.",
    tag: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Classic Cap",
    cat: "Accessories",
    price: 119000,
    desc: "Topi basic dengan desain timeless.",
    tag: "",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Minimal Wallet",
    cat: "Accessories",
    price: 189000,
    desc: "Dompet ringkas untuk kebutuhan sehari-hari.",
    tag: "",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=85"
  }
];

const grid=document.getElementById("productGrid"),search=document.getElementById("searchInput"),empty=document.getElementById("empty");
let category="All",saved=[];

const rupiah=n=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);


function render() {
  const q = search.value.toLowerCase();

  const list = products.filter(p =>
    (category === "All" || p.cat === category) &&
    (p.name.toLowerCase().includes(q) ||
     p.desc.toLowerCase().includes(q))
  );

  grid.innerHTML = list.map(p => `
    <article class="product-card" data-id="${products.indexOf(p)}">
      <div class="product-img">
        <img
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
        >

        ${p.tag ? `<i class="tag">${p.tag}</i>` : ""}

        <button class="heart"
          data-save="${products.indexOf(p)}"
          aria-label="Simpan ${p.name}">♡</button>
      </div>

      <div class="product-info">
        <small>${p.cat}</small>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price">${rupiah(p.price)}</div>
      </div>
    </article>
  `).join("");

  empty.style.display = list.length ? "none" : "block";
}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");category=b.dataset.cat;render()});
search.oninput=render;

grid.onclick=e=>{
 const save=e.target.closest("[data-save]");
 if(save){e.stopPropagation();toggleSave(+save.dataset.save);return}
 const card=e.target.closest(".product-card");if(!card)return;
 openProduct(+card.dataset.id);
};

function toggleSave(id){
 if(saved.includes(id))saved=saved.filter(x=>x!==id);else saved.push(id);
 document.getElementById("bagCount").textContent=saved.length;
 renderBag();render();
}
function renderBag(){
 document.getElementById("bagItems").innerHTML=saved.length?saved.map(id=>`<div class="bag-item"><span>${products[id].name}</span><strong>${rupiah(products[id].price)}</strong></div>`).join(""):"<p style='color:#777'>Belum ada produk tersimpan.</p>";
 const text=saved.map(id=>products[id].name).join(", ");
 document.getElementById("checkoutBtn").href=`https://wa.me/6281234567890?text=${encodeURIComponent("Halo Mono Store, saya ingin memesan/menanyakan: "+text)}`;
}

function openProduct(id){
 const p=products[id];
 modal.classList.add("show");document.getElementById("modalName").textContent=p.name;
 document.getElementById("modalCat").textContent=p.cat;document.getElementById("modalPrice").textContent=rupiah(p.price);
 document.getElementById("modalDesc").textContent=p.desc;document.getElementById("modalImg").textContent=p.name.toUpperCase();
 document.getElementById("saveBtn").onclick=()=>toggleSave(id);
 document.getElementById("askBtn").href=`https://wa.me/6281234567890?text=${encodeURIComponent("Halo Mono Store, saya tertarik dengan "+p.name+". Apakah stok dan harganya masih tersedia?")}`;
}
const modal=document.getElementById("modal"),overlay=document.getElementById("overlay"),drawer=document.getElementById("drawer");
document.getElementById("closeModal").onclick=()=>modal.classList.remove("show");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
function openDrawer(){drawer.classList.add("show");overlay.classList.add("show");renderBag()}
function closeDrawer(){drawer.classList.remove("show");overlay.classList.remove("show")}
document.getElementById("bagBtn").onclick=openDrawer;document.getElementById("closeDrawer").onclick=closeDrawer;overlay.onclick=closeDrawer;

document.getElementById("searchBtn").onclick=()=>{document.getElementById("shop").scrollIntoView();search.focus()};
document.getElementById("hamburger").onclick=()=>document.getElementById("mobileNav").classList.toggle("show");
document.querySelectorAll(".mobile-nav a").forEach(a=>a.onclick=()=>document.getElementById("mobileNav").classList.remove("show"));
document.getElementById("filterToggle").onclick=()=>document.getElementById("filterRow").classList.toggle("show");
document.getElementById("year").textContent=new Date().getFullYear();
render();renderBag();
