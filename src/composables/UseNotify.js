import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = async (message) => {
    $q.notify({
      type: "positive",
      message: message,
    });
  };

  const notifyError = async (message) => {
    $q.notify({
      type: "negative",
      message: message || "!",
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
}
