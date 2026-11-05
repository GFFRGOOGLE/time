export default {
  async fetch() {
    const now = new Date();
    const msk = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));

    const pad = n => String(n).padStart(2, '0');
    const months = ["января","февраля","марта","апреля","мая","июня",
                    "июля","августа","сентября","октября","ноября","декабря"];

    const timeStr = `${pad(msk.getHours())}:${pad(msk.getMinutes())}:${pad(msk.getSeconds())}`;
    const isoStr  = `${msk.getFullYear()}-${pad(msk.getMonth()+1)}-${pad(msk.getDate())}T${timeStr}+03:00`;
    const dateStr = `${msk.getDate()} ${months[msk.getMonth()]} ${msk.getFullYear()} года`;

    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Точное московское время (UTC+3) в реальном времени">
<title>Точное московское время</title>
<style>
body{font-family:'Segoe UI',Tahoma,sans-serif;display:flex;flex-direction:column;
align-items:center;justify-content:center;min-height:100vh;margin:0;
background:#0d1117;color:#c9d1d9}
h1{font-weight:300;letter-spacing:2px;color:#8b949e}
.clock{font-size:6rem;font-variant-numeric:tabular-nums;font-weight:700;
color:#58a6ff;text-shadow:0 0 20px rgba(88,166,255,.3)}
.date{font-size:1.5rem;color:#8b949e;margin-top:10px}
.status{font-size:.85rem;color:#484f58;margin-top:24px}
</style>
</head>
<body>
<h1>МОСКВА</h1>
<!-- Серверное время на момент запроса: читается ИИ без JS -->
<time id="srv" class="clock" datetime="${isoStr}">${timeStr}</time>
<div class="date">${dateStr}</div>
<div class="status">Сгенерировано на сервере Cloudflare: ${isoStr}</div>

<script>
// Для людей — тикаем каждую секунду
const el=document.getElementById('srv');
const pad=n=>String(n).padStart(2,'0');
const months=${JSON.stringify(months)};
function tick(){
  const d=new Date();
  const m=new Date(d.toLocaleString('en-US',{timeZone:'Europe/Moscow'}));
  el.textContent=pad(m.getHours())+':'+pad(m.getMinutes())+':'+pad(m.getSeconds());
  el.setAttribute('datetime',m.getFullYear()+'-'+pad(m.getMonth()+1)+'-'+pad(m.getDate())+'T'+el.textContent+'+03:00');
  document.querySelector('.date').textContent=m.getDate()+' '+months[m.getMonth()]+' '+m.getFullYear()+' года';
}
setInterval(tick,1000);tick();
</script>
</body>
</html>`;

    return new Response(html, {
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }
    });
  }
};
