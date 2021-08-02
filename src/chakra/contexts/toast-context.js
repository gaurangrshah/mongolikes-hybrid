import {
  createContext,
  useEffect,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useToast } from "@chakra-ui/react";

import { useWindowMounted } from "@/hooks/use-window-mounted";
import { jsonCompare } from "@/utils/json-compare";

const ToastStateContext = createContext();
const ToastDispatchContext = createContext();

const commonOptions = {
  duration: 6000,
  isClosable: true,
};

const VALIDATORS = ["null", null, "undefined", undefined, "", " "];

const validateToastDescription = (description, ref) => {
  // avoid passing null values in toast messages
  const isNotValid = VALIDATORS.find((validator) => description === validator);
  return isNotValid === undefined;
};

export function ToastProvider({ config, children }) {
  const mounted = useWindowMounted();
  // const mounted = true;
  const msgRef = useRef(null);
  const [msg, setMsg] = useState(null);
  const [status, setStatus] = useState("info");
  const [showToast] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (!msg) return;
    // cleanup toasts
    setTimeout(() => {
      msg && setMsg(null);
    }, 9000);
    return () => setMsg(null);
  }, [msg]);

  useEffect(() => {
    if (!status || !mounted) return;
    // cleanup toasts
    setTimeout(() => {
      status && setStatus("info");
    }, 9000);
    return () => setStatus("info");
  }, [status]);

  const setMessage = useCallback(
    (message, status) => {
      setStatus(status);
      setMsg(message);
    },
    [setStatus, setMsg, mounted]
  );

  useEffect(() => {
    let outputMsg = Array.isArray(msg) ? msg[0] : msg;

    if (
      !mounted ||
      !showToast ||
      !validateToastDescription(outputMsg?.description, msgRef) ||
      jsonCompare(msg?.description, msgRef?.current?.description) // used to avoid dupes
    ) {
      return;
    }
    if (mounted && outputMsg) {
      toast({ position: "top-right", ...commonOptions, ...outputMsg, status });
      msgRef.current = msg; // set reference to make sure we're not duplicating toasts
    }
  }, [msg]);

  return (
    <ToastStateContext.Provider value={{ msg, toast, showToast }}>
      <ToastDispatchContext.Provider value={{ setMsg: setMessage }}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}

export const useToastState = () => {
  const context = useContext(ToastStateContext);
  if (context === undefined) {
    throw new Error("useToastState must be used within a ToastProvider");
  }

  return context;
};
export const useToastDispatch = () => {
  const context = useContext(ToastDispatchContext);
  if (context === undefined) {
    throw new Error("useToastState must be used within a ToastProvider");
  }
  return context;
};

// @link: https://chakra-ui.com/docs/feedback/toast#props
