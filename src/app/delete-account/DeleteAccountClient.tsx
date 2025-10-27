"use client";
import React, { useEffect, useState } from "react";
import Header from "../component/component/Headers/Headers";
import Footer from "../component/component/Homepage/Footer";
import Image from "next/image";
import ImageFiles from "@/assets/assets/images";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import DeleteAccountModal from "../component/ModalPages/DeleteAccount/DeleteAccountModal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";

interface DeleteAccountFormData {
  email: string;
  password: string;
}

const DeleteAccountClient = () => {
  const [isOpenDeleteAccountModal, setIsOpenDeleteAccountModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeleteAccountFormData>();

  useEffect(() => {
    // Extract token & role from query params
    const urlToken = searchParams.get("token");
    const urlRole = searchParams.get("role");
    setToken(urlToken);
    setRole(urlRole);

    if (!urlToken || !urlRole) {
      alert("Invalid or missing account deletion link.");
      router.push("/");
    }
  }, [searchParams, router]);

  const onSubmit = async (data: DeleteAccountFormData) => {
    if (!token || !role) return;

    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://api.waddleapp.io/api/v1/users/me/${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            email: data.email,
            password: data.password,
          },
        }
      );

      if (response.data.success) {
        setIsOpenDeleteAccountModal(true);
        reset();
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "An error occurred while deleting your account."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white min-h-screen">
      <header className="sticky top-0 z-50">
        <Header usedFor="started" />
      </header>

      <section className="flex flex-col">
        <div className="relative w-full h-[550px]">
          <Image
            src={ImageFiles.ContactUsImage}
            alt="Delete Account"
            fill
            className="object-cover top-0 bottom-0 left-0 right-0"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">Delete Account</h1>
          </div>
        </div>

        <div className="flex flex-col gap-10 px-4 sm:px-6 lg:px-[80px] py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex flex-col gap-2">
              <h3 className="text-red-900 font-bold text-lg">
                Warning: This action cannot be undone
              </h3>
              <p className="text-red-800 text-sm">
                Deleting your account will permanently remove all your data,
                including your profile, saved information, and account history.
                This action is irreversible.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-[#303237] text-4xl font-bold">
              DELETE YOUR ACCOUNT
            </h1>
            <p className="text-[#898483] text-[16px]">
              We&apos;re sorry to see you go. Please enter your account
              credentials to confirm the deletion of your account. If
              you&apos;re experiencing issues, please
              <Link href="/contact-us" className="text-[#2853A6] pl-1.5">
                contact our support team
              </Link>{" "}
              before proceeding.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7 max-w-2xl"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-[#303237] text-[16px] font-bold">
                Email Address
                <span className="text-[#FF0000] text-[16px]">*</span>
              </h2>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-3 border !text-[#000000] border-[#BDC0CE] outline-none rounded-md ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-[#303237] text-[16px] font-bold">
                Password<span className="text-[#FF0000] text-[16px]">*</span>
              </h2>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-4 py-3 border !text-[#000000] border-[#BDC0CE] outline-none rounded-md ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <p className="text-[#898483] text-[14px]">
                By clicking &quot;Delete My Account&quot;, you acknowledge that:
              </p>
              <ul className="list-disc list-inside text-[#898483] text-[14px] space-y-2 pl-2">
                <li>All your personal data will be permanently deleted</li>
                <li>Your account cannot be recovered after deletion</li>
                <li>You will lose access to all services immediately</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/"
                className="flex-1 text-center bg-gray-200 text-gray-700 px-8 py-3 rounded-[12px] hover:bg-gray-300 transition-colors"
              >
                <span className="font-medium text-[16px]">Cancel</span>
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 bg-red-600 text-white px-8 py-3 rounded-[12px] ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-700"
                } transition-colors`}
              >
                <span className="font-medium text-[16px] flex items-center justify-center gap-2">
                  {isLoading ? "Deleting..." : "Delete My Account"}
                  {isLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-[#EAEEF6] py-[70px] px-4 sm:px-6 lg:px-[80px]">
        <Footer />
      </section>

      {isOpenDeleteAccountModal && (
        <DeleteAccountModal
          setIsOpenDeleteAccountModal={setIsOpenDeleteAccountModal}
        />
      )}
    </section>
  );
};

export default DeleteAccountClient;
