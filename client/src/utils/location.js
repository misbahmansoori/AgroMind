/**
 * Detect farmer location via browser GPS.
 * Resolves { lat, lon } or rejects with a reason code.
 */
export function detectFarmerLocation(timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("GEO_UNSUPPORTED"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        const code =
          err?.code === 1
            ? "GEO_DENIED"
            : err?.code === 2
              ? "GEO_UNAVAILABLE"
              : "GEO_TIMEOUT";
        reject(new Error(code));
      },
      {
        enableHighAccuracy: false,
        timeout: timeoutMs,
        maximumAge: 10 * 60 * 1000,
      },
    );
  });
}

export function profileCity(user) {
  return (
    user?.district?.trim() ||
    user?.state?.trim() ||
    user?.village?.trim() ||
    ""
  );
}
