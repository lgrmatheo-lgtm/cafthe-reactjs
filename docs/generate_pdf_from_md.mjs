import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
    console.error("Usage: node docs/generate_pdf_from_md.mjs <input.md> <output.pdf>");
    process.exit(1);
}

const markdown = fs.readFileSync(inputPath, "utf8");

const PAGE_WIDTH = 595.28; // A4 portrait
const PAGE_HEIGHT = 841.89;
const MARGIN_LEFT = 50;
const MARGIN_RIGHT = 50;
const TOP_Y = 800;
const BOTTOM_Y = 48;

let pages = [];
let commands = [];
let y = TOP_Y;

const pdfEscape = (value) =>
    String(value)
        .replace(/\\/g, "\\\\")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)");

const wrapText = (text, maxChars) => {
    if (!text) return [""];
    const words = text.split(/\s+/).filter(Boolean);
    const lines = [];
    let current = "";
    for (const word of words) {
        if (!current) {
            current = word;
            continue;
        }
        if ((current + " " + word).length <= maxChars) {
            current += " " + word;
        } else {
            lines.push(current);
            current = word;
        }
    }
    if (current) lines.push(current);
    return lines.length ? lines : [text];
};

const newPage = () => {
    if (commands.length) {
        pages.push(commands.join("\n"));
    }
    commands = [];
    y = TOP_Y;
};

const ensureSpace = (neededHeight) => {
    if (y - neededHeight < BOTTOM_Y) {
        newPage();
    }
};

const drawLine = (text, { font = "F1", size = 10, indent = 0 } = {}) => {
    const lineHeight = size * 1.45;
    ensureSpace(lineHeight);
    const x = MARGIN_LEFT + indent;
    commands.push(
        `BT /${font} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${pdfEscape(
            text,
        )}) Tj ET`,
    );
    y -= lineHeight;
};

const drawParagraph = (text, { font = "F1", size = 10, indent = 0 } = {}) => {
    const usableWidth = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT - indent;
    const approxCharWidth = size * 0.53;
    const maxChars = Math.max(24, Math.floor(usableWidth / approxCharWidth));
    const lines = wrapText(text, maxChars);
    lines.forEach((line) => drawLine(line, { font, size, indent }));
};

const blank = (space = 8) => {
    ensureSpace(space);
    y -= space;
};

const lines = markdown.replace(/\r\n/g, "\n").split("\n");

for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
        blank(8);
        continue;
    }

    if (line.startsWith("# ")) {
        blank(4);
        drawParagraph(line.slice(2).trim(), { font: "F2", size: 18 });
        blank(4);
        continue;
    }

    if (line.startsWith("## ")) {
        blank(3);
        drawParagraph(line.slice(3).trim(), { font: "F2", size: 14 });
        blank(2);
        continue;
    }

    if (line.startsWith("### ")) {
        blank(2);
        drawParagraph(line.slice(4).trim(), { font: "F2", size: 12 });
        blank(1);
        continue;
    }

    if (line.startsWith("- ")) {
        drawParagraph(`- ${line.slice(2).trim()}`, { font: "F1", size: 10, indent: 10 });
        continue;
    }

    if (line.startsWith("`") && line.endsWith("`")) {
        drawParagraph(line, { font: "F1", size: 9, indent: 6 });
        continue;
    }

    drawParagraph(line, { font: "F1", size: 10 });
}

if (commands.length) {
    pages.push(commands.join("\n"));
}

if (!pages.length) {
    pages = ["BT /F1 12 Tf 1 0 0 1 50 800 Tm (Document vide) Tj ET"];
}

const objects = {};
let nextId = 1;

const catalogId = nextId++;
const pagesId = nextId++;
const fontRegularId = nextId++;
const fontBoldId = nextId++;

objects[fontRegularId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
objects[fontBoldId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

const pageIds = [];

for (const content of pages) {
    const contentId = nextId++;
    const pageId = nextId++;
    pageIds.push(pageId);

    const contentBytes = Buffer.byteLength(content, "latin1");
    objects[contentId] = `<< /Length ${contentBytes} >>\nstream\n${content}\nendstream`;
    objects[pageId] =
        `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_WIDTH.toFixed(2)} ${PAGE_HEIGHT.toFixed(2)}] ` +
        `/Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`;
}

objects[pagesId] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
objects[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;

const totalObjects = nextId - 1;
let pdf = "%PDF-1.4\n";
const offsets = new Array(totalObjects + 1).fill(0);

for (let id = 1; id <= totalObjects; id += 1) {
    offsets[id] = Buffer.byteLength(pdf, "latin1");
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
}

const xrefOffset = Buffer.byteLength(pdf, "latin1");
pdf += `xref\n0 ${totalObjects + 1}\n`;
pdf += "0000000000 65535 f \n";
for (let id = 1; id <= totalObjects; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${totalObjects + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

const outDir = path.dirname(outputPath);
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(outputPath, Buffer.from(pdf, "latin1"));
console.log(`PDF genere: ${outputPath}`);
