const formatCurrency = (currency) => {
  const formatted = currency.toLocaleString("pt-br", {
    style: "currency",
    currency: "EUR",
  });
  return formatted;
};

export { formatCurrency };
