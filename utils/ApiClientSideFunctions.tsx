import Cookies from "js-cookie";
const token = Cookies.get("user_token");

// get kyc form
export function getKycFormsInput() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600 },
  };

  return fetch(
    `${process.env.API_BASE_URL}/api/user/kyc-form-data`,
    requestOptions
  );
}

// submit kyc form functions
export async function submitKycForm(formValues) {
  const formData = new FormData();

  for (const key in formValues) {
    if (formValues.hasOwnProperty(key)) {
      formData.append(key, formValues[key] as string);
    }
  }

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/user/kyc-form`,
    requestOptions
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}

// submit auction create
export async function createAuctionApi(
  formValues,
  uploadedImg,
  specification_name,
  specification_value,
  currency_id
) {
  const formData = new FormData();
  formData.append(`currency_id`, currency_id);

  for (const key in formValues) {
    if (formValues.hasOwnProperty(key)) {
      formData.append(key, formValues[key] as any);
    }
  }

  for (let i = 0; i < uploadedImg.length; i++) {
    formData.append(`gallery[${i}]`, uploadedImg[i]);
  }

  for (let i = 0; i < specification_name.length; i++) {
    formData.append(`specification_name[${i}]`, specification_name[i]);
  }
  for (let i = 0; i < specification_value.length; i++) {
    formData.append(`specification_value[${i}]`, specification_value[i]);
  }
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/user/store-auction`,
    requestOptions
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}

// udpate submit auction create
export async function updateAuctionApi(
  formValues,
  uploadedImg,
  auctionId,
  specification_name,
  specification_value,
  currency_id
) {
  const formData = new FormData();
  formData.append(`currency_id`, currency_id);

  for (const key in formValues) {
    if (formValues.hasOwnProperty(key)) {
      formData.append(key, formValues[key] as any);
    }
  }

  for (let i = 0; i < uploadedImg.length; i++) {
    formData.append(`gallery[${i}]`, uploadedImg[i]);
  }

  for (let i = 0; i < specification_name.length; i++) {
    formData.append(`specification_name[${i}]`, specification_name[i]);
  }
  for (let i = 0; i < specification_value.length; i++) {
    formData.append(`specification_value[${i}]`, specification_value[i]);
  }
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/user/auction/update/${auctionId}`,
    requestOptions
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}

// fetch categories
export const fetchCategory = (setCategories, setloading, router) => {
  setloading(true);
  var requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${process.env.API_BASE_URL}/api/user/category/list`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 401) {
        Cookies.remove("user_token");
        router.replace("/login");
        router.refresh();
      }
      if (result.status === true || 200) {
        setCategories(result.data);
      }
      setloading(false);
    })
    .catch((error) => {
      console.log("error", error);
      setloading(false);
    });
};


// check email and kyc
export const checkEmailKycActive = (setloading, router) => {
  setloading(true);
  var requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${process.env.API_BASE_URL}/api/user/check/kyc/email/verification`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result?.status == 401) {
        Cookies.remove("user_token");
        router.replace("/login");
        router.refresh();
        setloading(false);
      }

      if (result?.success == false && result?.response?.email_verify == false) {
        router.replace("/verify-otp");
        router.refresh();
        setloading(false);
      }
      if (result?.success == false && result?.response?.kyc_restriction == true) {
        router.replace("/dashboard/kyc");
        router.refresh();
        setloading(false);
      }
      if (result?.status == true) {
        setloading(false);
      }

    })
    .catch((error) => {
      console.log('************** check layout api call start(error)  *********************');
      console.log("error", error);
      console.log('************** check layout api call  end(error) *********************');
      setloading(false);
    });
};


// send otp for reset password
export async function checkOTPForMail(otp: string) {
  const formdata = new FormData();
  formdata.append("code", otp);
  const requestOptions = {
    method: "POST",
    // headers: myHeaders,
    body: formdata,
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