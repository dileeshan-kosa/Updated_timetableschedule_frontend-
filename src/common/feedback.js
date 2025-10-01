const backendDomain = "http://localhost:8000";

const feedbackApi = {
  feedBackUp: {
    url: `${backendDomain}/api/feedback-table`,
    method: "post",
  },
};

export default feedbackApi;
