class Cache {
  timestamp(days) {
    const date = new Date();

    if (typeof (days) !== 'undefined') {
      return Math.round(date.setDate(date.getDate() + days) / 1000);
    }

    return Math.round(date.getTime() / 1000);
  }

  set(key, data, days = 0) {
    // Store data with expiry for time sensitive data
    if (days > 0) {
      localStorage.setItem(key, JSON.stringify({
        exp: (days !== null ? this.timestamp(days) : null),
        data: data
      }));
    }

    // Store raw data
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key) {
    const cacheData = localStorage.getItem(key);

    if (null === cacheData) return null;

    const parsedData = JSON.parse(cacheData);

    // Check if cached data contains an expiry
    if (typeof(parsedData['exp']) !== 'undefined') {
      // Cached data has expired so lets return a null value
      if (!(this.timestamp() < parsedData['exp']) || parsedData['exp'] === null) {
        return null;
      }
    }

    // Return data object (if it exists)
    if (typeof(parsedData['data']) !== 'undefined') {
      return parsedData['data'];
    }

    // Return raw data or null
    return parsedData ?? null;
  }

  reset() {
    this.remove('current_level');
    this.remove('level_completed');
  }

  remove(key) {
    localStorage.removeItem(key);
  }
};

export default Cache;
