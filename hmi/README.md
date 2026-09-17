# ProsesTÜRK — Puller HMI Tasarımı

Bu klasör **web sitesi için değil**, ekstrüzyon hattı operatör paneli (dokunmatik HMI) için hazırlanmış bağımsız Puller ekran prototipidir.

## Açılış

Tarayıcıda veya panel PC'de:

```bash
# proje kökünden
npx --yes serve hmi/puller -p 4173
```

Ardından `http://localhost:4173` adresini tam ekran açın.

Doğrudan dosya olarak da açılabilir: `hmi/puller/index.html`

## İçerik

| Dosya | Açıklama |
|---|---|
| `index.html` | Puller operatör ekranı |
| `puller.css` | Endüstriyel panel stilleri |
| `puller.js` | I/O durumları, konum animasyonu, saat |
| `puller-3d-machine.png` | Referans 3D makine görseli (opsiyonel) |

## Tasarım notları

- Ortadaki fotoğraf kaldırıldı; yerine izometrik SVG makine şeması var (Tester sayfasındaki 3D görünüm mantığı).
- Sol/sağ I/O, limit lambaları, tork/konum/hız ve alt navigasyon gerçek panelle aynı yapıda.
- Yeşil aktif durumlar, sarı uyarı notu ve limit göstergeleri korunmuştur.
