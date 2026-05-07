import api from "./authApi";

// שליפת תורים להיום
export const getTodaySchedule = async () => {
  const response = await api.get("/DailySchedule/today");
  return response.data;
};

// שליפת תורים לפי תאריך
export const getScheduleByDate = async (date) => {
  const response = await api.get(`/DailySchedule/date/${date}`);
  return response.data;
};

// שליחת תזכורות לכל תורי מחר
export const sendReminders = async () => {
  const response = await api.post("/Reminder/send");
  return response.data;
};

// שליחת מייל בדיקה
export const sendTestEmail = async (email) => {
  const response = await api.post(`/Reminder/test?email=${email}`);
  return response.data;
};