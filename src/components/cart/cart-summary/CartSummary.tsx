import Link from "next/link";

export const CartSummary = () => {
  return (
    <div className="md:fixed w-full md:w-[270px] rounded-lg  bg-white spacey-2 p-6 shadow-md ">
      <h3 className="text-lg font-medium">Resumen de compra</h3>
      <div className="mt-4 space-y-1.5">
        <div className=" flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">$129.99</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">igv</p>
          <p className="text-gray-700">$4.99</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Envio</p>
          <p className="text-gray-700">$4.99</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">$134.98 USD</p>
            <p className="text-sm text-gray-700">incluye IGV</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link
          href={"/checkout/address"}
          className="block btn-primary text-center"
        >
          Check out
        </Link>
      </div>
    </div>
  );
};
