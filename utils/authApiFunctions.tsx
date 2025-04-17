// login api
export async function hadleLoginApi(email: string, password: string) {
  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);

  const requestOptions = {
    method: "POST",
    // headers: myHeaders,
    body: formdata,
  };

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/user/login`,
    requestOptions
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}
// send otp for reset password
export async function hadleOTP(email: string) {
  const formdata = new FormData();
  formdata.append("email", email);
  const requestOptions = {
    method: "POST",
    // headers: myHeaders,
    body: formdata,
  };

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/user/forgot-password`,
    requestOptions
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}
//  reset password
export async function hadleResetPassword(
  OTP: any,
  password: any,
  password_confirmation: any
) {
  const formdata = new FormData();
  formdata.append("code", OTP);
  formdata.append("password", password);
  formdata.append("password_confirmation", password_confirmation);
  const requestOptions = {
    method: "POST",
    // headers: myHeaders,
    body: formdata,
  };

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/user/reset-password`,
    requestOptions
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}

// register api
export async function hadleRegisterApi(formValues) {
  const formData = new FormData();

  for (const key in formValues) {
    if (formValues.hasOwnProperty(key)) {
      formData.append(key, formValues[key] as string);
    }
  }

  const requestOptions = {
    method: "POST",
    // headers: myHeaders,
    body: formData,
  };

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/user/register`,
    requestOptions
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}

// register api
export async function hadleVerifyEmail(code) {
  const formData = new FormData();

  formData.append('code', code);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/user/token`,
    requestOptions
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}
