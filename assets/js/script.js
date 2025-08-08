const input = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
const copyBtn = document.getElementById('copy-html');
const exportBtn = document.getElementById('export-html');
const toggleTheme = document.getElementById('toggle-theme');

/* Met à jour l'aperçu en convertissant le Markdown en HTML
et en le nettoyant pour éviter les failles XSS */
function updatePreview() {
    const markdown = input.value;
    const rawHTML = marked.parse(markdown);
    const cleanHTML = DOMPurify.sanitize(rawHTML);
    preview.innerHTML = cleanHTML;
    localStorage.setItem('markdown', markdown);
}

// Copie le HTML de l'aperçu dans le presse-papiers
async function copyHTML() {
    try {
        await navigator.clipboard.writeText(preview.innerHTML);
        alert("✅ HTML copié dans le presse-papiers !");
    } catch (err) {
        console.error("Erreur lors de la copie :", err);
        alert("❌ Impossible de copier le HTML.");
    }
}

// Exporte l'aperçu en fichier HTML complet
function exportHTML() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr" data-theme="${currentTheme}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Export SmartDown</title>
</head>
<body>
${preview.innerHTML}
</body>
</html>
    `.trim();

    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "smartdown_export.html";
    link.click();
}

// Alterne entre mode clair et mode sombre 
function toggleThemeMode() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Restaure le contenu et le thème au chargement 
window.addEventListener('DOMContentLoaded', () => {
    const savedMarkdown = localStorage.getItem('markdown');
    const savedTheme = localStorage.getItem('theme');

    if (savedMarkdown) {
        input.value = savedMarkdown;
        updatePreview();
    }
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
});

// Événements
input.addEventListener('input', updatePreview);
copyBtn.addEventListener('click', copyHTML);
exportBtn.addEventListener('click', exportHTML);
toggleTheme.addEventListener('click', toggleThemeMode);
