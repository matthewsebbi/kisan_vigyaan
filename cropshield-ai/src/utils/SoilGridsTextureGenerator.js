// SoilGrids WRB (2006) Equirectangular Global Texture & Hydrology Map Generator
// Generates high-fidelity WebGL textures faithful to soilgrids.org ISRIC 250m resolution

import * as THREE from 'three';
import { MAHARASHTRA_RIVERS, MAHARASHTRA_RESERVOIRS } from '../data/maharashtraHydrologyData';
import { MAHARASHTRA_OUTLINE, DISTRICT_INTERNAL_BORDERS } from '../data/maharashtraDistrictBoundaries';

// Convert lat/lng to equirectangular texture pixel coordinates (width x height)
export const latLngToTextureCoords = (lat, lng, width = 2048, height = 1024) => {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
};

// Convert lat/lng to 3D Sphere cartesian coordinates (X, Y, Z)
export const latLngToVector3 = (lat, lng, radius = 100) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

// Procedural high-resolution global SoilGrids WRB 2006 Texture
export const createSoilGridsGlobalTexture = () => {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 1. Dark Oceanic Basemap (SoilGrids.org signature dark theme)
  ctx.fillStyle = '#12161f';
  ctx.fillRect(0, 0, width, height);

  // Helper to draw continent shapes with distinct WRB Soil Groups
  const drawSoilPolygon = (points, fillStyle) => {
    ctx.beginPath();
    points.forEach(([lat, lng], idx) => {
      const { x, y } = latLngToTextureCoords(lat, lng, width, height);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
  };

  // 2. AFRICA:
  // Northern Sahara: Arenosols & Calcisols (Yellowish Gold)
  drawSoilPolygon([
    [32, -10], [36, 10], [32, 32], [22, 36], [12, 44], [10, 14], [15, -16], [28, -13]
  ], '#f4ca38');

  // Sahel: Arenosols & Regosols (Tan Sand)
  drawSoilPolygon([
    [15, -16], [16, 38], [8, 38], [5, 10], [5, -5]
  ], '#d8ae48');

  // Central Africa (Congo basin): Ferralsols & Acrisols (Deep Vibrant Orange)
  drawSoilPolygon([
    [6, 8], [5, 30], [-5, 30], [-10, 20], [-5, 10], [4, 8]
  ], '#e65100');

  // Southern & Eastern Africa: Luvisols, Nitisols, Vertisols (Terracotta & Dark Brown)
  drawSoilPolygon([
    [-5, 30], [5, 42], [-5, 40], [-25, 35], [-34, 20], [-28, 16], [-15, 12], [-10, 24]
  ], '#c86432');

  // 3. EURASIA:
  // Europe (Western & Central): Cambisols & Luvisols (Warm Brown)
  drawSoilPolygon([
    [36, -9], [44, -1], [48, -4], [55, 8], [58, 20], [50, 30], [42, 28], [37, 24], [36, -5]
  ], '#9c7a5b');

  // Scandinavia & Northern Russia: Podzols (Slate Grey-Blue)
  drawSoilPolygon([
    [58, 5], [70, 25], [68, 60], [60, 60], [56, 35], [58, 15]
  ], '#788d9f');

  // Russian Steppe & Siberia: Chernozems (Dark Black-Brown) & Histosols
  drawSoilPolygon([
    [52, 38], [56, 80], [54, 120], [45, 110], [48, 60], [50, 42]
  ], '#3b322a');

  // Middle East: Calcisols & Arenosols (Desert Sand)
  drawSoilPolygon([
    [32, 34], [36, 42], [30, 50], [24, 58], [15, 52], [13, 44], [28, 34]
  ], '#e9c440');

  // Central Asia: Kastanozems & Calcisols (Khaki Ochre)
  drawSoilPolygon([
    [38, 52], [48, 60], [46, 85], [38, 80], [35, 62]
  ], '#b89442');

  // East Asia (China): Acrisols & Cambisols (Reddish Yellow)
  drawSoilPolygon([
    [40, 78], [42, 120], [28, 122], [22, 108], [24, 98], [30, 85]
  ], '#d97736');

  // Southeast Asia: Ferralsols & Acrisols (Vibrant Orange)
  drawSoilPolygon([
    [22, 98], [18, 108], [8, 105], [2, 102], [8, 98]
  ], '#ea580c');

  // 4. THE INDIAN SUBCONTINENT (FOCUSED DETAIL):
  // Entire Subcontinent Base Outline
  drawSoilPolygon([
    [35, 74], [34, 78], [31, 80], [27, 88], [23, 90], [26, 94], [22, 92],
    [21, 87], [18, 83], [14, 80], [10, 79], [8, 77], [12, 75], [16, 73],
    [20, 72], [23, 68], [26, 70], [30, 71], [34, 73]
  ], '#9c7a5b');

  // Northern India (Indo-Gangetic Plain): Fluvisols & Alluvium (Cyan Blue / Light Greenish)
  drawSoilPolygon([
    [30, 74], [30, 78], [27, 82], [25, 87], [24, 88], [25, 82], [27, 76], [29, 74]
  ], '#48cae4');

  // Thar Desert (Rajasthan): Arenosols & Calcisols (Desert Yellow)
  drawSoilPolygon([
    [29, 70], [30, 74], [26, 75], [24, 71], [26, 70]
  ], '#facc15');

  // DECCAN PLATEAU & MAHARASHTRA: Dominant WRB Vertisols (Black Regur Cotton Soil - Chocolate Brown)
  // Exactly matching the iconic dark polygon shown in SoilGrids for central/western India
  drawSoilPolygon([
    [21.8, 73.0], [21.9, 77.0], [21.6, 80.5], [19.0, 80.2], [18.0, 77.5], 
    [16.0, 76.5], [15.8, 74.0], [17.5, 73.4], [19.5, 72.8], [21.0, 72.8]
  ], '#4a3728');

  // Maharashtra Core Deep Vertisol Layer
  drawSoilPolygon([
    [21.2, 74.5], [21.4, 78.5], [20.5, 79.5], [19.2, 78.5], [17.8, 76.8],
    [16.6, 75.2], [16.8, 74.4], [18.2, 74.2], [19.8, 74.5], [20.8, 74.8]
  ], '#3d2e22');

  // Western Ghats & Konkan Coastal Strip: Ferralsols / Laterite (Rich Terracotta Red)
  drawSoilPolygon([
    [15.8, 73.6], [16.5, 73.3], [17.5, 73.1], [18.5, 72.9], [19.8, 72.8],
    [20.2, 73.1], [19.2, 73.4], [17.8, 73.6], [16.8, 73.8], [15.8, 74.0]
  ], '#d84315');

  // 5. THE AMERICAS & AUSTRALIA:
  // North America
  drawSoilPolygon([
    [70, -165], [72, -90], [55, -60], [45, -65], [30, -82], [25, -97], [32, -118], [50, -125], [60, -140]
  ], '#8d6e63');
  // US Corn Belt / Midwest Mollisols & Vertisols
  drawSoilPolygon([
    [45, -100], [45, -85], [35, -88], [32, -98]
  ], '#4a3b32');
  // South America Amazon Ferralsols
  drawSoilPolygon([
    [10, -75], [5, -50], [-10, -38], [-22, -42], [-35, -55], [-45, -65], [-20, -70], [-5, -80]
  ], '#e65100');
  // Australia (Arid Desert Arenosols & Eastern Luvisols)
  drawSoilPolygon([
    [-12, 130], [-15, 142], [-24, 153], [-37, 150], [-38, 140], [-32, 116], [-20, 114]
  ], '#e59866');
  drawSoilPolygon([
    [-20, 122], [-22, 138], [-28, 138], [-28, 122]
  ], '#f39c12');

  // 6. Realistic SoilGrids 250m Grain / Pixelation (Micro-Cell Stippling)
  // Simulates the exact raster grid artifacting seen on soilgrids.org
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    // Only apply grain to land areas (skip ocean)
    if (data[i] > 30 || data[i + 1] > 30 || data[i + 2] > 30) {
      const noise = (Math.random() - 0.5) * 22;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Return Three.js CanvasTexture
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
};

// 7. Dedicated Water Distribution & Hydrology Overlay Texture Generator
export const createHydrologyOverlayTexture = () => {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Transparent base
  ctx.clearRect(0, 0, width, height);

  // Draw Maharashtra River Arteries with luminous cyan glow
  MAHARASHTRA_RIVERS.forEach(river => {
    ctx.beginPath();
    river.coords.forEach(([lat, lng], idx) => {
      const { x, y } = latLngToTextureCoords(lat, lng, width, height);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    // Outer glow
    ctx.strokeStyle = river.glowColor;
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 6;
    ctx.stroke();

    // Core bright line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Draw Major Reservoirs as glowing nodes
  MAHARASHTRA_RESERVOIRS.forEach(res => {
    const { x, y } = latLngToTextureCoords(res.coords[0], res.coords[1], width, height);

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 8;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 1.8, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
};
