import api from "./authApi";

// שליפת כל סוגי השירותים
export const getServices = async () => {
  const response = await api.get("/AddAppointment/services");
  return response.data;
};

// קביעת תור חדש
export const bookAppointment = async (userId, serviceId, appointmentDate) => {
  const response = await api.post(
    "/AddAppointment/book",
    JSON.stringify({
      userId: parseInt(userId),
      serviceId: parseInt(serviceId),
      appointmentDate: appointmentDate,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// שליפת היסטוריה לפי userId
export const getUserHistory = async (userId) => {
  const response = await api.get(`/Appointment/history/${userId}`);
  return response.data;
};

// מחיקת תור
export const deleteAppointment = async (userId, appointmentDate) => {
  const response = await api.delete(
    `/Appointment/delete?userId=${userId}&appointmentDate=${appointmentDate}`
  );
  return response.data;
};

// עדכון תור
export const Updateappointment = async (data) => {
  const response = await api.put(
    "/Appointment/update",
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);
  
  return response.data;
};