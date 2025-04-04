export const formatCurrency = (currency: number) => {
  return currency.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export function isValidPage(value: number) {
  if (value == null) {
    return false;
  }

  if (typeof value !== "number" && isNaN(value)) {
    return false;
  }
  if (value <= 0) {
    return false;
  }

  if (!Number.isInteger(value)) {
    return false;
  }

  return true;
}

export const urlImageCloud = (url: string) => {
  const imageCloud = url.includes("res.cloudinary.com")
    ? url
    : `/products/${url}`;

  return imageCloud;
};
