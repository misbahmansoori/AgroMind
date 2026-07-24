const axios = require("axios");

const TIP_CATALOG = {
  highHumidity: {
    en: "High humidity today. Monitor crops for fungal diseases.",
    hi: "आज नमी बहुत अधिक है। फसलों में फफूंद रोगों की निगरानी करें।",
  },
  elevatedHumidity: {
    en: "Humidity is elevated. Watch leaves for early fungal spots.",
    hi: "नमी बढ़ी हुई है। पत्तियों पर फफूंद के शुरुआती धब्बे देखें।",
  },
  rainExpected: {
    en: "Rain expected. Delay pesticide spraying.",
    hi: "बारिश की संभावना है। कीटनाशक छिड़काव टाल दें।",
  },
  recentRain: {
    en: "Recent rain detected. Check field drainage to reduce root-rot risk.",
    hi: "हाल में बारिश हुई है। जड़ सड़न से बचने के लिए जल निकासी जाँचें।",
  },
  highTemp: {
    en: "High temperature today. Irrigate carefully and avoid midday spraying.",
    hi: "आज तापमान अधिक है। सावधानी से सिंचाई करें और दोपहर में छिड़काव न करें।",
  },
  coolWeather: {
    en: "Cool weather today. Protect tender seedlings from cold stress.",
    hi: "आज मौसम ठंडा है। कोमल पौधों को ठंड से बचाएँ।",
  },
  strongWind: {
    en: "Strong wind today. Avoid pesticide spraying until wind settles.",
    hi: "आज तेज़ हवा है। हवा शांत होने तक छिड़काव न करें।",
  },
  thunder: {
    en: "Thunderstorm risk. Keep farm workers and equipment sheltered.",
    hi: "आंधी-तूफान का खतरा। मजदूरों और उपकरणों को सुरक्षित रखें।",
  },
  manageable: {
    en: "Weather looks manageable. Keep routine crop monitoring.",
    hi: "मौसम सामान्य है। नियमित फसल निगरानी जारी रखें।",
  },
};

function tip(key, lang = "en") {
  const entry = TIP_CATALOG[key];
  if (!entry) return key;
  return entry[lang] || entry.en;
}

function buildFarmAdvice(
  { humidity, temperature, rainfallMm, windKmh, condition, rainExpected },
  lang = "en",
) {
  const tips = [];
  let riskLevel = "Low";
  const L = lang === "hi" ? "hi" : "en";

  const cond = (condition || "").toLowerCase();

  if (humidity >= 80) {
    riskLevel = "High";
    tips.push(tip("highHumidity", L));
  } else if (humidity >= 70) {
    riskLevel = "Medium";
    tips.push(tip("elevatedHumidity", L));
  }

  if (
    rainExpected ||
    rainfallMm > 1 ||
    cond.includes("rain") ||
    cond.includes("drizzle")
  ) {
    if (riskLevel === "Low") riskLevel = "Medium";
    tips.push(tip("rainExpected", L));
  }

  if (rainfallMm > 3) {
    if (riskLevel === "Low") riskLevel = "Medium";
    tips.push(tip("recentRain", L));
  }

  if (temperature >= 35) {
    if (riskLevel === "Low") riskLevel = "Medium";
    tips.push(tip("highTemp", L));
  } else if (temperature <= 10) {
    if (riskLevel === "Low") riskLevel = "Medium";
    tips.push(tip("coolWeather", L));
  }

  if (windKmh >= 25) {
    if (riskLevel === "Low") riskLevel = "Medium";
    tips.push(tip("strongWind", L));
  }

  if (cond.includes("thunder")) {
    riskLevel = "High";
    tips.push(tip("thunder", L));
  }

  if (tips.length === 0) {
    tips.push(tip("manageable", L));
  }

  return {
    riskLevel,
    insight: tips[0],
    advice: tips.slice(0, 3),
  };
}

async function fetchRainExpected(lat, lon, city, apiKey) {
  try {
    const base =
      lat != null && lon != null
        ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}`
        : `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}`;

    const { data } = await axios.get(
      `${base}&appid=${apiKey}&units=metric&cnt=8`,
    );

    return (data.list || []).some((slot) => {
      const pop = slot.pop || 0;
      const rain = slot.rain?.["3h"] || 0;
      const main = (slot.weather?.[0]?.main || "").toLowerCase();
      return (
        pop >= 0.4 ||
        rain > 0 ||
        main.includes("rain") ||
        main.includes("drizzle")
      );
    });
  } catch {
    return false;
  }
}

const getWeather = async (req, res) => {
  try {
    const { city, lat, lon, lang } = req.query;
    const uiLang = lang === "hi" ? "hi" : "en";
    const hasCoords = lat != null && lon != null && lat !== "" && lon !== "";

    if (!hasCoords && !city) {
      return res.status(400).json({
        success: false,
        message: "City or lat/lon coordinates are required",
      });
    }

    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "WEATHER_API_KEY is missing in server/.env",
      });
    }

    const url = hasCoords
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city,
        )}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    const rainfallMm = data.rain?.["1h"] || data.rain?.["3h"] || 0;
    const windKmh = Math.round((data.wind?.speed || 0) * 3.6);
    const humidity = data.main.humidity;
    const temperature = Math.round(data.main.temp);
    const condition = data.weather[0].main;
    const icon = data.weather[0].icon;

    const rainExpected = await fetchRainExpected(
      hasCoords ? lat : data.coord?.lat,
      hasCoords ? lon : data.coord?.lon,
      data.name,
      apiKey,
    );

    const { riskLevel, insight, advice } = buildFarmAdvice(
      {
        humidity,
        temperature,
        rainfallMm,
        windKmh,
        condition,
        rainExpected,
      },
      uiLang,
    );

    res.status(200).json({
      success: true,
      weather: {
        city: data.name,
        country: data.sys.country,
        temperature,
        humidity,
        feelsLike: Math.round(data.main.feels_like),
        condition,
        description: data.weather[0].description,
        icon,
        iconUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        windSpeed: windKmh,
        rainfall: rainfallMm,
        rainExpected,
        riskLevel,
        insight,
        advice,
        coords: {
          lat: data.coord?.lat,
          lon: data.coord?.lon,
        },
        source: hasCoords ? "gps" : "city",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch weather",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { getWeather };
