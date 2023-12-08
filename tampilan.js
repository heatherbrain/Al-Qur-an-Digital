const nama = document.querySelector("#nama");
let div = document.createElement("div");
let card = document.querySelector("#card");
const wrap = document.querySelector(".wrap");
// const p = document.createElement("p");

const getDataSurah = async () => {
  const raw = await fetch("https://equran.id/api/v2/surat");
  const data = await raw.json();
  const result = data.data;

  return result;
};

getDataSurah().then((data) => {
  let surah = data;
  // console.log(surah);

  surah.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const p1 = document.createElement("p");
    const p2 = document.createElement("span");

    p1.classList.add("NamaLatin");
    p1.textContent = data.namaLatin;

    p2.classList.add("TempatTurun");
    p2.textContent = data.tempatTurun;

    div.appendChild(p1);
    div.appendChild(p2);

    div.addEventListener("click", () => openModal(data.nomor));

    wrap.appendChild(div);
  });
});

async function openModal(nomor) {
  document.querySelector(".modal").style.display = "flex";
  const content = document.querySelector(".modal-content");
  console.log(nomor);

  const getDetailSurah = async () => {
    const raw = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
    const data = await raw.json();
    const result = data.data;

    return result;
    // console.log(JSON.stringify(result, null, 2));
  };
  // p.textContent = JSON.stringify(result, null, 2);

  // getDetailSurah().then((data) => {
  //   let ayat = data;
  //   // p.innerText = JSON.stringify(ayat, null, 2);
  //   // console.log(ayat);

  //   ayat.ayat.map((ayat) => {
  //     // const div = document.createElement("div");
  //     console.log(ayat.teksArab);

  //     // const p = document.createElement("p")
  //     p.innerText = ayat.teksArab

  //     content.appendChild(p)
  //     // div.appendChild(p)
  //   });
  // });
  getDetailSurah().then((data) => {
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");

    let ayat = data;
 
    p1.textContent = ayat.namaLatin;
    p2.textContent = ayat.arti;

    content.appendChild(p1);
    content.appendChild(p2);

    p1.classList.add("namaLatin")
    p2.classList.add("arti")

    ayat.ayat.map((ayat) => {
      const ayatp1 = document.createElement("p");
      const ayatp2 = document.createElement("p");
      const ayatp3 = document.createElement("p")

      ayatp1.innerText = ayat.teksArab;
      ayatp2.innerText = ayat.teksLatin;
      ayatp3.innerText = ayat.teksIndonesia;

      content.appendChild(ayatp1);
      content.appendChild(ayatp2);
      content.appendChild(ayatp3);
      
      ayatp1.classList.add("teksArab");
      ayatp2.classList.add("teksLatin");
      ayatp3.classList.add("teksIndonesia");
    });
 });
  // content.appendChild(p);
}

window.onclick = function (event) {
  const detail = document.querySelector(".modal");
  const content = document.querySelector(".modal-content");

  if (event.target === detail) {
    detail.style.display = "none";
    content.textContent = ""
  }
};
