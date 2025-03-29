"use client";
import { paypalCheckPayment, setTransactionId } from "@/src/actions";
import { useCartStore } from "@/src/store";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

type Props = {
  orderId: string;
  amount: number;
};

export const PaypalButton = ({ orderId, amount }: Props) => {
  const cleanCart = useCartStore((state) => state.cleanCart);
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmmount = Math.round(amount * 100) / 100;

  if (isPending)
    return (
      <div className="animate-pulse pt-4 ">
        <div className="h-12 bg-gray-200 rounded dark:bg-gray-700"></div>
        <p className="h-4 bg-gray-100 rounded dark:bg-gray-600 mt-2"></p>
      </div>
    );

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: roundedAmmount.toString(),
          },
        },
      ],
    });

    const { transactionId: orderTransaction, ok } = await setTransactionId(
      orderId,
      transactionId
    );

    if (!ok) throw new Error("Error al crear la la transaccion de pago");

    return orderTransaction!;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;

    await paypalCheckPayment(details.id!);
    cleanCart();
  };

  return (
    <>
      <div className="pt-4 relative z-0 ">
        <PayPalButtons
          style={{
            layout: "horizontal",
            shape: "rect",
            label: "pay",
          }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>
    </>
  );
};
