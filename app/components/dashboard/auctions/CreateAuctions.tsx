"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import NiceSelect from "../../NiceSelect/NiceSelect";
import Button from "../../buttons/Button";
import { ICreateAuctions } from "../../../interfaces/interfaces";
import { useFormik } from "formik";
import { object, string, number, date, InferType, mixed } from "yup";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

import {
  createAuctionApi,
  fetchCategory,
  updateAuctionApi,
} from "../../../../utils/ApiClientSideFunctions";
import { redirect, useRouter } from "next/navigation";
import useLanguage from "../../../hook/UseLanguage";
import { AuctionCreateSkeleton } from "../../skeleton/skeleton";
import useCurrency from "../../../hook/UseCurrency";
import useCurrencySymbol from "../../../hook/UseCurrencySymbol";
import { showFeatureImg } from "../../../helpers/helpers";

const CreateAuctions: React.FC<ICreateAuctions> = ({
  title,
  isEdit = false,
  edited_id,
  page_data,
}) => {
  const t = useLanguage();
  const c = useCurrency();
  const symbol = useCurrencySymbol();

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [galleryUploadedImg, setgalleryUploadedImg] = useState([]);
  const [editGalleryUploadedImg, seteditGalleryUploadedImg] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setloading] = useState(false);
  const [isFormSubmitting, setisFormSubmitting] = useState(false);
  const router = useRouter();
  const [specifications, setSpecifications] = useState([
    { id: 1, name: "", value: "" },
  ]);

  const token = Cookies.get("user_token");
  const default_currency = Cookies.get("default_currency")
    ? JSON.parse(Cookies.get("default_currency"))
    : null;
  const currency_id = default_currency?.id || 1;

  // category options
  const Category_options = categories.map((cat) => {
    return {
      value: cat.id,
      label: cat.name,
    };
  });

  // handle  images gallery
  const handleUploadedImage = (event, index = null) => {
    const files = event.target.files;

    let updatedState = [];
    if (!(index === null)) {
      updatedState = [
        ...galleryUploadedImg?.slice(0, index),
        ...files,
        ...galleryUploadedImg.slice(index + 1),
      ];
    } else {
      updatedState = [...galleryUploadedImg, ...files];
    }

    setgalleryUploadedImg(updatedState);

    if (isEdit) {
      let editupdatedState = [];
      if (!(index === null)) {
        editupdatedState = [
          ...editGalleryUploadedImg?.slice(0, index),
          ...files,
          ...editGalleryUploadedImg.slice(index + 1),
        ];
      } else {
        editupdatedState = [...editGalleryUploadedImg, ...files];
      }
      seteditGalleryUploadedImg(editupdatedState);
    }
  };

  // handle specific changes
  const handleSpecificationChange = (e, index, field) => {
    const value = e.target.value;
    setSpecifications((prevState) => {
      const newState = [...prevState];
      newState[index][field] = value;
      return newState;
    });
  };

  // validation
  const createAuctionSchema = object({
    title: string().required(),
    image: mixed().required(),
    price: number().required(),
    end_date: date().required(),
    short_description: string().required(),
    auction_condition: string().required(),
    description: string().required(),
  });

  // formik
  const formik = useFormik({
    initialValues: {
      title: "",
      category_id: Category_options && Category_options[0]?.value,
      image: null,
      price: "",
      start_date: "",
      end_date: "",
      is_schedule: 1,
      is_featured: 1,
      auction_condition: "new",
      description: "",
      short_description: "",
      currency_id: default_currency?.id || 1,
    },
    validationSchema: createAuctionSchema,
    onSubmit: async (values) => {
      const specification_name = specifications.map((sp) => sp.name);
      const specification_value = specifications.map((sp) => sp.value);

      const formValues = {
        title: values.title,
        category_id: values.category_id,
        image: values.image,
        price: values.price,
        start_date: values.start_date,
        end_date: values.end_date,
        is_schedule: values.is_schedule,
        is_featured: values.is_featured,
        auction_condition: values.auction_condition,
        description: values.description,
        short_description: values.short_description,
      };

      if (isEdit) {
        try {
          setisFormSubmitting(true);
          const res = await updateAuctionApi(
            formValues,
            editGalleryUploadedImg,
            page_data.data.auction.id,
            specification_name,
            specification_value,
            values.currency_id
          );
          if (res?.success === false) {
            toast.warning(res?.message);
            setisFormSubmitting(false);
          } else if (res.status === true || res.status === 200) {
            toast.success(res?.data);
            router.push("/dashboard/auctions/all");
            router.refresh();
            setisFormSubmitting(false);
          } else {
            setisFormSubmitting(false);
            toast.error("something went wrong!");
          }
          setisFormSubmitting(false);
        } catch (error) {
          console.log("error", error);
          toast.error(error.error);
          setisFormSubmitting(false);
        }
      } else {
        try {
          setisFormSubmitting(true);
          const res = await createAuctionApi(
            formValues,
            galleryUploadedImg,
            specification_name,
            specification_value,
            values.currency_id
          );

          if (res?.success === false) {
            toast.warning(res?.message);
            setisFormSubmitting(false);
          } else if (res.status === true || res.status === 200) {
            toast.success(res?.data);
            router.push("/dashboard/auctions/all");
            router.refresh();
            setisFormSubmitting(false);
          } else {
            setisFormSubmitting(false);
            toast.error("something went wrong!");
          }
        } catch (error) {
          console.log("error", error);
          setisFormSubmitting(false);
          toast.error(error.error);
        }
      }
    },
  });

  // options for conditions
  const auction_condition_options = [
    {
      label: "Used",
      value: "used",
    },
    {
      label: "New",
      value: "new",
    },
    {
      label: "Recondition",
      value: "recondition",
    },
  ];

  // show default auction condition
  const showDefault_auction_condition = (label) => {
    const data = auction_condition_options.filter((item) => {
      if (item?.label == label || item?.value == label)
        return item;
    });
    return data[0]?.value;
  }

  // only for editing value
  const setEditedValueOnLoad = (data) => {
    formik.setFieldValue("title", data.auction.title);
    formik.setFieldValue("category_id", JSON.parse(data.auction.category_id));
    formik.setFieldValue("image", data.image);
    formik.setFieldValue("price", data.auction.price);
    formik.setFieldValue("start_date", data.auction.start_date);
    formik.setFieldValue("is_schedule", JSON.parse(data.auction.is_schedule));
    formik.setFieldValue("end_date", data.auction.end_date);
    formik.setFieldValue("status", JSON.parse(data.auction.status));
    formik.setFieldValue("is_featured", JSON.parse(data.auction.is_featured));
    formik.setFieldValue("auction_condition", data.auction.auction_condition);
    formik.setFieldValue("description", data.auction.description);
    formik.setFieldValue("short_description", data.auction.short_description);

    // specification
    const specification_items = data.specification;
    if (specification_items) {
      const initialSpecifications = Object.keys(specification_items).map(
        (key, index) => ({
          id: index + 1,
          name: key,
          value: specification_items[key],
        })
      );
      setSpecifications(initialSpecifications);
    }

    setgalleryUploadedImg(data.gallery);
  };

  const deleteGalleryImg = (imgName, index) => {
    const lastSlashIndex = imgName.lastIndexOf("/");

    // Extract the image name using substring
    const imageName = imgName.substring(lastSlashIndex + 1);

    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setloading(true);
    fetch(
      `${process.env.API_BASE_URL}/api/user/auction/gallery/delete/${page_data.data.auction.id}/${imageName}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {

        if (result?.success === false) {
          toast.warning(result?.message);
        }
        if (result.status === 401) {
          Cookies.remove("user_token");
          router.replace("/login");
          router.refresh();
        }
        if (result.status === true || 200) {
          toast.success("Image deleted Successfully!");

          // delete from local state
          setgalleryUploadedImg((prevImages) =>
            prevImages.filter((_, i) => i !== index)
          );
        }
        setloading(false);
      })
      .catch((error) => {
        toast.error(error?.message);
        console.log("error", error);
        setloading(false);
      });
  };

  useEffect(() => {
    fetchCategory(setCategories, setloading, router);

    if (isEdit) {
      setEditedValueOnLoad(page_data.data);
    }
  }, []);

  if (isEdit) {
    if (!page_data) {
      return <AuctionCreateSkeleton />;
    }
  }

  return (
    <div>
      <h2 className="auc-primary-heading">{t(title)}</h2>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 min-768:grid-cols-2 min-1200:grid-cols-3 gap-x-[28px] gap-y-[32px]">
          {/* product name */}
          <div>
            <label htmlFor="product-name">{t("Product Name")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="name"
              autoComplete="off"
              name="title"
              id="product-name"
              value={formik.values.title}
              placeholder="Product Name"
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.title}
              </span>
            ) : null}
          </div>

          {/* category */}
          <div>
            <label> {t("Category")}</label>
            <div className="mt-[16px] w-full">
              <NiceSelect
                options={Category_options && Category_options}
                defaultValue={formik.values.category_id}
                onChange={(value: any) => {
                  formik.setFieldValue("category_id", value.value);
                }}
              />
            </div>
          </div>

          {/* price */}
          <div>
            <label htmlFor="price">
              {t("Price")} ({symbol})
            </label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="name"
              autoComplete="off"
              name="price"
              id="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              placeholder="Price"
            />
            {formik.touched.price && formik.errors.price ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.price}
              </span>
            ) : null}
          </div>

          {/* Schedule */}
          <div>
            <label> {t("Schedule")}</label>
            <div className="mt-[16px] w-full">
              <NiceSelect
                options={[
                  {
                    label: "Yes",
                    value: 1,
                  },
                  {
                    label: "No",
                    value: 0,
                  },
                ]}
                defaultValue={formik.values.is_schedule}
                onChange={(value: any) => {
                  formik.setFieldValue("is_schedule", value.value);
                }}
                wrapperClass=""
              />
            </div>
          </div>

          {/* start date */}
          {formik.values.is_schedule == 1 && (
            <div>
              <label htmlFor="start_date"> {t("Start date")}</label>
              <input
                className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
                type="date"
                autoComplete="off"
                value={formik.values.start_date}
                name="start_date"
                onChange={formik.handleChange}
                id="start_date"
                placeholder="Start date"
              />
              {formik.touched.start_date && formik.errors.start_date ? (
                <span className="capitalize text-auc-light-red-color">
                  {formik.errors.start_date}
                </span>
              ) : null}
            </div>
          )}

          {/* End date */}
          <div>
            <label htmlFor="end_date"> {t("End date")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="date"
              autoComplete="off"
              name="end_date"
              value={formik.values.end_date}
              id="end_date"
              onChange={formik.handleChange}
              placeholder="End date"
            />
            {formik.touched.end_date && formik.errors.end_date ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.end_date}
              </span>
            ) : null}
          </div>

          {/* Item Conditions */}
          <div>
            <label> {t("Item Conditions")} </label>
            <div className="mt-[16px] w-full">
              <NiceSelect
                options={auction_condition_options}
                defaultValue={isEdit ? showDefault_auction_condition(formik.values.auction_condition) : formik.values.auction_condition}
                onChange={(value: any) => {
                  formik.setFieldValue("auction_condition", value.value);
                }}
                wrapperClass=""
              />
            </div>
          </div>

          {/* short description */}
          <div className="col-span-1 min-768:col-span-2 min-1200:col-span-3">
            <label htmlFor="shortDescriptionBox">
              {" "}
              {t("Short Description")} {t("(max: 355 character)")}
            </label>
            <ReactQuill
              className="min-h-[60px] mt-[16px]"
              theme="snow"
              value={formik.values.short_description}
              onChange={(e) => {
                formik.setFieldValue("short_description", e);
              }}
            />
            {formik.touched.short_description &&
              formik.errors.short_description ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.short_description}
              </span>
            ) : null}
          </div>

          {/* product description */}
          <div className="col-span-1 min-768:col-span-2 min-1200:col-span-3">
            <label htmlFor="productDescriptionBox">
              {" "}
              {t("Product Description")}
            </label>
            <ReactQuill
              className="min-h-[60px]"
              theme="snow"
              value={formik.values.description}
              onChange={(e) => {
                formik.setFieldValue("description", e);
              }}
            />
            {formik.touched.description && formik.errors.description ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.description}
              </span>
            ) : null}
          </div>

          {/* product image*/}
          <div>
            <label htmlFor="product-img"> {t("Product Image")}</label>{" "}
            (Recommended size: 592*628)
            <div className="mt-[16px] w-full">
              <div className="relative cursor-pointer">
                <Image
                  className="w-full h-full"
                  src={
                    formik.values.image
                      ? showFeatureImg(formik.values.image)
                      : "/assets/img/image-uplod.png"
                  }
                  width={200}
                  height={200}
                  alt=""
                />
                <input
                  className="absolute outline-auc-primary-color top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  type="file"
                  autoComplete="off"
                  name="image"
                  id="product-img"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    formik.setFieldValue("image", file);
                  }}
                />

                {formik.touched.image && formik.errors.image ? (
                  <span className="capitalize text-auc-light-red-color">
                    Image is required
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Upload Image gallery */}
          <div className="col-span-1 min-768:col-span-2 min-1200:col-span-3">
            <label>
              {t("Upload Image gallery")} (Recommended size: 592*628)
            </label>
            <div className="grid grid-cols-1 min-768:grid-cols-2 min-1200:grid-cols-3 min-1440:grid-cols-4 mt-[16px] gap-[26px] p-[24px] border border-auc-border-color rounded-[8px] overflow-hidden">
              {galleryUploadedImg?.length > 0 &&
                galleryUploadedImg.map((img, index) => (
                  <div key={index} className="relative cursor-pointer">
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        if (isEdit) {
                          deleteGalleryImg(img, index);
                        } else {
                          setgalleryUploadedImg((prevImages) =>
                            prevImages.filter((_, i) => i !== index)
                          );
                        }
                      }}
                      type="button"
                      className="w-[40px] h-[40px] rounded-full justify-center items-center px-[10px] py-[8px] bg-auc-light-red-color hover:bg-auc-light-red-hover-color text-white absolute top-2 right-2 z-[10]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mx-auto"
                      >
                        <g clipPath="url(#clip0_1990_558)">
                          <path
                            d="M22.8 3.6001H1.2C0.88174 3.6001 0.576515 3.72653 0.351472 3.95157C0.126428 4.17661 0 4.48184 0 4.8001C0 5.11836 0.126428 5.42358 0.351472 5.64863C0.576515 5.87367 0.88174 6.0001 1.2 6.0001H3.6V20.4001C3.60029 21.3548 3.97966 22.2703 4.65473 22.9454C5.3298 23.6204 6.24531 23.9998 7.2 24.0001H16.8C17.7547 23.9998 18.6702 23.6205 19.3453 22.9454C20.0204 22.2703 20.3997 21.3548 20.4 20.4001V6.0001H22.8C23.1183 6.0001 23.4235 5.87367 23.6485 5.64863C23.8736 5.42358 24 5.11836 24 4.8001C24 4.48184 23.8736 4.17661 23.6485 3.95157C23.4235 3.72653 23.1183 3.6001 22.8 3.6001ZM10.8 16.8001C10.8 17.1184 10.6736 17.4236 10.4485 17.6486C10.2235 17.8737 9.91826 18.0001 9.6 18.0001C9.28174 18.0001 8.97652 17.8737 8.75147 17.6486C8.52643 17.4236 8.4 17.1184 8.4 16.8001V10.8001C8.4 10.4818 8.52643 10.1766 8.75147 9.95157C8.97652 9.72653 9.28174 9.6001 9.6 9.6001C9.91826 9.6001 10.2235 9.72653 10.4485 9.95157C10.6736 10.1766 10.8 10.4818 10.8 10.8001V16.8001ZM15.6 16.8001C15.6 17.1184 15.4736 17.4236 15.2485 17.6486C15.0235 17.8737 14.7183 18.0001 14.4 18.0001C14.0817 18.0001 13.7765 17.8737 13.5515 17.6486C13.3264 17.4236 13.2 17.1184 13.2 16.8001V10.8001C13.2 10.4818 13.3264 10.1766 13.5515 9.95157C13.7765 9.72653 14.0817 9.6001 14.4 9.6001C14.7183 9.6001 15.0235 9.72653 15.2485 9.95157C15.4736 10.1766 15.6 10.4818 15.6 10.8001V16.8001Z"
                            fill="white"
                          />
                          <path
                            d="M9.6 2.4H14.4C14.7183 2.4 15.0235 2.27357 15.2485 2.04853C15.4736 1.82348 15.6 1.51826 15.6 1.2C15.6 0.88174 15.4736 0.576515 15.2485 0.351472C15.0235 0.126428 14.7183 0 14.4 0H9.6C9.28174 0 8.97652 0.126428 8.75147 0.351472C8.52643 0.576515 8.4 0.88174 8.4 1.2C8.4 1.51826 8.52643 1.82348 8.75147 2.04853C8.97652 2.27357 9.28174 2.4 9.6 2.4Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1990_558">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <Image
                      className="w-full h-full object-cover rounded-[8px]"
                      src={
                        img
                          ? showFeatureImg(img)
                          : "/assets/img/image-uplod.png"
                      }
                      width={200}
                      height={200}
                      alt=""
                    />
                    <input
                      className="absolute outline-auc-primary-color top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      type="file"
                      autoComplete="off"
                      name="product-name"
                      id="product-name"
                      onChange={(event) => handleUploadedImage(event, index)}
                    />
                  </div>
                ))}
              {galleryUploadedImg?.length <= 7 && (
                <div className="relative cursor-pointer">
                  <Image
                    className="w-full h-full"
                    src="/assets/img/image-uplod.png"
                    width={200}
                    height={200}
                    alt=""
                  />
                  <input
                    className="absolute outline-auc-primary-color top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    type="file"
                    autoComplete="off"
                    name="product-name"
                    id="product-name"
                    multiple
                    accept="image/*"
                    onChange={(event) => handleUploadedImage(event)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* product specifications container start --pending--*/}
          <div className="col-span-1 min-768:col-span-2 min-1200:col-span-3">
            <label> {t("Product Specifications")}</label>
            <div className="flex flex-col mt-[16px] gap-[24px]">
              {specifications?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap min-768:flex-nowrap gap-[24px] items-center p-[15px] min-768:p-0 border  min-768:border-0 rounded-[8px]"
                >
                  <input
                    className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px] w-full min-768:w-[40%] h-[60px] rounded-[8px] "
                    type="text"
                    autoComplete="off"
                    name={`specification-name-${index}`}
                    id={`specification-name-${index}`}
                    placeholder="Specification Name"
                    value={item.name}
                    onChange={(e) =>
                      handleSpecificationChange(e, index, "name")
                    }
                  />
                  <input
                    className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full min-768:w-[40%] h-[60px] rounded-[8px]"
                    type="text"
                    autoComplete="off"
                    name={`specification-value-${index}`}
                    id={`specification-value-${index}`}
                    placeholder="Specification Value"
                    value={item.value}
                    onChange={(e) =>
                      handleSpecificationChange(e, index, "value")
                    }
                  />

                  {/* remove specification */}
                  <Button
                    text={t("Remove")}
                    styles={"auc-btn-light-red w-full min-768:w-[175px]"}
                    clickHandler={(e) => {
                      e.preventDefault();
                      if (specifications.length > 1) {
                        setSpecifications((prevState) => {
                          const newState = prevState.filter(
                            (i) => i.id !== item.id
                          );
                          return newState;
                        });
                      }
                      if (specifications.length === 1) {
                        toast.warn("At least one is required!!");
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              {/* add specification */}
              <Button
                symbol="+"
                text={t("Add New")}
                styles={
                  "auc-btn-secondary w-full min-768:w-[170px] ml-auto mt-[32px]"
                }
                clickHandler={(e) => {
                  e.preventDefault();

                  setSpecifications((prevState) => [
                    ...prevState,
                    { id: prevState?.length + 1, name: "", value: "" },
                  ]);
                }}
              />
            </div>
          </div>
        </div>

        {/* submit button */}
        <Button
          isLoading={isFormSubmitting}
          isdisabled={isFormSubmitting}
          btnType="submit"
          text={t("Submit")}
          styles={"auc-btn-primary w-full mt-[48px]"}
        />
      </form>
    </div>
  );
};

export default CreateAuctions;
