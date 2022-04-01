import { formatCurrency } from "src/utils/format";
const columnsProduct = [
  {
    name: "img_url",
    align: "left",
    label: "Img",
    field: "img_url",
    sortable: true,
  },

  {
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    sortable: true,
  },

  {
    name: "amount",
    align: "left",
    label: "Amount",
    field: "amount",
    sortable: true,
  },
  {
    name: "price",
    align: "left",
    label: "Price",
    field: "price",
    format: (val) => val + " DA",
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "Action",
    field: "actions",
    sortable: false,
  },
  {
    name: "jaime",
    align: "left",
    label: "Jaime",
    field: "jaime",
    sortable: true,
  },
];

export { columnsProduct, formatCurrency };
