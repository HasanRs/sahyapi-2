(function () {
  const LEFT = [
    { id: "cene-acik", label: "ÇENE AÇIK" },
    { id: "cene-kapali", label: "ÇENE KAPALI", on: true },
    { id: "kol-ac-valf", label: "KOL AÇ VALF" },
    { id: "kol-kapa-valf", label: "KOL KAPA VALF" },
    { id: "yaprak-ac-valf", label: "YAPRAK AÇ VALF" },
    { id: "yaprak-kapat-valf", label: "YAPRAK KAPAT VALF" },
    { id: "hidrolik-motor", label: "HİDROLİK MOTOR" },
    { id: "ileri-buzer", label: "İLERİ BÜZER" },
    { id: "geri-buzer", label: "GERİ BÜZER", on: true },
    { id: "alarm-buzer", label: "ALARM BÜZER" },
  ];

  const RIGHT = [
    { id: "faz-koruma", label: "PULLER FAZ KORUMA", on: true },
    { id: "h-motor-ariza", label: "H MOTOR ARIZA" },
    { id: "kol-acik", label: "KOL AÇIK" },
    { id: "kol-kapali", label: "KOL KAPALI", on: true },
    { id: "yaprak-acik", label: "YAPRAK AÇIK" },
    { id: "yaprak-ortada", label: "YAPRAK ORTADA" },
    { id: "yaprak-kapali", label: "YAPRAK KAPALI", on: true },
    { id: "acil-stop", label: "PULLER ACİL STOP", on: true },
    { id: "cene-ac-btn", label: "ÇENE AÇ BUTON", btn: true },
    { id: "cene-kapat-btn", label: "ÇENE KAPAT BUTON", btn: true },
    { id: "p-cene-ac-btn", label: "P ÇENE AÇ BUTON", btn: true },
    { id: "p-cene-kapat-btn", label: "P ÇENE KAPAT BUTON", btn: true },
  ];

  const NAV = [
    "ANA SAYFA",
    "PULLER",
    "TESTERE",
    "SICAK RULO",
    "AKTARMA",
    "ENCODER",
    "FAN",
  ];

  const leftRail = document.getElementById("leftRail");
  const rightRail = document.getElementById("rightRail");
  const nav = document.getElementById("nav");
  const clock = document.getElementById("clock");
  const carriageMarker = document.getElementById("carriageMarker");
  const markerPos = document.getElementById("markerPos");
  const fwdLamp = document.getElementById("fwdLamp");
  const torqueEl = document.getElementById("torque");
  const positionEl = document.getElementById("position");
  const speedEl = document.getElementById("speed");

  function makeIo(item) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "io" + (item.on ? " on" : "") + (item.btn ? " btn" : "");
    btn.textContent = item.label;
    btn.dataset.id = item.id;
    if (!item.btn) {
      btn.addEventListener("click", () => {
        item.on = !item.on;
        btn.classList.toggle("on", item.on);
      });
    }
    return btn;
  }

  LEFT.forEach((item) => leftRail.appendChild(makeIo(item)));
  RIGHT.forEach((item) => rightRail.appendChild(makeIo(item)));

  NAV.forEach((label) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "nav-btn" + (label === "PULLER" ? " active" : "");
    b.textContent = label;
    nav.appendChild(b);
  });

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tickClock() {
    const d = new Date();
    clock.textContent =
      pad(d.getDate()) +
      "." +
      pad(d.getMonth() + 1) +
      "." +
      d.getFullYear() +
      " " +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds());
  }

  tickClock();
  setInterval(tickClock, 1000);

  let pos = 39830.3;
  let torque = 35;
  let speed = 10.3;
  let markerX = 420;
  let dir = 1;

  function fmt(n, digits) {
    return n.toLocaleString("tr-TR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  setInterval(() => {
    markerX += dir * 1.8;
    if (markerX > 720) dir = -1;
    if (markerX < 160) dir = 1;
    carriageMarker.setAttribute("transform", "translate(" + markerX + " 0)");

    pos = Math.max(39000, Math.min(40500, pos + dir * (0.45 + Math.random())));
    torque = Math.max(28, Math.min(42, torque + (Math.random() - 0.5) * 1.2));
    speed = Math.max(8, Math.min(13, speed + (Math.random() - 0.5) * 0.3));

    positionEl.textContent = fmt(pos, 1);
    markerPos.textContent = String(Math.round(pos));
    torqueEl.textContent = String(Math.round(torque));
    speedEl.textContent = fmt(speed, 1);

    fwdLamp.classList.toggle("on", markerX < 220);
  }, 80);
})();
