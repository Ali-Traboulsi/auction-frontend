"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "../../buttons/Button";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import {
  getKycFormsInput,
  submitKycForm,
} from "../../../../utils/ApiClientSideFunctions";
import { useRouter } from "next/navigation";
import useLanguage from "../../../hook/UseLanguage";
import { showFeatureImg } from "../../../helpers/helpers";
import { KycFormSkeleton } from "../../skeleton/skeleton";

const KycForm = () => {
  const t = useLanguage();
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [formInputs, setformInputs] = useState(null);
  const [formTextAreas, setformTextAreas] = useState(null);
  const [formFileInputs, setformFileInputs] = useState(null);
  const [isFormSubmitting, setisFormSubmitting] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [erorrMsg, seterorrMsg] = useState("");
  const [isVerified, setisVerified] = useState(false);
  //  form input values
  const [formValues, setFormValues] = useState({});

  // Handle input change
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setisFormSubmitting(true);
      const res = submitKycForm(formValues);

      res
        .then((res) => {
          setisFormSubmitting(false);
          toast.success(res.msg);
          router.push("/dashboard/kyc/info");
        })
        .catch((err) => {
          setisFormSubmitting(false);
          toast.warning("Something went wrong!");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      setisFormSubmitting(false);
    }
  };

  // fetch form inputs
  useEffect(() => {
    setisloading(true);
    getKycFormsInput()
      .then((res) => {
        return res.json();
      })
      .then((res) => {

        console.log('check jyc res', res);
        setMessage(res?.data?.kyc_reject_reason);
        const allInputs = res.data.kyc_form_data;

        if (allInputs) {
          const txts = allInputs.filter((input) => input.type == "1");
          const files = allInputs.filter((input) => input.type == "2");
          const txtAreas = allInputs.filter((input) => input.type == "3");
          setformInputs(txts);
          setformFileInputs(files);
          setformTextAreas(txtAreas);
        }

        if (res.status == false) {
          seterorrMsg(res.error);
          setisVerified(true);
        }

        if (res.status === 401) {
          Cookies.remove("user_token");
          router.replace("/login");
        }

        setisloading(false);
      })
      .catch((err) => {
        console.log(err);
        setisloading(false);
      });
  }, []);

  if (isloading) {
    return <KycFormSkeleton />;
  }

  return (
    <div className="min-768:w-[68%] min-1024:mx-0 mx-auto flex flex-col items-start gap-[28px]">
      <div className="flex flex-col items-start gap-[12px]">
        <h2 className="auc-primary-heading !mb-0">{t("KYC Verification")}</h2>
        {message &&
          <div className="shadow-md  bg-auc-secondary-color-200 rounded-lg px-[20px] py-[10px] w-full">
            <h6 className="font-bold text-[18px] !mb-0">KYC reject reason</h6>
            <p className="auc-text-paragraph auc-text-paragraph--error text-red-400 ">{message}</p>
          </div>
        }
        {!isVerified && (
          <p className="text-auc-text-color-800">
            {t(
              "Complete with your information. You can Use NID, Passport or Driving License."
            )}
          </p>
        )}
      </div>
      {isVerified ? (
        <h4>{t(erorrMsg)}</h4>
      ) : (
        <form
          // onSubmit={formik.handleSubmit}
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-[32px] kycForm"
        >
          {formInputs &&
            formInputs.map((inputsBox) => (
              <div className="w-full" key={inputsBox.id}>
                <label htmlFor="nid">{inputsBox.label}</label>
                <input
                  className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[12px]"
                  type={`text`}
                  autoComplete="off"
                  name={inputsBox.name}
                  id="nid"
                  onChange={handleChange}
                  placeholder="Document Number"
                />
              </div>
            ))}

          {formFileInputs && (
            <div className="w-full flex flex-wrap gap-4">
              {formFileInputs.map((inputsBox) => (
                <div key={inputsBox.id}>
                  <label
                    className="mb-3 inline-block"
                    htmlFor={`file-id-${inputsBox.id}`}
                  >
                    {inputsBox.label}
                  </label>
                  <label className="cursor-pointer" htmlFor={`file-id-${inputsBox.id}`}>
                    <Image
                      src={
                        formValues[inputsBox.name]
                          ? showFeatureImg(formValues[inputsBox.name])
                          : "/assets/img/photo-uplod-box.png"
                      }
                      className={`
                      w-[291px] h-[180px] object-cover rounded-[8px]
                    }`}
                      width={291}
                      height={102}
                      alt=""
                    />
                  </label>
                  <input
                    className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[12px] hidden"
                    type="file"
                    autoComplete="off"
                    name={inputsBox.name}
                    id={`file-id-${inputsBox.id}`}
                    onChange={handleChange}
                    placeholder="Document Number"
                  />
                </div>
              ))}
            </div>
          )}

          {formTextAreas &&
            formTextAreas.map((inputsBox) => (
              <div className="w-full" key={inputsBox.id}>
                <label htmlFor="nid">{inputsBox.label}</label>
                <textarea
                  className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full rounded-[8px] mt-[12px]"
                  autoComplete="off"
                  name={inputsBox.name}
                  id="nid"
                  cols={4}
                  onChange={handleChange}
                  placeholder="Document Number"
                />
              </div>
            ))}

          <Button
            isLoading={isFormSubmitting}
            isdisabled={isFormSubmitting}
            btnType="submit"
            text={isFormSubmitting ? t("Processing..") : t("Submit")}
            styles={"auc-btn-primary w-full"}
          />
        </form>
      )}
    </div>
  );
};

export default KycForm;
