import axios from "axios";

export const fetchAvailableYears = async (chartName) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/get_available_years", {
      params: { chart_name: chartName.toLowerCase() },
    });
    return response.data; // Return the array of available years
  } catch (err) {
    console.error("Error fetching available years:", err);
    return []; // Return an empty array in case of an error
  }
};

export const fetchAvailableYearsRIAA = async (certificationType) => {
  try {
    console.log(`Making request to: /get_available_years_riaa?certificationType=${certificationType}`);
    const response = await fetch(`http://127.0.0.1:5000/get_available_years_riaa?certificationType=${certificationType}`);
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      
      // Ensure data is sorted and return the latest year at the end
      const sortedYears = data.sort((a, b) => b - a); // Sort descending
      return sortedYears;
    } else {
      throw new Error("Received non-JSON response");
    }
  } catch (error) {
    console.error('Failed to fetch available years:', error);
    return [];  // Return an empty array to handle errors gracefully
  }
};

export const fetchRIAAData = async (certificationType, year = null, genre = null) => {
  try {
    const params = {
      certificationType: certificationType.toLowerCase(),
    };

    // Only add the year if it's not "ALL"
    if (year !== "ALL" && year) {
      params.year = year;
    }

    // Only add the genre if it's not "All Genres"
    if (genre) {
      params.genre = genre;
    }

    const response = await axios.get("http://127.0.0.1:5000/get_riaa_data", {
      params: params,
    });

    return response.data; // Return the RIAA data
  } catch (err) {
    console.error("Error fetching RIAA data:", err);
    throw new Error("Failed to fetch RIAA data. Please try again later.");
  }
};

export const fetchData = async (chartName, selectedYear) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/getchart", {
      params: {
        parameter: chartName.toLowerCase(),
        year: selectedYear,
      },
    });
    return response.data; // Return the chart data
  } catch (err) {
    console.error("Error fetching chart data:", err);
    throw new Error("Failed to fetch chart data. Please try again later.");
  }
};

// New function to fetch available genres
export const fetchAvailableGenres = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/get_available_genres");
    return response.data; // Return the array of available genres
  } catch (err) {
    console.error("Error fetching available genres:", err);
    return []; // Return an empty array in case of an error
  }
};
