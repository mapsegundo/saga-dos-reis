/**
 * Utilitário para obter emoji de clima com base no clima fornecido
 * @param {string} weather - O tipo de clima (rain, sun, cloud, etc)
 * @returns {string} - O emoji correspondente ao clima
 */
export const getWeatherEmoji = (weather) => {
  switch (weather?.toLowerCase()) {
    case "rain":
      return "🌧️";
    case "sun":
    case "sunny":
      return "☀️";
    case "cloud":
    case "cloudy":
      return "☁️";
    case "snow":
      return "❄️";
    case "storm":
      return "⛈️";
    case "fog":
      return "🌫️";
    case "wind":
    case "windy":
      return "💨";
    default:
      return "🌤️"; // Parcialmente ensolarado como padrão
  }
};
