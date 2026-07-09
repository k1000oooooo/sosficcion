# Baseline: contenido y URLs del sitio legacy

Auditado 2026-07-09 (roadmap paso 1). Método: oEmbed para SoundCloud/Mixcloud/Vimeo, GET directo para el resto. **Todo el contenido embebido está vivo.** Este archivo es la fuente de verdad para `src/content/*.ts` y para la validación final (paso 11).

## Resonance Extra — 7 tracks SoundCloud (`legacy/audios.html`) — todos ✅ 200

| # | Track ID |
|---|---|
| 01 | 715929433 |
| 02 | 712270849 |
| 03 | 708776188 |
| 04 | 705411640 |
| 05 | 700605280 |
| 06 | 697038692 |
| 07 | 690020782 |

Player legacy usaba `color=%23241440` — reemplazar por el acento nuevo (`C7401F`).

## Creativa Radio — 14 mixes Mixcloud (`legacy/creativaRadio.html`) — todos ✅ 200

Usuario: `CamiloDFranco`. Slugs en orden de aparición:

`set-radio-creativa-17-2018`, `set-radio-creativa-16-2018`, `set-radio-creativa-15-2018-phonk`, `set-radio-creativa-14-2018`, `set-radio-creativa-13-2018`, `set-radio-creativa-12-2018`, `set-radio-creativa-11-2018`, `set-radio-creativa-10-pakapi-rec`, `set-radio-creativa-9-2018`, `set-radio-creativa-8-2018`, `set-radio-creativa-7-2018`, `set-radio-creativa-6-2018`, `set-radio-creativa-5-2018`, `set-radio-creativa-4-2018`

## Discografía — 4 álbumes Bandcamp (`legacy/discografia.html`) — todos ✅ 200

| Album ID | Título | Página del álbum |
|---|---|---|
| 2856260868 | Se escucha un movimiento | pakapirecords.bandcamp.com/album/camilo-franco-se-escucha-un-movimiento ✅ |
| 2420565447 | Ahora casi nunca estoy en la selva | opalorecords.bandcamp.com/album/ahora-casi-nunca-estoy-en-la-selva ✅ |
| 4092168665 | SPD-06 \| Minutos Antes De - EP | sololepidoadior.bandcamp.com/album/spd-06-minutos-antes-de-ep ✅ |
| 298613419 | SNL 001 - Play (Sulky Netlabel 2013) | sulkynetlabel.bandcamp.com/album/snl-001-camilo-franco-play-sulky-netlabel-2013 ✅ |

## Videos — 4 Vimeo (`legacy/videos.html`) — todos ✅ 200

| Vimeo ID | Título |
|---|---|
| 141992451 | Tropical - Chinches |
| 119048768 | Camilo Franco - DE |
| 119042348 | Camilo Franco - Minutos |
| 81347278 | Estación Primavera #12 (Sulky netlabel) |

## Covers del home (`legacy/index.html`) — todos ✅ 200

| Imagen | Destino |
|---|---|
| play.png | sulkynetlabel.bandcamp.com (SNL-001) |
| minutosantesde.png | sololepidoadior.bandcamp.com (SPD-06) |
| ahoracasinunca.png | opalorecords.bandcamp.com |
| tropical.png | soundcloud.com/tropicalescj/sets/tropical-e-p |
| lalluvia.png | youtube.com/watch?v=32duyCSlQQk |
| seescuchaunmovimiento.png | pakapirecords.bandcamp.com |

## Redes y externos

| Link | Estado | Nota |
|---|---|---|
| soundcloud.com/camilo-franco | ✅ 200 | |
| mixcloud.com/CamiloDFranco | ✅ 200 | |
| youtube.com/c/CamiloFranco1 | ✅ 200 | pasar a https |
| facebook.com/Camilo.DFranco | ⚠️ 400 | Facebook bloquea bots — verificar a mano en el navegador |
| creativaradio.com.ar | ❌ 000 | **Dominio no responde — probablemente muerto.** El logo en la página Creativa Radio linkea acá; al portar, quitar el link (dejar el logo/título sin anchor) salvo decisión en contrario |

## Screenshots

`baseline/screenshots/` (no versionados): 5 páginas × 375/768/1440 px, capturados con Chrome headless desde los archivos legacy.
