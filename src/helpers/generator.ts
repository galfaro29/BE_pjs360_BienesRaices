/**
 * generateCustomId
 * ----------------
 * Genera un identificador personalizado con el formato:
 * <ENV_PREFIX>-<PREFIX>-<RANDOM>-<YYMMDD>
 *
 * Ejemplo:
 *   PJS-USR-ABCDE-250819
 */
export const generateCustomId = (prefix: string = "USR"): string => {
  // Prefijo opcional desde variable de entorno
  const envPrefix: string = (process.env.USER_CODE_PREFIX || "").trim();

  const effectivePrefix: string = envPrefix
    ? `${envPrefix}-${prefix}`
    : prefix;

  const pad = (n: number): string => n.toString().padStart(2, "0");

  const now = new Date();

  // Formato YYMMDD
  const datePart: string = [
    String(now.getFullYear()).slice(-2),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
  ].join("");

  // Segmento aleatorio corto para unicidad diaria
  const randomPart: string = Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase();

  return `${effectivePrefix}-${randomPart}-${datePart}`;
};