"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../../buttons/Button";
import { useFormik } from "formik";
import { object, string, number, date, InferType, mixed } from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useLanguage from "../../../hook/UseLanguage";
import { ProfileSettingSkeleton } from "../../skeleton/skeleton";
import NiceSelect from "../../NiceSelect/NiceSelect";

const ProfileSetting = () => {
  const [loading, setloading] = useState(false);
  const [countryList, setcountryList] = useState(null);
  const [isFormSubmitting, setisFormSubmitting] = useState(false);
  const router = useRouter();
  const token = Cookies.get("user_token");

  const t = useLanguage();

  // validation
  const profileSchema = object({
    name: string().required(),
    username: string().required(),
    email: string().required(),
    phone: number().required(),
    address: string().required(),
    zip: string().required(),
    city: string().required(),
    country: string().required(),
    photo: mixed().required(),
  });

  // formik
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      photo: "",
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      updateProfileData(values);
    },
  });

  // fetch ProfileData
  const fetchProfileData = () => {
    setloading(true);
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${process.env.API_BASE_URL}/api/user/get-details`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 401) {
          Cookies.remove("user_token");
          router.replace("/login");
          router.refresh();
        }
        if (result.status === true || 200) {
          setProfileDataOnLoad(result.data.user);
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  // fetch country list
  const fetchCountryList = () => {
    setloading(true);
    var requestOptions = {
      method: "GET",
    };

    fetch(`${process.env.API_BASE_URL}/api/country/list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setcountryList(result?.data);
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  // set profile data on load
  const setProfileDataOnLoad = (data) => {
    formik.setFieldValue("name", data.name);
    formik.setFieldValue("email", data.email);
    formik.setFieldValue("username", data.username);
    formik.setFieldValue("phone", data.phone);
    formik.setFieldValue("address", data.address);
    formik.setFieldValue("zip", data.zip);
    formik.setFieldValue("city", data.city);
    formik.setFieldValue("country", data.country);
    formik.setFieldValue("photo", data.photo);
  };

  // update data
  const updateProfileData = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("zip", values.zip);
    formData.append("city", values.city);
    formData.append("country", values.country);
    formData.append("photo", values.photo);

    setisFormSubmitting(true);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/profile-settings`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 401) {
          Cookies.remove("user_token");
          router.replace("/login");
          router.refresh();
        }
        if (result.status === 200) {
          Cookies.set("user_data", JSON.stringify(result.data));
          window.location.reload();
        }

        toast.success(result.message);

        setisFormSubmitting(false);
      })
      .catch((error) => {
        console.log("error", error);
        toast.success("Something went wrong!!");
        setisFormSubmitting(false);
      });
  };

  // show profile image
  const showProfileImg = (imgUrl) => {
    const isFeatureImgFile = imgUrl instanceof File;
    if (isFeatureImgFile) {
      return URL.createObjectURL(imgUrl);
    } else {
      return imgUrl;
    }
  };

  // country options
  const countryOptions =
    countryList &&
    countryList?.map((country) => {
      return {
        value: country.name,
        label: country.name,
      };
    });

  useEffect(() => {
    fetchCountryList();
    fetchProfileData();
  }, []);

  if (loading) return <ProfileSettingSkeleton />;

  return (
    <div>
      <h2 className="auc-primary-heading">{t("Profile Setting")}</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 min-768:grid-cols-3 gap-[28px]"
      >
        <div className="col-span-1 min-768:col-span-2 grid grid-cols-1 min-768:grid-cols-2 gap-[28px]">
          {/* Name */}
          <div className="w-full ">
            <label htmlFor="fname">{t("Name")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="text"
              autoComplete="off"
              name="name"
              value={formik.values?.name}
              onChange={formik.handleChange}
              id="fname"
              placeholder="Jhone Doe"
            />
            {formik.touched.name && formik.errors.name ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.name}
              </span>
            ) : null}
          </div>
          {/* User Name */}
          <div className="w-full ">
            <label htmlFor="uName"> {t("User Name")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="text"
              autoComplete="off"
              name="username"
              disabled
              value={formik.values.username}
              onChange={formik.handleChange}
              id="uName"
              placeholder="@testuser"
            />
            {formik.touched.username && formik.errors.username ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.username}
              </span>
            ) : null}
          </div>
          {/* Email */}
          <div className="w-full ">
            <label htmlFor="email"> {t("Email")} </label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="email"
              autoComplete="off"
              name="email"
              disabled
              value={formik.values.email}
              onChange={formik.handleChange}
              id="email"
              placeholder="testuser@gmail.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.email}
              </span>
            ) : null}
          </div>
          {/* Mobile */}
          <div className="w-full ">
            <label htmlFor="mobile"> {t("Mobile")} </label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="text"
              autoComplete="off"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              id="mobile"
              placeholder="+880 1234 5678 900"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.phone}
              </span>
            ) : null}
          </div>
          {/* Address */}
          <div className="w-full ">
            <label htmlFor="address"> {t("Address")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="text"
              autoComplete="off"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              id="address"
              placeholder="Address"
            />
            {formik.touched.address && formik.errors.address ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.address}
              </span>
            ) : null}
          </div>
          {/* Zip Code */}
          <div className="w-full ">
            <label htmlFor="zip"> {t("Zip Code")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="text"
              autoComplete="off"
              name="zip"
              value={formik.values.zip}
              onChange={formik.handleChange}
              id="zip"
              placeholder="Zip Code"
            />
            {formik.touched.zip && formik.errors.zip ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.zip}
              </span>
            ) : null}
          </div>
          {/* City */}
          <div className="w-full ">
            <label htmlFor="city">{t("City")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="text"
              autoComplete="off"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              id="city"
              placeholder="City"
            />
            {formik.touched.city && formik.errors.city ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.city}
              </span>
            ) : null}
          </div>
          {/* Country */}
          {countryOptions && (
            <div className="w-full ">
              <label htmlFor="country"> {t("Country")}</label>
              <NiceSelect
                wrapperClass="mt-[16px]"
                options={countryOptions && countryOptions}
                defaultValue={formik?.values?.country}
                onChange={(value: any) => {
                  formik.setFieldValue("country", value.value);
                }}
              />
              {formik.touched.country && formik.errors.country ? (
                <span className="capitalize text-auc-light-red-color">
                  {formik.errors.country}
                </span>
              ) : null}
            </div>
          )}
          {/* Update Profile Button  */}
          <Button
            isLoading={isFormSubmitting}
            isdisabled={isFormSubmitting}
            btnType="submit"
            text={
              isFormSubmitting ? t("Profile Updating") : t("Update Profile")
            }
            styles={"auc-btn-primary min-768:col-span-2 mt-[32px] w-full"}
          />
        </div>
        <div className="col-span-1 order-first min-768:order-last flex flex-col items-start gap-[28px]">
          <label htmlFor="profilePhoto">
            <Image
              className="rounded-[8px] w-full min-768:w-[290px]"
              src={
                formik.values.photo
                  ? showProfileImg(formik.values.photo)
                  : "/assets/img/profilePic.png"
              }
              width={290}
              height={290}
              alt=""
            />
          </label>
          <input
            type="file"
            name="photo"
            className="hidden"
            id="profilePhoto"
            onChange={(e) => {
              formik.setFieldValue("photo", e.target.files[0]);
            }}
          />
          {/* Update Profile Picture Button  */}
          <label
            className="auc-btn-secondary auc-btn-default w-full"
            htmlFor="profilePhoto"
          >
            {t("Update Profile Picture")}
          </label>
          {formik.touched.photo && formik.errors.photo ? (
            <span className="capitalize text-auc-light-red-color">
              Image is required
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default ProfileSetting;
