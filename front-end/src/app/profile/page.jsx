"use client";
import { useEffect, useState } from "react";
import { callAPI } from "@/utils/api-caller";
import { useSearchParams } from "next/navigation";
import ProductComponent from "@/components/product-component";
const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE;
import { useRouter } from "next/navigation";
import Loading from "../loading";
const ProfilePage = () => {
  return (
    <div className="profile">
      <div className="avatar">
        <div className="avatar-wrapper"></div>
      </div>
      <div className="body">
        <p>Name:</p>
        <p>Email: </p>
        <p>Account created at:</p>
      </div>
    </div>
  );
};

export default ProfilePage;
