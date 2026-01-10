import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, "public", "assets", "others", "flag-cr.jpg");
const outDir = path.join(projectRoot, "public", "assets", "others");

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function generateIcon(size) {
  const outputPath = path.join(outDir, `icon-${size}.png`);

  const padding = Math.round(size * 0.18); // espacio “maskable-safe” aproximado
  const inner = size - padding * 2;

  const base = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: "#002B7F",
    },
  });

  const flag = sharp(sourcePath)
    .resize({
      width: inner,
      height: inner,
      fit: "contain",
      withoutEnlargement: true,
      background: { r: 0, g: 43, b: 127, alpha: 1 },
    })
    .png();

  const buffer = await flag.toBuffer();

  await base
    .composite([{ input: buffer, left: padding, top: padding }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath);

  return outputPath;
}

const main = async () => {
  if (!(await fileExists(sourcePath))) {
    throw new Error(`No se encontró la imagen fuente: ${sourcePath}`);
  }

  await fs.mkdir(outDir, { recursive: true });

  const outputs = await Promise.all([generateIcon(192), generateIcon(512)]);
  console.log("Iconos PWA generados:");
  for (const out of outputs) console.log("-", out);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
