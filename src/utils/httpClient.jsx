import React from 'react'
const API = 'https://api.themoviedb.org/3'

export async function get(path) {
  try {
    const response = await fetch(API + path, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDE2MThiNjUxM2Q2M2Q3ZTg1Mzk4ZGY1YTcwYTI3NyIsInN1YiI6IjY1YTE1NDEzMTk2OTBjMDEyNThhY2EyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6TXn3ms3mwxWMtOpxDiCPwjkjU6cMbXnCn7w0B4-x8M',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data || {};
    } else {
      console.error('La respuesta no es un JSON válido.');
      return {};
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
