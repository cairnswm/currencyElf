import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface Currency {
  code: string;
  name: string;
}

interface ConversionRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currencies: Currency[];
  baseCurrency: string;
  amount: number;
  rates: ConversionRates;
  ratesDate: Date | null;
  isLoading: boolean;
  error: string | null;
  starredCurrencies: string[];
  setBaseCurrency: (currency: string) => void;
  setAmount: (amount: number) => void;
  toggleStarredCurrency: (code: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
}) => {
  const host = window.location.hostname;
  console.log("Host:", host);
  const BASE_URL =
    host === "localhost"
      ? "http://localhost/cairnsgames/"
      : "https://cairnsgames.co.za/";
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [baseCurrency, setBaseCurrency] = useState<string>(
    () => localStorage.getItem("baseCurrency") || "ZAR"
  );
  const [starredCurrencies, setStarredCurrencies] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("starredCurrencies") || '["MZN", "ZMW"]')
  );
  const [amount, setAmount] = useState<number>(() =>
    parseFloat(localStorage.getItem("amount") || "3")
  );
  const [rates, setRates] = useState<ConversionRates>({});
  const [baseRates, setBaseRates] = useState<ConversionRates>({});
  const [ratesDate, setRatesDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Save base currency to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("baseCurrency", baseCurrency);
  }, [baseCurrency]);

  // Save amount to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("amount", amount.toString());
  }, [amount]);

  // Save starred currencies to localStorage when they change
  useEffect(() => {
    localStorage.setItem(
      "starredCurrencies",
      JSON.stringify(starredCurrencies)
    );
  }, [starredCurrencies]);

  // Fetch currencies list
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}php/exchange/list_currencies.php`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch currencies");
        }
        const data = await response.json();
        const currencyArray = Object.entries(data.currencies).map(
          ([code, description]: [string, string]) => ({
            code,
            name: description,
          })
        );
        setCurrencies(currencyArray);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };

    fetchCurrencies();
  }, []);

  // Fetch base EUR rates once
  useEffect(() => {
    const fetchBaseRates = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}php/exchange/list_rates.php?base=EUR`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch base rates");
        }
        const data = await response.json();
        try {
          console.log("DATE OF RATES:", data.date);
          setRatesDate(new Date(data.date));
        } catch {
          setRatesDate(data.date);
        }
        setBaseRates(data.rates);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };

    fetchBaseRates();
  }, []);

  // Calculate conversion rates based on selected currency
  useEffect(() => {
    if (Object.keys(baseRates).length > 0) {
      const baseToEur = baseRates[baseCurrency] || 1;
      const newRates: ConversionRates = {};

      Object.entries(baseRates).forEach(([currency, rate]) => {
        newRates[currency] = (rate as number) / baseToEur;
      });

      setRates(newRates);
      setIsLoading(false);
    }
  }, [baseCurrency, baseRates]);

  const toggleStarredCurrency = (code: string) => {
    setStarredCurrencies((prev) => {
      if (prev.includes(code)) {
        return prev.filter((c) => c !== code);
      }
      return [...prev, code];
    });
  };

  const value = {
    currencies,
    baseCurrency,
    amount,
    rates,
    ratesDate,
    isLoading,
    error,
    starredCurrencies,
    setBaseCurrency,
    setAmount,
    toggleStarredCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
