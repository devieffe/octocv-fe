// utils/mockApi.js

export const mockUsers = [
    {
      id: "1",
      username: "alice.dev",
      email: "alice@example.com",
      createdAt: "2024-11-01T10:00:00Z",
    },
    {
      id: "2",
      username: "bob.codes",
      email: "bob@example.com",
      createdAt: "2024-09-15T14:30:00Z",
    },
  ];
  
  export const mockQuestionnaires = {
    "1": [
      { title: "Frontend Skills", resultSummary: "React and CSS Expert" },
      { title: "Work Preferences", resultSummary: "Remote, Agile Teams" },
    ],
    "2": [
      { title: "Backend Strengths", resultSummary: "Python & Django strong" },
    ],
  };
  
  export const mockCVs = {
    "1": {
      careerPath: "Frontend Developer",
      createdAt: "2025-05-25T09:00:00Z",
      downloadUrl: "/mock-cvs/alice-frontend.pdf",
    },
    "2": {
      careerPath: "Backend Developer",
      createdAt: "2025-05-20T12:45:00Z",
      downloadUrl: "/mock-cvs/bob-backend.pdf",
    },
  };
  
  export const mockApi = {
    getUsers: () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(mockUsers), 500);
      }),
  
    getUserById: (id) =>
      new Promise((resolve) => {
        const user = mockUsers.find((u) => u.id === id);
        setTimeout(() => resolve(user), 300);
      }),
  
    getUserQuestionnaires: (id) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(mockQuestionnaires[id] || []), 300);
      }),
  
    getUserLatestCV: (id) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(mockCVs[id] || null), 300);
      }),
  };
  