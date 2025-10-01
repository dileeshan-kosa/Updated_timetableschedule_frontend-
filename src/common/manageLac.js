const backendDomain = "http://localhost:8000";

const manageLectureApi = {
  manageLectureBackUp: {
    url: `${backendDomain}/api/manage-lecture`,
    method: "post",
  },
};

export default manageLectureApi;
