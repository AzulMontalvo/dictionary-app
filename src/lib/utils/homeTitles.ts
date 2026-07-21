const HOME_TITLES = [
  "¿Qué palabra buscas hoy?",
  "¿Qué palabra descubrirás hoy?",
  "Explora el lenguaje, una palabra a la vez",
  "Aprende algo nuevo con cada búsqueda",
  "Amplía tu mundo a través del vocabulario",
  "El lenguaje está lleno de sorpresas",
  "¿Conoces realmente el significado de esa palabra?",
  "Sumérgete en el fascinante mundo del lenguaje",
  "Hoy puede ser un buen día para aprender una palabra nueva",
  "Hipo… ¿qué?"
]

export function HomeTitle(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
    86400000
  );

  return HOME_TITLES[dayOfYear % HOME_TITLES.length];
}