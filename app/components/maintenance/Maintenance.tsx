"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TableSkeleton } from "../skeleton/skeleton";
import Button from "../buttons/Button";  // Correct import
import useGlobalStore from "../../store/GlobalStore";
// import { useRouter } from "next/navigation";

export default function Maintenance() {
    const store = useGlobalStore();
    // const router = useRouter();
    const [isUiLoaded, setUiLoaded] = useState(false);

    useEffect(() => {
        setUiLoaded(true);
    }, []);

    if (!isUiLoaded) return <TableSkeleton />;  // Show skeleton while loading

    const handleBackToHome = () => {
        window.location.reload();
        // router.push("/"); // Navigating to the homepage
    };

    return (
        <div className="auc-container py-[80px]">
            <div className="flex justify-center items-center flex-col gap-4">
                <h3 className="text-xl font-bold text-center">
                    {store?.maintenance?.maintenance || "The site is currently under maintenance."}
                </h3>
                <Image
                    src={store?.maintenance?.maintance_image || `/assets/img/maintenance.png`}
                    width={500}
                    height={400}
                    alt="Maintenance page"
                />
                <Button
                    text="Back to Home"
                    clickHandler={handleBackToHome}
                    isLoading={false}  // Make sure to set to true if you're in a loading state
                    styles="auc-btn-default auc-btn-primary mx-auto mt-[60px]"
                />
            </div>
        </div>
    );
}
