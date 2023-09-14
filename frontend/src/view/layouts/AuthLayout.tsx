import { Outlet } from "react-router-dom";

import { Logo } from "../components/Logo";

import illustration from "../../assets/illustration.png";

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-full lg:w-1/2 h-full flex flex-col gap-16 items-center justify-center">
        <Logo className="text-gray-500 h-6" />

        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>
      <div className="w-1/2 h-full hidden lg:flex justify-center items-center p-8 relative">
        <img
          src={illustration}
          className="object-cover rounded-[32px] w-full h-full max-w-[656px] max-h-[960px] select-none"
        />
        <div className="max-w-[656px] bottom-8 bg-white p-10 absolute rounded-b-[32px]">
          <Logo className="text-teal-900 h-8" />
          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  )
}