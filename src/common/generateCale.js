const backendDomain = "http://localhost:8000";

const generateCalenderApi = {
  generateCalenderBackUp: {
    url: `${backendDomain}/api/generate-calendar`,
    method: "post",
  },
};

export default generateCalenderApi;
